import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.css';

const AdminHeader = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'Mã nguồn mới chờ duyệt',
      desc: 'Tác giả DevMaster vừa gửi: Fullstack SaaS Next.js 14',
      time: '10 phút trước',
      type: 'pending',
    },
    {
      id: 2,
      title: 'Đơn hàng mới hoàn tất',
      desc: 'Đơn hàng #ORD-8821 đã thanh toán thành công 1.500.000 ₫',
      time: '35 phút trước',
      type: 'order',
    },
    {
      id: 3,
      title: 'Yêu cầu rút tiền',
      desc: 'Tác giả Long Nguyen yêu cầu rút 15.000.000 ₫ về Vietcombank',
      time: '2 giờ trước',
      type: 'payout',
    },
  ];

  return (
    <header className="admin-header-modern">
      <div className="admin-header-left">
        <button
          type="button"
          className="btn-toggle-admin-menu"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="admin-global-search">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="admin-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài khoản, mã nguồn, đơn hàng, mã License..."
          />
        </div>
      </div>

      <div className="admin-header-right">
        {/* Quick External Link */}
        <Link to="/" className="btn-visit-store" target="_blank" rel="noopener noreferrer">
          <span>Xem Marketplace</span>
          <ExternalLink size={13} />
        </Link>

        {/* Notifications Dropdown */}
        <div className="admin-notif-wrapper">
          <button
            type="button"
            className="btn-admin-notif"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Admin Notifications"
          >
            <Bell size={18} />
            <span className="notif-badge-dot"></span>
          </button>

          {showNotifications && (
            <div className="admin-notif-dropdown">
              <div className="notif-drop-head">
                <h4>Thông báo Quản trị</h4>
                <span className="notif-count-badge">3 mới</span>
              </div>

              <div className="notif-drop-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notif-drop-item">
                    <div className={`notif-item-icon ${n.type}`}>
                      {n.type === 'pending' ? <Clock size={14} /> : <CheckCircle2 size={14} />}
                    </div>
                    <div className="notif-item-text">
                      <span className="notif-item-title">{n.title}</span>
                      <p className="notif-item-desc">{n.desc}</p>
                      <span className="notif-item-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Admin User Chip */}
        <div className="admin-user-chip">
          <div className="admin-user-initials">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
          </div>
          <div className="admin-user-text">
            <span className="admin-user-name">{user?.name || 'Administrator'}</span>
            <span className="admin-user-badge">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
