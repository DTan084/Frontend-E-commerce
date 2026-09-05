import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Check, Zap, Download, AlertTriangle, Code2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { createProductSlug } from '../../utils/slugHelper';
import { getCategoryName } from '../../data/categories';
import './CartItem.css';

const CartItem = ({ item, isSelected, onToggleSelect }) => {
  const { removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Price calculations
  const originalPrice = Number(item.price) || 0;
  const discountPrice = Number(item.discount_price) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < originalPrice;
  const finalPrice = hasDiscount ? discountPrice : originalPrice;
  const savedAmount = hasDiscount ? originalPrice - discountPrice : 0;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
    : 0;

  const productTitle = item.title || item.name || 'Mã nguồn không tên';
  const productImage = item.image_url || item.image || '/placeholder-product.png';
  const authorName = item.seller?.name || item.seller || 'CodeMart Author';

  // Category mapping
  const categoryRaw = item.category || '';
  let categoryLabel = getCategoryName(categoryRaw, 'vi');
  if (categoryLabel === 'source-code') categoryLabel = 'Mã nguồn';
  if (categoryLabel === 'theme-template') categoryLabel = 'Giao diện & UI';

  const techStack = item.technology || item.language || '';

  const confirmRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.product_id || item.id);
    }, 200);
  };

  const productSlug = createProductSlug(item);

  return (
    <>
      <div
        className={`cart-item-modern ${isRemoving ? 'is-removing' : ''} ${isSelected ? 'is-selected' : ''}`}
      >
        {/* Checkbox */}
        <div className="cart-item-checkbox-col">
          <label className="custom-cart-checkbox">
            <input type="checkbox" checked={isSelected} onChange={onToggleSelect} />
            <span className="checkbox-visual">
              {isSelected && <Check size={13} strokeWidth={3} />}
            </span>
          </label>
        </div>

        {/* Product Thumbnail */}
        <Link to={`/product/${productSlug}`} className="cart-item-thumb-link">
          <div className="cart-item-thumb-wrap">
            <img
              src={productImage}
              alt={productTitle}
              className="cart-item-thumb-img"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
              }}
            />
            {hasDiscount && <span className="cart-item-discount-tag">-{discountPercent}%</span>}
          </div>
        </Link>

        {/* Product Meta & Details */}
        <div className="cart-item-main-details">
          <div className="cart-item-category-row">
            <span className="cart-item-cat-pill">
              <ShoppingBag size={11} />
              <span>{categoryLabel}</span>
            </span>
            {techStack && (
              <span className="cart-item-tech-pill">
                <Code2 size={11} />
                <span>{techStack}</span>
              </span>
            )}
          </div>

          <Link to={`/product/${productSlug}`} className="cart-item-title-link">
            <h3 className="cart-item-title-text">{productTitle}</h3>
          </Link>

          <div className="cart-item-author-row">
            <span className="author-label">Tác giả:</span>
            <span className="author-name">{authorName}</span>
          </div>

          {/* Delivery Note */}
          <div className="cart-item-delivery-chip">
            <Download size={12} className="delivery-icon" />
            <span>Bàn giao tức thì qua Email & Link tải trực tiếp</span>
          </div>
        </div>

        {/* Price & Actions Column */}
        <div className="cart-item-price-actions-col">
          <div className="cart-item-price-block">
            <div className="cart-item-current-price">{finalPrice.toLocaleString('vi-VN')}₫</div>
            {hasDiscount && (
              <div className="cart-item-original-price">
                {originalPrice.toLocaleString('vi-VN')}₫
              </div>
            )}
            {savedAmount > 0 && (
              <div className="cart-item-saved-badge">
                <Zap size={10} />
                <span>Tiết kiệm {savedAmount.toLocaleString('vi-VN')}₫</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn-cart-item-remove"
            onClick={() => setShowConfirm(true)}
            title="Xóa khỏi giỏ hàng"
            aria-label="Xóa sản phẩm"
          >
            <Trash2 size={16} />
            <span className="remove-label">Xóa</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="cart-confirm-backdrop" onClick={() => setShowConfirm(false)}>
          <div className="cart-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-bubble">
              <AlertTriangle size={24} />
            </div>
            <h4 className="confirm-title">Xóa khỏi giỏ hàng?</h4>
            <p className="confirm-desc">
              Bạn có chắc chắn muốn bỏ mã nguồn <strong>"{productTitle}"</strong> khỏi giỏ hàng
              không?
            </p>
            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn-confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Giữ lại
              </button>
              <button type="button" className="btn-confirm-delete" onClick={confirmRemove}>
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
