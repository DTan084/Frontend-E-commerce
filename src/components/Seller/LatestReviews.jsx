import React from 'react';
import './LatestReviews.css';

const LatestReviews = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      comment: 'Absolutely amazing! The code quality is exceptional and documentation is crystal clear. Highly recommended!',
      reviewer: {
        name: 'Sarah Johnson',
        avatar: 'https://via.placeholder.com/50x50/48bb78/ffffff?text=SJ',
      },
      product: {
        name: 'Premium Admin Dashboard',
        image: 'https://via.placeholder.com/60x60/667eea/ffffff?text=Admin',
      },
      date: '2 hours ago',
      helpful: 24,
    },
    {
      id: 2,
      rating: 4,
      comment: 'Great template with lots of features. Would love to see more color schemes in future updates.',
      reviewer: {
        name: 'Michael Chen',
        avatar: 'https://via.placeholder.com/50x50/ed8936/ffffff?text=MC',
      },
      product: {
        name: 'E-commerce UI Kit',
        image: 'https://via.placeholder.com/60x60/48bb78/ffffff?text=Ecom',
      },
      date: '5 hours ago',
      helpful: 18,
    },
    {
      id: 3,
      rating: 5,
      comment: 'Perfect for my project! Saved me weeks of development time. Worth every penny!',
      reviewer: {
        name: 'Emily Davis',
        avatar: 'https://via.placeholder.com/50x50/9f7aea/ffffff?text=ED',
      },
      product: {
        name: 'Landing Page Bundle',
        image: 'https://via.placeholder.com/60x60/ed8936/ffffff?text=Land',
      },
      date: '1 day ago',
      helpful: 31,
    },
    {
      id: 4,
      rating: 4,
      comment: 'Solid template with clean code. Minor issue with responsive design on tablets, but seller fixed it quickly!',
      reviewer: {
        name: 'David Wilson',
        avatar: 'https://via.placeholder.com/50x50/f093fb/ffffff?text=DW',
      },
      product: {
        name: 'Mobile App Template',
        image: 'https://via.placeholder.com/60x60/9f7aea/ffffff?text=Mobile',
      },
      date: '2 days ago',
      helpful: 15,
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`review-star ${index < rating ? 'filled' : ''}`}
      >
        ⭐
      </span>
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 5) return '#48bb78';
    if (rating >= 4) return '#667eea';
    if (rating >= 3) return '#ed8936';
    return '#e53e3e';
  };

  return (
    <div className="latest-reviews-container">
      <div className="reviews-header">
        <div className="header-title-section">
          <h2 className="section-title">
            💬 Latest Reviews
          </h2>
          <p className="section-subtitle">
            What customers are saying about your products
          </p>
        </div>
        <div className="reviews-summary">
          <div className="summary-rating">
            <strong className="rating-value">4.8</strong>
            <div className="rating-stars">
              {renderStars(5)}
            </div>
            <span className="rating-count">{reviews.length} reviews</span>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="review-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Review Header */}
            <div className="review-card-header">
              <div className="reviewer-info">
                <img
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  className="reviewer-avatar"
                />
                <div className="reviewer-details">
                  <h4 className="reviewer-name">{review.reviewer.name}</h4>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>

              <div className="product-preview">
                <img
                  src={review.product.image}
                  alt={review.product.name}
                  className="product-thumb"
                />
                <span className="product-name-small">{review.product.name}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="review-rating-section">
              <div className="review-stars">
                {renderStars(review.rating)}
              </div>
              <span
                className="rating-badge"
                style={{ background: `${getRatingColor(review.rating)}15`, color: getRatingColor(review.rating) }}
              >
                {review.rating}.0
              </span>
            </div>

            {/* Comment */}
            <p className="review-comment">{review.comment}</p>

            {/* Footer */}
            <div className="review-card-footer">
              <button className="helpful-btn">
                <span className="btn-icon">👍</span>
                <span className="btn-text">Helpful ({review.helpful})</span>
              </button>
              <button className="reply-btn">
                <span className="btn-icon">💬</span>
                <span className="btn-text">Reply</span>
              </button>
              <button className="more-btn">
                <span className="btn-icon">⋯</span>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="review-glow" style={{ background: getRatingColor(review.rating) }}></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="reviews-footer">
        <button className="view-all-reviews-btn">
          View All Reviews
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default LatestReviews;
