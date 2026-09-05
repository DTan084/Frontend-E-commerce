import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Building2,
  Newspaper,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Home,
  Plane,
  GraduationCap,
  Laptop,
  Code2,
  ArrowRight,
} from 'lucide-react';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import './CategoryCard.css';

// Icon mapper for categories
const getCategoryIconComponent = (categoryId) => {
  switch (categoryId) {
    case 'ban-hang-tmdt':
      return ShoppingCart;
    case 'gioi-thieu-dich-vu':
      return Building2;
    case 'tin-tuc':
      return Newspaper;
    case 'quan-ly':
      return BarChart3;
    case 'giai-tri':
      return Gamepad2;
    case 'dien-dan':
      return MessageSquare;
    case 'bat-dong-san':
      return Home;
    case 'du-lich-khach-san':
      return Plane;
    case 'giao-duc-y-te':
      return GraduationCap;
    case 'may-tinh-dich-vu':
      return Laptop;
    default:
      return Code2;
  }
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const allProducts = getAllProducts();

  // Count products in this category
  const productCount = allProducts.filter((p) => p.category === category.id).length;
  const IconComponent = getCategoryIconComponent(category.id);

  const handleClick = () => {
    navigate(`/products?category=${category.id}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div
        className="category-icon-wrapper"
        style={{ backgroundColor: `${category.color}15`, color: category.color }}
      >
        <IconComponent size={24} />
      </div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-count">{productCount} mã nguồn</p>
      <div className="category-hover-effect">
        <span className="explore-text">
          Khám phá <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
};

const CategoryGrid = () => {
  const navigate = useNavigate();
  const allProducts = getAllProducts();

  // Get all categories and show only those with products
  const categories = getAllCategories()
    .filter((cat) => {
      const count = allProducts.filter((p) => p.category === cat.id).length;
      return count > 0;
    })
    .slice(0, 6);

  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Duyệt theo danh mục</h2>
            <p className="section-subtitle">
              Tìm kiếm mã nguồn hoàn hảo cho dự án tiếp theo của bạn
            </p>
          </div>
          <button
            type="button"
            className="view-all-header-btn desktop-only"
            onClick={() => navigate('/categories')}
          >
            <span>Tất cả danh mục</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="view-all-container mobile-only">
          <button type="button" className="view-all-btn" onClick={() => navigate('/categories')}>
            <span>Xem tất cả danh mục</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export { CategoryCard, CategoryGrid };
