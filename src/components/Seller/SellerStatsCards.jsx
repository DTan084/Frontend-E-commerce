import React from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import './SellerStatsCards.css';

const SellerStatsCards = ({ stats }) => {
  const formatVND = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const statCards = [
    {
      id: 'total-revenue',
      title: 'Tổng doanh thu',
      value: formatVND(stats?.totalRevenue || 124500000),
      icon: TrendingUp,
      badgeText: '+15.2%',
      badgeType: 'positive',
      subtext: 'So với tháng trước',
      colorClass: 'indigo',
    },
    {
      id: 'active-products',
      title: 'Mã nguồn đang bán',
      value: stats?.activeProducts || 20,
      icon: Package,
      badgeText: '+2 mới',
      badgeType: 'neutral',
      subtext: 'Trên tổng số 25 mã nguồn',
      colorClass: 'emerald',
    },
    {
      id: 'total-sales',
      title: 'Đơn bán thành công',
      value: `${stats?.totalSales || 142} đơn`,
      icon: ShoppingBag,
      badgeText: '+18 đơn',
      badgeType: 'positive',
      subtext: 'Đã hoàn tất thanh toán',
      colorClass: 'blue',
    },
    {
      id: 'pending-approval',
      title: 'Đang chờ duyệt',
      value: `${stats?.pendingProducts || 3} code`,
      icon: Clock,
      badgeText: 'Đang xử lý',
      badgeType: 'warning',
      subtext: 'Dự kiến duyệt trong 24h',
      colorClass: 'amber',
    },
  ];

  return (
    <div className="seller-stats-cards-grid">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.id} className={`seller-stat-card-modern ${card.colorClass}`}>
            <div className="stat-card-top-row">
              <div className={`stat-icon-wrapper-modern ${card.colorClass}`}>
                <Icon size={20} />
              </div>
              <span className={`stat-trend-badge ${card.badgeType}`}>
                {card.badgeType === 'positive' && <ArrowUpRight size={12} />}
                {card.badgeType === 'negative' && <ArrowDownRight size={12} />}
                <span>{card.badgeText}</span>
              </span>
            </div>

            <div className="stat-card-main-data">
              <span className="stat-card-label">{card.title}</span>
              <h3 className="stat-card-primary-val">{card.value}</h3>
              <p className="stat-card-sub-info">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SellerStatsCards;
