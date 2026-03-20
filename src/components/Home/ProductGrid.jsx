import React from 'react';
import ProductCard from '../Product/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  title,
  subtitle,
  products,
  showViewAll = true,
  viewAllLink = '/products',
  columns = 4,
}) => {
  return (
    <section className="product-grid-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          {showViewAll && (
            <a href={viewAllLink} className="view-all-link">
              Xem tất cả
              <span className="arrow">→</span>
            </a>
          )}
        </div>

        <div className={`home-products-grid grid-cols-${columns}`}>
          {products && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="no-products">
              <span className="no-products-icon">📦</span>
              <p>Không có sản phẩm</p>
            </div>
          )}
        </div>

        {showViewAll && products && products.length > 0 && (
          <div className="view-all-bottom">
            <a href={viewAllLink} className="btn-view-all">
              <span>Xem tất cả sản phẩm</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
