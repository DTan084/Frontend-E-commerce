import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ordersDataService } from '../../services/data';
import { ROUTE_PATHS } from '../../routes/paths';
import { SUPPORT } from '../../config';
import './CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData || {};

  const {
    orderId = 'ORD-' + Date.now(),
    total = 0,
    items = [],
    formData = {},
    paymentMethod = 'card',
  } = orderData;

  const billingInfo = formData;
  const email = formData.email || '';

  const paymentMethodNames = {
    card: 'Thẻ Tín dụng/Ghi nợ',
    paypal: 'PayPal',
    momo: 'Ví MoMo',
    bank: 'Chuyển khoản Ngân hàng',
  };

  // Create order in mock backend when page loads
  useEffect(() => {
    // Check if order already created for this orderId
    const orderCreatedKey = `order_created_${orderId}`;
    const alreadyCreated = sessionStorage.getItem(orderCreatedKey);

    if (items.length > 0 && !alreadyCreated) {
      ordersDataService
        .create(items, billingInfo)
        .then(() => {
          sessionStorage.setItem(orderCreatedKey, 'true');
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="success-page">
      <div className="success-container">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <span className="checkmark">✓</span>
          </div>
          <div className="success-animation-circle"></div>
        </div>

        {/* Success Message */}
        <h1 className="success-title">Đặt Hàng Thành Công!</h1>
        <p className="success-subtitle">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.
        </p>

        {/* Order Info Card */}
        <div className="order-info-card">
          <div className="order-info-header">
            <h2>Thông Tin Đơn Hàng</h2>
            <span className="order-id">#{orderId}</span>
          </div>

          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">📧 Email xác nhận</span>
              <span className="info-value">{email || 'Đang cập nhật'}</span>
            </div>

            <div className="info-item">
              <span className="info-label">💳 Phương thức thanh toán</span>
              <span className="info-value">{paymentMethodNames[paymentMethod]}</span>
            </div>

            <div className="info-item">
              <span className="info-label">📦 Tổng sản phẩm</span>
              <span className="info-value">{items.length} sản phẩm</span>
            </div>

            <div className="info-item">
              <span className="info-label">💰 Tổng tiền</span>
              <span className="info-value total-amount">{total.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        {items.length > 0 && (
          <div className="order-items-card">
            <h3>Sản Phẩm Đã Mua</h3>
            <div className="order-items-list">
              {items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name || item.title} />
                    <span className="item-quantity">{item.quantity || 1}</span>
                  </div>
                  <div className="item-details">
                    <h4>{item.name || item.title}</h4>
                    <p className="item-price">
                      {(item.price || 0).toLocaleString('vi-VN')} ₫ × {item.quantity || 1}
                    </p>
                  </div>
                  <div className="item-total">
                    {((item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')} ₫
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="next-steps-card">
          <h3>Các Bước Tiếp Theo</h3>
          <div className="steps-list">
            <div className="step-item">
              <div className="step-icon">📧</div>
              <div className="step-content">
                <h4>Kiểm tra Email</h4>
                <p>Xác nhận đơn hàng và license key đã được gửi đến {email || 'email của bạn'}</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon">📋</div>
              <div className="step-content">
                <h4>Xem Đơn hàng</h4>
                <p>Truy cập "Đơn hàng của tôi" để xem chi tiết và license key</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon">📥</div>
              <div className="step-content">
                <h4>Tải xuống Sản phẩm</h4>
                <p>Click nút "Tải xuống" để download mã nguồn và tài liệu hướng dẫn</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon">🔑</div>
              <div className="step-content">
                <h4>Kích hoạt License</h4>
                <p>Sử dụng license key để kích hoạt và sử dụng sản phẩm đầy đủ chức năng</p>
              </div>
            </div>

            <div className="step-item">
              <div className="step-icon">⭐</div>
              <div className="step-content">
                <h4>Đánh giá & Hỗ trợ</h4>
                <p>Đánh giá sản phẩm hoặc liên hệ hỗ trợ nếu cần giúp đỡ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button className="btn-secondary" onClick={() => navigate(ROUTE_PATHS.ROOT)}>
            <span className="icon">🏠</span>
            Về Trang Chủ
          </button>

          <button className="btn-primary" onClick={() => navigate(`/${ROUTE_PATHS.USER.ORDERS}`)}>
            <span className="icon">📋</span>
            Xem Đơn Hàng
          </button>
        </div>

        {/* Support Info */}
        <div className="support-info">
          <p>
            <span className="icon">💬</span>
            Cần hỗ trợ? Liên hệ <a href={`mailto:${SUPPORT.EMAIL}`}>{SUPPORT.EMAIL}</a> hoặc gọi{' '}
            <a href={SUPPORT.PHONE_HREF}>{SUPPORT.PHONE}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
