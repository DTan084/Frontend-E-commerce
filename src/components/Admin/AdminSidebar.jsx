import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Clock,
  ShoppingBag,
  Layers,
  Store,
  Home,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen = false, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const pendingCount = 3; // Mock pending code reviews count

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tổng quan Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      badge: null,
    },
    {
      id: 'users',
      label: 'Quản lý Người dùng',
      icon: Users,
      path: '/admin/users',
      badge: null,
    },
    {
      id: 'products',
      label: 'Kho Mã nguồn Sàn',
      icon: Package,
      path: '/admin/products',
      badge: null,
    },
    {
      id: 'pending-products',
      label: 'Duyệt Mã nguồn',
      icon: Clock,
      path: '/admin/pending-products',
      badge: pendingCount,
    },
    {
      id: 'orders',
      label: 'Đơn hàng & Escrow',
      icon: ShoppingBag,
      path: '/admin/orders',
      badge: null,
    },
    {
      id: 'categories',
      label: 'Danh mục Công nghệ',
      icon: Layers,
      path: '/admin/categories',
      badge: null,
    },
    {
      id: 'sellers',
      label: 'Đối tác Tác giả',
      icon: Store,
      path: '/admin/sellers',
      badge: null,
    },
    {
      id: 'home',
      label: 'Về Trang chủ sàn',
      icon: Home,
      path: '/',
      badge: null,
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'AD';
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
    <aside className={`admin-sidebar-modern ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="admin-brand-header">
        <div className="admin-brand-logo-wrap">
          <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
          <div className="brand-text-col">
            <span className="brand-main-name">CodeMart</span>
            <span className="brand-admin-tag">
              <ShieldCheck size={10} />
              <span>ADMIN PORTAL</span>
            </span>
          </div>
        </div>
      </div>

      {/* Admin Profile Mini Card */}
      <div className="admin-sidebar-profile-card">
        <div className="admin-avatar-box">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="admin-avatar-img" />
          ) : (
            <div className="admin-avatar-initials">{getInitials(user?.name)}</div>
          )}
          <span className="admin-status-dot"></span>
        </div>

        <div className="admin-profile-info">
          <h3 className="admin-profile-name">{user?.name || 'Administrator'}</h3>
          <span className="admin-role-badge">
            <ShieldCheck size={11} />
            <span>Super Admin</span>
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="admin-sidebar-nav-container">
        <span className="admin-nav-section-title">HỆ THỐNG QUẢN TRỊ</span>
        <nav className="admin-menu-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                end={item.id === 'dashboard' || item.id === 'home'}
                onClick={onClose}
              >
                <div className="nav-item-left">
                  <Icon size={16} className="admin-nav-icon" />
                  <span className="admin-nav-label">{item.label}</span>
                </div>

                {item.badge ? (
                  <span className="admin-nav-badge-pill">{item.badge}</span>
                ) : (
                  <ChevronRight size={13} className="admin-nav-chevron" />
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status & Logout */}
      <div className="admin-sidebar-footer">
        <div className="admin-system-health-pill">
          <span className="health-pulse-dot"></span>
          <span>Hệ thống: Bình thường (99.9%)</span>
        </div>

        <button type="button" className="btn-admin-logout" onClick={handleLogout}>
          <LogOut size={15} />
          <span>Đăng xuất Quản trị</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
