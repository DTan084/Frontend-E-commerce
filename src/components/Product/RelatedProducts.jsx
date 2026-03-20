import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../data/mockProducts';
import './RelatedProducts.css';

const RelatedProducts = ({ currentProductId, category }) => {
  // Lấy sản phẩm liên quan từ mockProducts
  const allProducts = getAllProducts();
  
  // Lọc sản phẩm cùng category, loại bỏ sản phẩm hiện tại
  const relatedProducts = allProducts
    .filter(product => 
      product.id !== currentProductId && 
      (product.category === category || product.categoryName === category)
    )
    .slice(0, 4); // Lấy 4 sản phẩm
  
  // Nếu không đủ 4 sản phẩm cùng category, lấy thêm sản phẩm khác
  if (relatedProducts.length < 4) {
    const additionalProducts = allProducts
      .filter(product => 
        product.id !== currentProductId && 
        !relatedProducts.includes(product)
      )
      .slice(0, 4 - relatedProducts.length);
    
    relatedProducts.push(...additionalProducts);
  }

  return (
    <div className="related-products-section">
      {/* Section Header */}
      <div className="related-header">
        <h3 className="section-title">
          <span className="icon">🔥</span>
          Bạn có thể thích
        </h3>
        <p className="section-subtitle">
          Khám phá thêm các sản phẩm tương tự
        </p>
      </div>

      {/* Products Grid */}
      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            product={product}
            viewMode="grid"
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="view-all-container">
        <Link to="/products" className="view-all-btn">
          <span>Xem tất cả sản phẩm</span>
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
