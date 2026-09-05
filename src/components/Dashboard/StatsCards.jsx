import React from 'react';
import { Package, Code2, CreditCard, KeyRound, ArrowUpRight } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(price)) + '₫';
  };

  const statItems = [
    {
      id: 'orders',
      title: 'Tổng đơn hàng',
      value: stats?.totalOrders || 0,
      subtitle: 'Đơn đã giao dịch',
      icon: Package,
      color: '#4f46e5',
      trend: '+12%',
    },
    {
      id: 'products',
      title: 'Mã nguồn sở hữu',
      value: stats?.activeProducts || 0,
      subtitle: 'Trong thư viện cá nhân',
      icon: Code2,
      color: '#059669',
      trend: 'Trọn đời',
    },
    {
      id: 'spent',
      title: 'Tổng chi tiêu',
      value: stats?.totalRevenue ? formatPrice(stats.totalRevenue) : '0₫',
      subtitle: 'Giá trị tích lũy',
      icon: CreditCard,
      color: '#d97706',
      trend: 'VIP',
    },
    {
      id: 'licenses',
      title: 'License kích hoạt',
      value: stats?.activeProducts || 0,
      subtitle: 'Key bản quyền active',
      icon: KeyRound,
      color: '#7c3aed',
      trend: '100%',
    },
  ];

  return (
    <div className="stats-cards-grid-modern">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="stat-card-modern">
            <div className="stat-card-top">
              <div
                className="stat-icon-halo"
                style={{ color: item.color, background: `${item.color}14` }}
              >
                <Icon size={20} />
              </div>
              <div className="stat-trend-badge">
                <ArrowUpRight size={13} />
                <span>{item.trend}</span>
              </div>
            </div>

            <div className="stat-content-wrap">
              <span className="stat-title-label">{item.title}</span>
              <h3 className="stat-main-number">{item.value}</h3>
              <p className="stat-sub-caption">{item.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
