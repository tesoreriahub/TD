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
  SelectChangeEvent 
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Question, Section, getSeccionesPorRol } from './preguntasData';

// Función para generar el archivo Excel
const generarExcel = (nombre: string, apellido: string, correo: string, preguntas: Question[], respuestas: boolean[], categorias: string[]): void => {
  // Crear una hoja de cálculo con preguntas y respuestas
  const data = preguntas.map((pregunta, index) => ({
    Correo: correo,
    Categoria: categorias[index],
    Pregunta: pregunta.text,
    Respuesta: respuestas[index] ? 'Sí' : 'No',
  }));

  // Crear un libro de Excel
  const hoja = XLSX.utils.json_to_sheet(data);

  // Crear el libro con la hoja
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'Resultados');

  // Generar archivo Excel y guardarlo
  const nombreArchivo = `${nombre}_${apellido}.xlsx`;
  XLSX.writeFile(libro, nombreArchivo);
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
  
  // Estado para respuestas
  const [answers, setAnswers] = useState<boolean[][]>([]);
  
  const [currentSection, setCurrentSection] = useState<number>(-1); // -1 es para pedir datos personales
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showConsentPopup, setShowConsentPopup] = useState<boolean>(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

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
      if (name === '' || surname === '' || email === '' || rol === '') {
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

  // Obtener todas las preguntas para generar el Excel
  const getAllQuestions = (): Question[] => {
    return sections.flatMap(section => section.questions);
  };

  // Obtener todas las respuestas para generar el Excel
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
    setRol('');
    setAnswers([]);
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
            <MenuItem value="profesionales">Profesional</MenuItem>
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
          
          <Typography variant="h6" gutterBottom style={{ marginTop: '30px' }}>
            Referencias
          </Typography>
          <Box style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '12px', marginBottom: '20px' }}>
            <Typography variant="body2" paragraph>
              Azieva, R., Tayamaskhanov, H. y Zelimhkanova, N. (2021). Assessing the readiness of oil and gas companies for digital transition. https://doi.org/10.15405/epsbs.2021.11.244
            </Typography>
            <Typography variant="body2" paragraph>
              Barry, A., Assoul, S. y Souissi, N. (2023). Strengths and weaknesses of digital mature models. Journal of Computer Science, 19(6), 727-738. English: https://doi.org/10.3844/jcssp.2023.727.738
            </Typography>
            <Typography variant="body2" paragraph>
              Buntak, K., Kovačić, M. y Mutavđžija, M. (2021). Medición de la madurez de la transformación digital de la cadena de suministro. Tehnički Glasnik, 15(2), 199-204. https://doi.org/10.31803/tg-20200414191933
            </Typography>
            <Typography variant="body2" paragraph>
              Chen, Q., Zhang, W., Jin, N., Wang, X. y Dai, P. (2022). Evaluación de la transformación digital para pequeñas y medianas empresas manufactureras utilizando el método sintético difuso dematel-anp. Sustainability, 14(20), 13038. https://doi.org/10.3390/su142013038
            </Typography>
            <Typography variant="body2" paragraph>
              Danjou, C., Rivest, L., Cognet, B., y Pernot, J. (2021). Modelos de madurez digital: comparación de marcos de evaluación de similitud manuales y semiautomáticos. International Journal of Product Lifecycle Management, 13(4), 291. https://doi.org/10.1504/ijplm.2021.10043128
            </Typography>
            <Typography variant="body2" paragraph>
              Ka, X., Ying, T., y Tang, J. (2023). Un modelo conceptual para desarrollar la madurez digital en micro y pequeñas empresas del sector hotelero. Journal of Theoretical and Applied Electronic Commerce Research, 18(3), 1511-1528. https://doi.org/10.3390/jtaer18030076
            </Typography>
            <Typography variant="body2" paragraph>
              Kammerlohr, V., Paradice, D., & Uckelmann, D. (2022). Un modelo de madurez para la transformación digital efectiva de los laboratorios. Journal of Manufacturing Technology Management, 34(4), 621-643. https://doi.org/10.1108/jmtm-01-2022-0050
            </Typography>
            <Typography variant="body2" paragraph>
              Kaszás, N., Ernszt, I. y Jakab, B. (2023). Pojava organizacijskih i ljudskih čimbenika u modelima digitalne zrelosti. Management, 28(1), 123-135. https://doi.org/10.30924/mjcmi.28.1.8
            </Typography>
          </Box>
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
            Gracias por completar el autodiagnóstico
          </Typography>
          
          <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => generarExcel(
                name, 
                surname, 
                email,
                getAllQuestions(), 
                getAllAnswers(),
                getAllCategories()
              )}
            >
              Descargar Resultados en Excel
            </Button>
            
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Realizar nuevo diagnóstico
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;