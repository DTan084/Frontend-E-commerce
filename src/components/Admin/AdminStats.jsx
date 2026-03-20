import React from 'react';
import './AdminStats.css';

const AdminStats = ({ stats }) => {
  const statsData = [
    {
      id: 'users',
      icon: '👥',
      label: 'Total Users',
      value: stats?.totalUsers || 5240,
      change: '+12%',
      changeType: 'increase',
      color: 'blue',
    },
    {
      id: 'products',
      icon: '📦',
      label: 'Active Products',
      value: stats?.activeProducts || 1234,
      change: '+8%',
      changeType: 'increase',
      color: 'purple',
    },
    {
      id: 'sales',
      icon: '🛒',
      label: 'Total Sales',
      value: stats?.totalSales || 8543,
      change: '+23%',
      changeType: 'increase',
      color: 'green',
    },
    {
      id: 'orders',
      icon: '📋',
      label: 'Orders Today',
      value: stats?.ordersToday || 45,
      change: '+5',
      changeType: 'increase',
      color: 'orange',
    },
    {
      id: 'revenue',
      icon: '💰',
      label: 'Revenue Today',
      value: `$${(stats?.revenueToday || 2340).toLocaleString()}`,
      change: '+15%',
      changeType: 'increase',
      color: 'teal',
    },
  ];

  return (
    <div className="admin-stats">
      {statsData.map((stat, index) => (
        <div 
          key={stat.id}
          className={`stat-card stat-${stat.color}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="stat-icon-wrapper">
            <span className="stat-icon">{stat.icon}</span>
          </div>
          
          <div className="stat-content">
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.label}</p>
            
            <div className={`stat-change ${stat.changeType}`}>
              <span className="change-icon">
                {stat.changeType === 'increase' ? '📈' : '📉'}
              </span>
              <span className="change-value">{stat.change}</span>
              <span className="change-text">vs last month</span>
            </div>
          </div>

          <div className="stat-decoration"></div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
