// File: src/components/Product/ReviewsSection.jsx
// Premium reviews section with rating distribution and review management

import React, { useState, useEffect } from 'react';
import './ReviewsSection.css';

// Icon Components
const StarIcon = ({ filled = false }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ThumbsUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const ReviewsSection = ({ 
  productId, 
  reviews = [], 
  averageRating = 0, 
  totalReviews = 0,
  userHasPurchased = false,
  currentUser = null,
  onSubmitReview = null 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // recent, rating, helpful
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    hoverRating: 0
  });

  // Review interactions
  const [helpfulClicks, setHelpfulClicks] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  // Sort reviews
  const getSortedReviews = () => {
    let sorted = [...reviews];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'helpful':
        sorted.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
        break;
      case 'recent':
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }
    return sorted.slice(0, visibleReviews);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  // Get user initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle review submission
  const handleSubmitReview = () => {
    if (reviewForm.rating === 0 || reviewForm.comment.trim() === '') {
      alert('Please provide a rating and comment');
      return;
    }

    if (onSubmitReview) {
      onSubmitReview({
        productId,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString()
      });
    }

    // Reset form
    setReviewForm({ rating: 0, comment: '', hoverRating: 0 });
    setIsModalOpen(false);
  };

  // Handle helpful click
  const handleHelpfulClick = (reviewId) => {
    setHelpfulClicks(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Handle reply submission
  const handleReplySubmit = (reviewId) => {
    if (replyText.trim() === '') return;
    
    console.log('Reply to review:', reviewId, replyText);
    setReplyText('');
    setReplyingTo(null);
  };

  // Render star rating
  const renderStars = (rating, size = 'medium', interactive = false) => {
    return (
      <div className={`star-rating ${size} ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= (interactive ? (reviewForm.hoverRating || reviewForm.rating) : rating) ? 'filled' : ''}`}
            onClick={interactive ? () => setReviewForm({ ...reviewForm, rating: star }) : undefined}
            onMouseEnter={interactive ? () => setReviewForm({ ...reviewForm, hoverRating: star }) : undefined}
            onMouseLeave={interactive ? () => setReviewForm({ ...reviewForm, hoverRating: 0 }) : undefined}
            disabled={!interactive}
          >
            <StarIcon filled={star <= (interactive ? (reviewForm.hoverRating || reviewForm.rating) : rating)} />
          </button>
        ))}
      </div>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setSortDropdownOpen(false);
    if (sortDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [sortDropdownOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const sortedReviews = getSortedReviews();
  const hasMoreReviews = reviews.length > visibleReviews;

  return (
    <div className="reviews-section-modern">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">Đánh giá của khách hàng</h2>
        {userHasPurchased && (
          <button 
            className="write-review-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <EditIcon />
            <span>Viết đánh giá</span>
          </button>
        )}
      </div>

      {totalReviews > 0 ? (
        <>
          {/* Overview Section */}
          <div className="reviews-overview">
            {/* Overall Rating */}
            <div className="overall-rating">
              <div className="rating-number">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating), 'large')}
              <div className="rating-count">{totalReviews} đánh giá</div>
            </div>

            {/* Rating Distribution */}
            <div className="rating-distribution">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingDistribution[stars] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                
                return (
                  <div key={stars} className="distribution-row">
                    <div className="star-label">
                      <span>{stars}</span>
                      <StarIcon filled />
                    </div>
                    <div className="distribution-bar">
                      <div 
                        className="distribution-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="distribution-count">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list-container">
            {/* Sort Options */}
            <div className="reviews-controls">
              <div className="sort-dropdown-container">
                <button 
                  className="sort-dropdown-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortDropdownOpen(!sortDropdownOpen);
                  }}
                >
                  <span>Sắp xếp: </span>
                  <span className="sort-value">
                    {sortBy === 'recent' && 'Mới nhất'}
                    {sortBy === 'rating' && 'Đánh giá cao nhất'}
                    {sortBy === 'helpful' && 'Hữu ích nhất'}
                  </span>
                  <ChevronDownIcon />
                </button>
                
                {sortDropdownOpen && (
                  <div className="sort-dropdown-menu">
                    <button 
                      className={`sort-option ${sortBy === 'recent' ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy('recent');
                        setSortDropdownOpen(false);
                      }}
                    >
                      Mới nhất
                    </button>
                    <button 
                      className={`sort-option ${sortBy === 'rating' ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy('rating');
                        setSortDropdownOpen(false);
                      }}
                    >
                      Đánh giá cao nhất
                    </button>
                    <button 
                      className={`sort-option ${sortBy === 'helpful' ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy('helpful');
                        setSortDropdownOpen(false);
                      }}
                    >
                      Hữu ích nhất
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
              {sortedReviews.map((review) => (
                <div key={review.id} className="review-item">
                  {/* Review Header */}
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} alt={review.userName} />
                        ) : (
                          <span className="avatar-initials">
                            {getInitials(review.userName)}
                          </span>
                        )}
                      </div>
                      <div className="reviewer-details">
                        <div className="reviewer-name">{review.userName}</div>
                        <div className="review-date">{formatDate(review.date)}</div>
                      </div>
                    </div>
                    {renderStars(review.rating, 'small')}
                  </div>

                  {/* Review Content */}
                  <div className="review-content">
                    <p className="review-text">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="review-actions">
                    <button 
                      className={`action-btn helpful-btn ${helpfulClicks[review.id] ? 'active' : ''}`}
                      onClick={() => handleHelpfulClick(review.id)}
                    >
                      <ThumbsUpIcon />
                      <span>Hữu ích</span>
                      <span className="count">
                        ({(review.helpfulCount || 0) + (helpfulClicks[review.id] ? 1 : 0)})
                      </span>
                    </button>
                    
                    {currentUser?.isSeller && (
                      <button 
                        className="action-btn reply-btn"
                        onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                      >
                        <MessageCircleIcon />
                        <span>Trả lời</span>
                      </button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="reply-form">
                      <textarea
                        className="reply-textarea"
                        placeholder="Viết phản hồi của bạn..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="3"
                      />
                      <div className="reply-actions">
                        <button 
                          className="btn-cancel"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Hủy
                        </button>
                        <button 
                          className="btn-submit"
                          onClick={() => handleReplySubmit(review.id)}
                        >
                          Gửi phản hồi
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Seller Reply (if exists) */}
                  {review.sellerReply && (
                    <div className="seller-reply">
                      <div className="reply-header">
                        <div className="seller-badge">Phản hồi từ người bán</div>
                        <div className="reply-date">{formatDate(review.sellerReply.date)}</div>
                      </div>
                      <p className="reply-text">{review.sellerReply.comment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreReviews && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn"
                  onClick={() => setVisibleReviews(prev => prev + 5)}
                >
                  Xem thêm đánh giá
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-icon">
            <StarIcon filled={false} />
          </div>
          <h3 className="empty-title">Chưa có đánh giá</h3>
          <p className="empty-description">
            Hãy là người đầu tiên đánh giá sản phẩm này và giúp người khác đưa ra quyết định!
          </p>
          {userHasPurchased && (
            <button 
              className="empty-action-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Viết đánh giá đầu tiên
            </button>
          )}
        </div>
      )}

      {/* Review Modal */}
      {isModalOpen && (
        <div className="review-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header">
              <h3 className="modal-title">Viết đánh giá</h3>
              <button 
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <XIcon />
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Rating Selector */}
              <div className="form-group">
                <label className="form-label">Đánh giá của bạn *</label>
                {renderStars(reviewForm.rating, 'large', true)}
                {reviewForm.rating > 0 && (
                  <div className="rating-text">
                    {reviewForm.rating === 1 && 'Kém'}
                    {reviewForm.rating === 2 && 'Trung bình'}
                    {reviewForm.rating === 3 && 'Tốt'}
                    {reviewForm.rating === 4 && 'Rất tốt'}
                    {reviewForm.rating === 5 && 'Xuất sắc'}
                  </div>
                )}
              </div>

              {/* Comment Textarea */}
              <div className="form-group">
                <label className="form-label">Nhận xét của bạn *</label>
                <textarea
                  className="form-textarea"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows="6"
                />
                <div className="character-count">
                  {reviewForm.comment.length} / 500 ký tự
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy
              </button>
              <button 
                className="btn-primary"
                onClick={handleSubmitReview}
                disabled={reviewForm.rating === 0 || reviewForm.comment.trim() === ''}
              >
                Gửi đánh giá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
