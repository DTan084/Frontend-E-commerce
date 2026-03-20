import React from 'react';
import './StatsBar.css';

const StatsBar = () => {
  const stats = [
    {
      icon: '📦',
      value: '10,000+',
      label: 'Sản phẩm cao cấp',
      color: '#667eea'
    },
    {
      icon: '📥',
      value: '50,000+',
      label: 'Lượt tải xuống',
      color: '#f093fb'
    },
    {
      icon: '👥',
      value: '25,000+',
      label: 'Người dùng hoạt động',
      color: '#4facfe'
    },
    {
      icon: '⭐',
      value: '4.8',
      label: 'Đánh giá trung bình',
      color: '#ffd93d'
    }
  ];

  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="stat-card"
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value" data-value={stat.value}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className="stat-background"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
