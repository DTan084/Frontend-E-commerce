import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, LayoutGrid, List, Package } from 'lucide-react';
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
  onToggleFilters,
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  ];

  return (
    <div className="product-toolbar">
      <div className="toolbar-main-row">
        {/* Search within results */}
        <div className="toolbar-search-wrapper">
          <Search size={16} className="toolbar-search-icon" />
          <input
            type="text"
            placeholder="Lọc nhanh trong kết quả này..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="toolbar-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="toolbar-clear-search"
              onClick={() => onSearchChange('')}
              aria-label="Xóa tìm kiếm"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Controls: Filter toggle, Sort, View switcher */}
        <div className="toolbar-actions-wrapper">
          {/* Mobile/Desktop Filter Toggle Button */}
          <button
            type="button"
            className={`toolbar-filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={onToggleFilters}
            aria-label="Bật/tắt bộ lọc"
          >
            <SlidersHorizontal size={15} />
            <span>Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="filter-count-badge">{activeFiltersCount}</span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="toolbar-sort-dropdown">
            <ArrowUpDown size={14} className="sort-icon-prefix" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="toolbar-sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle: Grid / List */}
          <div className="toolbar-view-mode">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Chế độ lưới (Grid View)"
              aria-label="Chế độ lưới"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => onViewModeChange('list')}
              title="Chế độ danh sách (List View)"
              aria-label="Chế độ danh sách"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar Status Row */}
      <div className="toolbar-status-row">
        <div className="results-count-group">
          <Package size={14} className="results-icon" />
          <span className="results-text">
            Tìm thấy <strong>{totalProducts.toLocaleString()}</strong> mã nguồn phù hợp
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;
