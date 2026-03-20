import React from 'react';
import './ProductToolbar.css';

const ProductToolbar = ({ 
  totalProducts, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange,
  searchQuery,
  onSearchChange,
  activeFiltersCount = 0,
  showFilters = false,
  onToggleFilters
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Mới nhất', icon: '🆕' },
    { value: 'popular', label: 'Phổ biến nhất', icon: '🔥' },
    { value: 'rating', label: 'Đánh giá cao nhất', icon: '⭐' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao', icon: '💰' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp', icon: '💎' }
  ];

  return (
    <div className="product-toolbar">
      <div className="toolbar-top">
        <div className="search-box-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => onSearchChange('')}
              aria-label="Xóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>

        <div className="toolbar-controls">
          {/* Mobile Filter Toggle Button */}
          <button 
            className="filter-toggle-btn"
            onClick={onToggleFilters}
            aria-label="Bật/tắt bộ lọc"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="21" x2="14" y1="4" y2="4"></line>
              <line x1="10" x2="3" y1="4" y2="4"></line>
              <line x1="21" x2="12" y1="12" y2="12"></line>
              <line x1="8" x2="3" y1="12" y2="12"></line>
              <line x1="21" x2="16" y1="20" y2="20"></line>
              <line x1="12" x2="3" y1="20" y2="20"></line>
              <line x1="14" x2="14" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="10" y2="14"></line>
              <line x1="16" x2="16" y1="18" y2="22"></line>
            </svg>
            <span>Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="filter-toggle-badge">{activeFiltersCount}</span>
            )}
          </button>
          <div className="sort-dropdown">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sort-icon">
              <path d="M3 6h18M7 12h10M11 18h2"/>
            </svg>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="view-mode-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              aria-label="Grid View"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="2" width="6" height="6" rx="1"/>
                <rect x="12" y="2" width="6" height="6" rx="1"/>
                <rect x="2" y="12" width="6" height="6" rx="1"/>
                <rect x="12" y="12" width="6" height="6" rx="1"/>
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              title="List View"
              aria-label="List View"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <rect x="2" y="3" width="16" height="2" rx="1"/>
                <rect x="2" y="9" width="16" height="2" rx="1"/>
                <rect x="2" y="15" width="16" height="2" rx="1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="toolbar-bottom">
        <div className="results-count">
          <span className="count-badge">{totalProducts.toLocaleString()}</span>
          <span className="count-text">products found</span>
          {activeFiltersCount > 0 && (
            <span className="filters-badge" title={`${activeFiltersCount} active filters`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              {activeFiltersCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
