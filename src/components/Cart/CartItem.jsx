import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { createProductSlug } from '../../utils/slugHelper';
import { getCategoryName } from '../../data/categories';
import './CartItem.css';

// Custom SVG Icons
const TrashIcon = () => (
  <svg className="cart-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = () => (
  <svg className="cart-item-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CartItem = ({ item, isSelected, onToggleSelect }) => {
  const { removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Calculate prices (no quantity for digital products)
  const hasDiscount = item.discount_price && item.discount_price < item.price;
  const displayPrice = hasDiscount ? item.discount_price : item.price;
  const savedAmount = hasDiscount ? (item.price - item.discount_price) : 0;

  // Handle remove with confirmation
  const handleRemoveClick = () => {
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.product_id || item.id);
    }, 300);
  };

  const cancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
        {/* Checkbox for selection */}
        <div className="cart-item-checkbox-wrapper">
          <label className="cart-item-checkbox-container">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="cart-item-checkbox-input"
            />
            <span className="cart-item-checkbox-custom">
              {isSelected && <CheckIcon />}
            </span>
          </label>
        </div>

        {/* Product Image */}
        <Link 
          to={`/product/${createProductSlug(item)}`}
          className="cart-item-image-link"
        >
          <div className="cart-item-image-wrapper">
            <img
              src={item.image_url || item.image || '/placeholder-product.png'}
              alt={item.title || item.name}
              className="cart-item-image"
              loading="lazy"
            />
            {hasDiscount && (
              <div className="cart-item-discount-badge">
                -{Math.round(((item.price - item.discount_price) / item.price) * 100)}%
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="cart-item-info">
          <Link 
            to={`/product/${createProductSlug(item)}`}
            className="cart-item-title"
          >
            {item.title || item.name}
          </Link>

          <div className="cart-item-meta">
            {item.category && (
              <span className="cart-item-category-badge">
                {getCategoryName(item.category, 'vi')}
              </span>
            )}
            {item.language && (
              <span className="cart-item-language-tag">
                <span className="cart-item-language-dot"></span>
                {item.language}
              </span>
            )}
          </div>

          {item.seller && (
            <div className="cart-item-seller">
              Bởi: <span className="cart-item-seller-name">{item.seller.name}</span>
            </div>
          )}

          {/* Mobile Price Info */}
          <div className="cart-item-mobile-price">
            <div className="cart-item-price-wrapper">
              <span className="cart-item-current-price">
                {displayPrice.toLocaleString('vi-VN')}₫
              </span>
              {hasDiscount && (
                <span className="cart-item-original-price">
                  {item.price.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="cart-item-price-section">
          <div className="cart-item-price-wrapper">
            <span className="cart-item-current-price">
              {displayPrice.toLocaleString('vi-VN')}₫
            </span>
            {hasDiscount && (
              <span className="cart-item-original-price">
                {item.price.toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>
          {savedAmount > 0 && (
            <div className="cart-item-saved">
              Tiết kiệm {savedAmount.toLocaleString('vi-VN')}₫
            </div>
          )}
          <div className="cart-item-digital-badge">
            📥 Tải xuống ngay sau khi thanh toán
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemoveClick}
          className="cart-item-remove-btn"
          aria-label="Xóa sản phẩm"
        >
          <TrashIcon />
          <span className="cart-item-remove-text">Xóa</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="cart-item-confirm-overlay" onClick={cancelRemove}>
          <div className="cart-item-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cart-item-confirm-icon">
              <TrashIcon />
            </div>
            <h3 className="cart-item-confirm-title">Xác nhận xóa sản phẩm</h3>
            <p className="cart-item-confirm-message">
              Bạn có chắc chắn muốn xóa <strong>"{item.title || item.name}"</strong> khỏi giỏ hàng?
            </p>
            <div className="cart-item-confirm-actions">
              <button onClick={cancelRemove} className="cart-item-confirm-cancel">
                Hủy
              </button>
              <button onClick={confirmRemove} className="cart-item-confirm-delete">
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
