import React from 'react';
import { Link } from 'react-router-dom';
import './EmptyCart.css';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-content">
        {/* Animated Icon */}
        <div className="empty-icon-wrapper">
          <span className="empty-icon">🛒</span>
          <div className="icon-circle"></div>
          <div className="icon-circle-2"></div>
        </div>

        {/* Message */}
        <h2 className="empty-title">Giỏ hàng trống</h2>
        <p className="empty-description">
          Bạn chưa thêm sản phẩm nào vào giỏ hàng.
          <br />
          Hãy bắt đầu mua sắm để khám phá những sản phẩm tuyệt vời!
        </p>

        {/* Action Buttons */}
        <div className="empty-actions">
          <Link to="/products" className="browse-btn">
            <span className="icon">🔍</span>
            <span>Xem sản phẩm</span>
            <span className="arrow">→</span>
          </Link>
          <Link to="/" className="home-btn">
            <span className="icon">🏠</span>
            <span>Về trang chủ</span>
          </Link>
        </div>

        {/* Suggestions */}
        <div className="suggestions">
          <h3 className="suggestions-title">Tại sao mua tại chúng tôi?</h3>
          <div className="suggestions-grid">
            <div className="suggestion-item">
              <span className="suggestion-icon">✨</span>
              <h4>Chất lượng cao</h4>
              <p>Mã nguồn và template chất lượng cao</p>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">🚀</span>
              <h4>Truy cập ngay lập tức</h4>
              <p>Tải xuống ngay sau khi mua</p>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">💬</span>
              <h4>Hỗ trợ chuyên nghiệp</h4>
              <p>Hỗ trợ tận tình trong 6 tháng</p>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-icon">🔄</span>
              <h4>Cập nhật miễn phí</h4>
              <p>Cập nhật trọn đời cho tất cả sản phẩm</p>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="popular-categories">
          <h3 className="categories-title">Danh mục phổ biến</h3>
          <div className="categories-grid">
            <Link to="/products?category=ban-hang-tmdt" className="category-link">
              <span className="category-icon">🛍️</span>
              <span>Bán hàng - TMĐT</span>
            </Link>
            <Link to="/products?category=quan-ly" className="category-link">
              <span className="category-icon">📊</span>
              <span>Quản lý</span>
            </Link>
            <Link to="/products?category=gioi-thieu-dich-vu" className="category-link">
              <span className="category-icon">🎨</span>
              <span>Giới thiệu - Dịch vụ</span>
            </Link>
            <Link to="/products?category=giao-duc-y-te" className="category-link">
              <span className="category-icon">📱</span>
              <span>Giáo dục - Y tế</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
