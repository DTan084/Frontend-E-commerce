import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, X, ChevronDown, Edit3, MessageSquare } from 'lucide-react';
import './ReviewsSection.css';

const ReviewsSection = ({
  productId,
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  userHasPurchased = false,
  currentUser = null,
  onSubmitReview = null,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // recent, rating, helpful
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    hoverRating: 0,
  });

  // Review interactions
  const [helpfulClicks, setHelpfulClicks] = useState({});
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
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
      .map((n) => n[0])
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
        date: new Date().toISOString(),
      });
    }

    // Reset form
    setReviewForm({ rating: 0, comment: '', hoverRating: 0 });
    setIsModalOpen(false);
  };

  // Handle helpful click
  const handleHelpfulClick = (reviewId) => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
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
      <div className={`star-rating-box ${size} ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled =
            star <= (interactive ? reviewForm.hoverRating || reviewForm.rating : rating);
          return (
            <button
              key={star}
              type="button"
              className={`star-btn ${isFilled ? 'filled' : 'empty'}`}
              onClick={
                interactive ? () => setReviewForm({ ...reviewForm, rating: star }) : undefined
              }
              onMouseEnter={
                interactive ? () => setReviewForm({ ...reviewForm, hoverRating: star }) : undefined
              }
              onMouseLeave={
                interactive ? () => setReviewForm({ ...reviewForm, hoverRating: 0 }) : undefined
              }
              disabled={!interactive}
            >
              <Star
                size={size === 'large' ? 24 : size === 'small' ? 14 : 18}
                fill={isFilled ? '#f59e0b' : 'none'}
                color={isFilled ? '#f59e0b' : '#cbd5e1'}
              />
            </button>
          );
        })}
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
      <div className="reviews-section-header">
        <div className="header-left-title">
          <MessageSquare size={20} className="title-icon" />
          <h2 className="section-title">Đánh giá của khách hàng</h2>
        </div>
        {userHasPurchased && (
          <button type="button" className="write-review-btn" onClick={() => setIsModalOpen(true)}>
            <Edit3 size={15} />
            <span>Viết đánh giá</span>
          </button>
        )}
      </div>

      {totalReviews > 0 ? (
        <>
          {/* Overview Section */}
          <div className="reviews-overview-card">
            {/* Overall Rating */}
            <div className="overall-rating-box">
              <div className="overall-score">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating), 'medium')}
              <div className="total-reviews-label">{totalReviews} đánh giá đã xác minh</div>
            </div>

            {/* Rating Distribution */}
            <div className="rating-distribution-bars">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingDistribution[stars] || 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={stars} className="distribution-row-item">
                    <div className="star-level-label">
                      <span>{stars}</span>
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    </div>
                    <div className="distribution-track">
                      <div className="distribution-bar-fill" style={{ width: `${percentage}%` }} />
                    </div>
                    <div className="distribution-count-number">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-list-container">
            {/* Sort Options */}
            <div className="reviews-controls-bar">
              <div className="sort-dropdown-wrapper">
                <button
                  type="button"
                  className="sort-trigger-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortDropdownOpen(!sortDropdownOpen);
                  }}
                >
                  <span className="sort-label-text">Sắp xếp: </span>
                  <span className="sort-selected-value">
                    {sortBy === 'recent' && 'Mới nhất'}
                    {sortBy === 'rating' && 'Đánh giá cao nhất'}
                    {sortBy === 'helpful' && 'Hữu ích nhất'}
                  </span>
                  <ChevronDown size={15} />
                </button>

                {sortDropdownOpen && (
                  <div className="sort-menu-dropdown">
                    <button
                      type="button"
                      className={`sort-menu-item ${sortBy === 'recent' ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy('recent');
                        setSortDropdownOpen(false);
                      }}
                    >
                      Mới nhất
                    </button>
                    <button
                      type="button"
                      className={`sort-menu-item ${sortBy === 'rating' ? 'active' : ''}`}
                      onClick={() => {
                        setSortBy('rating');
                        setSortDropdownOpen(false);
                      }}
                    >
                      Đánh giá cao nhất
                    </button>
                    <button
                      type="button"
                      className={`sort-menu-item ${sortBy === 'helpful' ? 'active' : ''}`}
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
            <div className="reviews-items-list">
              {sortedReviews.map((review) => (
                <div key={review.id} className="single-review-card">
                  {/* Review Header */}
                  <div className="single-review-top">
                    <div className="reviewer-profile-info">
                      <div className="reviewer-avatar-box">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} alt={review.userName} />
                        ) : (
                          <span className="avatar-initials-text">
                            {getInitials(review.userName)}
                          </span>
                        )}
                      </div>
                      <div className="reviewer-name-meta">
                        <div className="reviewer-name-str">{review.userName}</div>
                        <div className="review-timestamp-str">{formatDate(review.date)}</div>
                      </div>
                    </div>
                    {renderStars(review.rating, 'small')}
                  </div>

                  {/* Review Content */}
                  <div className="review-text-wrapper">
                    <p className="review-comment-body">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="review-bottom-actions">
                    <button
                      type="button"
                      className={`btn-helpful-feedback ${helpfulClicks[review.id] ? 'active' : ''}`}
                      onClick={() => handleHelpfulClick(review.id)}
                    >
                      <ThumbsUp size={14} />
                      <span>Hữu ích</span>
                      <span className="helpful-count-badge">
                        ({(review.helpfulCount || 0) + (helpfulClicks[review.id] ? 1 : 0)})
                      </span>
                    </button>

                    {currentUser?.isSeller && (
                      <button
                        type="button"
                        className="btn-reply-feedback"
                        onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                      >
                        <MessageCircle size={14} />
                        <span>Trả lời</span>
                      </button>
                    )}
                  </div>

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="seller-reply-form">
                      <textarea
                        className="reply-textarea-input"
                        placeholder="Viết phản hồi chính thức từ người bán..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="3"
                      />
                      <div className="reply-buttons-row">
                        <button
                          type="button"
                          className="btn-cancel-reply"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          className="btn-submit-reply"
                          onClick={() => handleReplySubmit(review.id)}
                        >
                          Gửi phản hồi
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Seller Reply */}
                  {review.sellerReply && (
                    <div className="seller-official-reply">
                      <div className="official-reply-header">
                        <span className="seller-badge-tag">Phản hồi từ tác giả</span>
                        <span className="reply-date-str">
                          {formatDate(review.sellerReply.date)}
                        </span>
                      </div>
                      <p className="reply-comment-body">{review.sellerReply.comment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreReviews && (
              <div className="load-more-reviews-center">
                <button
                  type="button"
                  className="btn-load-more-reviews"
                  onClick={() => setVisibleReviews((prev) => prev + 5)}
                >
                  Xem thêm đánh giá khác
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="empty-reviews-state-card">
          <div className="empty-star-icon-box">
            <Star size={36} color="#cbd5e1" />
          </div>
          <h3 className="empty-reviews-heading">Chưa có đánh giá nào</h3>
          <p className="empty-reviews-subtext">
            Hãy là người đầu tiên trải nghiệm và chia sẻ nhận xét về mã nguồn này!
          </p>
          {userHasPurchased && (
            <button
              type="button"
              className="btn-write-first-review"
              onClick={() => setIsModalOpen(true)}
            >
              Viết đánh giá đầu tiên
            </button>
          )}
        </div>
      )}

      {/* Review Modal */}
      {isModalOpen && (
        <div className="review-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="review-modal-content-box" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="review-modal-header">
              <h3 className="review-modal-title">Viết đánh giá sản phẩm</h3>
              <button
                type="button"
                className="review-modal-close-btn"
                onClick={() => setIsModalOpen(false)}
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="review-modal-body">
              {/* Rating Selector */}
              <div className="review-form-group">
                <label className="review-form-label">Mức độ hài lòng của bạn *</label>
                {renderStars(reviewForm.rating, 'large', true)}
                {reviewForm.rating > 0 && (
                  <div className="rating-feedback-text">
                    {reviewForm.rating === 1 && '1 sao - Rất không hài lòng'}
                    {reviewForm.rating === 2 && '2 sao - Tạm được'}
                    {reviewForm.rating === 3 && '3 sao - Bình thường'}
                    {reviewForm.rating === 4 && '4 sao - Hài lòng, code tốt'}
                    {reviewForm.rating === 5 && '5 sao - Xuất sắc, hỗ trợ nhiệt tình!'}
                  </div>
                )}
              </div>

              {/* Comment Textarea */}
              <div className="review-form-group">
                <label className="review-form-label">Nhận xét chi tiết *</label>
                <textarea
                  className="review-form-textarea"
                  placeholder="Chia sẻ trải nghiệm về cấu trúc code, khả năng cài đặt, độ hoàn thiện của sản phẩm..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  rows="5"
                  maxLength={500}
                />
                <div className="review-character-count">
                  {reviewForm.comment.length} / 500 ký tự
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="review-modal-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                className="btn-modal-submit-review"
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
