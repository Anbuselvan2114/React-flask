import React from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content-container p-4" style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
