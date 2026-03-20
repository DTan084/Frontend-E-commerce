import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './OrderSummary.css';

// Custom SVG Icons
const LockIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const TagIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg className="order-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const OrderSummary = ({ showCheckoutButton = true }) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Mock coupon codes (No shipping coupons for digital products)
  const validCoupons = {
    SAVE10: { discount: 10, type: 'percentage', description: 'Giảm 10%' },
    SAVE20: { discount: 20, type: 'percentage', description: 'Giảm 20%' },
    WELCOME: { discount: 50000, type: 'fixed', description: 'Giảm 50,000₫' },
    NEWUSER: { discount: 100000, type: 'fixed', description: 'Giảm 100,000₫' },
  };

  // Calculate totals (Digital products - no shipping, no quantity)
  const cartItems = cart || [];
  const itemCount = cartItems.length; // Just count items, not quantity

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discount_price || item.price || 0;
    return sum + price; // No quantity for digital products
  }, 0);

  // Apply coupon discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }

  // Tax (10% VAT on subtotal after discount)
  const tax = (subtotal - discount) * 0.1;

  // Total (No shipping for digital products)
  const total = subtotal - discount + tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.toUpperCase().trim();

    if (!code) return;

    setIsApplying(true);
    setCouponError('');

    // Simulate async mock coupon validation
    setTimeout(() => {
      if (validCoupons[code]) {
        setAppliedCoupon({ code, ...validCoupons[code] });
        setCouponError('');
      } else {
        setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn');
        setAppliedCoupon(null);
      }
      setIsApplying(false);
    }, 500);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout');
  };

  return (
    <div className="order-summary">
      {/* Header */}
      <div className="summary-header">
        <h3 className="summary-title">Tóm tắt đơn hàng</h3>
        <div className="summary-badge">{itemCount} sản phẩm</div>
      </div>

      {/* Price Breakdown */}
      <div className="summary-breakdown">
        <div className="breakdown-row">
          <span className="breakdown-label">Tạm tính:</span>
          <span className="breakdown-value">{formatPrice(subtotal)}</span>
        </div>

        {appliedCoupon && (
          <div className="breakdown-row breakdown-discount">
            <span className="breakdown-label">
              <TagIcon />
              Giảm giá ({appliedCoupon.code})
              <button
                className="remove-coupon-btn"
                onClick={handleRemoveCoupon}
                title="Xóa mã giảm giá"
                aria-label="Xóa mã giảm giá"
              >
                ×
              </button>
            </span>
            <span className="breakdown-value breakdown-discount-value">
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div className="breakdown-row">
          <span className="breakdown-label">Thuế VAT (10%):</span>
          <span className="breakdown-value">{formatPrice(tax)}</span>
        </div>

        <div className="breakdown-divider"></div>

        <div className="breakdown-row breakdown-total">
          <span className="breakdown-label">Tổng cộng:</span>
          <span className="breakdown-value breakdown-total-value">{formatPrice(total)}</span>
        </div>

        {cartItems.length > 0 && (
          <div className="digital-notice">
            <CheckCircleIcon />
            <span>Sản phẩm số - Tải xuống ngay sau khi thanh toán</span>
          </div>
        )}
      </div>

      {/* Coupon Section */}
      <div className="coupon-section">
        <div className="coupon-header">
          <TagIcon />
          <h4 className="coupon-title">Mã giảm giá</h4>
        </div>

        <div className="coupon-input-wrapper">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
            placeholder="Nhập mã giảm giá"
            className="coupon-input"
            disabled={appliedCoupon !== null}
            maxLength={20}
          />
          <button
            className="coupon-apply-btn"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || appliedCoupon !== null || isApplying}
          >
            {isApplying ? <span className="coupon-loading">...</span> : 'Áp dụng'}
          </button>
        </div>

        {couponError && (
          <div className="coupon-message coupon-error">
            <AlertCircleIcon />
            <span>{couponError}</span>
          </div>
        )}

        {appliedCoupon && (
          <div className="coupon-message coupon-success">
            <CheckCircleIcon />
            <span>Áp dụng mã thành công! Giảm {appliedCoupon.description}</span>
          </div>
        )}

        {/* Available Coupons Hint */}
        {!appliedCoupon && (
          <div className="coupon-suggestions">
            <p className="suggestions-title">Mã khả dụng:</p>
            <div className="suggestions-list">
              {Object.entries(validCoupons).map(([code, info]) => (
                <button
                  key={code}
                  className="suggestion-chip"
                  onClick={() => {
                    setCouponCode(code);
                    setCouponError('');
                  }}
                >
                  <TagIcon />
                  <span className="chip-code">{code}</span>
                  <span className="chip-desc">{info.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <button
          className="summary-checkout-btn"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <span className="checkout-text">Tiến hành thanh toán</span>
          <ArrowRightIcon />
        </button>
      )}

      {/* Trust Badges */}
      <div className="trust-badges">
        <div className="trust-badge">
          <div className="trust-badge-icon">
            <LockIcon />
          </div>
          <div className="trust-badge-content">
            <strong>Thanh toán bảo mật</strong>
            <span>SSL & PCI DSS</span>
          </div>
        </div>

        <div className="trust-badge">
          <div className="trust-badge-icon">
            <ShieldIcon />
          </div>
          <div className="trust-badge-content">
            <strong>Hoàn tiền 100%</strong>
            <span>Trong 30 ngày</span>
          </div>
        </div>

        <div className="trust-badge">
          <div className="trust-badge-icon">
            <CheckCircleIcon />
          </div>
          <div className="trust-badge-content">
            <strong>Truy cập ngay</strong>
            <span>Sau khi thanh toán</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <p className="payment-methods-title">Phương thức thanh toán</p>
        <div className="payment-methods-icons">
          <div className="payment-method-icon visa">VISA</div>
          <div className="payment-method-icon mastercard">MASTER</div>
          <div className="payment-method-icon momo">MOMO</div>
          <div className="payment-method-icon zalopay">ZaloPay</div>
        </div>
      </div>

      {/* Security Note */}
      <div className="security-note">
        <LockIcon />
        <p>Thông tin thanh toán được mã hóa và bảo mật tuyệt đối</p>
      </div>
    </div>
  );
};

export default OrderSummary;
