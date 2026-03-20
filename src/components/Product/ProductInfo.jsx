import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryName, getCategoryIcon } from '../../data/categories';
import { formatPrice } from '../../utils/priceFormatter';
import './ProductInfo.css';

const ProductInfo = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity: 1 });
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity: 1 });
    navigate('/checkout');
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discount = calculateDiscount();
  
  // Get category display name in Vietnamese
  const categoryName = getCategoryName(product.category, 'vi');
  const categoryIcon = getCategoryIcon(product.category);

  return (
    <div className="product-info">
      {/* Category Tags */}
      <div className="tags-row">
        <span className="category-tag">
          {categoryIcon} {categoryName}
        </span>
        {product.technology && product.technology[0] && (
          <span className="category-tag">{product.technology[0]}</span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="product-title">{product.name}</h1>

      {/* Rating and Stats */}
      <div className="rating-section">
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
              ★
            </span>
          ))}
        </div>
        <span className="rating-number">{product.rating}</span>
        <span className="reviews-link">({product.reviews} đánh giá)</span>
        <span className="separator">|</span>
        <span className="sales-info">
          <span className="icon">⬇</span>
          {product.sold || product.downloads} lượt bán
        </span>
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="price-main">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
          {discount > 0 && (
            <span className="discount-badge">Tiết kiệm {discount}%</span>
          )}
        </div>
        <p className="payment-note">Thanh toán một lần. Truy cập trọn đời.</p>
      </div>

      {/* What's Included */}
      <div className="whats-included">
        <h3 className="included-title">
          <span className="icon">✓</span>
          Bao gồm
        </h3>
        <div className="included-grid">
          <div className="included-item">
            <span className="icon">✓</span>
            <span>Cập nhật miễn phí</span>
          </div>
          <div className="included-item">
            <span className="icon">✓</span>
            <span>Tài liệu hướng dẫn</span>
          </div>
          <div className="included-item">
            <span className="icon">✓</span>
            <span>Hỗ trợ 24/7</span>
          </div>
          <div className="included-item">
            <span className="icon">✓</span>
            <span>Hoàn tiền</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-add-cart" onClick={handleAddToCart}>
          <span className="icon">🛒</span>
          Thêm vào giỏ
        </button>
        <button className="btn-buy-now" onClick={handleBuyNow}>
          Mua ngay
        </button>
      </div>

      {/* Save and Share */}
      <div className="secondary-actions">
        <button className="btn-save">
          <span className="icon">♡</span>
          Lưu
        </button>
        <button className="btn-share">
          <span className="icon">↗</span>
          Chia sẻ
        </button>
      </div>

      {/* Additional Links */}
      <div className="additional-links">
        <a href="#demo" className="link-item">
          <span className="icon">↗</span>
          Xem Demo
        </a>
        <a href="#docs" className="link-item">
          <span className="icon">📄</span>
          Tài liệu
        </a>
      </div>
    </div>
  );
};

export default ProductInfo;
