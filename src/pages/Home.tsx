// src/pages/Home.tsx
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px', marginLeft: '-20px'}}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Desarrollo como Contratista de la Alcaldía de Medellín
        </Typography>
      </Box>
      <Box textAlign="justify" >
        <Typography variant="body1" gutterBottom>
          Este es un proyecto de desarrollo realizado como parte de un contrato con la Alcaldía de Medellín. 
          Cabe destacar que esta plataforma no es oficial y no se solicitarán datos personales en ningún momento de la experiencia de usuario.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          La información apresentada aquí es únicamente con fines demostrativos y no representa una aplicación oficial de la Alcaldía de Medellín.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
