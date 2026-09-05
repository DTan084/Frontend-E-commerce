import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Download,
  Star,
  Sparkles,
  ShoppingBag,
  Building2,
  Newspaper,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Home as HomeIcon,
  Plane,
  GraduationCap,
  Laptop,
  Code2,
} from 'lucide-react';
import { getCategoryName } from '../../data/categories';
import { formatPrice } from '../../utils/priceFormatter';
import './ProductInfo.css';

const categoryIconMap = {
  'ban-hang-tmdt': ShoppingBag,
  'gioi-thieu-dich-vu': Building2,
  'tin-tuc': Newspaper,
  'quan-ly': BarChart3,
  'giai-tri': Gamepad2,
  'dien-dan': MessageSquare,
  'bat-dong-san': HomeIcon,
  'du-lich-khach-san': Plane,
  'giao-duc-y-te': GraduationCap,
  'may-tinh-dich-vu': Laptop,
  khac: Code2,
};

const ProductInfo = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity: 1 });
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, quantity: 1 });
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name || product.title,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discount = calculateDiscount();
  const categoryName = getCategoryName(product.category, 'vi') || 'Mã nguồn';
  const CategoryIcon = categoryIconMap[product.category] || Code2;
  const ratingValue = Number(product.rating || product.rating_average) || 5.0;
  const reviewCount = Number(product.reviews || product.review_count) || 0;
  const soldCount = product.sold || product.downloads || 0;

  return (
    <div className="product-info-modern">
      {/* Category and Tech Tags Row */}
      <div className="product-meta-tags-row">
        <span className="product-meta-category-tag">
          <CategoryIcon size={14} />
          <span>{categoryName}</span>
        </span>
        {product.technology && product.technology.length > 0 && (
          <span className="product-meta-tech-tag">
            <Code2 size={13} />
            <span>{product.technology[0]}</span>
          </span>
        )}
        {product.isHot && (
          <span className="product-meta-badge-hot">
            <Sparkles size={12} />
            <span>Hot Choice</span>
          </span>
        )}
      </div>

      {/* Product Title */}
      <h1 className="product-main-heading">{product.name || product.title}</h1>

      {/* Rating & Sales Summary */}
      <div className="product-rating-sales-bar">
        <div className="product-rating-stars-box">
          <div className="stars-group">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                className={star <= Math.round(ratingValue) ? 'star-filled' : 'star-empty'}
                fill={star <= Math.round(ratingValue) ? '#f59e0b' : 'none'}
                color={star <= Math.round(ratingValue) ? '#f59e0b' : '#cbd5e1'}
              />
            ))}
          </div>
          <span className="rating-score-text">{ratingValue.toFixed(1)}</span>
          <span className="rating-review-count">({reviewCount} đánh giá)</span>
        </div>

        <span className="rating-sales-divider">•</span>

        <div className="product-sales-count-box">
          <Download size={14} className="sales-icon" />
          <span>{soldCount} lượt mua</span>
        </div>
      </div>

      {/* Price & Discount Banner */}
      <div className="product-pricing-card">
        <div className="price-row-top">
          <span className="product-price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-price-original">{formatPrice(product.originalPrice)}</span>
          )}
          {discount > 0 && <span className="product-discount-pill">Tiết kiệm {discount}%</span>}
        </div>
        <div className="price-features-note">
          <ShieldCheck size={14} className="shield-icon" />
          <span>Thanh toán 1 lần • Sở hữu vĩnh viễn • Miễn phí cập nhật</span>
        </div>
      </div>

      {/* What's Included Grid */}
      <div className="product-includes-section">
        <h4 className="includes-header-title">
          <Sparkles size={16} className="title-icon" />
          <span>Quyền lợi khi mua mã nguồn</span>
        </h4>
        <div className="includes-items-grid">
          <div className="include-card-item">
            <CheckCircle2 size={16} className="item-check-icon" />
            <span>Mã nguồn hoàn chỉnh 100%</span>
          </div>
          <div className="include-card-item">
            <CheckCircle2 size={16} className="item-check-icon" />
            <span>Tài liệu cài đặt & Cấu hình</span>
          </div>
          <div className="include-card-item">
            <CheckCircle2 size={16} className="item-check-icon" />
            <span>Hỗ trợ kỹ thuật 24/7</span>
          </div>
          <div className="include-card-item">
            <CheckCircle2 size={16} className="item-check-icon" />
            <span>Chính sách hoàn tiền an toàn</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="product-action-buttons-group">
        <button type="button" className="btn-add-to-cart-primary" onClick={handleAddToCart}>
          <ShoppingCart size={18} />
          <span>Thêm vào giỏ</span>
        </button>

        <button type="button" className="btn-buy-now-accent" onClick={handleBuyNow}>
          <Zap size={18} />
          <span>Mua ngay</span>
        </button>
      </div>

      {/* Secondary Actions Row: Live Demo, Wishlist, Share */}
      <div className="product-secondary-actions-row">
        {product.demoUrl && (
          <a
            href={product.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live-demo-action"
          >
            <ExternalLink size={15} />
            <span>Xem Demo trực tiếp</span>
          </a>
        )}

        <button
          type="button"
          className={`btn-action-icon-pill ${isWishlisted ? 'active' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          title={isWishlisted ? 'Bỏ lưu' : 'Lưu sản phẩm'}
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#ef4444' : 'none'}
            color={isWishlisted ? '#ef4444' : 'currentColor'}
          />
          <span>{isWishlisted ? 'Đã lưu' : 'Lưu'}</span>
        </button>

        <button
          type="button"
          className="btn-action-icon-pill"
          onClick={handleShare}
          title="Chia sẻ sản phẩm"
        >
          <Share2 size={16} />
          <span>{copied ? 'Đã sao chép link!' : 'Chia sẻ'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
