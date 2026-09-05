import React from 'react';
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';
import './StatusBadge.css';

const StatusBadge = ({ status, reason }) => {
  const statusConfig = {
    active: {
      icon: CheckCircle2,
      label: 'Đang bán',
      className: 'status-active',
    },
    pending: {
      icon: Clock,
      label: 'Chờ duyệt',
      className: 'status-pending',
    },
    rejected: {
      icon: AlertCircle,
      label: 'Cần chỉnh sửa',
      className: 'status-rejected',
    },
    draft: {
      icon: FileText,
      label: 'Bản nháp',
      className: 'status-draft',
    },
  };

  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;

  return (
    <div className="status-badge-wrapper-modern">
      <div className={`status-badge-pill ${config.className}`}>
        <Icon size={12} />
        <span className="status-label">{config.label}</span>
      </div>
      {status === 'rejected' && reason && (
        <div className="rejection-reason-box">
          <AlertCircle size={12} className="text-danger" />
          <span className="reason-text">{reason}</span>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
