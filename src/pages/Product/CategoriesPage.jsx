import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../data/categories';
import { mockProducts } from '../../data/mockProducts';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const categories = getAllCategories();
  
  // Count products per category
  const categoriesWithCount = categories.map(cat => ({
    ...cat,
    count: mockProducts.filter(p => p.category === cat.id).length
  }));

  return (
    <div className="categories-page">
      <section className="categories-hero">
        <div className="container">
          <h1 className="page-title">🗂️ Duyệt danh mục</h1>
          <p className="page-subtitle">
            Khám phá bộ sưu tập mã nguồn cao cấp được sắp xếp theo danh mục
          </p>
        </div>
      </section>

      <section className="categories-content">
        <div className="container">
          <div className="categories-grid">
            {categoriesWithCount.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-count">
                  {category.count} products
                </div>
                <div className="category-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Technologies */}
      <section className="tech-section">
        <div className="container">
          <h2 className="section-title">Popular Technologies</h2>
          <div className="tech-tags">
            {['React', 'Vue.js', 'Laravel', 'Node.js', 'WordPress', 'Flutter', 'Angular', 'PHP'].map(tech => (
              <Link
                key={tech}
                to={`/products?technology=${tech.toLowerCase()}`}
                className="tech-tag"
              >
                {tech}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
