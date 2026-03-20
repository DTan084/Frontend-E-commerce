import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import CartItem from '../../components/Cart/CartItem';
import OrderSummary from '../../components/Cart/OrderSummary';
import EmptyCart from '../../components/Cart/EmptyCart';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, cart, removeFromCart, clearCart, loadMockCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);

  // Use cart or items, whichever is available
  const displayItems = cartItems || cart || [];

  // Auto-select all items when cart loads
  useEffect(() => {
    setSelectedItems(displayItems.map((item) => item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayItems.length]); // Only run when cart items count changes

  // Load mock cart for testing
  const handleLoadMockCart = () => {
    if (window.confirm('Tải giỏ hàng mẫu để test thanh toán?')) {
      loadMockCart();
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleRemoveItem = (itemId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(itemId);
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSelectItem = (itemId, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) {
      clearCart();
      setSelectedItems([]);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
      return;
    }
    // Navigate to checkout with selected items
    navigate('/checkout', { state: { selectedItems } });
  };

  // If cart is empty, show EmptyCart component with load mock button
  if (displayItems.length === 0) {
    return (
      <div className="cart-page">
        <EmptyCart />
        <div className="test-actions">
          <button
            className="load-mock-btn"
            onClick={handleLoadMockCart}
            style={{
              margin: '20px auto',
              display: 'block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            }}
          >
            📦 Tải giỏ hàng mẫu để test
          </button>
        </div>
      </div>
    );
  }

  const allSelected = displayItems.length > 0 && selectedItems.length === displayItems.length;

  return (
    <div className="cart-page">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Shopping Cart', path: null },
        ]}
      />

      {/* Page Header */}
      <div className="cart-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="icon">🛒</span>
            Giỏ hàng
            <span className="item-count">({displayItems.length} sản phẩm)</span>
          </h1>
          <p className="page-subtitle">Kiểm tra sản phẩm và tiến hành thanh toán</p>
        </div>

        {/* Select All & Load Mock */}
        <div className="cart-header-actions">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="custom-checkbox"
            />
            <span>Chọn tất cả ({displayItems.length})</span>
          </label>

          <button
            className="load-mock-mini-btn"
            onClick={handleLoadMockCart}
            title="Tải giỏ hàng mẫu"
          >
            📦 Mock Data
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="cart-content-grid">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <div className="items-list">
            {displayItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                onToggleSelect={() => handleSelectItem(item.id, !selectedItems.includes(item.id))}
              />
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="cart-bottom-actions">
            <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
              <span className="icon">←</span>
              <span>Tiếp tục mua sắm</span>
            </button>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              <span className="icon">🗑️</span>
              <span>Xóa giỏ hàng</span>
            </button>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary-section">
          <OrderSummary showCheckoutButton={true} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
