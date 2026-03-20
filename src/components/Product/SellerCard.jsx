import React from 'react';
import { Link } from 'react-router-dom';
import './SellerCard.css';

const SellerCard = ({ seller }) => {
  return (
    <div className="seller-card">
      {/* Card Header */}
      <div className="seller-card-header">
        <h3 className="card-title">
          <span className="icon">👤</span>
          Thông tin người bán
        </h3>
      </div>

      {/* Seller Profile */}
      <div className="seller-profile">
        <div className="seller-avatar-wrapper">
          <img 
            src={seller.avatar} 
            alt={seller.name}
            className="seller-avatar"
          />
          <div className="verified-badge" title="Verified Seller">
            <span>✓</span>
          </div>
        </div>

        <div className="seller-info">
          <h4 className="seller-name">{seller.name}</h4>
          <p className="member-since">
            <span className="icon">📅</span>
            Member since {seller.memberSince}
          </p>
        </div>
      </div>

      {/* Seller Stats */}
      <div className="seller-stats">
        <div className="stat-item">
          <div className="stat-icon">⭐</div>
          <div className="stat-details">
            <div className="stat-value">{seller.rating}</div>
            <div className="stat-label">Rating</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📦</div>
          <div className="stat-details">
            <div className="stat-value">{seller.totalSales.toLocaleString()}</div>
            <div className="stat-label">Total Sales</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">👍</div>
          <div className="stat-details">
            <div className="stat-value">{seller.positiveRatings}%</div>
            <div className="stat-label">Positive</div>
          </div>
        </div>
      </div>

      {/* Seller Badges */}
      <div className="seller-badges">
        <div className="badge">
          <span className="badge-icon">✓</span>
          <span>Verified Seller</span>
        </div>
        <div className="badge">
          <span className="badge-icon">⚡</span>
          <span>Fast Support</span>
        </div>
        <div className="badge">
          <span className="badge-icon">🏆</span>
          <span>Top Rated</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="seller-actions">
        <button className="contact-btn">
          <span className="icon">💬</span>
          Contact Seller
        </button>
        <Link to={`/seller/${seller.id}`} className="view-products-btn">
          <span className="icon">🛍️</span>
          View More Products
        </Link>
      </div>

      {/* Trust Indicators */}
      <div className="trust-indicators">
        <div className="trust-item">
          <span className="icon">🔒</span>
          <span>Secure Transaction</span>
        </div>
        <div className="trust-item">
          <span className="icon">💰</span>
          <span>Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
