import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import { getCategoryById } from '../../data/categories';
import ProductCard from '../../components/Product/ProductCard';
import FilterSidebar from '../../components/Product/FilterSidebar';
import ProductToolbar from '../../components/Product/ProductToolbar';
import Pagination from '../../components/Product/Pagination';
import './CategoryDetailPage.css';

const CategoryDetailPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Find category by slug (slug is same as id in our structure)
  const category = getCategoryById(slug);

  const [filters, setFilters] = useState({
    categories: [slug],
    technologies: [],
    search: '',
    minPrice: 0,
    maxPrice: 5000000,
    rating: null,
    sortBy: searchParams.get('sort') || 'newest'
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Filter products by category
      const categoryProducts = mockProducts.filter(p => p.category === slug);
      setProducts(categoryProducts);
      setLoading(false);
    }, 300);
  }, [slug, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (sortBy) => {
    setFilters({ ...filters, sortBy });
    setSearchParams({ sort: sortBy });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!category) {
    return (
      <div className="category-detail-page">
        <section className="category-hero error">
          <div className="container">
            <h1>❌ Category Not Found</h1>
            <p>The category you're looking for doesn't exist.</p>
            <Link to="/categories" className="back-btn">← Back to Categories</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="category-detail-page">
      {/* Category Hero */}
      <section className="category-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/categories">Categories</Link>
            <span>/</span>
            <span>{category.name}</span>
          </div>

          <div className="hero-content">
            <div className="hero-icon">{category.icon}</div>
            <div className="hero-text">
              <h1>{category.name}</h1>
              <p>{category.description}</p>
              <div className="hero-stats">
                <span className="stat">
                  📦 {products.length} products
                </span>
                <span className="stat">
                  ⭐ Top rated
                </span>
                <span className="stat">
                  🔥 Trending
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories (if any) */}
      {/* <section className="subcategories-nav">
        <div className="container">
          <div className="subcategory-tabs">
            <button className="subcategory-tab active">All</button>
            <button className="subcategory-tab">Web Apps</button>
            <button className="subcategory-tab">Mobile Apps</button>
          </div>
        </div>
      </section> */}

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="products-layout">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={() => setFilters({
                categories: [slug],
                technologies: [],
                search: '',
                minPrice: 0,
                maxPrice: 5000000,
                rating: null,
                sortBy: 'newest'
              })}
            />

            <div className="products-main">
              <ProductToolbar
                totalProducts={products.length}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                sortBy={filters.sortBy}
                onSortChange={handleSortChange}
              />

              {loading ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Loading products...</p>
                </div>
              ) : currentProducts.length > 0 ? (
                <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                  {currentProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <h3>No products found in this category</h3>
                  <p>Try adjusting your filters or check back later</p>
                  <Link to="/products" className="browse-all-btn">
                    Browse All Products
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
