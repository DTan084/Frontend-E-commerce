import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import PurchasedProductCard from '../../components/Purchases/PurchasedProductCard';
import './MyPurchasesPage.css';

const MyPurchasesPage = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock purchases data
  const allPurchases = [
    {
      id: 1,
      title: 'Premium Admin Dashboard Template',
      image: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Admin+Dashboard',
      category: 'Admin Template',
      language: 'React + TypeScript',
      purchasedDate: '2025-01-15',
      orderId: 'ORD-12345',
      licenseKey: 'XXXX-YYYY-ZZZZ-AAAA',
      downloadCount: 5,
      downloadLimit: null,
      lastDownload: '2025-10-29',
      status: 'active',
    },
    {
      id: 2,
      title: 'E-commerce UI Component Library',
      image: 'https://via.placeholder.com/300x200/48bb78/ffffff?text=E-commerce+Kit',
      category: 'UI Kit',
      language: 'Vue.js',
      purchasedDate: '2024-12-20',
      orderId: 'ORD-12344',
      licenseKey: 'BBBB-CCCC-DDDD-EEEE',
      downloadCount: 12,
      downloadLimit: null,
      lastDownload: '2025-10-25',
      status: 'active',
    },
    {
      id: 3,
      title: 'Landing Page Builder Pack',
      image: 'https://via.placeholder.com/300x200/ed8936/ffffff?text=Landing+Pages',
      category: 'Landing Page',
      language: 'HTML/CSS/JS',
      purchasedDate: '2024-11-10',
      orderId: 'ORD-12343',
      licenseKey: 'FFFF-GGGG-HHHH-IIII',
      downloadCount: 8,
      downloadLimit: null,
      lastDownload: '2025-10-20',
      status: 'active',
    },
    {
      id: 4,
      title: 'Mobile App UI Kit - iOS & Android',
      image: 'https://via.placeholder.com/300x200/9f7aea/ffffff?text=Mobile+UI',
      category: 'Mobile UI',
      language: 'Flutter',
      purchasedDate: '2024-10-05',
      orderId: 'ORD-12342',
      licenseKey: 'JJJJ-KKKK-LLLL-MMMM',
      downloadCount: 3,
      downloadLimit: null,
      lastDownload: '2025-10-15',
      status: 'active',
    },
    {
      id: 5,
      title: 'SaaS Dashboard Template',
      image: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=SaaS+Dashboard',
      category: 'Dashboard',
      language: 'Angular',
      purchasedDate: '2024-09-12',
      orderId: 'ORD-12341',
      licenseKey: 'NNNN-OOOO-PPPP-QQQQ',
      downloadCount: 15,
      downloadLimit: null,
      lastDownload: '2025-10-01',
      status: 'archived',
    },
    {
      id: 6,
      title: 'Blog & Magazine WordPress Theme',
      image: 'https://via.placeholder.com/300x200/38b2ac/ffffff?text=Blog+Theme',
      category: 'WordPress Theme',
      language: 'PHP/WordPress',
      purchasedDate: '2024-08-22',
      orderId: 'ORD-12340',
      licenseKey: 'RRRR-SSSS-TTTT-UUUU',
      downloadCount: 6,
      downloadLimit: null,
      lastDownload: '2025-09-25',
      status: 'active',
    },
  ];

  // Filter purchases
  const filteredPurchases = allPurchases.filter(purchase => {
    const matchesFilter = activeFilter === 'all' || purchase.status === activeFilter;
    const matchesSearch = purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         purchase.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPurchases = filteredPurchases.slice(startIndex, endIndex);

  const filters = [
    { id: 'all', label: 'All', count: allPurchases.length },
    { id: 'active', label: 'Active', count: allPurchases.filter(p => p.status === 'active').length },
    { id: 'archived', label: 'Archived', count: allPurchases.filter(p => p.status === 'archived').length },
  ];

  return (
    <div className="my-purchases-page">
      <div className="purchases-container">
        {/* Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main Content */}
        <main className="purchases-main">
          {/* Page Header */}
          <div className="purchases-header">
            <div className="header-title-section">
              <h1 className="page-title">
                My Purchases
                <span className="purchase-count">{filteredPurchases.length}</span>
              </h1>
              <p className="page-subtitle">
                Manage and download your purchased products
              </p>
            </div>
            <div className="header-actions">
              <button className="action-btn export-btn">
                <span className="btn-icon">📄</span>
                Export List
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="filters-section">
            <div className="filter-tabs">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setCurrentPage(1);
                  }}
                >
                  {filter.label}
                  <span className="tab-count">{filter.count}</span>
                </button>
              ))}
            </div>

            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search your purchases..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Purchases List */}
          <div className="purchases-list">
            {currentPurchases.length > 0 ? (
              currentPurchases.map((purchase, index) => (
                <div
                  key={purchase.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PurchasedProductCard product={purchase} />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No Purchases Found</h3>
                <p>
                  {searchQuery 
                    ? `No results for "${searchQuery}"`
                    : 'You haven\'t purchased any products yet'
                  }
                </p>
                {!searchQuery && (
                  <button className="browse-btn">
                    Browse Products
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`page-number ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

          {/* Summary Stats */}
          <div className="summary-stats">
            <div className="stat-card">
              <span className="stat-icon">📦</span>
              <div className="stat-content">
                <strong>{allPurchases.length}</strong>
                <span>Total Products</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⬇</span>
              <div className="stat-content">
                <strong>{allPurchases.reduce((sum, p) => sum + p.downloadCount, 0)}</strong>
                <span>Total Downloads</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💰</span>
              <div className="stat-content">
                <strong>$1,250</strong>
                <span>Total Spent</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPurchasesPage;
