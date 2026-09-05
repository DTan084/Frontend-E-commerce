import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Share2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import mockWishlistItems from '../../data/mockWishlist';
import './WishlistPage.css';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleRemoveItem = (id, title) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Đã xóa "${title || 'Sản phẩm'}" khỏi danh sách yêu thích.`);
  };

  const handleMoveToCart = (item) => {
    addToCart(item);
    showToast(`Đã thêm "${item.name || item.title}" vào giỏ hàng thành công!`);
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ sản phẩm yêu thích?')) {
      setWishlistItems([]);
      showToast('Đã làm trống danh sách yêu thích.');
    }
  };

  const handleShareWishlist = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Mã nguồn yêu thích - CodeMart',
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      showToast('Đã sao chép liên kết danh sách yêu thích vào bộ nhớ tạm!');
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="wishlist-page-modern">
      <div className="wishlist-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Bàn làm việc', path: '/user/dashboard' },
            { label: 'Mã nguồn đã lưu', path: null },
          ]}
        />

        <div className="wishlist-layout-row">
          {/* User Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Content */}
          <main className="wishlist-main-content">
            {/* Header Card */}
            <div className="wishlist-hero-header-card">
              <div className="wishlist-title-group">
                <div className="wishlist-icon-wrap">
                  <Heart size={22} className="text-rose" />
                </div>
                <div>
                  <h1 className="wishlist-main-title">Mã nguồn đã lưu ({wishlistItems.length})</h1>
                  <p className="wishlist-sub-desc">
                    Danh sách các source code bạn quan tâm để dễ dàng so sánh và mua sau này.
                  </p>
                </div>
              </div>

              {wishlistItems.length > 0 && (
                <div className="wishlist-header-actions">
                  <button
                    type="button"
                    onClick={handleShareWishlist}
                    className="btn-wishlist-action"
                    title="Chia sẻ danh sách"
                  >
                    <Share2 size={14} />
                    <span>Chia sẻ</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="btn-wishlist-action danger"
                    title="Xóa tất cả"
                  >
                    <Trash2 size={14} />
                    <span>Xóa tất cả</span>
                  </button>
                </div>
              )}
            </div>

            {/* Toast Notification */}
            {toastMessage && (
              <div className="wishlist-toast-banner">
                <CheckCircle2 size={15} className="text-emerald" />
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Items Grid or Empty State */}
            {wishlistItems.length > 0 ? (
              <div className="wishlist-items-grid">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="wishlist-modern-card">
                    <div className="wishlist-card-media">
                      <img
                        src={item.image || '/placeholder-product.png'}
                        alt={item.name || item.title}
                        className="wishlist-card-img"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                        }}
                      />
                      <span className="category-pill-overlay">{item.category || 'Mã nguồn'}</span>
                    </div>

                    <div className="wishlist-card-body">
                      <h3
                        className="wishlist-card-title"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name || item.title}
                      </h3>

                      <div className="wishlist-card-price-row">
                        <span className="wishlist-card-price">{formatPrice(item.price)}</span>
                        {item.originalPrice && (
                          <span className="wishlist-card-old-price">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="wishlist-card-actions-strip">
                        <button
                          type="button"
                          className="btn-wishlist-add-cart"
                          onClick={() => handleMoveToCart(item)}
                        >
                          <ShoppingCart size={14} />
                          <span>Thêm vào giỏ</span>
                        </button>
                        <button
                          type="button"
                          className="btn-wishlist-remove"
                          onClick={() => handleRemoveItem(item.id, item.name || item.title)}
                          title="Xóa khỏi danh sách lưu"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-wishlist-view-modern">
                <div className="empty-icon-halo">
                  <Heart size={38} className="text-muted" />
                </div>
                <h3>Danh sách lưu hiện đang trống</h3>
                <p>
                  Bạn chưa lưu mã nguồn nào. Hãy duyệt qua kho source code phong phú của CodeMart và
                  nhấn biểu tượng trái tim để lưu lại!
                </p>
                <button
                  type="button"
                  className="btn-explore-wishlist-cta"
                  onClick={() => navigate('/products')}
                >
                  <span>Khám phá mã nguồn ngay</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
