import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Eye, Heart, Flame, Award, Code2, CheckCircle2 } from 'lucide-react';
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
  const [isAdded, setIsAdded] = useState(false);

  // Normalize product data
  const productTitle = product.title || product.name || 'Mã nguồn không tên';
  const productImage = product.image_url || product.image || product.thumbnail;
  const productPrice = Number(product.price) || 0;
  const productDiscountPrice = Number(product.discount_price || product.originalPrice) || 0;
  const productRating = Number(product.rating_average || product.rating) || 5.0;
  const productReviewCount = Number(product.review_count || product.reviews) || 0;
  const productCategory = getCategoryName(product.category, 'vi') || 'Mã nguồn';
  const authorName = product.seller?.name || product.author || 'CodeMart Dev';
  const primaryTech =
    product.technology && product.technology.length > 0 ? product.technology[0] : null;

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
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
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
                <Code2 size={36} className="fallback-icon" />
                <span className="fallback-tag">{primaryTech || 'SOURCE CODE'}</span>
              </div>
            )}
          </div>

          {/* Primary Top-Left Promo Badge (Only 1 primary badge) */}
          <div className="card-top-badge-slot">
            {product.isBestSeller ? (
              <span className="badge-promo bestseller">
                <Award size={11} /> Bán chạy
              </span>
            ) : product.isHot ? (
              <span className="badge-promo hot">
                <Flame size={11} /> Hot
              </span>
            ) : hasDiscount ? (
              <span className="badge-promo discount">-{discountPercent}%</span>
            ) : null}
          </div>

          {/* Bottom-Left Technology Pill */}
          {primaryTech && (
            <div className="card-tech-overlay-slot">
              <span className="badge-tech-overlay">{primaryTech}</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            type="button"
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Thêm vào danh sách yêu thích"
          >
            <Heart
              size={15}
              fill={isWishlisted ? '#ef4444' : 'none'}
              color={isWishlisted ? '#ef4444' : '#64748b'}
            />
          </button>

          {/* Quick View Hover Overlay */}
          <div className="quick-view-overlay">
            <button
              type="button"
              className="quick-view-btn"
              onClick={handleQuickView}
              aria-label="Xem nhanh"
            >
              <Eye size={14} />
              <span>Xem nhanh</span>
            </button>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="card-content">
          {/* Category & Seller Row */}
          <div className="card-top-meta-row">
            <span className="product-category-chip">{productCategory}</span>
            <div className="product-author-box">
              <span className="author-name">{authorName}</span>
              <CheckCircle2 size={12} className="verified-author-icon" />
            </div>
          </div>

          {/* Product Title */}
          <h3 className="product-title" title={productTitle}>
            {productTitle}
          </h3>

          {/* Rating & Social Proof */}
          <div className="product-rating-row">
            <div className="stars-box">
              <Star size={12} className="star-icon filled" fill="#f59e0b" color="#f59e0b" />
              <span className="rating-score">{productRating.toFixed(1)}</span>
            </div>
            <span className="review-count">({productReviewCount} đánh giá)</span>
          </div>

          {/* Footer: Price & Add to Cart */}
          <div className="card-footer-row">
            <div className="product-pricing-box">
              <span className="current-price">{formatPrice(productPrice)}</span>
              {hasDiscount && (
                <span className="original-price">{formatPrice(productDiscountPrice)}</span>
              )}
            </div>

            <button
              type="button"
              className={`add-to-cart-icon-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              aria-label="Thêm vào giỏ hàng"
              title="Thêm vào giỏ hàng"
            >
              {isAdded ? <CheckCircle2 size={16} /> : <ShoppingCart size={16} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
