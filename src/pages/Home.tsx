// src/pages/Home.tsx
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px', marginLeft: '-20px'}}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
        Quienes somos
        </Typography>
      </Box>
      <Box textAlign="justify" >
        <Typography variant="body1" gutterBottom>
        Bienvenido a TesoreriaHub, tu destino principal para la Innovación y la Gestión Tecnológica en datos de la Subsecretaría de Tesorería de la Alcaldia de Medellín. En TesoreriaHub, nos comprometemos a brindar soluciones avanzadas y servicios de vanguardia para aprovechar al máximo el poder de los datos de tu área u organización. Nuestro centro de analítica e innovación se especializa en una variedad de servicios diseñados para ayudarte a tomar decisiones estratégicas e informadas.
        </Typography>
        <Typography variant="body1">
        Conoce a nuestro equipo
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
