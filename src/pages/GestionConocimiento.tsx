// src/pages/GestionConocimiento.tsx
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GestionConocimiento: React.FC = () => {
  const [content, setContent] = useState('');

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión del Conocimiento
      </Typography>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder="Escribe aquí el contenido de tu sección..."
        style={{ height: '400px' }}
      />
    </div>
  );
};

export default GestionConocimiento;
