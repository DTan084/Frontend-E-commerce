import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.css';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Quản trị hệ thống</h1>
      </div>

      <div className="header-right">
        <div className="admin-user">
          <span>👤</span>
          <span>{user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
