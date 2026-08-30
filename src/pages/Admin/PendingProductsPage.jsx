import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Check,
  X,
  AlertTriangle,
  FileArchive,
  Layers,
} from 'lucide-react';
import { getPendingProducts } from '../../data/mockPendingProducts';
import './PendingProductsPage.css';

const PendingProductsPage = () => {
  const [products, setProducts] = useState(getPendingProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleApprove = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    alert(`Đã phê duyệt mở bán thành công mã nguồn #${productId}!`);
  };

  const openRejectModal = (product) => {
    setSelectedProduct(product);
    setRejectReason('Mã nguồn chưa kèm tệp hướng dẫn README.md chi tiết cấu hình database.');
    setShowRejectModal(true);
  };

  const submitReject = () => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối để tác giả chỉnh sửa!');
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setShowRejectModal(false);
    setRejectReason('');
    alert(`Đã gửi thông báo từ chối mã nguồn #${selectedProduct.id} kèm lý do đến tác giả.`);
    setSelectedProduct(null);
  };

  return (
    <div className="admin-page-container pending-products-page-modern">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <Clock size={13} />
            <span>Pipeline Kiểm Duyệt Mã Nguồn</span>
          </div>
          <h1 className="admin-page-main-title">Xét Duyệt Mã Nguồn Mới</h1>
          <p className="admin-page-main-desc">
            Kiểm tra tính an toàn, quét mã độc trong file ZIP và đối soát bản quyền trước khi mở bán
            công khai trên CodeMart
          </p>
        </div>

        <div className="header-stats-badges-row">
          <div className="stat-chip amber">
            <Clock size={14} />
            <span>{products.length} Source code chờ duyệt</span>
          </div>
        </div>
      </div>

      {/* Grid of Pending Products */}
      {products.length === 0 ? (
        <div className="pending-empty-state-card">
          <ShieldCheck size={48} className="text-emerald" />
          <h3>Không còn mã nguồn nào chờ duyệt!</h3>
          <p>Tất cả source code mới từ các tác giả đã được kiểm tra và xử lý xong.</p>
        </div>
      ) : (
        <div className="pending-products-grid">
          {products.map((product) => (
            <div key={product.id} className="pending-prod-card">
              {/* Image with status badge */}
              <div className="pending-card-media">
                <img src={product.images[0]} alt={product.name} className="pending-prod-cover" />
                <span className="pending-card-badge">
                  <Clock size={12} />
                  <span>Chờ duyệt 24h</span>
                </span>
              </div>

              {/* Body */}
              <div className="pending-card-body">
                <div className="pending-cat-tag">
                  <Layers size={12} />
                  <span>{product.category}</span>
                </div>

                <h3 className="pending-card-title">{product.name}</h3>

                <div className="pending-price-tag">
                  <strong>{formatPrice(product.price)}</strong>
                </div>

                <div className="pending-specs-list">
                  <div className="spec-row">
                    <span className="spec-lbl">Tác giả:</span>
                    <strong className="spec-val">{product.seller}</strong>
                  </div>
                  <div className="spec-row">
                    <span className="spec-lbl">Ngày nộp:</span>
                    <span className="spec-val">{formatDate(product.submitDate)}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-lbl">File .ZIP:</span>
                    <span className="spec-val text-emerald">
                      <FileArchive size={12} /> 48.5 MB (Đã quét sạch)
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {product.tags && (
                  <div className="pending-tags-wrap">
                    {product.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="pending-tag-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pending-card-actions-bar">
                <button
                  type="button"
                  className="btn-pending-inspect"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Eye size={13} />
                  <span>Xem chi tiết</span>
                </button>

                <div className="decision-btn-group">
                  <button
                    type="button"
                    className="btn-pending-reject"
                    onClick={() => openRejectModal(product)}
                    title="Từ chối"
                  >
                    <X size={15} />
                    <span>Từ chối</span>
                  </button>

                  <button
                    type="button"
                    className="btn-pending-approve"
                    onClick={() => handleApprove(product.id)}
                    title="Phê duyệt mở bán"
                  >
                    <Check size={15} />
                    <span>Duyệt mở bán</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect Modal */}
      {selectedProduct && !showRejectModal && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-inspect-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>Hồ sơ Kiểm duyệt Mã Nguồn #{selectedProduct.id}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <div className="inspect-header-row">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="inspect-thumb-lg"
                />
                <div className="inspect-meta-col">
                  <h4>{selectedProduct.name}</h4>
                  <p>
                    Tác giả: <strong>{selectedProduct.seller}</strong> •{' '}
                    {formatDate(selectedProduct.submitDate)}
                  </p>
                  <span className="modal-price-highlight">
                    {formatPrice(selectedProduct.price)}
                  </span>
                </div>
              </div>

              <div className="inspect-security-checklist">
                <h5>Kết quả Quét An Toàn Tự Động:</h5>
                <div className="security-check-item passed">
                  <CheckCircle2 size={15} className="text-emerald" />
                  <span>Không phát hiện mã độc, backdoor hoặc trojan trong file .ZIP</span>
                </div>
                <div className="security-check-item passed">
                  <CheckCircle2 size={15} className="text-emerald" />
                  <span>Đầy đủ cấu trúc thư mục dự án và file cấu hình môi trường</span>
                </div>
              </div>

              <div className="inspect-desc-box">
                <h5>Mô tả tính năng từ tác giả:</h5>
                <p>{selectedProduct.description}</p>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-reject-act"
                onClick={() => {
                  setShowRejectModal(true);
                }}
              >
                Từ chối mã nguồn
              </button>
              <button
                type="button"
                className="btn-modal-approve-act"
                onClick={() => {
                  handleApprove(selectedProduct.id);
                  setSelectedProduct(null);
                }}
              >
                Phê duyệt & Đăng bán ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedProduct && (
        <div className="modal-backdrop-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal-reject-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <div className="reject-head-title">
                <AlertTriangle size={18} className="text-danger" />
                <h3>Từ chối phê duyệt mã nguồn #{selectedProduct.id}</h3>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowRejectModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <p className="reject-note-txt">
                Vui lòng nêu rõ lý do để tác giả <strong>{selectedProduct.seller}</strong> có thể
                cập nhật và nộp lại:
              </p>

              <textarea
                className="form-textarea-box"
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối chi tiết..."
              />

              <div className="quick-reason-chips">
                <button
                  type="button"
                  className="btn-quick-reason"
                  onClick={() =>
                    setRejectReason(
                      'Thiếu tệp README.md hướng dẫn cài đặt và cấu hình cơ sở dữ liệu.'
                    )
                  }
                >
                  Thiếu README.md
                </button>
                <button
                  type="button"
                  className="btn-quick-reason"
                  onClick={() =>
                    setRejectReason('Ảnh demo chụp màn hình bị mờ hoặc không khớp với mã nguồn.')
                  }
                >
                  Ảnh demo chưa đạt
                </button>
                <button
                  type="button"
                  className="btn-quick-reason"
                  onClick={() =>
                    setRejectReason(
                      'Phát hiện thiếu tệp phụ thuộc (package.json / composer.json / pom.xml).'
                    )
                  }
                >
                  Thiếu dependencies
                </button>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-close-action"
                onClick={() => setShowRejectModal(false)}
              >
                Hủy bỏ
              </button>
              <button type="button" className="btn-modal-confirm-reject" onClick={submitReject}>
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingProductsPage;
