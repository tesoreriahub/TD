// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header toggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flexGrow: 1, transition: 'margin-left 0.3s ease' }}>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          style={{
            flexGrow: 1,
            padding: '16px',
            marginLeft: sidebarOpen ? '20px' : '-200px',
            transition: 'margin-left 0.3s ease',
            marginTop: '100px',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
