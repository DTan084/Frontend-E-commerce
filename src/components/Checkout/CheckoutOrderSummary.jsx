import React from 'react';
import './CheckoutOrderSummary.css';

const CheckoutOrderSummary = ({ items = [], appliedCoupon, onBack }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    return subtotal * (appliedCoupon.discount / 100);
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return (subtotal - discount) * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    return subtotal - discount + tax;
  };

  return (
    <div className="checkout-order-summary">
      <div className="summary-header">
        <h3 className="summary-title">
          <span className="icon">📦</span>
          Order Summary
        </h3>
        <span className="items-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>

      {/* Items List */}
      <div className="summary-items">
        {items.map(item => (
          <div key={item.id} className="summary-item">
            <div className="item-image-wrapper">
              <img src={item.image} alt={item.name || item.title} className="item-image" />
              {item.quantity > 1 && (
                <span className="item-quantity-badge">{item.quantity}</span>
              )}
            </div>
            <div className="item-details">
              <h4 className="item-name">{item.name || item.title}</h4>
              <p className="item-category">{item.categoryName || item.category}</p>
              {item.quantity > 1 && (
                <p className="item-qty">Qty: {item.quantity}</p>
              )}
            </div>
            <div className="item-price">
              {formatPrice(item.price * (item.quantity || 1))}
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown">
        <div className="price-row">
          <span className="label">Subtotal</span>
          <span className="value">{formatPrice(calculateSubtotal())}</span>
        </div>

        {appliedCoupon && (
          <div className="price-row discount">
            <span className="label">
              <span className="icon">🎟️</span>
              Discount ({appliedCoupon.code})
            </span>
            <span className="value">-{formatPrice(calculateDiscount())}</span>
          </div>
        )}

        <div className="price-row">
          <span className="label">Tax (10%)</span>
          <span className="value">{formatPrice(calculateTax())}</span>
        </div>

        <div className="price-divider"></div>

        <div className="price-row total">
          <span className="label">Total</span>
          <span className="value">{formatPrice(calculateTotal())}</span>
        </div>
      </div>

      {/* Security Badges */}
      <div className="security-section">
        <div className="security-badge">
          <span className="icon">🔒</span>
          <span className="text">SSL Secure Checkout</span>
        </div>
        <div className="security-badge">
          <span className="icon">✓</span>
          <span className="text">Money Back Guarantee</span>
        </div>
        <div className="security-badge">
          <span className="icon">🛡️</span>
          <span className="text">Buyer Protection</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods-preview">
        <p className="preview-label">We Accept</p>
        <div className="payment-icons">
          <span className="payment-icon">💳</span>
          <span className="payment-icon">🅿️</span>
          <span className="payment-icon">📱</span>
          <span className="payment-icon">🏦</span>
        </div>
      </div>

      {/* Back Button */}
      {onBack && (
        <button className="back-to-cart-btn" onClick={onBack}>
          <span className="icon">←</span>
          Back to Cart
        </button>
      )}
    </div>
  );
};

export default CheckoutOrderSummary;
