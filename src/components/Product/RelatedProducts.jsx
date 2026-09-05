import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../data/mockProducts';
import './RelatedProducts.css';

const RelatedProducts = ({ currentProductId, category }) => {
  const allProducts = getAllProducts();

  const relatedProducts = allProducts
    .filter(
      (product) =>
        product.id !== currentProductId &&
        (product.category === category || product.categoryName === category)
    )
    .slice(0, 4);

  if (relatedProducts.length < 4) {
    const additionalProducts = allProducts
      .filter((product) => product.id !== currentProductId && !relatedProducts.includes(product))
      .slice(0, 4 - relatedProducts.length);

    relatedProducts.push(...additionalProducts);
  }

  return (
    <div className="related-products-modern">
      {/* Section Header */}
      <div className="related-header-row">
        <div className="header-left">
          <div className="badge-flair">
            <Sparkles size={14} />
            <span>Đề xuất liên quan</span>
          </div>
          <h3 className="section-title">Mã nguồn tương tự bạn có thể quan tâm</h3>
        </div>
        <Link to="/products" className="view-all-link-btn">
          <span>Xem tất cả</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Products Grid */}
      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="grid" />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
