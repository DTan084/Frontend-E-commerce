import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const allProducts = getAllProducts();
  
  // Count products in this category
  const productCount = allProducts.filter(p => p.category === category.id).length;

  const handleClick = () => {
    navigate(`/products?category=${category.id}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-icon-wrapper">
        <span className="category-icon">{category.icon}</span>
        <div className="category-icon-bg"></div>
      </div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-count">{productCount} sản phẩm</p>
      <div className="category-hover-effect">
        <span className="explore-text">Khám phá →</span>
      </div>
    </div>
  );
};

const CategoryGrid = () => {
  const navigate = useNavigate();
  const allProducts = getAllProducts();
  
  // Get all categories and show only those with products
  const categories = getAllCategories()
    .filter(cat => {
      // Count products in each category
      const count = allProducts.filter(p => p.category === cat.id).length;
      return count > 0; // Only show categories with products
    })
    .slice(0, 6); // Show top 6 categories

  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Duyệt theo danh mục</h2>
          <p className="section-subtitle">
            Tìm mã nguồn hoàn hảo cho dự án tiếp theo của bạn
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>

        <div className="view-all-container">
          <button 
            className="view-all-btn"
            onClick={() => navigate('/categories')}
          >
            Xem tất cả danh mục
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export { CategoryCard, CategoryGrid };
