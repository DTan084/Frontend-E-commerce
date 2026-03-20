// File: src/components/Product/ProductCard.jsx
// Premium product card component with enhanced UI/UX for PC

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { getCategoryName } from '../../data/categories';
import { createProductSlug } from '../../utils/slugHelper';
import { formatPriceCard } from '../../utils/priceFormatter';
import './ProductCard.css';

// Icon Components
const ShoppingCartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const HeartIcon = ({ filled = false }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Normalize product data (support both mock schema variants)
  const productTitle = product.title || product.name;
  const productImage = product.image_url || product.image;
  const productPrice = product.price;
  const productDiscountPrice = product.discount_price || product.originalPrice;
  const productRating = product.rating_average || product.rating || 0;
  const productReviewCount = product.review_count || product.reviews || 0;
  // Use category ID and get display name from centralized config
  const productCategoryId = product.category;
  const productCategory = getCategoryName(productCategoryId, 'vi');
  const productDescription =
    product.description ||
    product.shortDescription ||
    `Giải pháp ${productCategory} chuyên nghiệp với tính năng hiện đại và thực hành tốt nhất.`;

  // Calculate discount
  const hasDiscount = productDiscountPrice && productDiscountPrice > productPrice;
  const discountPercent = hasDiscount
    ? Math.round(((productDiscountPrice - productPrice) / productDiscountPrice) * 100)
    : 0;

  const displayPrice = productPrice;

  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);

    // Optional: Show toast notification
    // toast.success('Added to cart!');
  };

  // Handle quick view
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate to product detail with modal query param
    const slug = createProductSlug(product);
    navigate(`/product/${slug}?quickview=true`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted(!isWishlisted);

    // Optional: Save wishlist to localStorage/mock store
    // toggleWishlist(productId);
  };

  // Render star rating
  const renderStars = () => {
    const rating = productRating;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          <StarIcon filled={i <= rating} />
        </span>
      );
    }

    return stars;
  };

  // Generate product slug
  const productSlug = createProductSlug(product);

  return (
    <div className={`product-card-modern ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
      <Link to={`/product/${productSlug}`} className="card-link">
        {/* Image Container */}
        <div className="card-image-container">
          <div className="image-wrapper">
            {!imageLoaded && (
              <div className="image-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
            )}
            <img
              src={productImage || '/placeholder-product.jpg'}
              alt={productTitle}
              className={`product-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {/* Badges */}
          <div className="card-badges">
            {product.technology && product.technology[0] && (
              <span className="badge language-badge">{product.technology[0]}</span>
            )}
            {hasDiscount && <span className="badge discount-badge">-{discountPercent}%</span>}
            {product.isHot && <span className="badge hot-badge">🔥 Hot</span>}
            {product.isBestSeller && <span className="badge bestseller-badge">⭐ Bán chạy</span>}
          </div>

          {/* Wishlist Button */}
          <button
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Add to wishlist"
          >
            <HeartIcon filled={isWishlisted} />
          </button>

          {/* Quick View Overlay */}
          <div className="quick-view-overlay">
            <button className="quick-view-btn" onClick={handleQuickView} aria-label="Xem nhanh">
              <EyeIcon />
              <span>Xem nhanh</span>
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="card-content">
          {/* Category */}
          <div className="product-category">{productCategory || 'Mã nguồn'}</div>

          {/* Title */}
          <h3 className="product-title">{productTitle}</h3>

          {/* Description (List View Only) */}
          {viewMode === 'list' && <p className="product-description">{productDescription}</p>}

          {/* Rating - Grid View */}
          {viewMode === 'grid' && (
            <div className="product-rating">
              <div className="stars-container">{renderStars()}</div>
              <span className="rating-text">
                {productRating?.toFixed(1) || '0.0'}
                <span className="review-count">({productReviewCount})</span>
              </span>
            </div>
          )}

          {/* Price - Grid View */}
          {viewMode === 'grid' && (
            <div className="product-pricing">
              <div className="price-wrapper">
                <span className="current-price">{formatPriceCard(displayPrice)}</span>
                {hasDiscount && (
                  <span className="original-price">{formatPriceCard(productDiscountPrice)}</span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Row - List View Only */}
          {viewMode === 'list' && (
            <div className="list-view-bottom">
              <div className="list-view-meta">
                <div className="product-rating">
                  <div className="stars-container">{renderStars()}</div>
                  <span className="rating-text">
                    {productRating?.toFixed(1) || '0.0'}
                    <span className="review-count">({productReviewCount})</span>
                  </span>
                </div>
                <div className="product-pricing">
                  <div className="price-wrapper">
                    <span className="current-price">{formatPriceCard(displayPrice)}</span>
                    {hasDiscount && (
                      <span className="original-price">
                        {formatPriceCard(productDiscountPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                aria-label="Thêm vào giỏ hàng"
              >
                <ShoppingCartIcon />
                <span>Thêm vào giỏ</span>
              </button>
            </div>
          )}
        </div>
      </Link>

      {/* Add to Cart Button - Grid View */}
      {viewMode === 'grid' && (
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          aria-label="Thêm vào giỏ hàng"
        >
          <ShoppingCartIcon />
          <span>Thêm vào giỏ</span>
        </button>
      )}
    </div>
  );
};

export default ProductCard;
