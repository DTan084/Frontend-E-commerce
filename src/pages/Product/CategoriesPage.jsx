import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Cpu,
  ShoppingBag,
  Building2,
  Newspaper,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Home as HomeIcon,
  Plane,
  GraduationCap,
  Laptop,
  Code2,
} from 'lucide-react';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import './CategoriesPage.css';

const categoryIconMap = {
  'ban-hang-tmdt': ShoppingBag,
  'gioi-thieu-dich-vu': Building2,
  'tin-tuc': Newspaper,
  'quan-ly': BarChart3,
  'giai-tri': Gamepad2,
  'dien-dan': MessageSquare,
  'bat-dong-san': HomeIcon,
  'du-lich-khach-san': Plane,
  'giao-duc-y-te': GraduationCap,
  'may-tinh-dich-vu': Laptop,
  khac: Code2,
};

const categoryColorMap = {
  'ban-hang-tmdt': { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' },
  'gioi-thieu-dich-vu': { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669' },
  'tin-tuc': { bg: 'rgba(245, 158, 11, 0.1)', color: '#d97706' },
  'quan-ly': { bg: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed' },
  'giai-tri': { bg: 'rgba(236, 72, 153, 0.1)', color: '#db2777' },
  'dien-dan': { bg: 'rgba(20, 184, 166, 0.1)', color: '#0d9488' },
  'bat-dong-san': { bg: 'rgba(249, 115, 22, 0.1)', color: '#ea580c' },
  'du-lich-khach-san': { bg: 'rgba(6, 182, 212, 0.1)', color: '#0891b2' },
  'giao-duc-y-te': { bg: 'rgba(99, 102, 241, 0.1)', color: '#4f46e5' },
  'may-tinh-dich-vu': { bg: 'rgba(100, 116, 139, 0.1)', color: '#475569' },
  khac: { bg: 'rgba(168, 85, 247, 0.1)', color: '#9333ea' },
};

const CategoriesPage = () => {
  const categories = getAllCategories();
  const allProducts = getAllProducts();

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: allProducts.filter((p) => p.category === cat.id).length,
  }));

  const popularTechs = [
    { name: 'React', color: '#0284c7' },
    { name: 'Vue.js', color: '#059669' },
    { name: 'Laravel', color: '#e11d48' },
    { name: 'Spring Boot', color: '#16a34a' },
    { name: 'Node.js', color: '#65a30d' },
    { name: 'Flutter', color: '#0ea5e9' },
    { name: 'Angular', color: '#dc2626' },
    { name: 'PHP', color: '#7c3aed' },
  ];

  return (
    <div className="categories-page">
      {/* Hero Section */}
      <section className="categories-hero">
        <div className="container">
          <div className="categories-hero-content">
            <div className="categories-hero-badge">
              <Layers size={14} />
              <span>TẤT CẢ DANH MỤC</span>
            </div>
            <h1 className="categories-hero-title">Khám phá Kho Mã nguồn</h1>
            <p className="categories-hero-subtitle">
              Tìm kiếm và lựa chọn các gói giải pháp, source code web/app chuẩn SEO, tối ưu bảo mật
              theo đúng lĩnh vực dự án của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Categories */}
      <section className="categories-content-section">
        <div className="container">
          <div className="categories-cards-grid">
            {categoriesWithCount.map((category) => {
              const IconComp = categoryIconMap[category.id] || Code2;
              const colorInfo = categoryColorMap[category.id] || {
                bg: 'rgba(79, 70, 229, 0.1)',
                color: '#4f46e5',
              };

              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="category-showcase-card"
                >
                  <div className="category-card-top">
                    <div
                      className="category-card-icon-box"
                      style={{ background: colorInfo.bg, color: colorInfo.color }}
                    >
                      <IconComp size={26} />
                    </div>
                    <span className="category-product-count-badge">{category.count} mã nguồn</span>
                  </div>

                  <h3 className="category-card-name">{category.name}</h3>
                  <p className="category-card-desc">{category.description}</p>

                  <div className="category-card-footer">
                    <span className="explore-text">Khám phá ngay</span>
                    <ArrowRight size={15} className="arrow-icon" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Technologies Banner */}
      <section className="popular-tech-section">
        <div className="container">
          <div className="tech-section-header">
            <Cpu size={22} className="tech-header-icon" />
            <h2>Công nghệ & Framework phổ biến</h2>
            <p>Duyệt theo ngôn ngữ lập trình và nền tảng phát triển yêu thích</p>
          </div>

          <div className="tech-pills-container">
            {popularTechs.map((tech) => (
              <Link
                key={tech.name}
                to={`/products?technology=${encodeURIComponent(tech.name.toLowerCase())}`}
                className="tech-showcase-pill"
              >
                <span className="tech-dot" style={{ background: tech.color }} />
                <span className="tech-name">{tech.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
