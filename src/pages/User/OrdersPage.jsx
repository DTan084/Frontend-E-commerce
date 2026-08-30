import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Search,
  Download,
  Key,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ShoppingBag,
  Calendar,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ordersDataService } from '../../services/data';
import Breadcrumb from '../../components/Product/Breadcrumb';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import './OrdersPage.css';

const ORDER_STATUSES = {
  all: { label: 'Tất cả', color: '#4f46e5', icon: Package },
  completed: { label: 'Đã hoàn thành', color: '#059669', icon: CheckCircle2 },
  processing: { label: 'Đang xử lý', color: '#2563eb', icon: RefreshCw },
  pending: { label: 'Chờ thanh toán', color: '#d97706', icon: Clock },
  cancelled: { label: 'Đã hủy', color: '#ef4444', icon: XCircle },
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await ordersDataService.getAll();
      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      (order.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.items || []).some((item) =>
        (item.name || item.title || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

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

  const handleCopyLicense = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="orders-page-modern">
      <div className="orders-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Bàn làm việc', path: '/user/dashboard' },
            { label: 'Đơn hàng đã mua', path: null },
          ]}
        />

        <div className="orders-layout-row">
          {/* User Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Orders Content */}
          <main className="orders-main-content">
            {/* Header Title Card */}
            <div className="orders-hero-header-card">
              <div className="orders-title-group">
                <div className="orders-icon-wrap">
                  <Package size={22} className="text-indigo" />
                </div>
                <div>
                  <h1 className="orders-main-title">Đơn hàng của tôi</h1>
                  <p className="orders-sub-desc">
                    Theo dõi lịch sử mua hàng, lấy mã License Key và tải lại source code bản quyền.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn-refresh-orders"
                onClick={loadOrders}
                title="Tải lại danh sách"
              >
                <RefreshCw size={15} className={loading ? 'spin-icon' : ''} />
                <span>Làm mới</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="orders-filter-bar-card">
              <div className="orders-search-input-wrap">
                <Search size={16} className="search-affix-icon" />
                <input
                  type="text"
                  placeholder="Tìm theo mã đơn hàng hoặc tên mã nguồn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="orders-search-field"
                />
              </div>

              <div className="orders-status-tabs-strip">
                {Object.entries(ORDER_STATUSES).map(([key, config]) => {
                  const Icon = config.icon;
                  const isActive = filterStatus === key;
                  const count =
                    key === 'all' ? orders.length : orders.filter((o) => o.status === key).length;

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`status-tab-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setFilterStatus(key)}
                    >
                      <Icon size={14} />
                      <span>{config.label}</span>
                      <span className="tab-count-pill">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orders Feed */}
            <div className="orders-feed-container">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const statusConfig = ORDER_STATUSES[order.status] || ORDER_STATUSES.completed;
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div key={order.id} className="order-receipt-card">
                      {/* Top Meta Bar */}
                      <div className="receipt-meta-header">
                        <div className="meta-left">
                          <span className="receipt-order-id">#{order.id}</span>
                          <span className="receipt-order-date">
                            <Calendar size={13} />
                            <span>{formatDate(order.date || order.createdAt)}</span>
                          </span>
                        </div>

                        <div className="meta-right">
                          <span
                            className="receipt-status-pill"
                            style={{
                              color: statusConfig.color,
                              background: `${statusConfig.color}15`,
                            }}
                          >
                            <StatusIcon size={13} />
                            <span>{statusConfig.label}</span>
                          </span>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="receipt-items-list">
                        {(order.items || []).map((item, idx) => {
                          const licenseKey =
                            item.licenseKey ||
                            `CM-${(item.id || 100) * 897}-${(order.id || '').replace('ORD-', '')}-${idx + 1}`.toUpperCase();

                          return (
                            <div key={idx} className="receipt-item-row">
                              <div className="receipt-item-thumb">
                                <img
                                  src={item.image || item.image_url || '/placeholder-product.png'}
                                  alt={item.name || item.title}
                                  onError={(e) => {
                                    e.target.src =
                                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                                  }}
                                />
                              </div>

                              <div className="receipt-item-info">
                                <h4 className="receipt-item-name">{item.name || item.title}</h4>
                                <span className="receipt-item-qty">
                                  Số lượng: {item.quantity || 1} • Bản quyền vĩnh viễn
                                </span>

                                {/* License Key for completed orders */}
                                <div className="receipt-license-box">
                                  <div className="license-info-group">
                                    <Key size={12} className="text-indigo" />
                                    <span className="license-tag-title">License Key:</span>
                                    <code className="license-code-val">{licenseKey}</code>
                                  </div>
                                  <button
                                    type="button"
                                    className="btn-copy-license-btn"
                                    onClick={() => handleCopyLicense(licenseKey)}
                                    title="Sao chép key"
                                  >
                                    {copiedKey === licenseKey ? (
                                      <Check size={12} className="text-emerald" />
                                    ) : (
                                      <Copy size={12} />
                                    )}
                                    <span>{copiedKey === licenseKey ? 'Đã chép' : 'Chép key'}</span>
                                  </button>
                                </div>
                              </div>

                              <div className="receipt-item-price-action">
                                <span className="receipt-item-price-txt">
                                  {formatPrice(item.price * (item.quantity || 1))}
                                </span>
                                <button
                                  type="button"
                                  className="btn-receipt-download-zip"
                                  onClick={() =>
                                    alert(
                                      `Đang chuẩn bị gói source code .ZIP cho [${item.name || item.title}]!`
                                    )
                                  }
                                >
                                  <Download size={13} />
                                  <span>Tải .ZIP</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer Summary Bar */}
                      <div className="receipt-footer-bar">
                        <div className="receipt-payment-method-tag">
                          <CreditCard size={14} className="text-indigo" />
                          <span>Thanh toán bảo mật qua CodeMart Escrow</span>
                        </div>

                        <div className="receipt-total-col">
                          <span className="total-label-txt">Tổng thanh toán:</span>
                          <span className="total-val-txt">{formatPrice(order.total || 0)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-orders-view-modern">
                  <div className="empty-icon-halo">
                    <ShoppingBag size={40} className="text-muted" />
                  </div>
                  <h3>Không tìm thấy đơn hàng nào</h3>
                  <p>Bạn chưa có đơn hàng nào phù hợp với bộ lọc hoặc từ khóa tìm kiếm.</p>
                  <button
                    type="button"
                    className="btn-explore-code-cta"
                    onClick={() => navigate('/products')}
                  >
                    Khám phá mã nguồn ngay
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
