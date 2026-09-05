import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Inbox } from 'lucide-react';
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
            <Link to={viewAllLink} className="view-all-link">
              <span>Xem tất cả</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className={`home-products-grid grid-cols-${columns}`}>
          {products && products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="no-products">
              <Inbox size={48} className="no-products-icon" />
              <p>Không có sản phẩm</p>
            </div>
          )}
        </div>

        {showViewAll && products && products.length > 0 && (
          <div className="view-all-bottom mobile-only">
            <Link to={viewAllLink} className="btn-view-all">
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
