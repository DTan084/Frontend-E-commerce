import React from 'react';
import { Link } from 'react-router-dom';
import {
  UserCheck,
  Calendar,
  Star,
  Package,
  ThumbsUp,
  ShieldCheck,
  Zap,
  Award,
  MessageSquare,
  ShoppingBag,
  BadgeCheck,
  Lock,
} from 'lucide-react';
import './SellerCard.css';

const SellerCard = ({ seller }) => {
  if (!seller) return null;

  const ratingValue = Number(seller.rating) || 4.9;
  const salesCount = Number(seller.totalSales) || 0;
  const positiveRate = Number(seller.positiveRatings) || 99;

  return (
    <div className="seller-card-modern">
      {/* Card Header */}
      <div className="seller-card-header">
        <h3 className="card-title">
          <UserCheck size={18} className="header-icon" />
          <span>Thông tin Người bán</span>
        </h3>
      </div>

      {/* Seller Profile */}
      <div className="seller-profile">
        <div className="seller-avatar-wrapper">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="seller-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                seller.name || 'Seller'
              )}&background=4f46e5&color=fff&size=120`;
            }}
          />
          <div className="verified-badge-pill" title="Người bán đã xác minh">
            <BadgeCheck size={16} />
          </div>
        </div>

        <div className="seller-info">
          <h4 className="seller-name">{seller.name}</h4>
          <p className="member-since">
            <Calendar size={13} />
            <span>Thành viên từ {seller.memberSince}</span>
          </p>
        </div>
      </div>

      {/* Seller Stats 3 Columns */}
      <div className="seller-stats-three-grid">
        <div className="seller-metric-box">
          <div
            className="seller-metric-icon"
            style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}
          >
            <Star size={16} fill="#f59e0b" color="#f59e0b" />
          </div>
          <div className="seller-metric-details">
            <div className="seller-metric-val">{ratingValue.toFixed(1)}</div>
            <div className="seller-metric-lbl">Đánh giá</div>
          </div>
        </div>

        <div className="seller-metric-box">
          <div
            className="seller-metric-icon"
            style={{ color: '#4f46e5', background: 'rgba(79, 70, 229, 0.1)' }}
          >
            <Package size={16} />
          </div>
          <div className="seller-metric-details">
            <div className="seller-metric-val">{salesCount.toLocaleString()}</div>
            <div className="seller-metric-lbl">Đã bán</div>
          </div>
        </div>

        <div className="seller-metric-box">
          <div
            className="seller-metric-icon"
            style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}
          >
            <ThumbsUp size={16} />
          </div>
          <div className="seller-metric-details">
            <div className="seller-metric-val">{positiveRate}%</div>
            <div className="seller-metric-lbl">Hài lòng</div>
          </div>
        </div>
      </div>

      {/* Seller Trust Badges */}
      <div className="seller-badges-list">
        <div className="seller-badge-chip">
          <BadgeCheck size={15} className="chip-icon green" />
          <span>Tác giả được xác minh</span>
        </div>
        <div className="seller-badge-chip">
          <Zap size={15} className="chip-icon amber" />
          <span>Phản hồi cực nhanh (&lt; 1h)</span>
        </div>
        <div className="seller-badge-chip">
          <Award size={15} className="chip-icon indigo" />
          <span>Top Tác giả uy tín</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="seller-actions-group">
        <button type="button" className="btn-contact-seller">
          <MessageSquare size={16} />
          <span>Nhắn tin tư vấn</span>
        </button>
        <Link to={`/products?seller=${seller.id || 1}`} className="btn-view-seller-products">
          <ShoppingBag size={16} />
          <span>Xem tất cả mã nguồn</span>
        </Link>
      </div>

      {/* Trust Guarantee Box */}
      <div className="seller-trust-box">
        <div className="trust-row-item">
          <Lock size={14} className="trust-icon" />
          <span>Giao dịch an toàn qua hệ thống Escrow</span>
        </div>
        <div className="trust-row-item">
          <ShieldCheck size={14} className="trust-icon" />
          <span>Bảo hành hoàn tiền nếu code không chạy</span>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
