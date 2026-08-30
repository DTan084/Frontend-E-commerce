import React from 'react';
import { Package, Tag, ShieldCheck, Lock, Download, ArrowLeft } from 'lucide-react';
import { getCategoryName } from '../../data/categories';
import './CheckoutOrderSummary.css';

const CheckoutOrderSummary = ({ items = [], appliedCoupon, discountAmount, onBack }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Math.round(price)) + '₫';
  };

  const subtotal = items.reduce((sum, item) => {
    const p = Number(item.discount_price) || Number(item.price) || 0;
    return sum + p;
  }, 0);

  let discount = discountAmount || 0;
  if (!discount && appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else {
      discount = appliedCoupon.discount;
    }
  }

  const tax = Math.max(0, (subtotal - discount) * 0.1);
  const total = Math.max(0, subtotal - discount + tax);

  return (
    <div className="checkout-order-summary-modern">
      {/* Header */}
      <div className="checkout-summary-head">
        <div className="head-title-wrap">
          <Package size={17} className="text-indigo" />
          <h3 className="summary-title">Đơn hàng của bạn</h3>
        </div>
        <span className="summary-count-badge">{items.length} sản phẩm</span>
      </div>

      {/* Items Scroll List */}
      <div className="checkout-summary-items-list">
        {items.map((item) => {
          const itemPrice = Number(item.discount_price) || Number(item.price) || 0;
          const origPrice = Number(item.price) || 0;
          const hasDiscount = origPrice > itemPrice;
          const catLabel = getCategoryName(item.category, 'vi') || 'Mã nguồn';

          return (
            <div key={item.id} className="checkout-mini-item">
              <div className="mini-item-thumb-box">
                <img
                  src={item.image_url || item.image || '/placeholder-product.png'}
                  alt={item.title || item.name}
                  className="mini-item-img"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                  }}
                />
              </div>

              <div className="mini-item-info">
                <h4 className="mini-item-title">{item.title || item.name}</h4>
                <div className="mini-item-meta-row">
                  <span className="mini-cat-chip">{catLabel}</span>
                  <span className="mini-license-chip">Bản quyền chuẩn</span>
                </div>
              </div>

              <div className="mini-item-price-col">
                <span className="mini-final-price">{formatPrice(itemPrice)}</span>
                {hasDiscount && <span className="mini-orig-price">{formatPrice(origPrice)}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Calculations */}
      <div className="checkout-price-calc-box">
        <div className="calc-row">
          <span className="calc-label">Tạm tính:</span>
          <span className="calc-val">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="calc-row discount-row">
            <span className="calc-label">
              <Tag size={13} />
              <span>Mã giảm {appliedCoupon?.code ? `(${appliedCoupon.code})` : ''}:</span>
            </span>
            <span className="calc-val discount-val">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="calc-row">
          <span className="calc-label">Thuế VAT (10%):</span>
          <span className="calc-val">{formatPrice(tax)}</span>
        </div>

        <div className="calc-divider"></div>

        <div className="calc-row total-row">
          <span className="total-label-text">Tổng thanh toán:</span>
          <span className="total-val-text">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Digital Delivery Notice */}
      <div className="checkout-delivery-notice">
        <Download size={14} className="text-emerald" />
        <span>Giao dịch hoàn tất = Nhận link tải & License key ngay</span>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="checkout-guarantee-box">
        <div className="guarantee-row">
          <ShieldCheck size={14} className="text-emerald" />
          <span>Bảo hành hoàn tiền 100% qua Escrow CodeMart</span>
        </div>
        <div className="guarantee-row">
          <Lock size={14} className="text-indigo" />
          <span>Mã hóa bảo mật thanh toán 256-bit SSL</span>
        </div>
      </div>

      {/* Back to Cart Link */}
      {onBack && (
        <button type="button" className="btn-back-to-cart-action" onClick={onBack}>
          <ArrowLeft size={15} />
          <span>Quay lại giỏ hàng</span>
        </button>
      )}
    </div>
  );
};

export default CheckoutOrderSummary;
