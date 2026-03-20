import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Product/ProductCard';
import mockWishlistItems from '../../data/mockWishlist';
import './WishlistPage.css';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemoveItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (id) => {
    // Logic to add to cart
    alert('Added to cart!');
    handleRemoveItem(id);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all wishlist items?')) {
      setWishlistItems([]);
    }
  };

  const handleShareWishlist = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist - CodeMarket',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Wishlist link copied to clipboard!');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <section className="wishlist-hero">
          <div className="container">
            <h1>💝 Yêu thích của tôi</h1>
            <p>Lưu các sản phẩm yêu thích của bạn tại đây</p>
          </div>
        </section>

        <section className="wishlist-content">
          <div className="container">
            <div className="empty-wishlist">
              <div className="empty-icon">💝</div>
              <h2>Danh sách yêu thích trống</h2>
              <p>Bắt đầu thêm các sản phẩm bạn thích vào danh sách yêu thích</p>
              <Link to="/products" className="browse-btn">
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <section className="wishlist-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1>💝 My Wishlist</h1>
              <p>{wishlistItems.length} items saved</p>
            </div>
            <div className="hero-actions">
              <button onClick={handleShareWishlist} className="share-btn">
                🔗 Share Wishlist
              </button>
              <button onClick={handleClearAll} className="clear-btn">
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="wishlist-content">
        <div className="container">
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="item-badge">
                  <span className="added-date">
                    Added {new Date(item.addedDate).toLocaleDateString()}
                  </span>
                </div>
                
                <ProductCard 
                  product={item}
                  viewMode="grid"
                />

                <div className="item-actions">
                  <button 
                    onClick={() => handleMoveToCart(item.id)}
                    className="action-btn primary"
                  >
                    🛒 Thêm vào giỏ
                  </button>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="action-btn secondary"
                  >
                    ❌ Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="recommendations-section">
            <h2>You Might Also Like</h2>
            <p>Based on your wishlist items</p>
            <div className="recommendations-grid">
              {/* Placeholder - sẽ load recommendations sau */}
              <div className="recommendation-placeholder">
                <p>Loading recommendations...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WishlistPage;
