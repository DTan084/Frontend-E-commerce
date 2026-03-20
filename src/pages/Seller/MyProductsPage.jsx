import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import ProductsTable from '../../components/Seller/ProductsTable';
import './MyProductsPage.css';

const MyProductsPage = () => {
  const navigate = useNavigate();

  // Mock data source for seller product management UI
  const [allProducts] = useState([
    {
      id: 1,
      title: 'Modern Admin Dashboard Template',
      category: 'Web Templates',
      price: 99,
      salePrice: 79,
      image: 'https://via.placeholder.com/300x200?text=Admin+Dashboard',
      status: 'active',
      sales: 50,
      rating: 4.8,
      uploadedAt: '2025-10-01',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'E-commerce Shop Template',
      category: 'Web Templates',
      price: 149,
      image: 'https://via.placeholder.com/300x200?text=E-commerce',
      status: 'pending',
      sales: 0,
      uploadedAt: '2025-10-25',
      isFeatured: false,
    },
    {
      id: 3,
      title: 'Landing Page Pro',
      category: 'Marketing',
      price: 79,
      image: 'https://via.placeholder.com/300x200?text=Landing+Page',
      status: 'rejected',
      sales: 12,
      rating: 4.2,
      uploadedAt: '2025-09-15',
      rejectionReason: 'Low quality screenshots. Please update with high-resolution images.',
      isFeatured: false,
    },
    {
      id: 4,
      title: 'React UI Kit - Premium',
      category: 'UI Kits',
      price: 199,
      salePrice: 149,
      image: 'https://via.placeholder.com/300x200?text=React+UI+Kit',
      status: 'active',
      sales: 85,
      rating: 4.9,
      uploadedAt: '2025-08-10',
      isFeatured: true,
    },
    {
      id: 5,
      title: 'WordPress Blog Theme',
      category: 'WordPress',
      price: 59,
      image: 'https://via.placeholder.com/300x200?text=WP+Theme',
      status: 'active',
      sales: 120,
      rating: 4.7,
      uploadedAt: '2025-07-20',
      isFeatured: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = {
    total: allProducts.length,
    active: allProducts.filter((p) => p.status === 'active').length,
    pending: allProducts.filter((p) => p.status === 'pending').length,
    rejected: allProducts.filter((p) => p.status === 'rejected').length,
    totalSales: allProducts.reduce((sum, p) => sum + (p.sales || 0), 0),
    totalRevenue: allProducts.reduce(
      (sum, p) => sum + (p.sales || 0) * (p.salePrice || p.price),
      0
    ),
  };

  // Handlers
  const handleEdit = (id) => {
    navigate(`/seller/products/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
    // Implement delete logic
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="seller-dashboard-page my-products-page">
      <div className="seller-dashboard-container">
        <SellerSidebar />

        <main className="seller-main-content products-content">
          {/* Header */}
          <div className="products-header">
            <div className="header-left">
              <h1 className="page-title">
                My Products <span className="products-count">({stats.total})</span>
              </h1>
              <p className="page-subtitle">Manage your digital products and track performance</p>
            </div>
            <button className="upload-new-btn" onClick={() => navigate('/seller/upload')}>
              <span className="btn-icon">⬆️</span>
              <span className="btn-text">Upload New Product</span>
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="stats-cards">
            <div className="stat-card total-card">
              <div className="stat-icon-wrapper total-icon">
                <span className="stat-icon">📦</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">{stats.total}</strong>
                <span className="stat-label">Total Products</span>
              </div>
            </div>

            <div className="stat-card active-card">
              <div className="stat-icon-wrapper active-icon">
                <span className="stat-icon">🟢</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">{stats.active}</strong>
                <span className="stat-label">Active</span>
              </div>
            </div>

            <div className="stat-card pending-card">
              <div className="stat-icon-wrapper pending-icon">
                <span className="stat-icon">🟡</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">{stats.pending}</strong>
                <span className="stat-label">Pending</span>
              </div>
            </div>

            <div className="stat-card rejected-card">
              <div className="stat-icon-wrapper rejected-icon">
                <span className="stat-icon">🔴</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">{stats.rejected}</strong>
                <span className="stat-label">Rejected</span>
              </div>
            </div>

            <div className="stat-card sales-card">
              <div className="stat-icon-wrapper sales-icon">
                <span className="stat-icon">🛒</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">{stats.totalSales}</strong>
                <span className="stat-label">Total Sales</span>
              </div>
            </div>

            <div className="stat-card revenue-card">
              <div className="stat-icon-wrapper revenue-icon">
                <span className="stat-icon">💰</span>
              </div>
              <div className="stat-details">
                <strong className="stat-value">${stats.totalRevenue.toLocaleString()}</strong>
                <span className="stat-label">Total Revenue</span>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="filters-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                <span className="filter-icon">📋</span>
                <span className="filter-label">All</span>
                <span className="filter-count">{stats.total}</span>
              </button>
              <button
                className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => handleFilterChange('active')}
              >
                <span className="filter-icon">🟢</span>
                <span className="filter-label">Active</span>
                <span className="filter-count">{stats.active}</span>
              </button>
              <button
                className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
                onClick={() => handleFilterChange('pending')}
              >
                <span className="filter-icon">🟡</span>
                <span className="filter-label">Pending</span>
                <span className="filter-count">{stats.pending}</span>
              </button>
              <button
                className={`filter-btn ${filterStatus === 'rejected' ? 'active' : ''}`}
                onClick={() => handleFilterChange('rejected')}
              >
                <span className="filter-icon">🔴</span>
                <span className="filter-label">Rejected</span>
                <span className="filter-count">{stats.rejected}</span>
              </button>
            </div>

            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search products by title or category..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Products Table */}
          <ProductsTable
            products={currentProducts}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn prev-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className="page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        className={`page-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={page} className="page-dots">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                className="page-btn next-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyProductsPage;
