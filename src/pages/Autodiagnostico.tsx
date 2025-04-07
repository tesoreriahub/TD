import { 
  Alert, 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  FormControlLabel, 
  MenuItem, 
  Select, 
  Tab, 
  Tabs, 
  TextField, 
  Tooltip, 
  Typography,
  SelectChangeEvent,
  CircularProgress 
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Question, Section, getSeccionesPorRol } from './preguntasData';
import { db } from './../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Función para guardar datos en Firebase
const guardarEnFirebase = async (nombre: string, apellido: string, correo: string, area: string, rol: string, preguntas: Question[], respuestas: boolean[], categorias: string[]): Promise<string> => {
  try {
    // Crear objeto con los datos del usuario
    const userData = {
      nombre,
      apellido,
      correo,
      area,
      rol,
      fechaCreacion: Timestamp.now(),
      respuestas: preguntas.map((pregunta, index) => ({
        categoria: categorias[index],
        pregunta: pregunta.text,
        respuesta: respuestas[index],
      }))
    };

    // Guardar en Firestore
    const docRef = await addDoc(collection(db, "autodiagnosticos"), userData);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    throw error;
  }
};

const Autodiagnostico: React.FC = () => {
  // Estado para el rol seleccionado
  const [rol, setRol] = useState<string>('');
  
  // Generar las secciones una vez esté seleccionado el rol
  const [sections, setSections] = useState<Section[]>([]);
  
  // Estados para la gestión del formulario
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>(''); 
  const [area, setArea] = useState<string>('');
  
  // Estado para respuestas
  const [answers, setAnswers] = useState<boolean[][]>([]);
  
  const [currentSection, setCurrentSection] = useState<number>(-1); // -1 es para pedir datos personales
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showConsentPopup, setShowConsentPopup] = useState<boolean>(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  
  // Estados para Firebase
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>('');

  // Actualizar secciones cuando cambia el rol
  useEffect(() => {
    if (rol) {
      const newSections = getSeccionesPorRol(rol);
      setSections(newSections);
      
      // Inicializar respuestas con arrays vacíos
      const initialAnswers = newSections.map(section => 
        Array(section.questions.length).fill(false)
      );
      setAnswers(initialAnswers);
    }
  }, [rol]);
  
  // Validación de correo electrónico
  const validarCorreo = (correo: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  // Verificar si una sección está completa
  const isSectionComplete = (sectionIndex: number): boolean => {
    return answers[sectionIndex] && answers[sectionIndex].every(answer => answer !== undefined);
  };

  // Manejar cambio en las respuestas
  const handleChange = (sectionIndex: number, questionIndex: number, checked: boolean): void => {
    const newAnswers = [...answers];
    newAnswers[sectionIndex][questionIndex] = checked;
    setAnswers(newAnswers);
  };

  // Navegar a la siguiente sección
  const handleNextSection = (): void => {
    if (!consentGiven && currentSection === -1) {
      setShowConsentPopup(true);
      return;
    }
    
    if (currentSection === -1) {
      if (name === '' || surname === '' || email === '' || rol === '' || area === '') {
        setShowAlert(true);
        setEmailError('');
      } else if (!validarCorreo(email)) {
        setEmailError('Por favor ingrese un correo electrónico válido.');
        setShowAlert(false);
      } else {
        setEmailError('');
        setShowAlert(false);
        setCurrentSection(0);
      }
    } else if (currentSection >= 0 && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setCompleted(true);
      
      // Guardar automáticamente en Firebase cuando se completa
      handleSaveToFirebase();
    }
  };

  // Guardar datos en Firebase
  const handleSaveToFirebase = async (): Promise<void> => {
    setIsSaving(true);
    setSaveError('');
    
    try {
      const id = await guardarEnFirebase(
        name,
        surname,
        email,
        area,
        rol,
        getAllQuestions(),
        getAllAnswers(),
        getAllCategories()
      );
      
      setDocumentId(id);
      setSaveSuccess(true);
      setIsSaving(false);
    } catch (error) {
      console.error("Error al guardar:", error);
      setSaveError('Ocurrió un error al guardar los datos. Por favor intenta nuevamente.');
      setIsSaving(false);
    }
  };

  // Aceptar consentimiento
  const handleAcceptConsent = (): void => {
    setConsentGiven(true);
    setShowConsentPopup(false);
    handleNextSection();
  };

  // Navegar a la sección anterior
  const handlePrevSection = (): void => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else if (currentSection === 0) {
      setCurrentSection(-1); // Volver a la página de datos personales
    }
  };

  // Manejar selección de sección
  const handleSectionSelect = (_event: React.SyntheticEvent, newValue: number): void => {
    setCurrentSection(newValue);
  };

  // Obtener todas las preguntas
  const getAllQuestions = (): Question[] => {
    return sections.flatMap(section => section.questions);
  };

  // Obtener todas las respuestas
  const getAllAnswers = (): boolean[] => {
    return answers.flat();
  };

  // Obtener las categorías de todas las preguntas
  const getAllCategories = (): string[] => {
    return sections.flatMap(section => 
      Array(section.questions.length).fill(section.title)
    );
  };

  // Volver a iniciar el cuestionario
  const handleReset = (): void => {
    setCompleted(false);
    setCurrentSection(-1);
    setName('');
    setSurname('');
    setEmail('');
    setArea('');
    setRol('');
    setAnswers([]);
    setSaveSuccess(false);
    setDocumentId('');
    setSaveError('');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {currentSection === -1 && !completed ? (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Instrumento Transformación Digital Secretaria de Hacienda
          </Typography>
          
          <Typography variant="body1" paragraph>
            <strong>Objetivo:</strong> Esta aplicación web sirve como un instrumento de recolección de datos de los funcionarios y contratistas de la secretaria de hacienda del distrito especial de ciencia, tecnología e innovación de Medellín, el cual busca examinar el nivel de madurez organizacional en términos de transformación digital.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Créditos
          </Typography>
          <Typography variant="body2" paragraph>
            Desarrollado por Julián Uribe - julian.uribe@medellin.gov.co
          </Typography>
          <Typography variant="body2" paragraph>
            Desarrollado por Alejandro Salgar - alejandro.salgar@medellin.gov.co
          </Typography>
          <Typography variant="body2" paragraph>
            Supervisado por Jorge Iván Brand Ortíz Ph.D - Subsecretaria de Tesoreria - Secretaria de Hacienda
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Ingrese sus datos
          </Typography>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <TextField
            label="Apellido"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            size="small"
          />
          <TextField
            label="Correo electrónico"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="small"
            error={!!emailError}
            helperText={emailError}
          />

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Seleccione su rol en la organización
          </Typography>
          <Select
            value={rol}
            onChange={(e: SelectChangeEvent) => setRol(e.target.value)}
            displayEmpty
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              Seleccione un rol
            </MenuItem>
            <MenuItem value="directivos">Directivo</MenuItem>
            <MenuItem value="lideres">Líder</MenuItem>
            <MenuItem value="profesionales">Profesional - auxiliar - técnico - contratista</MenuItem>
          </Select>

          <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
            Seleccione el área a la cual pertenece
          </Typography>
          <Select
            value={area}
            onChange={(e: SelectChangeEvent) => setArea(e.target.value)}
            displayEmpty
            fullWidth
            required
          >
            <MenuItem value="" disabled>
              Seleccione un área
            </MenuItem>
            <MenuItem value="Despacho Secretaria de Hacienda">Despacho Secretaria de Hacienda</MenuItem>
            <MenuItem value="Subsecretaria de Ingresos">Subsecretaria de Ingresos</MenuItem>
            <MenuItem value="Subsecretaria de Tesorería">Subsecretaria de Tesorería</MenuItem>
            <MenuItem value="Subsecretaria de Presupuesto y Gestión Financiera">Subsecretaria de Presupuesto y Gestión Financiera</MenuItem>
            <MenuItem value="Unidad de apoyo a la gestión jurídica">Unidad de apoyo a la gestión jurídica</MenuItem>
            <MenuItem value="Unidad administrativa">Unidad administrativa</MenuItem>
            <MenuItem value="Unidad de desarrollos tecnológicos">Unidad de desarrollos tecnológicos</MenuItem>
          </Select>
          
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, complete todos los campos para continuar.
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleNextSection}
            style={{ marginTop: '20px' }}
          >
            Comenzar Encuesta
          </Button>

          <Dialog
            open={showConsentPopup}
            onClose={() => setShowConsentPopup(false)}
            aria-labelledby="habeas-data-dialog-title"
            aria-describedby="habeas-data-dialog-description"
          >
            <DialogTitle id="habeas-data-dialog-title">Consentimiento de Habeas Data</DialogTitle>
            <DialogContent>
              <DialogContentText id="habeas-data-dialog-description">
                Para el ejercicio del Habeas Data, el titular del dato personal o quien demuestre un legítimo interés conforme lo señalado en la normatividad vigente, podrá hacerlo a través del correo electrónico institucional correspondiente.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowConsentPopup(false)} color="secondary">
                Rechazar
              </Button>
              <Button onClick={handleAcceptConsent} color="primary" autoFocus>
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
          
          
        </Box>
      ) : !completed ? (
        <Box>
          <Tabs
            value={currentSection}
            onChange={handleSectionSelect}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Secciones de la encuesta"
          >
            {sections.map((section, index) => (
              <Tab
                label={section.title}
                key={index}
              />
            ))}
          </Tabs>

          {sections[currentSection] && (
            <>
              <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                {sections[currentSection].title}
              </Typography>

              {sections[currentSection].description.map((line, index) => (
                <Typography 
                  key={index} 
                  variant={index === 0 ? "body1" : "body2"} 
                  gutterBottom
                  style={index === 0 ? { marginBottom: '15px', fontStyle: 'italic' } : {}}
                >
                  {line}
                </Typography>
              ))}

              <Box display="grid" gridTemplateColumns="1fr" gap={2}>
                {sections[currentSection].questions.map((question, index) => (
                  <Box key={index}>
                    <Tooltip title={question.tooltip || ""} arrow>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={answers[currentSection] && answers[currentSection][index] || false}
                            onChange={(e) => handleChange(currentSection, index, e.target.checked)}
                          />
                        }
                        label={question.text}
                      />
                    </Tooltip>
                  </Box>
                ))}
              </Box>
            </>
          )}
          
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevSection}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextSection}
            >
              {currentSection < sections.length - 1 ? "Siguiente" : "Finalizar"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Gracias por participar en el instrumento de medición de nivel de madurez de transformación digital de la Secretaria de Hacienda.
          </Typography>
          
          {isSaving && (
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" marginY={4}>
              <CircularProgress />
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                Guardando sus respuestas...
              </Typography>
            </Box>
          )}
          
          {saveError && (
            <Alert severity="error" style={{ marginTop: '20px' }}>
              {saveError}
            </Alert>
          )}
          
          {saveSuccess && (
            <Alert severity="success" style={{ marginTop: '20px' }}>
              Sus respuestas han sido guardadas exitosamente en nuestra base de datos. 
              <Typography variant="body2" style={{ marginTop: '5px' }}>
                ID de referencia: {documentId}
              </Typography>
            </Alert>
          )}
          
          <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
            {!saveSuccess && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveToFirebase}
                disabled={isSaving}
              >
                Guardar Respuestas
              </Button>
            )}
            
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Realizar nueva medición
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;