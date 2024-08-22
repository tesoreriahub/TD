// src/components/Sidebar.tsx
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: '64px',
          backgroundColor: '#1976d2',
          color: 'white'
        }
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/autodiagnostico">
          <ListItemText primary="Autodiagnóstico de Seguridad Informática" />
        </ListItem>
        {isAuthenticated && (
          <ListItem button component={Link} to="/gestion-conocimiento">
            <ListItemText primary="Gestión del Conocimiento" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
