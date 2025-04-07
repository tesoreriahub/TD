// src/App.tsx
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Autodiagnostico from './pages/Autodiagnostico';
import Admin from './pages/Admin'; 

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Autodiagnostico />} />
            <Route path="autodiagnostico" element={<Autodiagnostico />} />
            <Route 
              path="admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;