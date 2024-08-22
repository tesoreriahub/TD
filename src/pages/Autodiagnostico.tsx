// src/pages/Autodiagnostico.tsx
import { Autocomplete, Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Autodiagnostico: React.FC = () => {
  // Dividir las preguntas en 3 secciones
  const sections = [
    [
      "¿Utiliza contraseñas únicas y complejas para cada cuenta?",
      "¿Realiza copias de seguridad regularmente de sus datos importantes?",
      "¿Tiene un software antivirus instalado y actualizado?",
    ],
    [
      "¿Es cauteloso con los correos electrónicos de remitentes desconocidos?",
      "¿Utiliza la autenticación de dos factores cuando está disponible?",
      "¿Evita conectarse a redes Wi-Fi públicas no seguras?",
    ],
    [
      "¿Mantiene su sistema operativo y software actualizados?",
      "¿Evita descargar software de fuentes no confiables?",
      "¿Revisa y ajusta regularmente la configuración de privacidad en sus cuentas en línea?",
      "¿Ha recibido capacitación o está informado sobre prácticas de ciberseguridad?",
    ],
  ];

  const [answers, setAnswers] = useState(Array(sections.length).fill(null).map(() => Array(3).fill('')));
  const [currentSection, setCurrentSection] = useState(0);

  const options = ["Sí", "No"]; // Opciones disponibles para las respuestas

  const handleChange = (index: number, value: string | null) => {
    const newAnswers = [...answers];
    newAnswers[currentSection][index] = value || ''; // Actualizar la respuesta en el estado
    setAnswers(newAnswers);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      alert("¡Encuesta completada y enviada! Gracias por completar el autodiagnóstico.");
      console.log("Respuestas enviadas:", answers);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px', marginLeft: '-20px'}}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Autodiagnóstico de Seguridad Informática
        </Typography>
        {sections[currentSection].map((question, index) => (
          <Box key={index} marginBottom={3}>
            <Typography variant="body1" mb={1}>
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
    </Container>
  );
};

export default Autodiagnostico;
