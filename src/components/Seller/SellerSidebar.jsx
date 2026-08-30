import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  TrendingUp,
  Wallet,
  Star,
  LogOut,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SellerSidebar.css';

const SellerSidebar = ({ seller }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tổng quan Dashboard',
      icon: LayoutDashboard,
      path: '/seller/dashboard',
    },
    {
      id: 'products',
      label: 'Mã nguồn của tôi',
      icon: Package,
      path: '/seller/products',
    },
    {
      id: 'upload',
      label: 'Đăng bán mã nguồn',
      icon: PlusCircle,
      path: '/seller/upload',
    },
    {
      id: 'sales',
      label: 'Lịch sử doanh thu',
      icon: TrendingUp,
      path: '/seller/sales',
    },
    {
      id: 'withdrawals',
      label: 'Rút tiền & Ngân hàng',
      icon: Wallet,
      path: '/seller/withdrawals',
    },
  ];

  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="seller-sidebar-modern">
      {/* Creator Info Card */}
      <div className="seller-profile-card">
        <div className="seller-avatar-container">
          {seller?.avatar ? (
            <img src={seller.avatar} alt={seller.name} className="seller-avatar-img" />
          ) : (
            <div className="seller-avatar-fallback">{getInitials(seller?.name)}</div>
          )}
          <span className="seller-online-dot" title="Tác giả trực tuyến"></span>
        </div>

        <div className="seller-meta-info">
          <div className="seller-name-row">
            <h3 className="seller-display-name">{seller?.name || 'Tác giả CodeMart'}</h3>
            <CheckCircle2 size={16} className="text-emerald" title="Tác giả đã xác minh" />
          </div>
          <div className="seller-badge-row">
            <span className="seller-pill-badge">
              <Zap size={11} />
              <span>Tác giả Verified</span>
            </span>
          </div>
        </div>

        {/* Creator Mini Metric Summary */}
        <div className="seller-mini-summary-grid">
          <div className="mini-summary-item">
            <span className="mini-summary-val">{seller?.totalProducts || 25}</span>
            <span className="mini-summary-lbl">Source Code</span>
          </div>
          <div className="mini-summary-divider"></div>
          <div className="mini-summary-item">
            <span className="mini-summary-val">{seller?.totalSales || 142}</span>
            <span className="mini-summary-lbl">Đã bán</span>
          </div>
          <div className="mini-summary-divider"></div>
          <div className="mini-summary-item">
            <div className="rating-mini-row">
              <Star size={12} fill="#f59e0b" color="#f59e0b" />
              <span className="mini-summary-val">4.8</span>
            </div>
            <span className="mini-summary-lbl">Đánh giá</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="seller-nav-section">
        <span className="seller-nav-group-title">QUẢN LÝ GIAN HÀNG</span>
        <div className="seller-nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `seller-nav-item-link ${isActive ? 'active' : ''}`}
                end={item.id === 'dashboard'}
              >
                <div className="nav-item-icon-box">
                  <Icon size={17} />
                </div>
                <span className="nav-item-text">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Quick Action CTA Box */}
      <div className="seller-cta-box">
        <button
          type="button"
          className="btn-seller-upload-cta"
          onClick={() => navigate('/seller/upload')}
        >
          <PlusCircle size={15} />
          <span>Đăng bán code mới</span>
        </button>
      </div>

      {/* Trust Badge & Logout */}
      <div className="seller-sidebar-footer">
        <div className="seller-escrow-trust-pill">
          <ShieldCheck size={14} className="text-emerald" />
          <span>Hoa hồng 80% • Bảo hộ Escrow</span>
        </div>

        <button type="button" className="btn-seller-logout" onClick={handleLogout}>
          <LogOut size={15} />
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;
