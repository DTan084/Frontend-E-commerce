import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Eye, Heart, Flame, Award, Code2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { getCategoryName } from '../../data/categories';
import { createProductSlug } from '../../utils/slugHelper';
import { formatPrice } from '../../utils/priceFormatter';
import './ProductCard.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Normalize product data
  const productTitle = product.title || product.name || 'Mã nguồn không tên';
  const productImage = product.image_url || product.image || product.thumbnail;
  const productPrice = Number(product.price) || 0;
  const productDiscountPrice = Number(product.discount_price || product.originalPrice) || 0;
  const productRating = Number(product.rating_average || product.rating) || 5.0;
  const productReviewCount = Number(product.review_count || product.reviews) || 0;
  const productCategory = getCategoryName(product.category, 'vi') || 'Mã nguồn';
  const authorName = product.seller?.name || product.author || 'CodeMart Dev';

  // Calculate discount
  const hasDiscount = productDiscountPrice > productPrice;
  const discountPercent = hasDiscount
    ? Math.round(((productDiscountPrice - productPrice) / productDiscountPrice) * 100)
    : 0;

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Handle quick view
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const slug = createProductSlug(product);
    navigate(`/product/${slug}?quickview=true`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const productSlug = createProductSlug(product);

  return (
    <div className={`product-card-modern ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
      <Link to={`/product/${productSlug}`} className="card-link">
        {/* Image Container */}
        <div className="card-image-container">
          <div className="image-wrapper">
            {!imageError && productImage ? (
              <img
                src={productImage}
                alt={productTitle}
                className="product-image"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="image-placeholder-fallback">
                <Code2 size={40} className="fallback-icon" />
                <span className="fallback-tag">{product.technology?.[0] || 'SOURCE CODE'}</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="card-badges">
            {product.technology && product.technology[0] && (
              <span className="badge tech-badge">{product.technology[0]}</span>
            )}
            {hasDiscount && <span className="badge discount-badge">-{discountPercent}%</span>}
            {product.isHot && (
              <span className="badge hot-badge">
                <Flame size={12} /> Hot
              </span>
            )}
            {product.isBestSeller && (
              <span className="badge bestseller-badge">
                <Award size={12} /> Bán chạy
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Thêm vào danh sách yêu thích"
          >
            <Heart
              size={16}
              fill={isWishlisted ? '#ef4444' : 'none'}
              color={isWishlisted ? '#ef4444' : 'currentColor'}
            />
          </button>

          {/* Quick View Overlay */}
          <div className="quick-view-overlay">
            <button
              type="button"
              className="quick-view-btn"
              onClick={handleQuickView}
              aria-label="Xem nhanh"
            >
              <Eye size={15} />
              <span>Xem nhanh</span>
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="card-content">
          <div className="card-top-meta">
            <span className="product-category">{productCategory}</span>
            <span className="product-author">{authorName}</span>
          </div>

          <h3 className="product-title" title={productTitle}>
            {productTitle}
          </h3>

          <div className="product-rating">
            <div className="stars-container">
              <Star size={13} className="star-icon filled" fill="#f59e0b" color="#f59e0b" />
              <span className="rating-score">{productRating.toFixed(1)}</span>
            </div>
            <span className="review-count">({productReviewCount})</span>
          </div>

          <div className="card-footer-row">
            <div className="product-pricing">
              <span className="current-price">{formatPrice(productPrice)}</span>
              {hasDiscount && (
                <span className="original-price">{formatPrice(productDiscountPrice)}</span>
              )}
            </div>

            <button
              type="button"
              className="add-to-cart-icon-btn"
              onClick={handleAddToCart}
              title="Thêm vào giỏ hàng"
              aria-label="Thêm vào giỏ"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
