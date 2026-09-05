import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Check,
  PackagePlus,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import CartItem from '../../components/Cart/CartItem';
import OrderSummary from '../../components/Cart/OrderSummary';
import EmptyCart from '../../components/Cart/EmptyCart';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, cart, clearCart, loadMockCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const displayItems = cartItems || cart || [];

  // Auto select all items on cart changes
  useEffect(() => {
    if (displayItems.length > 0) {
      setSelectedItems(displayItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  }, [displayItems.length]);

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, itemId]);
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(displayItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleConfirmClear = () => {
    clearCart();
    setSelectedItems([]);
    setShowClearConfirm(false);
  };

  if (displayItems.length === 0) {
    return (
      <div className="cart-page-modern">
        <div className="cart-container-inner">
          <Breadcrumb items={[{ label: 'Giỏ hàng', path: null }]} />
          <EmptyCart />
        </div>
      </div>
    );
  }

  const allSelected = displayItems.length > 0 && selectedItems.length === displayItems.length;

  return (
    <div className="cart-page-modern">
      <div className="cart-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Giỏ hàng', path: null }]} />

        {/* Header Row */}
        <div className="cart-page-header">
          <div className="cart-header-title-wrap">
            <div className="cart-header-icon-box">
              <ShoppingCart size={22} />
            </div>
            <div>
              <h1 className="cart-page-title">
                Giỏ hàng của bạn
                <span className="cart-count-pill">{displayItems.length} sản phẩm</span>
              </h1>
              <p className="cart-page-subtitle">
                Kiểm tra thông tin bản quyền và chọn mã nguồn cần thanh toán
              </p>
            </div>
          </div>

          {/* Select All Checkbox & Quick Actions */}
          <div className="cart-header-controls">
            <label className="cart-select-all-control">
              <span className="custom-cart-checkbox">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span className="checkbox-visual">
                  {allSelected && <Check size={13} strokeWidth={3} />}
                </span>
              </span>
              <span className="select-all-text">
                Chọn tất cả ({selectedItems.length}/{displayItems.length})
              </span>
            </label>

            <button
              type="button"
              className="btn-mock-reload-cart"
              onClick={loadMockCart}
              title="Khôi phục dữ liệu mẫu để test"
            >
              <PackagePlus size={14} />
              <span>Nạp dữ liệu mẫu</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="cart-layout-grid">
          {/* Left: Items List & Actions */}
          <div className="cart-items-column">
            <div className="cart-items-card-list">
              {displayItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.includes(item.id)}
                  onToggleSelect={() => handleSelectItem(item.id, !selectedItems.includes(item.id))}
                />
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="cart-bottom-actions-bar">
              <button
                type="button"
                className="btn-cart-continue"
                onClick={() => navigate('/products')}
              >
                <ArrowLeft size={16} />
                <span>Tiếp tục xem mã nguồn khác</span>
              </button>

              <button
                type="button"
                className="btn-cart-clear-all"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 size={15} />
                <span>Xóa sạch giỏ hàng</span>
              </button>
            </div>

            {/* Security Guarantee Banner */}
            <div className="cart-security-banner">
              <div className="security-banner-item">
                <ShieldCheck size={18} className="text-emerald" />
                <span>Mã nguồn sạch 100% • Bảo hành cài đặt</span>
              </div>
              <div className="security-banner-item">
                <Lock size={18} className="text-indigo" />
                <span>Thanh toán mã hóa bảo mật SSL</span>
              </div>
            </div>
          </div>

          {/* Right: Sticky Order Summary */}
          <div className="cart-summary-column">
            <OrderSummary showCheckoutButton={true} selectedItemsCount={selectedItems.length} />
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="cart-confirm-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="cart-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-bubble">
              <Trash2 size={24} />
            </div>
            <h4 className="confirm-title">Xóa toàn bộ giỏ hàng?</h4>
            <p className="confirm-desc">
              Tất cả <strong>{displayItems.length} sản phẩm</strong> trong giỏ hàng sẽ bị xóa. Bạn
              có chắc chắn muốn tiếp tục?
            </p>
            <div className="confirm-actions-row">
              <button
                type="button"
                className="btn-confirm-cancel"
                onClick={() => setShowClearConfirm(false)}
              >
                Giữ lại
              </button>
              <button type="button" className="btn-confirm-delete" onClick={handleConfirmClear}>
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
