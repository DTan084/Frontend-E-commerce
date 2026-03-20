import React from 'react';
import './PurchasedProducts.css';

const PurchasedProducts = ({ products = [] }) => {
  // Mock data if no products provided
  const defaultProducts = products.length > 0 ? products : [
    {
      id: 1,
      title: 'Admin Dashboard Pro',
      image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Admin+Dashboard',
      price: 99,
      downloadCount: 3,
      category: 'Admin Template',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'E-commerce UI Kit',
      image: 'https://via.placeholder.com/300x200/48bb78/ffffff?text=E-commerce+Kit',
      price: 149,
      downloadCount: 5,
      category: 'UI Kit',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Landing Page Bundle',
      image: 'https://via.placeholder.com/300x200/ed8936/ffffff?text=Landing+Pages',
      price: 79,
      downloadCount: 2,
      category: 'Landing Page',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Mobile App UI',
      image: 'https://via.placeholder.com/300x200/9f7aea/ffffff?text=Mobile+UI',
      price: 129,
      downloadCount: 4,
      category: 'Mobile UI',
      rating: 4.6,
    },
  ];

  return (
    <div className="purchased-products-container">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Purchased Products</h2>
          <span className="product-count">{defaultProducts.length} items</span>
        </div>
        <button className="view-all-btn">
          View All
          <span className="arrow">→</span>
        </button>
      </div>

      <div className="products-grid">
        {defaultProducts.map((product, index) => (
          <div 
            key={product.id} 
            className="product-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="product-image-wrapper">
              <img 
                src={product.image} 
                alt={product.title}
                className="product-image"
              />
              <div className="product-badge-wrapper">
                <span className="category-badge">{product.category}</span>
                <span className="rating-badge">
                  <span className="star-icon">⭐</span>
                  {product.rating}
                </span>
              </div>
              <div className="product-overlay">
                <button className="download-btn">
                  <span className="download-icon">⬇</span>
                  <span>Download</span>
                </button>
                <button className="preview-btn">
                  <span className="preview-icon">👁️</span>
                  <span>Preview</span>
                </button>
              </div>
            </div>

            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-meta">
                <div className="product-price">
                  <span className="price-label">Paid</span>
                  <span className="price-value">${product.price}</span>
                </div>
                <div className="download-info">
                  <span className="download-icon-small">⬇</span>
                  <span className="download-count">{product.downloadCount} downloads</span>
                </div>
              </div>
            </div>

            {/* Card shine effect */}
            <div className="card-shine"></div>
          </div>
        ))}
      </div>

      {defaultProducts.length === 0 && (
        <div className="empty-products">
          <div className="empty-icon">📦</div>
          <h3>No Purchased Products</h3>
          <p>Start shopping to build your collection!</p>
          <button className="browse-btn">
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;
