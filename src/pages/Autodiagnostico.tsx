// src/pages/Autodiagnostico.tsx
import { Alert, Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';

const Autodiagnostico: React.FC = () => {
  const sections = [
    {
      title: 'Seguridad de Contraseñas',
      questions: [
        "¿Utiliza contraseñas únicas y complejas para cada cuenta?",
        "¿Cambia sus contraseñas regularmente?",
        "¿Utiliza un gestor de contraseñas?",
      ],
    },
    {
      title: 'Phishing',
      questions: [
        "¿Es cauteloso con los correos electrónicos de remitentes desconocidos?",
        "¿Verifica la URL antes de ingresar datos en un sitio web?",
        "¿Evita descargar archivos adjuntos de correos electrónicos sospechosos?",
      ],
    },
    {
      title: 'Autenticación de Doble Factor',
      questions: [
        "¿Utiliza la autenticación de doble factor en sus cuentas?",
        "¿Recibe notificaciones de intentos de inicio de sesión?",
        "¿Utiliza aplicaciones de autenticación en lugar de SMS?",
        "¿Evita usar el mismo dispositivo para autenticarse y realizar transacciones?",
      ],
    },
  ];

  const [answers, setAnswers] = useState(Array(sections.length).fill(null).map((_, i) => Array(sections[i].questions.length).fill('')));
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const options = ["Sí", "No"];

  const handleChange = (index: number, value: string | null) => {
    const newAnswers = [...answers];
    newAnswers[currentSection][index] = value || '';
    setAnswers(newAnswers);
  };

  const handleNextSection = () => {
    if (answers[currentSection].includes('')) {
      setShowAlert(true); // Mostrar alerta si hay preguntas sin responder
    } else {
      setShowAlert(false);
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const calculateResults = () => {
    return sections.map((section, secIndex) => {
      const score = answers[secIndex].reduce((acc, answer) => (answer === "Sí" ? acc + 1 : acc), 0);
      return {
        subject: section.title,
        A: score,
        fullMark: section.questions.length,
      };
    });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {!showResults ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            {sections[currentSection].title}
          </Typography>
          {sections[currentSection].questions.map((question, index) => (
            <Box key={index} marginBottom={3}>
              <Typography variant="body1">
                {index + 1 + currentSection * 3}. {question}
              </Typography>
              <Autocomplete
                value={answers[currentSection][index]}
                onChange={(event, newValue) => handleChange(index, newValue)}
                options={options}
                renderInput={(params) => <TextField {...params} label="Seleccione una opción" variant="outlined" />}
                fullWidth
              />
            </Box>
          ))}
          {showAlert && (
            <Alert severity="warning" onClose={() => setShowAlert(false)}>
              Por favor, responda todas las preguntas antes de continuar.
            </Alert>
          )}
          <Box display="flex" justifyContent="space-between" marginTop={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrevSection}
              disabled={currentSection === 0}
            >
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextSection}
            >
              {currentSection < sections.length - 1 ? "Siguiente" : "Enviar"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>
            Resultados del Autodiagnóstico
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={calculateResults()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 4]} />
              <Radar name="Puntuación" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Container>
  );
};

export default Autodiagnostico;
