import React from 'react';
import './ActivityLog.css';

function ActivityLog({ activities: propActivities }) {
  // Mock data for activities
  const defaultActivities = [
    {
      id: 1,
      type: 'user_registered',
      user: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      action: 'Registered a new account',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      icon: '👤',
      color: 'blue'
    },
    {
      id: 2,
      type: 'product_uploaded',
      user: 'Sarah Smith',
      avatar: 'https://i.pravatar.cc/150?img=5',
      action: 'Uploaded a new product "Wireless Headphones"',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      icon: '📦',
      color: 'purple'
    },
    {
      id: 3,
      type: 'order_completed',
      user: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      action: 'Completed order #12345',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      icon: '✅',
      color: 'green'
    },
    {
      id: 4,
      type: 'payment_received',
      user: 'Emily Brown',
      avatar: 'https://i.pravatar.cc/150?img=9',
      action: 'Payment received for order #12344',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      icon: '💰',
      color: 'teal'
    },
    {
      id: 5,
      type: 'product_approved',
      user: 'Admin',
      avatar: 'https://i.pravatar.cc/150?img=7',
      action: 'Approved product "Smart Watch Pro"',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      icon: '🛡️',
      color: 'orange'
    },
    {
      id: 6,
      type: 'user_registered',
      user: 'David Wilson',
      avatar: 'https://i.pravatar.cc/150?img=8',
      action: 'Registered a new account',
      timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
      icon: '👤',
      color: 'blue'
    },
    {
      id: 7,
      type: 'order_placed',
      user: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=10',
      action: 'Placed a new order #12346',
      timestamp: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
      icon: '🛒',
      color: 'indigo'
    },
    {
      id: 8,
      type: 'product_uploaded',
      user: 'Robert Taylor',
      avatar: 'https://i.pravatar.cc/150?img=12',
      action: 'Uploaded a new product "Gaming Mouse"',
      timestamp: new Date(Date.now() - 150 * 60 * 1000), // 2.5 hours ago
      icon: '📦',
      color: 'purple'
    }
  ];

  const activities = propActivities || defaultActivities;

  // Format relative time
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // difference in seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="activity-log-container">
      <div className="activity-log-header">
        <div className="header-left">
          <h2 className="activity-log-title">
            <span className="title-icon">📋</span>
            Recent Activities
          </h2>
          <p className="activity-log-subtitle">Latest actions from users and system</p>
        </div>
        <button className="view-all-btn">
          View All
          <span className="btn-icon">→</span>
        </button>
      </div>

      <div className="activities-list">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="activity-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className={`activity-icon-wrapper ${activity.color}`}>
              <span className="activity-icon">{activity.icon}</span>
            </div>
            
            <div className="activity-content">
              <div className="activity-main">
                <div className="activity-user">
                  <img 
                    src={activity.avatar} 
                    alt={activity.user} 
                    className="user-avatar"
                  />
                  <span className="user-name">{activity.user}</span>
                </div>
                <p className="activity-action">{activity.action}</p>
              </div>
              <span className="activity-time">{getRelativeTime(activity.timestamp)}</span>
            </div>

            <div className="activity-status">
              <span className={`status-indicator ${activity.color}`}></span>
            </div>
          </div>
        ))}
      </div>

      <div className="activity-log-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-icon">📊</span>
            <span className="stat-text">{activities.length} activities today</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-icon">👥</span>
            <span className="stat-text">{new Set(activities.map(a => a.user)).size} users active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
