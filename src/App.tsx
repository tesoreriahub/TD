// src/App.tsx
import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Autodiagnostico from './pages/Autodiagnostico';
import GestionConocimiento from './pages/GestionConocimiento';
import Home from './pages/Home';

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
            <Route index element={<Home />} />
            <Route path="autodiagnostico" element={<Autodiagnostico />} />
            <Route
              path="gestion-conocimiento"
              element={
                <ProtectedRoute>
                  <GestionConocimiento />
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
