import React, { useState } from 'react';
import { Package, Search, Filter, Eye, Trash2, CheckCircle2, EyeOff, Star, X } from 'lucide-react';
import { mockProducts } from '../../../data/mockProducts';
import './AdminProducts.css';

const AdminProducts = () => {
  const [productsList, setProductsList] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const formatVND = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleToggleHide = (productId) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = p.status === 'hidden' ? 'active' : 'hidden';
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc muốn gỡ bỏ mã nguồn này khỏi sàn thương mại?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.seller && product.seller.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || (product.status || 'active') === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    'Website TMĐT',
    'Admin Template',
    'Fullstack SaaS',
    'Mobile App',
    'Backend API',
  ];

  return (
    <div className="admin-page-container admin-products-page-modern">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <Package size={13} />
            <span>Kho Mã Nguồn & Giấy Phép Bản Quyền</span>
          </div>
          <h1 className="admin-page-main-title">Quản lý Mã nguồn Toàn sàn</h1>
          <p className="admin-page-main-desc">
            Kiểm soát danh mục sản phẩm, định giá niêm yết, theo dõi doanh thu và trạng thái hiển
            thị của toàn bộ source code
          </p>
        </div>

        <div className="header-stats-badges-row">
          <div className="stat-chip blue">
            <Package size={14} />
            <span>{productsList.length} Mã nguồn</span>
          </div>
          <div className="stat-chip emerald">
            <CheckCircle2 size={14} />
            <span>{productsList.filter((p) => p.status !== 'hidden').length} Đang bán</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-table-toolbar-box">
        <div className="toolbar-search-wrap">
          <Search size={15} className="toolbar-search-icon" />
          <input
            type="text"
            className="toolbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên mã nguồn, tác giả, danh mục..."
          />
        </div>

        <div className="toolbar-filters-row">
          <div className="toolbar-select-wrap">
            <Filter size={13} className="select-icon" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="toolbar-select-dropdown"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="toolbar-select-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="toolbar-select-dropdown"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang mở bán</option>
              <option value="hidden">Đã ẩn / Tạm khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="admin-data-table-card">
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Mã nguồn</th>
                <th>Danh mục</th>
                <th>Tác giả</th>
                <th>Giá niêm yết</th>
                <th>Hiệu suất bán</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="td-empty-table">
                    <Package size={32} className="text-muted" />
                    <p>Không tìm thấy mã nguồn nào phù hợp</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="admin-table-row">
                    <td className="td-product-media-cell">
                      <div className="prod-cell-flex">
                        <img
                          src={
                            product.images
                              ? product.images[0]
                              : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100'
                          }
                          alt={product.name}
                          className="prod-table-thumb"
                        />
                        <div className="prod-name-block">
                          <strong className="prod-title-txt">{product.name}</strong>
                          <span className="prod-id-txt">ID: #{product.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="td-category-cell">
                      <span className="category-tag-pill">{product.category || 'Source Code'}</span>
                    </td>

                    <td className="td-seller-cell">
                      <span className="seller-name-txt">
                        {product.seller || 'CodeMart Creator'}
                      </span>
                    </td>

                    <td className="td-price-cell">
                      <strong className="text-primary">{formatVND(product.price)}</strong>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <small className="sale-strike-txt">
                          {formatVND(product.originalPrice)}
                        </small>
                      )}
                    </td>

                    <td className="td-performance-cell">
                      <div className="perf-data-col">
                        <span className="sales-cnt">
                          <strong>{product.sales || 24}</strong> lượt tải
                        </span>
                        <span className="rating-mini">
                          <Star size={11} fill="#f59e0b" color="#f59e0b" />
                          <span>{product.rating || 4.8}</span>
                        </span>
                      </div>
                    </td>

                    <td className="td-status-cell">
                      {product.status === 'hidden' ? (
                        <span className="status-badge-pill amber">
                          <EyeOff size={11} />
                          <span>Đã ẩn</span>
                        </span>
                      ) : (
                        <span className="status-badge-pill emerald">
                          <CheckCircle2 size={11} />
                          <span>Đang bán</span>
                        </span>
                      )}
                    </td>

                    <td className="td-actions-cell">
                      <div className="actions-btn-strip">
                        <button
                          type="button"
                          className="btn-tbl-action"
                          onClick={() => setSelectedProduct(product)}
                          title="Xem chi tiết"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          className={`btn-tbl-action ${product.status === 'hidden' ? 'unlock' : 'lock'}`}
                          onClick={() => handleToggleHide(product.id)}
                          title={product.status === 'hidden' ? 'Hiển thị lại' : 'Tạm ẩn'}
                        >
                          {product.status === 'hidden' ? <Eye size={13} /> : <EyeOff size={13} />}
                        </button>
                        <button
                          type="button"
                          className="btn-tbl-action delete"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Gỡ bỏ sản phẩm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-product-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>Chi tiết Mã nguồn #{selectedProduct.id}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedProduct(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <div className="modal-prod-preview-head">
                <img
                  src={
                    selectedProduct.images
                      ? selectedProduct.images[0]
                      : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200'
                  }
                  alt={selectedProduct.name}
                  className="modal-prod-thumb-lg"
                />
                <div className="modal-prod-meta-col">
                  <h4>{selectedProduct.name}</h4>
                  <p>
                    Tác giả: <strong>{selectedProduct.seller || 'CodeMart Creator'}</strong>
                  </p>
                  <span className="modal-price-highlight">{formatVND(selectedProduct.price)}</span>
                </div>
              </div>

              <div className="modal-prod-desc-box">
                <h5>Mô tả sản phẩm:</h5>
                <p>
                  {selectedProduct.description ||
                    'Mã nguồn chất lượng cao, đầy đủ tài liệu và file hướng dẫn cài đặt.'}
                </p>
              </div>

              <div className="modal-info-grid">
                <div className="modal-info-field">
                  <span className="field-lbl">Danh mục</span>
                  <span className="field-val">{selectedProduct.category}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Đánh giá trung bình</span>
                  <span className="field-val">{selectedProduct.rating || 4.8} / 5.0 sao</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Lượt mua</span>
                  <span className="field-val">{selectedProduct.sales || 24} lượt</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Trạng thái</span>
                  <span className="field-val text-emerald">Đang hoạt động</span>
                </div>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-close-action"
                onClick={() => setSelectedProduct(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
