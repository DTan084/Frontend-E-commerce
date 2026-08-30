import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lock,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Download,
  X,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './OrderSummary.css';

const OrderSummary = ({ showCheckoutButton = true, selectedItemsCount }) => {
  const navigate = useNavigate();
  const { cart, items } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Digital product voucher coupons
  const validCoupons = {
    CODEMART10: { discount: 10, type: 'percentage', description: 'Giảm 10% tổng đơn' },
    DEVPRO20: { discount: 20, type: 'percentage', description: 'Giảm 20% cho thành viên Pro' },
    CHAOBANMOI: { discount: 50000, type: 'fixed', description: 'Giảm 50.000₫ đơn đầu tiên' },
  };

  const cartItems = items || cart || [];
  const itemCount = selectedItemsCount !== undefined ? selectedItemsCount : cartItems.length;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.discount_price) || Number(item.price) || 0;
    return sum + price;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }

  // VAT (10%)
  const tax = (subtotal - discount) * 0.1;
  const total = Math.max(0, subtotal - discount + tax);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(price)) + '₫';
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (!code) return;

    setIsApplying(true);
    setCouponError('');

    setTimeout(() => {
      if (validCoupons[code]) {
        setAppliedCoupon({ code, ...validCoupons[code] });
        setCouponError('');
      } else {
        setCouponError('Mã ưu đãi không tồn tại hoặc đã hết lượt dùng');
        setAppliedCoupon(null);
      }
      setIsApplying(false);
    }, 300);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout', {
      state: { appliedCoupon, discountAmount: discount },
    });
  };

  return (
    <div className="order-summary-modern">
      {/* Card Header */}
      <div className="summary-card-header">
        <h3 className="summary-heading">Tóm tắt đơn hàng</h3>
        <span className="summary-badge-pill">{itemCount} sản phẩm</span>
      </div>

      {/* Breakdown List */}
      <div className="summary-breakdown-list">
        <div className="breakdown-row">
          <span className="breakdown-label">Tạm tính:</span>
          <span className="breakdown-value">{formatPrice(subtotal)}</span>
        </div>

        {appliedCoupon && (
          <div className="breakdown-row discount-applied-row">
            <span className="breakdown-label">
              <Tag size={14} className="tag-icon" />
              <span>Mã giảm ({appliedCoupon.code})</span>
              <button
                type="button"
                className="btn-remove-coupon-tag"
                onClick={handleRemoveCoupon}
                title="Gỡ mã giảm giá"
              >
                <X size={12} />
              </button>
            </span>
            <span className="breakdown-value discount-value">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="breakdown-row">
          <span className="breakdown-label">Thuế VAT (10%):</span>
          <span className="breakdown-value">{formatPrice(tax)}</span>
        </div>

        <div className="breakdown-divider-line"></div>

        <div className="breakdown-row total-highlight-row">
          <span className="total-label">Tổng thanh toán:</span>
          <span className="total-value">{formatPrice(total)}</span>
        </div>

        <div className="instant-delivery-pill">
          <Download size={14} className="pill-icon" />
          <span>Sản phẩm số • Tải xuống & nhận License ngay</span>
        </div>
      </div>

      {/* Coupon Code Section */}
      <div className="summary-coupon-box">
        <div className="coupon-box-title">
          <Tag size={15} />
          <span>Mã ưu đãi / Voucher</span>
        </div>

        <div className="coupon-input-group">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            placeholder="Nhập mã giảm giá..."
            className="coupon-text-input"
            disabled={appliedCoupon !== null}
            maxLength={20}
          />
          <button
            type="button"
            className="btn-coupon-apply"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || appliedCoupon !== null || isApplying}
          >
            {isApplying ? '...' : 'Áp dụng'}
          </button>
        </div>

        {couponError && (
          <div className="coupon-status-msg error">
            <AlertCircle size={14} />
            <span>{couponError}</span>
          </div>
        )}

        {appliedCoupon && (
          <div className="coupon-status-msg success">
            <CheckCircle2 size={14} />
            <span>Đã áp dụng: {appliedCoupon.description}</span>
          </div>
        )}

        {/* Suggestion Chips */}
        {!appliedCoupon && (
          <div className="coupon-hints-wrap">
            <span className="hints-label">Gợi ý mã:</span>
            <div className="hints-chips-list">
              {Object.entries(validCoupons).map(([code, info]) => (
                <button
                  key={code}
                  type="button"
                  className="coupon-chip-btn"
                  onClick={() => {
                    setCouponCode(code);
                    setCouponError('');
                  }}
                >
                  <Sparkles size={11} />
                  <span className="chip-code-text">{code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Primary Checkout Button */}
      {showCheckoutButton && (
        <button
          type="button"
          className="btn-proceed-checkout-cta"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          <span>Tiến hành thanh toán</span>
          <ArrowRight size={18} />
        </button>
      )}

      {/* Trust Badges 3 Column */}
      <div className="summary-trust-grid">
        <div className="summary-trust-item">
          <div className="trust-icon-wrap lock">
            <Lock size={15} />
          </div>
          <div className="trust-text-block">
            <strong>Bảo mật 100%</strong>
            <span>Mã hóa SSL 256-bit</span>
          </div>
        </div>

        <div className="summary-trust-item">
          <div className="trust-icon-wrap shield">
            <ShieldCheck size={15} />
          </div>
          <div className="trust-text-block">
            <strong>Bảo vệ Escrow</strong>
            <span>Bảo hành hoàn tiền</span>
          </div>
        </div>

        <div className="summary-trust-item">
          <div className="trust-icon-wrap download">
            <Zap size={15} />
          </div>
          <div className="trust-text-block">
            <strong>Tải về tức thì</strong>
            <span>Nhận link & key ngay</span>
          </div>
        </div>
      </div>

      {/* Supported Payment Logos */}
      <div className="summary-payment-logos-row">
        <span className="logos-label">Hỗ trợ thanh toán:</span>
        <div className="payment-badges-strip">
          <span className="pay-chip vnpay">VNPAY QR</span>
          <span className="pay-chip momo">MoMo</span>
          <span className="pay-chip bank">VietQR</span>
          <span className="pay-chip card">VISA / Master</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
