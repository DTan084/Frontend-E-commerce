import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPendingProducts } from '../../data/mockPendingProducts';
import './PendingProductsPage.css';

const PendingProductsPage = () => {
  const [products, setProducts] = useState(getPendingProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleApprove = (productId) => {
    if (window.confirm('Phê duyệt sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối!');
      return;
    }

    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setShowModal(false);
    setRejectReason('');
    setSelectedProduct(null);
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="pending-products-page">
      {/* Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/admin">Admin</Link>
            <span>/</span>
            <span>Sản phẩm chờ duyệt</span>
          </div>

          <h1>⏳ Sản phẩm chờ duyệt</h1>
          <p>Xét duyệt sản phẩm mới từ sellers</p>
          
          <div className="hero-stats">
            <div className="stat">
              📦 <strong>{products.length}</strong> sản phẩm đang chờ
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {products.length > 0 ? (
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                    <div className="product-badge">Chờ duyệt</div>
                  </div>

                  <div className="product-content">
                    <div className="product-header">
                      <h3>{product.name}</h3>
                      <div className="product-meta">
                        <span className="category">📁 {product.category}</span>
                        <span className="price">{formatPrice(product.price)}</span>
                      </div>
                    </div>

                    <div className="product-info">
                      <div className="info-row">
                        <strong>Người bán:</strong>
                        <span>{product.seller}</span>
                      </div>
                      <div className="info-row">
                        <strong>Ngày gửi:</strong>
                        <span>{formatDate(product.submitDate)}</span>
                      </div>
                      <div className="info-row">
                        <strong>Công nghệ:</strong>
                        <div className="tech-tags">
                          {product.technology.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="product-description">
                      <strong>Mô tả:</strong>
                      <p>{product.description}</p>
                    </div>

                    <div className="product-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(product.id)}
                      >
                        ✅ Phê duyệt
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(product)}
                      >
                        ❌ Từ chối
                      </button>
                      <button
                        className="btn-detail"
                        onClick={() => handleViewDetail(product)}
                      >
                        👁️ Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h3>Không có sản phẩm chờ duyệt</h3>
              <p>Tất cả sản phẩm đã được xử lý</p>
            </div>
          )}
        </div>
      </section>

      {/* Reject Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>❌ Từ chối sản phẩm</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="reject-product-info">
                <strong>Sản phẩm:</strong> {selectedProduct?.name}
              </div>
              <div className="reject-product-info">
                <strong>Người bán:</strong> {selectedProduct?.seller}
              </div>

              <div className="form-group">
                <label>Lý do từ chối *</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows="5"
                  placeholder="Nhập lý do từ chối sản phẩm..."
                  required
                />
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Hủy
                </button>
                <button className="btn-submit" onClick={submitReject}>
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingProductsPage;
