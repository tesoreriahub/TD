import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button,
  TextField,
  CircularProgress,
  Alert
} from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './../firebaseConfig';

// Interfaz para los datos de los autodiagnósticos
interface AutodiagnosticoData {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  area: string;
  rol: string;
  fechaCreacion: any; // Timestamp de Firebase
  respuestas: {
    categoria: string;
    pregunta: string;
    respuesta: boolean;
  }[];
}

const Admin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<AutodiagnosticoData[]>([]);
  
  const auth = getAuth();
  
  // Comprobar si el usuario ya está autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLogged(true);
        fetchData();
      } else {
        setIsLogged(false);
      }
    });
    
    return () => unsubscribe();
  }, [auth]);
  
  // Iniciar sesión
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (error: any) {
      setError('Error de autenticación: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLogged(false);
    } catch (error: any) {
      setError('Error al cerrar sesión: ' + error.message);
    }
  };
  
  // Obtener datos de Firestore
  const fetchData = async () => {
    setLoading(true);
    
    try {
      const q = query(collection(db, "autodiagnosticos"), orderBy("fechaCreacion", "desc"));
      const querySnapshot = await getDocs(q);
      
      const autodiagnosticos: AutodiagnosticoData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<AutodiagnosticoData, 'id'>;
        autodiagnosticos.push({
          id: doc.id,
          ...data
        });
      });
      
      setData(autodiagnosticos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };
  
  // Formatear fecha
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    return timestamp.toDate().toLocaleString('es-CO');
  };
  
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Panel de Administración - Autodiagnóstico
      </Typography>
      
      {!isLogged ? (
        <Box 
          sx={{ 
            maxWidth: 400, 
            margin: '0 auto', 
            padding: 3, 
            border: '1px solid #ddd', 
            borderRadius: 2 
          }}
        >
          <Typography variant="h6" gutterBottom>
            Iniciar Sesión
          </Typography>
          
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && (
            <Alert severity="error" style={{ marginTop: '10px' }}>
              {error}
            </Alert>
          )}
          
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
            style={{ marginTop: '20px' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
        </Box>
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              Resultados del Autodiagnóstico
            </Typography>
            
            <Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={fetchData} 
                disabled={loading}
                style={{ marginRight: '10px' }}
              >
                Actualizar
              </Button>
              
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </Box>
          </Box>
          
          {error && (
            <Alert severity="error" style={{ marginBottom: '15px' }}>
              {error}
            </Alert>
          )}
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="body2" gutterBottom>
                Total de encuestas: {data.length}
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Correo</TableCell>
                      <TableCell>Área</TableCell>
                      <TableCell>Rol</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Respuestas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.nombre} {item.apellido}</TableCell>
                        <TableCell>{item.correo}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.rol}</TableCell>
                        <TableCell>{formatDate(item.fechaCreacion)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => {
                              // Aquí podrías mostrar un modal con las respuestas detalladas
                              console.log(item.respuestas);
                              alert(`ID: ${item.id} tiene ${item.respuestas.length} respuestas`);
                            }}
                          >
                            Ver ({item.respuestas.length})
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {data.length === 0 && !loading && (
                <Box textAlign="center" mt={3}>
                  <Typography variant="body1">
                    No hay datos de autodiagnóstico disponibles.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Admin;