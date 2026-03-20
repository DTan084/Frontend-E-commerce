import React from 'react';
import './TopProducts.css';

const TopProducts = () => {
  const topProducts = [
    {
      id: 1,
      rank: 1,
      name: 'Premium Admin Dashboard',
      image: 'https://via.placeholder.com/150x100/667eea/ffffff?text=Admin+Dashboard',
      sales: 156,
      revenue: 15444,
      rating: 4.9,
      reviews: 89,
      trend: 'up',
      trendValue: '+12%',
    },
    {
      id: 2,
      rank: 2,
      name: 'E-commerce UI Kit Pro',
      image: 'https://via.placeholder.com/150x100/48bb78/ffffff?text=E-commerce+Kit',
      sales: 142,
      revenue: 21188,
      rating: 4.8,
      reviews: 76,
      trend: 'up',
      trendValue: '+8%',
    },
    {
      id: 3,
      rank: 3,
      name: 'Landing Page Bundle',
      image: 'https://via.placeholder.com/150x100/ed8936/ffffff?text=Landing+Pages',
      sales: 138,
      revenue: 10902,
      rating: 4.7,
      reviews: 65,
      trend: 'up',
      trendValue: '+5%',
    },
    {
      id: 4,
      rank: 4,
      name: 'Mobile App Template',
      image: 'https://via.placeholder.com/150x100/9f7aea/ffffff?text=Mobile+App',
      sales: 125,
      revenue: 16125,
      rating: 4.6,
      reviews: 58,
      trend: 'down',
      trendValue: '-2%',
    },
  ];

  const getRankEmoji = (rank) => {
    const emojis = {
      1: '🥇',
      2: '🥈',
      3: '🥉',
      4: '🏅',
    };
    return emojis[rank] || '🏅';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">⭐</span>);
    }

    return stars;
  };

  return (
    <div className="top-products-container">
      <div className="top-products-header">
        <div className="header-title-section">
          <h2 className="section-title">
            🏆 Top Selling Products
          </h2>
          <p className="section-subtitle">
            Your best performers this month
          </p>
        </div>
        <div className="header-stats">
          <div className="header-stat-item">
            <span className="stat-label">Total Sales</span>
            <strong className="stat-value">{topProducts.reduce((sum, p) => sum + p.sales, 0)}</strong>
          </div>
        </div>
      </div>

      <div className="top-products-grid">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className={`top-product-card rank-${product.rank}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Rank Badge */}
            <div className="rank-badge">
              <span className="rank-emoji">{getRankEmoji(product.rank)}</span>
              <span className="rank-number">#{product.rank}</span>
            </div>

            {/* Product Image */}
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="image-overlay">
                <button className="overlay-btn">View Details</button>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              
              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Stats */}
              <div className="product-stats">
                <div className="stat-item">
                  <span className="stat-icon">📦</span>
                  <div className="stat-content">
                    <strong>{product.sales}</strong>
                    <span>Sales</span>
                  </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-icon">💰</span>
                  <div className="stat-content">
                    <strong>${product.revenue.toLocaleString()}</strong>
                    <span>Revenue</span>
                  </div>
                </div>
              </div>

              {/* Trend */}
              <div className={`product-trend ${product.trend}`}>
                <span className="trend-icon">{product.trend === 'up' ? '📈' : '📉'}</span>
                <span className="trend-value">{product.trendValue}</span>
                <span className="trend-label">vs last month</span>
              </div>
            </div>

            {/* Card Shine Effect */}
            <div className="card-shine"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
