import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersDataService } from '../../services/data';
import { ROUTE_PATHS } from '../../routes/paths';
import './OrdersPage.css';

const ORDER_STATUSES = {
  pending: { label: 'Chờ thanh toán', color: '#ffa500', icon: '⏳' },
  processing: { label: 'Đang xử lý', color: '#3498db', icon: '⚙️' },
  completed: { label: 'Đã hoàn thành', color: '#27ae60', icon: '✅' },
  cancelled: { label: 'Đã hủy', color: '#e74c3c', icon: '❌' },
  refunded: { label: 'Đã hoàn tiền', color: '#95a5a6', icon: '💰' },
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLicenses, setShowLicenses] = useState({});
  const [downloadingItems, setDownloadingItems] = useState({});

  useEffect(() => {
    // Load orders from mock storage service
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await ordersDataService.getAll();

      console.log('📦 Loaded orders from mock storage:', ordersData);
      setOrders(ordersData);
    } catch (error) {
      console.error('❌ Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      completed: orders.filter((o) => o.status === 'completed').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      {/* Page Header */}
      <section className="orders-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to={ROUTE_PATHS.ROOT}>Trang chủ</Link>
            <span>/</span>
            <Link to={`/${ROUTE_PATHS.USER.DASHBOARD}`}>Dashboard</Link>
            <span>/</span>
            <span>Đơn hàng của tôi</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div>
              <h1>📦 Đơn hàng của tôi</h1>
              <p>Quản lý và theo dõi tất cả đơn hàng của bạn</p>
            </div>
            <button
              onClick={loadOrders}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🔄</span>
              <span>Làm mới</span>
            </button>
          </div>

          {/* Stats */}
          <div className="order-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Tổng đơn</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Chờ thanh toán</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-info">
                <div className="stat-value">{stats.processing}</div>
                <div className="stat-label">Đang xử lý</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <div className="stat-value">{stats.completed}</div>
                <div className="stat-label">Đã hoàn thành</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="orders-filters">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng theo mã hoặc tên sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="status-filters">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              Tất cả ({orders.length})
            </button>
            {Object.entries(ORDER_STATUSES).map(([key, status]) => (
              <button
                key={key}
                className={`filter-btn ${filterStatus === key ? 'active' : ''}`}
                onClick={() => setFilterStatus(key)}
                style={{ '--status-color': status.color }}
              >
                {status.icon} {status.label} ({orders.filter((o) => o.status === key).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="orders-list">
        <div className="container">
          {filteredOrders.length > 0 ? (
            <div className="orders-grid">
              {filteredOrders.map((order) => {
                const status = ORDER_STATUSES[order.status];
                return (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <strong>{order.id}</strong>
                        <span className="order-date">{formatDate(order.date)}</span>
                      </div>
                      <div className="order-status" style={{ backgroundColor: status.color }}>
                        {status.icon} {status.label}
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <div className="item-meta">
                              <span>Số lượng: {item.quantity}</span>
                              <span className="item-price">{formatPrice(item.price)}</span>
                            </div>

                            {/* License Key for completed orders */}
                            {order.status === 'completed' && item.licenseKey && (
                              <div className="license-info">
                                <span className="license-label">🔑 License:</span>
                                <div className="license-key-wrapper">
                                  <code className="license-key">
                                    {showLicenses[`${order.id}-${item.id}`]
                                      ? item.licenseKey
                                      : '••••-••••-••••-••••-••••'}
                                  </code>
                                  <button
                                    className="license-btn"
                                    onClick={() =>
                                      setShowLicenses((prev) => ({
                                        ...prev,
                                        [`${order.id}-${item.id}`]: !prev[`${order.id}-${item.id}`],
                                      }))
                                    }
                                    title={showLicenses[`${order.id}-${item.id}`] ? 'Ẩn' : 'Hiện'}
                                  >
                                    {showLicenses[`${order.id}-${item.id}`] ? '👁️' : '👁️‍🗨️'}
                                  </button>
                                  <button
                                    className="license-btn"
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.licenseKey);
                                      alert('📋 Đã copy license key!');
                                    }}
                                    title="Copy"
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Download Stats */}
                            {order.status === 'completed' && item.downloadCount !== undefined && (
                              <div className="download-stats-mini">
                                <span>⬇ Đã tải: {item.downloadCount} lần</span>
                                {item.lastDownload && (
                                  <span> • Lần cuối: {formatDate(item.lastDownload)}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        <span>Tổng cộng:</span>
                        <strong>{formatPrice(order.total)}</strong>
                      </div>

                      <div className="order-actions">
                        <button
                          className="btn-view"
                          onClick={() => {
                            alert(
                              `📋 Chi tiết đơn hàng ${order.id}\n\nNgày đặt: ${formatDate(order.date)}\nTrạng thái: ${ORDER_STATUSES[order.status].label}\nTổng tiền: ${formatPrice(order.total)}\nSố sản phẩm: ${order.items.length}\n\n${order.items.map((item) => `• ${item.name} - ${formatPrice(item.price)}`).join('\n')}`
                            );
                          }}
                        >
                          📄 Chi tiết
                        </button>
                        {order.status === 'completed' && (
                          <>
                            <button
                              className={`btn-download ${downloadingItems[order.id] ? 'downloading' : ''}`}
                              onClick={() => {
                                setDownloadingItems((prev) => ({ ...prev, [order.id]: true }));
                                // Track download
                                order.items.forEach((item) => {
                                  ordersDataService.trackDownload(order.id, item.id);
                                });
                                setTimeout(() => {
                                  setDownloadingItems((prev) => ({ ...prev, [order.id]: false }));
                                  alert(
                                    '✅ Đang tải xuống mã nguồn...\n\nFile sẽ được download sau vài giây.\nKiểm tra thư mục Downloads của bạn.'
                                  );
                                  loadOrders(); // Reload to update download count
                                }, 1500);
                              }}
                              disabled={downloadingItems[order.id]}
                            >
                              {downloadingItems[order.id] ? '⏳ Đang tải...' : '📥 Tải xuống'}
                            </button>
                            <button
                              className="btn-docs"
                              onClick={() => {
                                alert(
                                  '📚 Tài liệu hướng dẫn\n\n✅ Hướng dẫn cài đặt\n✅ Hướng dẫn sử dụng\n✅ Tài liệu kỹ thuật\n✅ Video tutorials\n\nTài liệu đã được đính kèm trong file download.'
                                );
                              }}
                            >
                              📚 Tài liệu
                            </button>
                            <button
                              className="btn-review"
                              onClick={() => {
                                const rating = prompt('⭐ Đánh giá sản phẩm (1-5 sao):', '5');
                                if (rating) {
                                  const review = prompt('📝 Nhận xét của bạn:');
                                  if (review) {
                                    alert(
                                      `✅ Cảm ơn đánh giá của bạn!\n\n⭐ ${rating} sao\n📝 ${review}\n\nĐánh giá của bạn giúp người mua khác có thêm thông tin.`
                                    );
                                  }
                                }
                              }}
                            >
                              ⭐ Đánh giá
                            </button>
                          </>
                        )}
                        {order.status === 'pending' && (
                          <button
                            className="btn-payment"
                            onClick={() => {
                              alert(
                                '💳 Thanh toán đơn hàng\n\nBạn sẽ được chuyển đến trang thanh toán...\n\nChọn phương thức:\n• Thẻ tín dụng/ghi nợ\n• Ví điện tử (MoMo, ZaloPay)\n• Chuyển khoản ngân hàng'
                              );
                            }}
                          >
                            💳 Thanh toán
                          </button>
                        )}
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <button
                            className="btn-cancel"
                            onClick={() => {
                              if (window.confirm(`❌ Bạn có chắc muốn hủy đơn hàng ${order.id}?`)) {
                                alert(
                                  '✅ Đơn hàng đã được hủy.\n\nSố tiền sẽ được hoàn lại trong 3-5 ngày làm việc.'
                                );
                                // TODO: Update mock order status/cancel reason in local storage
                              }
                            }}
                          >
                            ❌ Hủy đơn
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <button
                            className="btn-support"
                            onClick={() => {
                              alert(
                                '💬 Hỗ trợ khách hàng\n\nChúng tôi sẵn sàng hỗ trợ bạn:\n\n📧 Email: support@tmdt.com\n📞 Hotline: 1900 xxxx\n💬 Live Chat: Đang kết nối...\n\nThời gian: 8:00 - 22:00 hàng ngày'
                              );
                            }}
                          >
                            💬 Hỗ trợ
                          </button>
                        )}
                      </div>
                    </div>

                    {order.status === 'completed' && order.downloadLink && (
                      <div className="download-info">
                        ✅ Đã hoàn thành: {formatDate(order.completedDate)} - Bạn có thể tải mã
                        nguồn bất cứ lúc nào
                      </div>
                    )}

                    {order.cancelReason && (
                      <div className="cancel-reason">ℹ️ Lý do hủy: {order.cancelReason}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-orders">
              <div className="empty-icon">📦</div>
              <h3>Không tìm thấy đơn hàng</h3>
              <p>
                {searchQuery || filterStatus !== 'all'
                  ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
                  : 'Bạn chưa có đơn hàng nào'}
              </p>
              <Link to={`/${ROUTE_PATHS.PUBLIC.PRODUCTS}`} className="browse-btn">
                Khám phá sản phẩm
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
