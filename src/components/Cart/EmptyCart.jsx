import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Headphones,
  Code2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { getAllCategories } from '../../data/categories';
import './EmptyCart.css';

const EmptyCart = () => {
  const quickCategories = (getAllCategories() || []).slice(0, 4);

  return (
    <div className="empty-cart-modern">
      {/* Empty State Card */}
      <div className="empty-cart-card">
        <div className="empty-cart-icon-halo">
          <div className="empty-cart-icon-bg">
            <ShoppingBag size={40} className="bag-icon" />
          </div>
          <Sparkles size={20} className="sparkle-float-1" />
          <Zap size={16} className="sparkle-float-2" />
        </div>

        <h2 className="empty-cart-title">Giỏ hàng của bạn đang trống</h2>
        <p className="empty-cart-subtitle">
          Chưa có mã nguồn hay template nào trong giỏ. Khám phá kho mã nguồn chất lượng cao đã được
          kiểm duyệt kỹ lưỡng để nâng tốc độ phát triển dự án của bạn ngay hôm nay!
        </p>

        {/* Primary CTA */}
        <div className="empty-cart-actions">
          <Link to="/products" className="btn-empty-explore-primary">
            <Search size={16} />
            <span>Khám phá mã nguồn</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/" className="btn-empty-home-secondary">
            <span>Về trang chủ</span>
          </Link>
        </div>

        {/* Category Quick Links */}
        <div className="empty-cart-quick-categories">
          <span className="quick-cats-label">Danh mục phổ biến:</span>
          <div className="quick-cats-pills">
            {quickCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="quick-cat-pill-link"
              >
                <Code2 size={13} />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Value Proposition Cards */}
      <div className="empty-cart-value-props-grid">
        <div className="value-prop-box">
          <div className="prop-icon-bubble emerald">
            <ShieldCheck size={20} />
          </div>
          <div className="prop-text-wrap">
            <h4 className="prop-heading">100% Đã kiểm duyệt</h4>
            <p className="prop-desc">Mã nguồn chạy thử an toàn, không chứa mã độc</p>
          </div>
        </div>

        <div className="value-prop-box">
          <div className="prop-icon-bubble indigo">
            <Zap size={20} />
          </div>
          <div className="prop-text-wrap">
            <h4 className="prop-heading">Tải về tức thì</h4>
            <p className="prop-desc">
              Nhận link Google Drive / Github & License ngay khi thanh toán
            </p>
          </div>
        </div>

        <div className="value-prop-box">
          <div className="prop-icon-bubble blue">
            <RefreshCw size={20} />
          </div>
          <div className="prop-text-wrap">
            <h4 className="prop-heading">Cập nhật miễn phí</h4>
            <p className="prop-desc">Tải các bản vá lỗi và nâng cấp phiên bản mới trọn đời</p>
          </div>
        </div>

        <div className="value-prop-box">
          <div className="prop-icon-bubble purple">
            <Headphones size={20} />
          </div>
          <div className="prop-text-wrap">
            <h4 className="prop-heading">Hỗ trợ kỹ thuật 24/7</h4>
            <p className="prop-desc">
              Tác giả và đội ngũ CodeMart hỗ trợ cài đặt trực tiếp qua UltraView
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
