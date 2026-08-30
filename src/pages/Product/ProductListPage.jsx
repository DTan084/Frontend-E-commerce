import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  Sparkles,
  Filter,
  X,
  RotateCcw,
  Star,
  Lightbulb,
  Package,
  Layers,
  Cpu,
} from 'lucide-react';
import { filterProducts } from '../../data/mockProducts';
import Breadcrumb from '../../components/Product/Breadcrumb';
import FilterSidebar from '../../components/Product/FilterSidebar';
import ProductToolbar from '../../components/Product/ProductToolbar';
import ProductCard from '../../components/Product/ProductCard';
import Pagination from '../../components/Product/Pagination';
import EmptySearchState from '../../components/Search/EmptySearchState';
import { getAllProducts } from '../../data/mockProducts';
import { getCategoryName } from '../../data/categories';
import './ProductListPage.css';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [fallbackMessage, setFallbackMessage] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 12;

  // Check if this is a search page (from /search route or has 'q' param)
  const isSearchPage = location.pathname.includes('/search') || Boolean(searchParams.get('q'));

  // Initialize filters with proper defaults
  const [filters, setFilters] = useState(() => {
    const searchQuery = searchParams.get('q') || searchParams.get('search') || '';
    return {
      categories: searchParams.get('category') ? [searchParams.get('category')] : [],
      technologies: searchParams.get('technology') ? [searchParams.get('technology')] : [],
      features: searchParams.get('feature') ? [searchParams.get('feature')] : [],
      search: searchQuery,
      minPrice: 0,
      maxPrice: 5000000,
      rating: null,
      sortBy: searchParams.get('sort') || 'newest',
    };
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const filteredProducts = filterProducts({
        category: filters.categories[0] || '',
        technology: filters.technologies[0] || '',
        features: filters.features || [],
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        rating: filters.rating,
        sortBy: filters.sortBy,
      });

      const hasFallbackResults = filteredProducts.some((p) => p.isFallback);
      const fallbackMsg = hasFallbackResults && filteredProducts[0]?.fallbackMessage;

      setProducts(filteredProducts);
      setFallbackMessage(fallbackMsg || null);
      setLoading(false);
      setCurrentPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get('category');
    const technology = searchParams.get('technology');
    const feature = searchParams.get('feature');
    const q = searchParams.get('q') || searchParams.get('search');
    const sort = searchParams.get('sort');
    const filter = searchParams.get('filter');

    const categoryFromFilter = filter && filter !== 'all' ? filter : null;

    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : categoryFromFilter ? [categoryFromFilter] : [],
      technologies: technology ? [technology] : [],
      features: feature ? [feature] : [],
      search: q || '',
      sortBy: sort || 'newest',
    }));
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      technologies: [],
      features: [],
      search: '',
      minPrice: 0,
      maxPrice: 5000000,
      rating: null,
      sortBy: 'newest',
    });
    setSearchParams({});
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const handleSearchChange = (search) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleRemoveFilter = (type, value) => {
    if (type === 'category') {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }));
    } else if (type === 'technology') {
      setFilters((prev) => ({
        ...prev,
        technologies: prev.technologies.filter((t) => t !== value),
      }));
    } else if (type === 'feature') {
      setFilters((prev) => ({
        ...prev,
        features: prev.features.filter((f) => f !== value),
      }));
    } else if (type === 'rating') {
      setFilters((prev) => ({ ...prev, rating: null }));
    } else if (type === 'search') {
      setFilters((prev) => ({ ...prev, search: '' }));
    }
  };

  const getActiveFiltersCount = () => {
    return (
      (filters.categories?.length || 0) +
      (filters.technologies?.length || 0) +
      (filters.features?.length || 0) +
      (filters.rating ? 1 : 0) +
      (filters.search ? 1 : 0) +
      (filters.minPrice > 0 || filters.maxPrice < 5000000 ? 1 : 0)
    );
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const breadcrumbItems = [
    { label: isSearchPage ? 'Tìm kiếm' : 'Sản phẩm', link: isSearchPage ? '/search' : '/products' },
  ];

  if (filters?.categories && filters.categories.length > 0) {
    const categoryName = getCategoryName(filters.categories[0], 'vi');
    breadcrumbItems.push({
      label: categoryName,
    });
  }

  const getPageTitle = () => {
    if (isSearchPage && filters?.search) {
      return `"${filters.search}"`;
    }
    if (filters?.categories && filters.categories.length > 0) {
      return getCategoryName(filters.categories[0], 'vi');
    }
    return 'Khám phá Kho Mã nguồn';
  };

  const getPageSubtitle = () => {
    if (isSearchPage && filters?.search) {
      if (fallbackMessage) {
        return fallbackMessage;
      }
      if (products.length === 0) {
        return 'Không tìm thấy mã nguồn phù hợp với từ khóa này';
      }
      return `Tìm thấy ${products.length} mã nguồn phù hợp`;
    }
    if (filters?.categories && filters.categories.length > 0) {
      const categoryName = getCategoryName(filters.categories[0], 'vi');
      return `Duyệt các mã nguồn và giải pháp chất lượng cao trong danh mục ${categoryName}`;
    }
    return 'Tiết kiệm thời gian phát triển với hàng nghìn mã nguồn website, app và module chất lượng cao đã kiểm duyệt.';
  };

  return (
    <div className="product-list-page">
      <Breadcrumb items={breadcrumbItems} />

      {/* Modern High-Contrast Hero Banner */}
      <section className="catalog-hero-banner">
        <div className="container">
          <div className="catalog-hero-content">
            <div className="catalog-hero-badge">
              <Sparkles size={14} />
              <span>{isSearchPage ? 'KẾT QUẢ TÌM KIẾM' : 'KHO MÃ NGUỒN CHẤT LƯỢNG'}</span>
            </div>

            <h1 className="catalog-hero-title">{getPageTitle()}</h1>
            <p className="catalog-hero-subtitle">{getPageSubtitle()}</p>
          </div>
        </div>
      </section>

      <section className="products-content-section">
        <div className="container">
          <div className={`products-layout ${showFilters ? 'filters-visible' : 'filters-hidden'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              showFilters={showFilters}
              onClose={() => setShowFilters(false)}
            />

            <div className="products-main-content">
              <ProductToolbar
                totalProducts={products?.length || 0}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                sortBy={filters?.sortBy || 'newest'}
                onSortChange={handleSortChange}
                searchQuery={filters?.search || ''}
                onSearchChange={handleSearchChange}
                activeFiltersCount={getActiveFiltersCount()}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
              />

              {/* Active Filter Tags Bar */}
              {getActiveFiltersCount() > 0 && (
                <div className="active-filters-bar">
                  <div className="active-filters-title">
                    <Filter size={14} />
                    <span>Bộ lọc:</span>
                  </div>

                  <div className="active-filters-chips-list">
                    {filters.search && (
                      <span className="filter-chip-item tag-search">
                        <span>"{filters.search}"</span>
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={() => handleRemoveFilter('search')}
                          aria-label="Xóa từ khóa"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}

                    {filters.categories?.map((cat) => (
                      <span key={cat} className="filter-chip-item tag-category">
                        <Layers size={12} />
                        <span>{getCategoryName(cat, 'vi')}</span>
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={() => handleRemoveFilter('category', cat)}
                          aria-label="Xóa danh mục"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}

                    {filters.technologies?.map((tech) => (
                      <span key={tech} className="filter-chip-item tag-technology">
                        <Cpu size={12} />
                        <span>{tech}</span>
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={() => handleRemoveFilter('technology', tech)}
                          aria-label="Xóa công nghệ"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}

                    {filters.features?.map((feature) => (
                      <span key={feature} className="filter-chip-item tag-feature">
                        <Sparkles size={12} />
                        <span>{feature}</span>
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={() => handleRemoveFilter('feature', feature)}
                          aria-label="Xóa tính năng"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}

                    {filters.rating && (
                      <span className="filter-chip-item tag-rating">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{filters.rating} sao trở lên</span>
                        <button
                          type="button"
                          className="remove-chip-btn"
                          onClick={() => handleRemoveFilter('rating')}
                          aria-label="Xóa đánh giá"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    )}
                  </div>

                  <button type="button" className="btn-clear-all-chips" onClick={handleClearAll}>
                    <RotateCcw size={12} />
                    <span>Xóa tất cả</span>
                  </button>
                </div>
              )}

              {/* Fallback Search Suggestion Banner */}
              {fallbackMessage && products.length > 0 && (
                <div className="smart-fallback-banner">
                  <div className="fallback-icon-box">
                    <Lightbulb size={20} />
                  </div>
                  <div className="fallback-text-content">
                    <h4>Tìm kiếm thông minh đang kích hoạt</h4>
                    <p>{fallbackMessage}</p>
                  </div>
                </div>
              )}

              {/* Products Rendering State */}
              {loading ? (
                <div className="catalog-loading-state">
                  <div className="catalog-spinner" />
                  <p>Đang tìm kiếm mã nguồn phù hợp...</p>
                </div>
              ) : currentProducts.length > 0 ? (
                <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              ) : filters?.search ||
                filters?.categories?.length > 0 ||
                filters?.technologies?.length > 0 ||
                filters?.rating ? (
                <EmptySearchState
                  query={filters.search || 'bộ lọc'}
                  allProducts={getAllProducts()}
                  onClearSearch={handleClearAll}
                />
              ) : (
                <div className="catalog-empty-state">
                  <div className="empty-state-icon-box">
                    <Package size={48} />
                  </div>
                  <h3>Không tìm thấy mã nguồn</h3>
                  <p>Hiện tại không có sản phẩm nào phù hợp với điều kiện lọc của bạn.</p>
                  <button type="button" className="btn-reset-filters" onClick={handleClearAll}>
                    <RotateCcw size={15} />
                    <span>Làm mới bộ lọc</span>
                  </button>
                </div>
              )}

              {!loading && currentProducts.length > 0 && (
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

export default ProductListPage;
