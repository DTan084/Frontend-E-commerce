import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SellerSidebar.css';

const SellerSidebar = ({ seller }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/seller/dashboard',
    },
    {
      id: 'products',
      label: 'My Products',
      icon: '📦',
      path: '/seller/products',
    },
    {
      id: 'upload',
      label: 'Upload New',
      icon: '⬆️',
      path: '/seller/upload',
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: '💰',
      path: '/seller/sales',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: '💵',
      path: '/seller/revenue',
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: '⭐',
      path: '/seller/reviews',
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: '🏦',
      path: '/seller/withdraw',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      path: '/seller/settings',
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="seller-sidebar">
      {/* Seller Info Card */}
      <div className="seller-info-card">
        <div className="seller-badge-crown">👑</div>
        
        <div className="seller-avatar-wrapper">
          {seller?.avatar ? (
            <img src={seller.avatar} alt={seller.name} className="seller-avatar" />
          ) : (
            <div className="seller-avatar-placeholder">
              {getInitials(seller?.name)}
            </div>
          )}
          <div className="avatar-status-online"></div>
        </div>
        
        <div className="seller-details">
          <h3 className="seller-name">{seller?.name || 'Seller'}</h3>
          <span className="seller-role-badge">
            🏪 Seller
          </span>
          {seller?.isPremium && (
            <span className="premium-seller-badge">
              ⚡ Premium
            </span>
          )}
        </div>

        <div className="seller-stats-mini">
          <div className="stat-mini-item">
            <span className="stat-mini-icon">📦</span>
            <div className="stat-mini-content">
              <strong>{seller?.totalProducts || 0}</strong>
              <span>Products</span>
            </div>
          </div>
          <div className="stat-mini-divider"></div>
          <div className="stat-mini-item">
            <span className="stat-mini-icon">💰</span>
            <div className="stat-mini-content">
              <strong>{seller?.totalSales || 0}</strong>
              <span>Sales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="seller-nav">
        <h4 className="nav-title">MENU</h4>
        <ul className="nav-list">
          {menuItems.map((item, index) => (
            <li 
              key={item.id} 
              className="nav-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                end={item.id === 'dashboard'}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <span className="nav-arrow">›</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h4 className="nav-title">QUICK ACTIONS</h4>
        <button className="quick-action-btn upload-btn">
          <span className="btn-icon">⬆️</span>
          <span>Upload Product</span>
        </button>
        <button className="quick-action-btn withdraw-btn">
          <span className="btn-icon">💸</span>
          <span>Request Payout</span>
        </button>
      </div>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>

      {/* Performance Badge */}
      <div className="performance-badge">
        <div className="performance-icon">🎯</div>
        <div className="performance-content">
          <strong>Performance</strong>
          <div className="performance-bar">
            <div className="performance-fill" style={{ width: '85%' }}></div>
          </div>
          <small>85% rating</small>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
