import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, PlusCircle, Star, Tag, Calendar, ShoppingBag, TrendingUp } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ProductActions from './ProductActions';
import './ProductsTable.css';

const ProductsTable = ({ products, onEdit, onView, onDelete }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (products.length === 0) {
    return (
      <div className="empty-products-modern">
        <div className="empty-icon-box">
          <Package size={36} className="text-muted" />
        </div>
        <h3 className="empty-title">Không tìm thấy mã nguồn nào</h3>
        <p className="empty-subtitle">
          Chưa có sản phẩm nào phù hợp với bộ lọc hiện tại. Bắt đầu đăng bán mã nguồn đầu tiên của
          bạn!
        </p>
        <button
          type="button"
          className="btn-empty-upload"
          onClick={() => navigate('/seller/upload')}
        >
          <PlusCircle size={15} />
          <span>Đăng bán mã nguồn mới</span>
        </button>
      </div>
    );
  }

  return (
    <div className="products-table-container-modern">
      <div className="table-responsive-wrapper">
        <table className="products-data-table">
          <thead>
            <tr>
              <th className="th-media">Ảnh đại diện</th>
              <th className="th-info">Thông tin mã nguồn</th>
              <th className="th-status">Trạng thái</th>
              <th className="th-metrics">Hiệu suất bán</th>
              <th className="th-actions">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-table-row">
                {/* Media Thumbnail */}
                <td className="td-media">
                  <div className="product-thumb-container">
                    <img
                      src={product.image || 'https://via.placeholder.com/120x80?text=CodeMart'}
                      alt={product.title}
                      className="product-thumb-img"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x80?text=CodeMart';
                      }}
                    />
                    {product.isFeatured && (
                      <span className="featured-chip">
                        <Star size={10} fill="#f59e0b" color="#f59e0b" />
                        <span>Nổi bật</span>
                      </span>
                    )}
                  </div>
                </td>

                {/* Product Info */}
                <td className="td-info">
                  <div className="product-info-cell">
                    <h4 className="product-cell-title">{product.title}</h4>
                    <div className="product-cell-meta">
                      <span className="meta-category-tag">
                        <Tag size={11} />
                        <span>{product.category}</span>
                      </span>
                      <span className="meta-date-text">
                        <Calendar size={11} />
                        <span>
                          {product.uploadedAt
                            ? new Date(product.uploadedAt).toLocaleDateString('vi-VN')
                            : 'Mới đăng'}
                        </span>
                      </span>
                    </div>
                    <div className="product-cell-pricing">
                      <strong className="cell-price-current">
                        {formatPrice(product.salePrice || product.price)}
                      </strong>
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="cell-price-original">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="td-status">
                  <StatusBadge status={product.status} reason={product.rejectionReason} />
                </td>

                {/* Metrics */}
                <td className="td-metrics">
                  <div className="product-metrics-cell">
                    <div className="metric-row">
                      <ShoppingBag size={12} className="text-secondary" />
                      <span>{product.sales || 0} lượt mua</span>
                    </div>
                    <div className="metric-row">
                      <TrendingUp size={12} className="text-emerald" />
                      <strong className="metric-revenue-val">
                        {formatPrice((product.sales || 0) * (product.salePrice || product.price))}
                      </strong>
                    </div>
                    {product.rating && (
                      <div className="metric-row rating">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating.toFixed(1)} / 5.0</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="td-actions">
                  <ProductActions
                    product={product}
                    onEdit={onEdit}
                    onView={onView}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
