import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/admin',
    },
    {
      id: 'users',
      label: 'Khách hàng',
      icon: '👥',
      path: '/admin/users',
    },
    {
      id: 'products',
      label: 'Sản phẩm',
      icon: '📦',
      path: '/admin/products',
    },
    {
      id: 'orders',
      label: 'Đơn hàng',
      icon: '🛒',
      path: '/admin/orders',
    },
    {
      id: 'categories',
      label: 'Danh mục',
      icon: '📁',
      path: '/admin/categories',
    },
    {
      id: 'settings',
      label: 'Vé trang chủ',
      icon: '🏠',
      path: '/',
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo & Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">🛡️</div>
        <div className="brand-content">
          <h2 className="brand-title">TMDT Admin</h2>
          <span className="brand-subtitle">Hệ thống quản trị</span>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="admin-info-card">
        <div className="admin-avatar-wrapper">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="admin-avatar" />
          ) : (
            <div className="admin-avatar-placeholder">{getInitials(user?.name)}</div>
          )}
          <div className="avatar-status-online"></div>
        </div>

        <div className="admin-details">
          <h3 className="admin-name">{user?.name || 'Administrator'}</h3>
          <span className="admin-role-badge">🛡️ Super Admin</span>
        </div>

        <div className="admin-stats-mini">
          <div className="stat-mini-item">
            <span className="stat-mini-value">5.2K</span>
            <span className="stat-mini-label">Users</span>
          </div>
          <div className="stat-mini-item">
            <span className="stat-mini-value">1.2K</span>
            <span className="stat-mini-label">Products</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="admin-nav">
        <h4 className="nav-title">MENU</h4>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={item.id === 'dashboard'}
                onClick={onClose}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-arrow">›</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon">🚪</span>
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
