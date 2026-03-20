import React from 'react';
import './StatsCards.css';

const StatsCards = ({ stats }) => {
  const defaultStats = [
    {
      id: 'orders',
      title: 'Tổng đơn hàng',
      value: stats?.totalOrders || 12,
      subtitle: 'All time',
      icon: '📦',
      color: '#667eea',
      trend: '+12%',
      trendUp: true,
    },
    {
      id: 'products',
      title: 'Sản phẩm hoạt động',
      value: stats?.activeProducts || 8,
      subtitle: 'In library',
      icon: '🎨',
      color: '#48bb78',
      trend: '+3',
      trendUp: true,
    },
    {
      id: 'revenue',
      title: 'Total Spent',
      value: stats?.totalRevenue ? `$${stats.totalRevenue.toLocaleString()}` : '$1,250',
      subtitle: 'Lifetime value',
      icon: '💰',
      color: '#ed8936',
      trend: '+$150',
      trendUp: true,
    },
    {
      id: 'rating',
      title: 'Đánh giá trung bình',
      value: stats?.averageRating || '4.8',
      subtitle: 'From sellers',
      icon: '⭐',
      color: '#f6ad55',
      trend: '+0.2',
      trendUp: true,
    },
  ];

  return (
    <div className="stats-cards-container">
      {defaultStats.map((stat, index) => (
        <div 
          key={stat.id} 
          className="stat-card"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            '--card-color': stat.color 
          }}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: stat.color }}>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div 
              className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}
            >
              <span className="trend-icon">{stat.trendUp ? '↗' : '↘'}</span>
              <span className="trend-value">{stat.trend}</span>
            </div>
          </div>

          <div className="stat-card-body">
            <h3 className="stat-title">{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <p className="stat-subtitle">{stat.subtitle}</p>
          </div>

          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div 
                className="stat-progress-fill"
                style={{ 
                  width: `${Math.random() * 40 + 60}%`,
                  background: stat.color 
                }}
              ></div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="stat-card-bg" style={{ background: stat.color }}></div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
