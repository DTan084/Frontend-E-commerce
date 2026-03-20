import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status, reason }) => {
  const statusConfig = {
    active: {
      icon: '🟢',
      label: 'Active',
      className: 'status-active',
    },
    pending: {
      icon: '🟡',
      label: 'Pending Approval',
      className: 'status-pending',
    },
    rejected: {
      icon: '🔴',
      label: 'Rejected',
      className: 'status-rejected',
    },
    draft: {
      icon: '⚪',
      label: 'Draft',
      className: 'status-draft',
    },
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <div className="status-badge-wrapper">
      <div className={`status-badge ${config.className}`}>
        <span className="status-icon">{config.icon}</span>
        <span className="status-label">{config.label}</span>
      </div>
      {status === 'rejected' && reason && (
        <div className="rejection-reason">
          <span className="reason-icon">⚠️</span>
          <span className="reason-text">{reason}</span>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
