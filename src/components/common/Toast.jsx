import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, type = 'success', show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-type-icon success" />;
      case 'error':
        return <AlertCircle size={18} className="toast-type-icon error" />;
      case 'warning':
        return <AlertTriangle size={18} className="toast-type-icon warning" />;
      case 'info':
      default:
        return <Info size={18} className="toast-type-icon info" />;
    }
  };

  return (
    <div className={`toast toast-${type} ${show ? 'show' : ''}`} role="alert">
      <div className="toast-content">
        <span className="toast-icon-wrapper">{renderIcon()}</span>
        <span className="toast-message">{message}</span>
        <button type="button" className="toast-close" onClick={onClose} aria-label="Đóng">
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
