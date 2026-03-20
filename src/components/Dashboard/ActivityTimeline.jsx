import React from 'react';
import './ActivityTimeline.css';

const ActivityTimeline = ({ activities = [] }) => {
  // Mock data if no activities provided
  const defaultActivities = activities.length > 0 ? activities : [
    {
      id: 1,
      type: 'download',
      title: 'Downloaded "Admin Panel Template"',
      description: 'Successfully downloaded 3 files (45.2 MB)',
      timestamp: '2 hours ago',
      icon: '⬇',
      color: '#48bb78',
    },
    {
      id: 2,
      type: 'purchase',
      title: 'Purchased "E-commerce UI Kit"',
      description: 'Payment successful - $149.00',
      timestamp: '1 day ago',
      icon: '🛍️',
      color: '#667eea',
    },
    {
      id: 3,
      type: 'review',
      title: 'Left a review',
      description: 'Rated "Dashboard Template" - 5 stars',
      timestamp: '2 days ago',
      icon: '⭐',
      color: '#f6ad55',
    },
    {
      id: 4,
      type: 'update',
      title: 'Profile Updated',
      description: 'Changed profile picture and bio',
      timestamp: '3 days ago',
      icon: '👤',
      color: '#ed8936',
    },
    {
      id: 5,
      type: 'register',
      title: 'Account Created',
      description: 'Welcome to the marketplace!',
      timestamp: '5 days ago',
      icon: '🎉',
      color: '#9f7aea',
    },
  ];

  const getActivityIcon = (type) => {
    const icons = {
      download: '⬇',
      purchase: '🛍️',
      review: '⭐',
      update: '👤',
      register: '🎉',
      refund: '💰',
      support: '💬',
    };
    return icons[type] || '📌';
  };

  return (
    <div className="activity-timeline-container">
      <div className="section-header">
        <h2 className="section-title">Activity Timeline</h2>
        <span className="activity-count">{defaultActivities.length} activities</span>
      </div>

      <div className="timeline">
        {defaultActivities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="timeline-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="timeline-marker">
              <div 
                className="marker-icon"
                style={{ background: activity.color }}
              >
                <span>{activity.icon || getActivityIcon(activity.type)}</span>
              </div>
              {index < defaultActivities.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </div>

            <div className="timeline-content">
              <div className="activity-card">
                <div className="activity-header">
                  <h4 className="activity-title">{activity.title}</h4>
                  <span className="activity-time">{activity.timestamp}</span>
                </div>
                <p className="activity-description">{activity.description}</p>
                
                {/* Additional metadata */}
                {activity.metadata && (
                  <div className="activity-metadata">
                    {activity.metadata.map((meta, idx) => (
                      <span key={idx} className="metadata-badge">
                        {meta}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action button for certain types */}
                {(activity.type === 'download' || activity.type === 'purchase') && (
                  <button className="activity-action-btn">
                    <span className="btn-icon">
                      {activity.type === 'download' ? '🔄' : '👁️'}
                    </span>
                    {activity.type === 'download' ? 'Download Again' : 'View Order'}
                  </button>
                )}

                {/* Hover effect gradient */}
                <div 
                  className="activity-gradient"
                  style={{ background: `linear-gradient(135deg, ${activity.color}15 0%, transparent 100%)` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {defaultActivities.length > 0 && (
        <div className="timeline-footer">
          <button className="load-more-btn">
            <span className="icon">⏳</span>
            Load More Activities
          </button>
        </div>
      )}

      {/* Empty State */}
      {defaultActivities.length === 0 && (
        <div className="empty-timeline">
          <div className="empty-icon">📋</div>
          <h3>No Activity Yet</h3>
          <p>Your activity timeline will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
