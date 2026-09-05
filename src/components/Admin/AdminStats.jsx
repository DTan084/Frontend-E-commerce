import React from 'react';
import { TrendingUp, TrendingDown, Users, Package, ShoppingBag, CreditCard } from 'lucide-react';
import './AdminStats.css';

const AdminStats = ({ stats }) => {
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const statsData = [
    {
      id: 'revenue',
      icon: CreditCard,
      label: 'Tổng GMV Giao dịch sàn',
      value: formatVND(stats?.totalRevenue || 2450000000),
      subtext: 'Phí sàn 20%: ' + formatVND((stats?.totalRevenue || 2450000000) * 0.2),
      change: '+18.5%',
      trend: 'up',
      color: 'indigo',
    },
    {
      id: 'users',
      icon: Users,
      label: 'Tổng người dùng & Tác giả',
      value: `${(stats?.totalUsers || 15820).toLocaleString('vi-VN')} tài khoản`,
      subtext: '1.240 tác giả Verified',
      change: '+12.4%',
      trend: 'up',
      color: 'blue',
    },
    {
      id: 'products',
      icon: Package,
      label: 'Mã nguồn đã mở bán',
      value: `${(stats?.activeProducts || 1450).toLocaleString('vi-VN')} source code`,
      subtext: '3 mã nguồn đang chờ duyệt',
      change: '+8.2%',
      trend: 'up',
      color: 'emerald',
    },
    {
      id: 'orders',
      icon: ShoppingBag,
      label: 'Tổng đơn hàng thành công',
      value: `${(stats?.totalOrders || 6240).toLocaleString('vi-VN')} đơn`,
      subtext: 'Tỷ lệ hoàn thành 98.6%',
      change: '+24.1%',
      trend: 'up',
      color: 'purple',
    },
  ];

  return (
    <div className="admin-stats-modern-grid">
      {statsData.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className={`admin-stat-card-modern ${item.color}`}>
            <div className="stat-card-top-row">
              <div className={`stat-icon-wrapper-modern ${item.color}`}>
                <Icon size={20} />
              </div>
              <div className={`stat-trend-badge ${item.trend}`}>
                {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{item.change}</span>
              </div>
            </div>

            <div className="stat-card-bottom-content">
              <span className="stat-card-label-text">{item.label}</span>
              <h3 className="stat-card-number-val">{item.value}</h3>
              <span className="stat-card-sub-info">{item.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStats;
