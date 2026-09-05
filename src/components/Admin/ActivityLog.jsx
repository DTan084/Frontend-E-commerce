import React from 'react';
import {
  Activity,
  UserPlus,
  Package,
  ShoppingBag,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import './ActivityLog.css';

function ActivityLog({ activities: propActivities }) {
  const defaultActivities = [
    {
      id: 1,
      type: 'product_uploaded',
      user: 'DevMaster Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      action: 'Đã gửi mã nguồn mới "Fullstack SaaS Boilerplate Next.js 14" chờ duyệt',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      icon: Package,
      color: 'indigo',
    },
    {
      id: 2,
      type: 'order_completed',
      user: 'Nguyễn Văn Long',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      action: 'Đã mua mã nguồn "E-commerce React + Laravel" (#ORD-8821) - 1.500.000 ₫',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      icon: ShoppingBag,
      color: 'emerald',
    },
    {
      id: 3,
      type: 'payout_requested',
      user: 'Long Nguyen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      action: 'Yêu cầu rút doanh thu 15.000.000 ₫ về tài khoản Vietcombank',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      icon: CreditCard,
      color: 'blue',
    },
    {
      id: 4,
      type: 'product_approved',
      user: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      action: 'Đã phê duyệt mã nguồn "Admin Dashboard Pro Vue.js" mở bán công khai',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      icon: ShieldCheck,
      color: 'purple',
    },
    {
      id: 5,
      type: 'user_registered',
      user: 'Trần Thị Mai',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      action: 'Đã đăng ký tài khoản Lập trình viên mới trên sàn',
      timestamp: new Date(Date.now() - 150 * 60 * 1000),
      icon: UserPlus,
      color: 'teal',
    },
  ];

  const activities = propActivities || defaultActivities;

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  return (
    <div className="admin-activity-log-card">
      <div className="activity-log-head">
        <div className="activity-head-left">
          <div className="activity-head-icon-wrap">
            <Activity size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="activity-log-title">Nhật ký Hoạt động Hệ thống</h2>
            <p className="activity-log-subtitle">
              Theo dõi tương tác của người dùng và tác giả theo thời gian thực
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-view-all-logs"
          onClick={() => alert('Đang mở toàn bộ nhật ký kiểm toán!')}
        >
          <span>Xem tất cả nhật ký</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="activity-feed-list">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="activity-log-item">
              <div className={`act-icon-box ${act.color}`}>
                <Icon size={15} />
              </div>

              <div className="act-content-col">
                <div className="act-top-line">
                  <div className="act-user-badge">
                    <img src={act.avatar} alt={act.user} className="act-user-avatar" />
                    <strong className="act-user-name">{act.user}</strong>
                  </div>
                  <span className="act-time-pill">
                    <Clock size={11} />
                    <span>{getRelativeTime(act.timestamp)}</span>
                  </span>
                </div>
                <p className="act-description-text">{act.action}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="activity-log-footer-bar">
        <div className="act-footer-stat">
          <CheckCircle2 size={13} className="text-emerald" />
          <span>{activities.length} hoạt động gần đây nhất</span>
        </div>
        <span className="act-footer-refresh">Tự động đồng bộ mỗi 30s</span>
      </div>
    </div>
  );
}

export default ActivityLog;
