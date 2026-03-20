import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentOrders.css';

const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate();

  // Mock data if no orders provided
  const defaultOrders = orders.length > 0 ? orders : [
    {
      id: '12345',
      date: '2025-10-28',
      status: 'delivered',
      total: 99,
      productName: 'Premium Admin Dashboard Template',
      productImage: 'https://via.placeholder.com/80',
      downloadUrl: '#',
    },
    {
      id: '12344',
      date: '2025-10-25',
      status: 'processing',
      total: 149,
      productName: 'E-commerce React Components Pack',
      productImage: 'https://via.placeholder.com/80',
      downloadUrl: '#',
    },
    {
      id: '12343',
      date: '2025-10-20',
      status: 'completed',
      total: 79,
      productName: 'Landing Page UI Kit',
      productImage: 'https://via.placeholder.com/80',
      downloadUrl: '#',
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { label: 'Delivered', color: '#48bb78', icon: '✓' },
      processing: { label: 'Processing', color: '#ed8936', icon: '⏳' },
      completed: { label: 'Completed', color: '#667eea', icon: '✓' },
      pending: { label: 'Pending', color: '#a0aec0', icon: '⏱️' },
      cancelled: { label: 'Cancelled', color: '#e53e3e', icon: '✕' },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="recent-orders-container">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Đơn hàng gần đây</h2>
          <span className="order-count">{defaultOrders.length} đơn hàng</span>
        </div>
        <button 
          className="view-all-btn"
          onClick={() => navigate('/user/orders')}
        >
          Xem tất cả
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="orders-list">
        {defaultOrders.map((order, index) => {
          const statusBadge = getStatusBadge(order.status);
          return (
            <div 
              key={order.id} 
              className="order-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Order Header */}
              <div className="order-header">
                <div className="order-id-wrapper">
                  <span className="order-label">Order</span>
                  <span className="order-id">#{order.id}</span>
                </div>
                <div className="order-meta">
                  <span className="order-date">
                    <span className="date-icon">📅</span>
                    {formatDate(order.date)}
                  </span>
                  <span 
                    className="order-status-badge"
                    style={{ 
                      background: `${statusBadge.color}15`,
                      color: statusBadge.color 
                    }}
                  >
                    <span className="status-icon">{statusBadge.icon}</span>
                    {statusBadge.label}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="order-body">
                <div className="product-image-wrapper">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="product-image"
                  />
                  <div className="image-overlay">
                    <span className="overlay-icon">👁️</span>
                  </div>
                </div>

                <div className="product-info">
                  <h4 className="product-name">{order.productName}</h4>
                  <div className="product-meta">
                    <span className="product-type">
                      <span className="type-icon">📦</span>
                      Digital Product
                    </span>
                  </div>
                </div>

                <div className="order-price">
                  <span className="price-label">Total</span>
                  <span className="price-value">${order.total}</span>
                </div>
              </div>

              {/* Order Actions */}
              <div className="order-actions">
                <button className="action-btn download-btn">
                  <span className="btn-icon">⬇</span>
                  Download
                </button>
                <button 
                  className="action-btn view-btn"
                  onClick={() => navigate(`/user/orders/${order.id}`)}
                >
                  <span className="btn-icon">👁️</span>
                  View Details
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="card-border"></div>
            </div>
          );
        })}
      </div>

      {defaultOrders.length === 0 && (
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <h3>No Orders Yet</h3>
          <p>Start shopping to see your orders here!</p>
          <button 
            className="shop-now-btn"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
