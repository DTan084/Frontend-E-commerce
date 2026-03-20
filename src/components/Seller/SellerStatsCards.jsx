import React from 'react';
import './SellerStatsCards.css';

const SellerStatsCards = ({ stats }) => {
  const statCards = [
    {
      id: 'total-products',
      title: 'Total Products',
      value: stats?.totalProducts || 25,
      icon: '📦',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      change: '+3',
      changeType: 'increase',
      subtitle: 'All time',
    },
    {
      id: 'active-products',
      title: 'Active Products',
      value: stats?.activeProducts || 20,
      icon: '✅',
      color: '#48bb78',
      gradient: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
      change: '+2',
      changeType: 'increase',
      subtitle: 'Currently listed',
    },
    {
      id: 'pending-approval',
      title: 'Pending Approval',
      value: stats?.pendingProducts || 3,
      icon: '⏳',
      color: '#ed8936',
      gradient: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
      change: '-1',
      changeType: 'decrease',
      subtitle: 'Under review',
    },
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '5,240'}`,
      icon: '💰',
      color: '#f093fb',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      change: '+$450',
      changeType: 'increase',
      subtitle: 'This month',
    },
  ];

  return (
    <div className="seller-stats-cards">
      {statCards.map((card, index) => (
        <div
          key={card.id}
          className="stat-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrapper" style={{ background: card.gradient }}>
              <span className="stat-icon">{card.icon}</span>
            </div>
            <div className={`stat-change ${card.changeType}`}>
              {card.changeType === 'increase' ? '↑' : '↓'} {card.change}
            </div>
          </div>

          <div className="stat-card-body">
            <h3 className="stat-value">{card.value}</h3>
            <p className="stat-title">{card.title}</p>
            <span className="stat-subtitle">{card.subtitle}</span>
          </div>

          <div className="stat-card-footer">
            <div className="stat-progress-bar">
              <div
                className="stat-progress-fill"
                style={{
                  background: card.gradient,
                  width: card.id === 'pending-approval' ? '30%' : '75%',
                }}
              ></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="stat-card-glow" style={{ background: card.gradient }}></div>
          <div className="stat-card-shine"></div>
        </div>
      ))}
    </div>
  );
};

export default SellerStatsCards;
