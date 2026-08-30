import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Star,
  Flame,
  AlertCircle,
  ArrowLeft,
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
import { getAllProducts } from '../../data/mockProducts';
import { getCategoryById } from '../../data/categories';
import Breadcrumb from '../../components/Product/Breadcrumb';
import ProductCard from '../../components/Product/ProductCard';
import FilterSidebar from '../../components/Product/FilterSidebar';
import ProductToolbar from '../../components/Product/ProductToolbar';
import Pagination from '../../components/Product/Pagination';
import './CategoryDetailPage.css';

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
  'ban-hang-tmdt': { bg: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' },
  'gioi-thieu-dich-vu': { bg: 'rgba(16, 185, 129, 0.15)', color: '#34d399' },
  'tin-tuc': { bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' },
  'quan-ly': { bg: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' },
  'giai-tri': { bg: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' },
  'dien-dan': { bg: 'rgba(20, 184, 166, 0.15)', color: '#2dd4bf' },
  'bat-dong-san': { bg: 'rgba(249, 115, 22, 0.15)', color: '#fb923c' },
  'du-lich-khach-san': { bg: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' },
  'giao-duc-y-te': { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' },
  'may-tinh-dich-vu': { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' },
  khac: { bg: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' },
};

const CategoryDetailPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 12;

  const category = getCategoryById(slug);

  const [filters, setFilters] = useState({
    categories: [slug],
    technologies: [],
    features: [],
    search: '',
    minPrice: 0,
    maxPrice: 5000000,
    rating: null,
    sortBy: searchParams.get('sort') || 'newest',
  });

  useEffect(() => {
    setLoading(true);
    const allProducts = getAllProducts();
    const timer = setTimeout(() => {
      let filtered = allProducts.filter((p) => p.category === slug);
      if (filters.search) {
        filtered = filtered.filter(
          (p) =>
            p.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.description?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      setProducts(filtered);
      setLoading(false);
      setCurrentPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [slug, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setSearchParams({ sort: sortBy });
  };

  const handleSearchChange = (search) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!category) {
    return (
      <div className="category-detail-page">
        <section className="category-hero-error">
          <div className="container">
            <div className="error-icon-box">
              <AlertCircle size={48} />
            </div>
            <h1>Không tìm thấy danh mục</h1>
            <p>Danh mục bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang đường dẫn khác.</p>
            <Link to="/categories" className="btn-back-categories">
              <ArrowLeft size={16} />
              <span>Quay lại tất cả danh mục</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const IconComp = categoryIconMap[slug] || Code2;
  const colorInfo = categoryColorMap[slug] || {
    bg: 'rgba(99, 102, 241, 0.15)',
    color: '#818cf8',
  };

  const breadcrumbItems = [{ label: 'Danh mục', link: '/categories' }, { label: category.name }];

  return (
    <div className="category-detail-page">
      <Breadcrumb items={breadcrumbItems} />

      {/* Category Hero */}
      <section className="category-detail-hero">
        <div className="container">
          <div className="category-hero-main-box">
            <div
              className="category-hero-icon-circle"
              style={{ background: colorInfo.bg, color: colorInfo.color }}
            >
              <IconComp size={40} />
            </div>

            <div className="category-hero-info">
              <h1 className="category-hero-heading">{category.name}</h1>
              <p className="category-hero-desc">{category.description}</p>

              <div className="category-hero-stats-row">
                <span className="hero-stat-badge">
                  <Package size={14} />
                  <span>{products.length} mã nguồn sẵn có</span>
                </span>
                <span className="hero-stat-badge">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>Đánh giá cao & Xác minh</span>
                </span>
                <span className="hero-stat-badge">
                  <Flame size={14} />
                  <span>Cập nhật liên tục</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="category-products-content">
        <div className="container">
          <div className={`products-layout ${showFilters ? 'filters-visible' : 'filters-hidden'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={() =>
                setFilters({
                  categories: [slug],
                  technologies: [],
                  features: [],
                  search: '',
                  minPrice: 0,
                  maxPrice: 5000000,
                  rating: null,
                  sortBy: 'newest',
                })
              }
              showFilters={showFilters}
              onClose={() => setShowFilters(false)}
            />

            <div className="products-main-content">
              <ProductToolbar
                totalProducts={products.length}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                sortBy={filters.sortBy}
                onSortChange={handleSortChange}
                searchQuery={filters.search}
                onSearchChange={handleSearchChange}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />

              {loading ? (
                <div className="catalog-loading-state">
                  <div className="catalog-spinner" />
                  <p>Đang tải mã nguồn trong danh mục...</p>
                </div>
              ) : currentProducts.length > 0 ? (
                <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              ) : (
                <div className="catalog-empty-state">
                  <div className="empty-state-icon-box">
                    <Package size={48} />
                  </div>
                  <h3>Chưa có mã nguồn phù hợp</h3>
                  <p>Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
                  <Link to="/products" className="btn-reset-filters">
                    Xem tất cả sản phẩm
                  </Link>
                </div>
              )}

              {!loading && currentProducts.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailPage;
