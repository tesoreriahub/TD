// src/pages/Home.tsx
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import imagenJorgeBrand from "../assets/JorgeBrand.jpg";
import imagenJulianUribe from "../assets/JulianUribe.jpg";
import imagenorlandouribe from "../assets/orlandouribe.jpg";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Quienes somos
        </Typography>
      </Box>
      <Box textAlign="justify">
        <Typography variant="body1" gutterBottom>
          Bienvenido a TesoreriaHub, tu destino principal para la Innovación y la Gestión Tecnológica en datos de la Subsecretaría de Tesorería de la Alcaldia de Medellín. En TesoreriaHub, nos comprometemos a brindar soluciones avanzadas y servicios de vanguardia para aprovechar al máximo el poder de los datos de tu área u organización. Nuestro centro de analítica e innovación se especializa en una variedad de servicios diseñados para ayudarte a tomar decisiones estratégicas e informadas.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Conoce a nuestro equipo:
        </Typography>
      </Box>

      {/* Sección de equipo */}
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        {/* Primer miembro */}
        <Grid item xs={12} sm={4}>
          <Avatar
            alt="Orlando Uribe Villa"
            src={imagenorlandouribe} // Cambia el path por la ubicación de la imagen
            sx={{ width: 150, height: 180 }}
            style={{ borderRadius: '5%' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6">Secretaría de Hacienda</Typography>
          <Typography variant="subtitle1">Secretario de Hacienda, Orlando Uribe Villa</Typography>
          <Typography variant="body1">
            Administrador de Empresas con especialización en Estudios Políticos. Cuenta con más de 30 años de experiencia participando en procesos de direccionamiento estratégico, fortalecimiento financiero y liderazgo interinstitucional en entidades del sector público y privado con presencia a nivel nacional e internacional.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Correo electrónico: <a href="mailto:orlando.uribe@medellin.gov.co">orlando.uribe@medellin.gov.co</a>
          </Typography>
        </Grid>

        {/* Segundo miembro */}
        <Grid item xs={12} sm={4}>
          <Avatar
            alt="Jorge Iván Brand Ortiz"
            src={imagenJorgeBrand} // Cambia el path por la ubicación de la imagen
            sx={{ width: 150, height: 180 }}
            style={{ borderRadius: '5%' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6">Subsecretaría de Tesorería</Typography>
          <Typography variant="subtitle1">Subsecretario de Tesorería, Jorge Iván Brand Ortiz</Typography>
          <Typography variant="body1">
            Doctorado en gestión de la tecnología e innovación de la UPB, además de Magister en Administración, Especialista en Gerencia Financiera de la misma universidad y Pregrado en Administración de Empresas de la Universidad de Antioquia.
          </Typography>
          <Typography variant="body1">
            14 años de experiencia en entidades públicas, experto en la relación de la gestión de la tecnología e innovación con la industria. Docente, investigador y Decano de la Facultad de Ciencias Económicas y Administrativas de la Institución Universitaria ITM en Medellín.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Correo electrónico: <a href="mailto:jorge.brand@medellin.gov.co">jorge.brand@medellin.gov.co</a>
          </Typography>
        </Grid>

        {/* Tercer miembro */}
        <Grid item xs={12} sm={4}>
          <Avatar
            alt="Julián Alberto Uribe Gómez"
            src={imagenJulianUribe} // Cambia el path por la ubicación de la imagen
            sx={{ width: 150, height: 180 }}
            style={{ borderRadius: '5%' }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6">Profesional de Tesorería</Typography>
          <Typography variant="subtitle1">Julián Alberto Uribe Gómez</Typography>
          <Typography variant="body1">
            Ingeniero industrial, con más de 10 años de experiencia en organizaciones privadas y 6 años como docente ocasional e investigador en la Facultad de Ciencias Económicas y Administrativas de la Institución Universitaria ITM en Medellín.
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Correo electrónico: <a href="mailto:julian.uribe@medellin.gov.co">julian.uribe@medellin.gov.co</a>
          </Typography>
        </Grid>
      </Grid>
    {/* Información de contacto centrada con fondo de color */}
    <Box
        textAlign="center"
        marginTop={6}
        padding={3}
        sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px' }} // Fondo de color y borde redondeado
      >
        <Typography variant="h6" gutterBottom>
          Información de contacto y desarrollo
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nombre: Alejandro Salgar Marin
        </Typography>
        <Typography variant="body2" gutterBottom>
          Correo electrónico: <a href="mailto:alejandro.salgar@medellin.gov.co">alejandro.salgar@medellin.gov.co</a>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Contacto a través de <a href="https://wa.me/57300xxxxxxx" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </Typography>

        <Typography variant="h6" gutterBottom marginTop={4}>
          Supervisión
        </Typography>
        <Typography variant="body1" gutterBottom>
          Jorge Iván Brand Ortiz PhD Subsecretario de Tesorería-Tesorero
        </Typography>
        <Typography variant="body1" gutterBottom>
          Julián Alberto Uribe Gómez MSc
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;