import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { mockProducts } from '../../data/mockProducts';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { ROUTE_PATHS } from '../../routes/paths';
import './DevTools.css';

const DevTools = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, clearCart, items } = useCart();
  const { user, logout, login } = useAuth();

  const addSampleProducts = () => {
    // Add first 3 products to cart
    const sampleProducts = mockProducts.slice(0, 3);
    sampleProducts.forEach((product) => {
      addToCart(product, 1);
    });
    alert('✅ Đã thêm 3 sản phẩm mẫu vào giỏ hàng!');
  };

  const addRandomProducts = () => {
    // Add 5 random products
    const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 5);
    randomProducts.forEach((product) => {
      addToCart(product, Math.floor(Math.random() * 3) + 1);
    });
    alert('✅ Đã thêm 5 sản phẩm ngẫu nhiên vào giỏ hàng!');
  };

  const clearLocalStorage = () => {
    if (window.confirm('Xóa toàn bộ LocalStorage? Bạn sẽ bị đăng xuất.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        className="dev-tools-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Developer Tools"
      >
        🛠️
      </button>

      {/* Dev Tools Panel */}
      {isOpen && (
        <div className="dev-tools-panel">
          <div className="dev-tools-header">
            <h3>🛠️ Dev Tools</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="dev-tools-content">
            {/* User Info */}
            <div className="dev-section">
              <h4>👤 User Status</h4>
              {user ? (
                <div className="user-info">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <button className="dev-btn danger" onClick={logout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="quick-login">
                  <p className="text-muted">Not logged in</p>
                  <div className="dev-actions">
                    <button
                      className="dev-btn primary"
                      onClick={() =>
                        login(
                          {
                            id: 1,
                            name: 'Admin User',
                            email: 'admin@test.com',
                            role: 'admin',
                          },
                          'mock-admin-token'
                        )
                      }
                    >
                      👨‍💼 Login as Admin
                    </button>
                    <button
                      className="dev-btn secondary"
                      onClick={() =>
                        login(
                          {
                            id: 2,
                            name: 'John Buyer',
                            email: 'user@test.com',
                            role: 'user',
                          },
                          'mock-user-token'
                        )
                      }
                    >
                      🛍️ Login as Buyer
                    </button>
                    <button
                      className="dev-btn warning"
                      onClick={() =>
                        login(
                          {
                            id: 3,
                            name: 'Seller Pro',
                            email: 'seller@test.com',
                            role: 'seller',
                          },
                          'mock-seller-token'
                        )
                      }
                    >
                      🏪 Login as Seller
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Info */}
            <div className="dev-section">
              <h4>🛒 Cart Status</h4>
              <p>
                <strong>Items:</strong> {items.length}
              </p>
              <div className="dev-actions">
                <button className="dev-btn primary" onClick={addSampleProducts}>
                  Add 3 Sample Products
                </button>
                <button className="dev-btn secondary" onClick={addRandomProducts}>
                  Add 5 Random Products
                </button>
                <button
                  className="dev-btn danger"
                  onClick={clearCart}
                  disabled={items.length === 0}
                >
                  Clear Cart ({items.length})
                </button>
              </div>
            </div>

            {/* System Actions */}
            <div className="dev-section">
              <h4>⚙️ System</h4>
              <div className="dev-actions">
                <button className="dev-btn warning" onClick={clearLocalStorage}>
                  Clear LocalStorage
                </button>
                <button className="dev-btn secondary" onClick={() => window.location.reload()}>
                  Reload Page
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="dev-section">
              <h4>🔗 Quick Links</h4>
              <div className="quick-links">
                <a href={ROUTE_PATHS.ROOT} className="dev-link">
                  🏠 Home
                </a>
                <a href={`/${ROUTE_PATHS.PUBLIC.PRODUCTS}`} className="dev-link">
                  🛍️ Products
                </a>
                <a href={`/${ROUTE_PATHS.PUBLIC.CART}`} className="dev-link">
                  🛒 Cart
                </a>
                <a href={`/${ROUTE_PATHS.USER.DASHBOARD}`} className="dev-link">
                  📊 Dashboard
                </a>
                <a href={`/${ROUTE_PATHS.USER.CHECKOUT}`} className="dev-link">
                  💳 Checkout
                </a>
                <a href={`${ROUTE_PATHS.AUTH.ROOT}/${ROUTE_PATHS.AUTH.LOGIN}`} className="dev-link">
                  🔐 Login
                </a>
              </div>
            </div>

            {/* Storage Info */}
            <div className="dev-section">
              <h4>💾 LocalStorage</h4>
              <div className="storage-info">
                <p>
                  <strong>Auth Token:</strong>{' '}
                  {localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) ? '✓' : '✗'}
                </p>
                <p>
                  <strong>User Data:</strong>{' '}
                  {localStorage.getItem(STORAGE_KEYS.USER_DATA) ? '✓' : '✗'}
                </p>
                <p>
                  <strong>Cart Data:</strong> {localStorage.getItem(STORAGE_KEYS.CART) ? '✓' : '✗'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevTools;
