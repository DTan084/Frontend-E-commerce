import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
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
  const [fallbackMessage, setFallbackMessage] = useState(null); // Separate state for fallback
  const [showFilters, setShowFilters] = useState(true); // Filter sidebar toggle (default open on desktop)
  const itemsPerPage = 20;

  // Check if this is a search page (from /search route or has 'q' param)
  const isSearchPage = location.pathname.includes('/search') || searchParams.get('q');

  // Initialize filters with proper defaults
  const [filters, setFilters] = useState(() => {
    const searchQuery = searchParams.get('q') || searchParams.get('search') || '';
    return {
      categories: searchParams.get('category') ? [searchParams.get('category')] : [],
      technologies: searchParams.get('technology') ? [searchParams.get('technology')] : [],
      features: [],
      search: searchQuery,
      minPrice: 0,
      maxPrice: 5000000,
      rating: null,
      sortBy: searchParams.get('sort') || 'newest',
    };
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
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

      // Check if any product has isFallback flag (from advanced search)
      const hasFallbackResults = filteredProducts.some((p) => p.isFallback);
      const fallbackMsg = hasFallbackResults && filteredProducts[0]?.fallbackMessage;

      setProducts(filteredProducts);
      setFallbackMessage(fallbackMsg || null); // Update separate state
      setLoading(false);
      setCurrentPage(1);
    }, 300);
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get('category');
    const technology = searchParams.get('technology');
    const feature = searchParams.get('feature');
    const q = searchParams.get('q') || searchParams.get('search');
    const sort = searchParams.get('sort');
    const filter = searchParams.get('filter'); // From SmartSearchBar

    // Map filter to category if present
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
    setFilters({ ...filters, sortBy });
  };

  const handleSearchChange = (search) => {
    setFilters({ ...filters, search });
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleRemoveFilter = (type, value) => {
    if (type === 'category') {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== value),
      });
    } else if (type === 'technology') {
      setFilters({
        ...filters,
        technologies: filters.technologies.filter((t) => t !== value),
      });
    } else if (type === 'feature') {
      setFilters({
        ...filters,
        features: filters.features.filter((f) => f !== value),
      });
    } else if (type === 'rating') {
      setFilters({ ...filters, rating: null });
    } else if (type === 'search') {
      setFilters({ ...filters, search: '' });
    }
  };

  const getActiveFiltersCount = () => {
    return (
      (filters.categories?.length || 0) +
      (filters.technologies?.length || 0) +
      (filters.features?.length || 0) +
      (filters.rating ? 1 : 0)
    );
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Dynamic page title based on context
  const getPageTitle = () => {
    if (isSearchPage && filters?.search) {
      return `"${filters.search}"`;
    }
    if (filters?.categories && filters.categories.length > 0) {
      return getCategoryName(filters.categories[0], 'vi');
    }
    return 'Duyệt mã nguồn';
  };

  const getPageSubtitle = () => {
    if (isSearchPage && filters?.search) {
      if (fallbackMessage) {
        return fallbackMessage; // Show smart fallback message
      }
      if (products.length === 0) {
        return 'Không tìm thấy sản phẩm phù hợp';
      }
      return `Tìm thấy ${products.length} sản phẩm phù hợp`;
    }
    if (filters?.categories && filters.categories.length > 0) {
      const categoryName = getCategoryName(filters.categories[0], 'vi');
      return `Khám phá các sản phẩm trong danh mục ${categoryName}`;
    }
    return 'Khám phá mã nguồn cao cấp, giao diện và dịch vụ thiết kế cho dự án tiếp theo của bạn';
  };

  return (
    <div className="product-list-page">
      <Breadcrumb items={breadcrumbItems} />

      <section className="page-header-section">
        <div className="container">
          <div className="header-content">
            {isSearchPage && filters?.search ? (
              <>
                <div className="search-label">Kết quả tìm kiếm {getPageTitle()}</div>
              </>
            ) : (
              <h1 className="page-title">{getPageTitle()}</h1>
            )}
            <p className="page-subtitle">{getPageSubtitle()}</p>
          </div>
        </div>
      </section>

      <section className="products-content">
        <div className="container">
          <div className={`products-layout ${showFilters ? 'filters-visible' : 'filters-hidden'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
              showFilters={showFilters}
              onClose={() => setShowFilters(false)}
            />

            <div className="products-main">
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

              {/* Active Filters Display */}
              {getActiveFiltersCount() > 0 && (
                <div className="active-filters-bar">
                  <div className="active-filters-label">
                    <span className="icon">🔍</span>
                    <span>Bộ lọc đang áp dụng:</span>
                  </div>
                  <div className="active-filters-list">
                    {filters.categories?.map((cat) => (
                      <span key={cat} className="filter-tag tag-category">
                        {getCategoryName(cat, 'vi')}
                        <button
                          className="remove-tag"
                          onClick={() => handleRemoveFilter('category', cat)}
                          title="Xóa bộ lọc"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {filters.technologies?.map((tech) => (
                      <span key={tech} className="filter-tag tag-technology">
                        {tech}
                        <button
                          className="remove-tag"
                          onClick={() => handleRemoveFilter('technology', tech)}
                          title="Xóa bộ lọc"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {filters.features?.map((feature) => (
                      <span key={feature} className="filter-tag tag-feature">
                        ⭐ {feature}
                        <button
                          className="remove-tag"
                          onClick={() => handleRemoveFilter('feature', feature)}
                          title="Xóa bộ lọc"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {filters.rating && (
                      <span className="filter-tag tag-rating">
                        {'⭐'.repeat(filters.rating)}+ Đánh giá
                        <button
                          className="remove-tag"
                          onClick={() => handleRemoveFilter('rating')}
                          title="Xóa bộ lọc"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                  </div>
                  <button className="clear-all-filters" onClick={handleClearAll}>
                    Xóa tất cả
                  </button>
                </div>
              )}

              {/* Fallback Info Banner */}
              {fallbackMessage && products.length > 0 && (
                <div className="fallback-info-banner">
                  <div className="fallback-icon">💡</div>
                  <div className="fallback-content">
                    <strong>Tìm kiếm thông minh đang hoạt động</strong>
                    <p>{fallbackMessage}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Đang tải sản phẩm tuyệt vời...</p>
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
                  query={filters.search || 'filtered products'}
                  allProducts={getAllProducts()}
                  onClearSearch={handleClearAll}
                />
              ) : (
                <div className="empty-state">
                  <div className="empty-icon"></div>
                  <h3>Không có sản phẩm</h3>
                  <p>Hiện tại không có sản phẩm nào để hiển thị</p>
                  <button className="reset-btn" onClick={handleClearAll}>
                    Làm mới
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
