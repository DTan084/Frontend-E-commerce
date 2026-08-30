import React from 'react';
import { MessageSquare, Star, ThumbsUp, CornerDownRight } from 'lucide-react';
import './LatestReviews.css';

const LatestReviews = () => {
  const reviews = [
    {
      id: 1,
      rating: 5,
      comment:
        'Mã nguồn viết cực kỳ sạch và chuẩn cấu trúc. Backend Laravel và Frontend React giao tiếp mượt mà, tài liệu deploy Docker rất chi tiết!',
      reviewer: {
        name: 'Hoàng Nam',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
        role: 'Tech Lead',
      },
      product: {
        name: 'Mã Nguồn E-commerce React + Laravel',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100',
      },
      date: '2 giờ trước',
      helpful: 24,
    },
    {
      id: 2,
      rating: 5,
      comment:
        'Giao diện Admin rất đẹp và dễ tùy biến. Tác giả hỗ trợ cài đặt qua UltraView cực kỳ nhiệt tình và chuyên nghiệp.',
      reviewer: {
        name: 'Trần Minh Tuấn',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
        role: 'Frontend Developer',
      },
      product: {
        name: 'Giao Diện Admin Dashboard Pro Vue.js',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
      },
      date: '5 giờ trước',
      helpful: 18,
    },
    {
      id: 3,
      rating: 5,
      comment:
        'Tiết kiệm cho team mình hơn 1 tháng dựng base dự án. Hoàn toàn xứng đáng với mức giá!',
      reviewer: {
        name: 'Đặng Thảo Vy',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        role: 'Product Owner',
      },
      product: {
        name: 'Fullstack SaaS Boilerplate Next.js',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100',
      },
      date: '1 ngày trước',
      helpful: 31,
    },
  ];

  return (
    <div className="latest-reviews-card-modern">
      <div className="reviews-head">
        <div className="reviews-head-title-wrap">
          <MessageSquare size={18} className="text-purple" />
          <div>
            <h2 className="reviews-title">Đánh giá mới nhất từ khách hàng</h2>
            <p className="reviews-subtitle">
              Phản hồi và nhận xét thực tế từ cộng đồng lập trình viên
            </p>
          </div>
        </div>

        <div className="reviews-summary-badge">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span className="summary-rating-num">4.9</span>
          <span className="summary-rating-count">(158 nhận xét)</span>
        </div>
      </div>

      <div className="reviews-feed-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-item-card">
            {/* Reviewer & Product Info */}
            <div className="review-top-row">
              <div className="reviewer-profile-group">
                <img
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  className="reviewer-img"
                />
                <div>
                  <div className="reviewer-name-row">
                    <span className="reviewer-name">{review.reviewer.name}</span>
                    <span className="reviewer-role-tag">{review.reviewer.role}</span>
                  </div>
                  <span className="review-date-text">{review.date}</span>
                </div>
              </div>

              <div className="review-stars-row">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </div>

            {/* Target Product Strip */}
            <div className="review-product-strip">
              <img
                src={review.product.image}
                alt={review.product.name}
                className="review-product-thumb"
              />
              <span className="review-product-title">{review.product.name}</span>
            </div>

            {/* Content */}
            <p className="review-text-content">"{review.comment}"</p>

            {/* Footer Actions */}
            <div className="review-card-bottom">
              <button type="button" className="btn-helpful-action">
                <ThumbsUp size={12} />
                <span>Hữu ích ({review.helpful})</span>
              </button>

              <button type="button" className="btn-reply-action">
                <CornerDownRight size={12} />
                <span>Trả lời nhận xét</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
