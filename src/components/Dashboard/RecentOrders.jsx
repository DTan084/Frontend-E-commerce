import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Calendar,
  ArrowRight,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import './RecentOrders.css';

const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate();

  const defaultOrders =
    orders.length > 0
      ? orders
      : [
          {
            id: 'ORD-8921034',
            date: '2026-08-28',
            status: 'completed',
            total: 1500000,
            productName: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
            productImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
            downloadUrl: '#',
          },
          {
            id: 'ORD-8921033',
            date: '2026-08-20',
            status: 'processing',
            total: 1200000,
            productName: 'Mã Nguồn Website Tin Tức - Laravel + Vue.js',
            productImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
            downloadUrl: '#',
          },
          {
            id: 'ORD-8921032',
            date: '2026-08-15',
            status: 'completed',
            total: 900000,
            productName: 'Admin Dashboard - React Material UI',
            productImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
            downloadUrl: '#',
          },
        ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { label: 'Đã hoàn thành', color: '#059669', icon: CheckCircle2 },
      completed: { label: 'Đã hoàn thành', color: '#059669', icon: CheckCircle2 },
      processing: { label: 'Đang xử lý', color: '#2563eb', icon: RefreshCw },
      pending: { label: 'Chờ thanh toán', color: '#d97706', icon: Clock },
      cancelled: { label: 'Đã hủy', color: '#ef4444', icon: XCircle },
    };
    return statusConfig[status] || statusConfig.completed;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(price)) + '₫';
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="recent-orders-card-modern">
      <div className="orders-card-head">
        <div className="orders-head-title-wrap">
          <Package size={18} className="text-indigo" />
          <h3 className="orders-section-title">Đơn hàng gần đây</h3>
          <span className="orders-count-chip">{defaultOrders.length} đơn</span>
        </div>
        <button
          type="button"
          className="btn-view-all-orders"
          onClick={() => navigate('/user/orders')}
        >
          <span>Xem tất cả</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="recent-orders-list">
        {defaultOrders.map((order) => {
          const statusBadge = getStatusBadge(order.status);
          const StatusIcon = statusBadge.icon;

          return (
            <div key={order.id} className="recent-order-row-item">
              <div className="order-thumb-wrap">
                <img
                  src={order.productImage || '/placeholder-product.png'}
                  alt={order.productName}
                  className="order-product-img"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                  }}
                />
              </div>

              <div className="order-main-info">
                <div className="order-id-meta-row">
                  <span className="order-code-badge">#{order.id}</span>
                  <span className="order-date-text">
                    <Calendar size={12} />
                    <span>{formatDate(order.date)}</span>
                  </span>
                  <span
                    className="order-status-pill"
                    style={{
                      color: statusBadge.color,
                      background: `${statusBadge.color}14`,
                    }}
                  >
                    <StatusIcon size={12} />
                    <span>{statusBadge.label}</span>
                  </span>
                </div>

                <h4 className="order-product-title">{order.productName}</h4>
              </div>

              <div className="order-price-and-actions">
                <span className="order-total-price">{formatPrice(order.total)}</span>
                <div className="order-actions-group">
                  <button
                    type="button"
                    className="btn-order-action-download"
                    onClick={() => alert(`Đang tải mã nguồn cho đơn hàng #${order.id}`)}
                  >
                    <Download size={13} />
                    <span>Tải .ZIP</span>
                  </button>
                  <button
                    type="button"
                    className="btn-order-action-view"
                    onClick={() => navigate('/user/orders')}
                  >
                    <Eye size={13} />
                    <span>Chi tiết</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {defaultOrders.length === 0 && (
        <div className="empty-recent-orders-view">
          <ShoppingBag size={36} className="text-muted" />
          <h4>Chưa có đơn hàng nào</h4>
          <p>Khám phá kho mã nguồn để bắt đầu dự án mới của bạn!</p>
          <button
            type="button"
            className="btn-explore-now-action"
            onClick={() => navigate('/products')}
          >
            Khám phá mã nguồn
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
