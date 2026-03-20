import React from 'react';
import StatusBadge from './StatusBadge';
import ProductActions from './ProductActions';
import './ProductsTable.css';

const ProductsTable = ({ products, onEdit, onView, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <div className="empty-icon">📦</div>
        <h3 className="empty-title">No Products Found</h3>
        <p className="empty-subtitle">Start by uploading your first product</p>
        <button className="empty-action-btn" onClick={() => window.location.href = '/seller/upload'}>
          ⬆️ Upload Product
        </button>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="products-table-container">
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th className="th-image">Image</th>
              <th className="th-product">Product Details</th>
              <th className="th-status">Status</th>
              <th className="th-stats">Statistics</th>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className="product-row"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image */}
                <td className="td-image">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image || 'https://via.placeholder.com/120x80?text=No+Image'}
                      alt={product.title}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x80?text=No+Image';
                      }}
                    />
                    {product.isFeatured && (
                      <div className="featured-badge">⭐ Featured</div>
                    )}
                  </div>
                </td>

                {/* Product Details */}
                <td className="td-product">
                  <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-meta">
                      <span className="product-category">
                        📁 {product.category}
                      </span>
                      <span className="product-date">
                        📅 {new Date(product.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="product-price">
                      {formatPrice(product.price)}
                      {product.salePrice && product.salePrice < product.price && (
                        <>
                          <span className="original-price">{formatPrice(product.price)}</span>
                          <span className="sale-badge">Sale</span>
                        </>
                      )}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="td-status">
                  <StatusBadge 
                    status={product.status} 
                    reason={product.rejectionReason}
                  />
                </td>

                {/* Statistics */}
                <td className="td-stats">
                  <div className="product-stats">
                    <div className="stat-item">
                      <span className="stat-icon">🛒</span>
                      <div className="stat-content">
                        <strong className="stat-value">{product.sales || 0}</strong>
                        <span className="stat-label">Sales</span>
                      </div>
                    </div>
                    
                    <div className="stat-divider"></div>
                    
                    <div className="stat-item">
                      <span className="stat-icon">💰</span>
                      <div className="stat-content">
                        <strong className="stat-value">
                          {formatPrice((product.sales || 0) * (product.salePrice || product.price))}
                        </strong>
                        <span className="stat-label">Revenue</span>
                      </div>
                    </div>
                    
                    {product.rating && (
                      <>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                          <span className="stat-icon">⭐</span>
                          <div className="stat-content">
                            <strong className="stat-value">{product.rating.toFixed(1)}</strong>
                            <span className="stat-label">Rating</span>
                          </div>
                        </div>
                      </>
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
