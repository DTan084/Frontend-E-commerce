import React from 'react';
import { NavLink } from 'react-router-dom';
import './DashboardSidebar.css';

const DashboardSidebar = ({ user }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/user/dashboard',
    },
    {
      id: 'orders',
      label: 'Đơn hàng của tôi',
      icon: '📦',
      path: '/user/orders',
    },
    {
      id: 'downloads',
      label: 'Tải xuống',
      icon: '📥',
      path: '/user/downloads',
    },
    {
      id: 'profile',
      label: 'Hồ sơ',
      icon: '👤',
      path: '/profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/user/settings',
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { text: 'Admin', color: '#e53e3e' },
      seller: { text: 'Seller', color: '#667eea' },
      buyer: { text: 'Buyer', color: '#48bb78' },
    };
    return badges[role] || badges.buyer;
  };

  const roleBadge = getRoleBadge(user?.role);

  return (
    <aside className="dashboard-sidebar">
      {/* User Info Card */}
      <div className="user-info-card">
        <div className="user-avatar-wrapper">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="user-avatar" />
          ) : (
            <div className="user-avatar-placeholder">
              {getInitials(user?.name)}
            </div>
          )}
          <div className="avatar-status"></div>
        </div>
        
        <div className="user-details">
          <h3 className="user-name">{user?.name || 'Guest User'}</h3>
          <span 
            className="user-role-badge"
            style={{ background: roleBadge.color }}
          >
            {roleBadge.text}
          </span>
        </div>

        <div className="user-stats-mini">
          <div className="stat-mini">
            <span className="stat-mini-value">{user?.totalOrders || 0}</span>
            <span className="stat-mini-label">Orders</span>
          </div>
          <div className="stat-mini">
            <span className="stat-mini-value">{user?.totalPurchases || 0}</span>
            <span className="stat-mini-label">Purchases</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <h4 className="nav-title">MENU</h4>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end
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
        <button className="logout-btn">
          <span className="icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>

      {/* Premium Badge */}
      {user?.isPremium && (
        <div className="premium-badge">
          <span className="premium-icon">👑</span>
          <div className="premium-text">
            <strong>Premium Member</strong>
            <small>Enjoy exclusive benefits</small>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
