import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FileCode2,
  Heart,
  User,
  Shield,
  LogOut,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './DashboardSidebar.css';

const DashboardSidebar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tổng quan Dashboard',
      icon: LayoutDashboard,
      path: '/user/dashboard',
    },
    {
      id: 'orders',
      label: 'Đơn hàng đã mua',
      icon: Package,
      path: '/user/orders',
    },
    {
      id: 'purchases',
      label: 'Kho mã nguồn & License',
      icon: FileCode2,
      path: '/user/purchases',
    },
    {
      id: 'wishlist',
      label: 'Danh sách yêu thích',
      icon: Heart,
      path: '/wishlist',
    },
    {
      id: 'profile',
      label: 'Hồ sơ & Bảo mật',
      icon: User,
      path: '/profile',
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleLabel = (role) => {
    if (role === 'admin') return { text: 'Quản trị viên', className: 'role-admin' };
    if (role === 'seller') return { text: 'Tác giả Seller', className: 'role-seller' };
    return { text: 'Thành viên VIP', className: 'role-buyer' };
  };

  const roleInfo = getRoleLabel(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <aside className="dashboard-sidebar-modern">
      {/* User Info Profile Card */}
      <div className="user-profile-mini-card">
        <div className="avatar-wrap">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">{getInitials(user?.name)}</div>
          )}
          <span className="online-indicator" title="Đang trực tuyến"></span>
        </div>

        <div className="user-meta-wrap">
          <div className="user-name-row">
            <h3 className="user-display-name">{user?.name || 'Khách hàng'}</h3>
            <CheckCircle2 size={15} className="verified-badge-icon" title="Đã xác thực email" />
          </div>
          <span className={`user-role-pill ${roleInfo.className}`}>
            <Sparkles size={11} />
            <span>{roleInfo.text}</span>
          </span>
          <span className="user-email-text">{user?.email || 'user@codemart.vn'}</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav-section">
        <div className="nav-group-title">QUẢN LÝ TÀI KHOẢN</div>
        <ul className="nav-menu-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="nav-menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-menu-link ${isActive ? 'is-active' : ''}`}
                  end={item.path === '/user/dashboard'}
                >
                  <Icon size={18} className="nav-link-icon" />
                  <span className="nav-link-label">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Buyer Protection Seal */}
      <div className="sidebar-escrow-card">
        <Shield size={18} className="text-emerald" />
        <div className="escrow-text">
          <strong>Bảo hành Escrow</strong>
          <p>Mọi mã nguồn mua đều được giữ tiền an toàn 3 ngày.</p>
        </div>
      </div>

      {/* Logout Action */}
      <div className="sidebar-footer-action">
        <button type="button" className="btn-sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
