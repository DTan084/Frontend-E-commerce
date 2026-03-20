// File: src/components/Product/ProductFilter.jsx
// Premium sidebar filter component with enhanced UI/UX for PC

import React, { useState } from 'react';
import './ProductFilter.css';

// Icon Components
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const StarIcon = ({ filled = true }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// Category Icons
const MonitorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
    <line x1="8" y1="21" x2="16" y2="21"></line>
    <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const SmartphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const LayoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const ProductFilter = ({ filters = {}, onFilterChange, onClearFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [collapsedSections, setCollapsedSections] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Categories with icons and counts (counts would come from API in real app)
  const categories = [
    { id: 'web-apps', name: 'Web Applications', icon: <MonitorIcon />, count: 142 },
    { id: 'mobile-apps', name: 'Mobile Apps', icon: <SmartphoneIcon />, count: 87 },
    { id: 'admin-panels', name: 'Admin Panels', icon: <LayoutIcon />, count: 65 },
    { id: 'e-commerce', name: 'E-commerce', icon: <ShoppingBagIcon />, count: 98 },
    { id: 'ui-kits', name: 'UI Kits', icon: <BoxIcon />, count: 54 },
    { id: 'cms', name: 'CMS', icon: <MonitorIcon />, count: 43 },
    { id: 'others', name: 'Others', icon: <BoxIcon />, count: 76 },
  ];

  // Programming Languages
  const languages = [
    { id: 'javascript', name: 'JavaScript', count: 156 },
    { id: 'php', name: 'PHP', count: 134 },
    { id: 'python', name: 'Python', count: 89 },
    { id: 'react', name: 'React', count: 112 },
    { id: 'vuejs', name: 'Vue.js', count: 78 },
    { id: 'nodejs', name: 'Node.js', count: 94 },
    { id: 'laravel', name: 'Laravel', count: 87 },
    { id: 'django', name: 'Django', count: 56 },
  ];

  // Rating options
  const ratingOptions = [
    { value: 5, label: '5 Stars', stars: 5 },
    { value: 4, label: '4+ Stars', stars: 4 },
    { value: 3, label: '3+ Stars', stars: 3 },
    { value: 0, label: 'All Ratings', stars: 0 },
  ];

  // Check if any filter is active
  const hasActiveFilters = () => {
    return (
      (filters.categories && filters.categories.length > 0) ||
      (filters.languages && filters.languages.length > 0) ||
      (filters.minPrice && filters.minPrice > 0) ||
      (filters.maxPrice && filters.maxPrice < 500) ||
      (filters.rating && filters.rating > 0)
    );
  };

  // Toggle section collapse
  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    onFilterChange({ ...filters, categories: newCategories });
  };

  // Handle language change
  const handleLanguageChange = (languageId) => {
    const currentLanguages = filters.languages || [];
    const newLanguages = currentLanguages.includes(languageId)
      ? currentLanguages.filter((id) => id !== languageId)
      : [...currentLanguages, languageId];

    onFilterChange({ ...filters, languages: newLanguages });
  };

  // Handle price range change
  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: Number(value) };
    setPriceRange(newRange);
    onFilterChange({ ...filters, minPrice: newRange.min, maxPrice: newRange.max });
  };

  // Handle rating change
  const handleRatingChange = (ratingValue) => {
    onFilterChange({ ...filters, rating: ratingValue });
  };

  // Render star rating
  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span key={index} className={index < count ? 'star filled' : 'star empty'}>
          <StarIcon filled={index < count} />
        </span>
      ));
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button className="mobile-filter-toggle" onClick={() => setIsMobileOpen(true)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        <span>Filters</span>
        {hasActiveFilters() && (
          <span className="filter-badge">
            {(filters.categories?.length || 0) +
              (filters.languages?.length || 0) +
              (filters.rating ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Filter Sidebar */}
      <div className={`product-filter-modern ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Header */}
        <div className="filter-header-mobile">
          <h3>Filters</h3>
          <button className="close-mobile-filter" onClick={() => setIsMobileOpen(false)}>
            <XIcon />
          </button>
        </div>

        {/* Filter Content */}
        <div className="filter-content">
          {/* Categories Section */}
          <div className={`filter-section ${collapsedSections.categories ? 'collapsed' : ''}`}>
            <button className="section-header" onClick={() => toggleSection('categories')}>
              <h4>Categories</h4>
              <ChevronDownIcon />
            </button>
            <div className="section-content">
              <ul className="filter-list">
                {categories.map((category) => (
                  <li key={category.id} className="filter-item">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.categories?.includes(category.id) || false}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span className="checkbox-label">{category.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price Range Section */}
          <div className={`filter-section ${collapsedSections.price ? 'collapsed' : ''}`}>
            <button className="section-header" onClick={() => toggleSection('price')}>
              <h4>Price Range</h4>
              <ChevronDownIcon />
            </button>
            <div className="section-content">
              <div className="price-range-wrapper">
                <div className="price-inputs">
                  <div className="price-input-group">
                    <label>Min</label>
                    <div className="input-wrapper">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        min="0"
                        max={priceRange.max}
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                      />
                    </div>
                  </div>
                  <span className="separator">-</span>
                  <div className="price-input-group">
                    <label>Max</label>
                    <div className="input-wrapper">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        min={priceRange.min}
                        max="500"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="range-slider">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    className="range-min"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="range-max"
                  />
                  <div className="range-track">
                    <div
                      className="range-fill"
                      style={{
                        left: `${(priceRange.min / 500) * 100}%`,
                        right: `${100 - (priceRange.max / 500) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Programming Languages Section */}
          <div className={`filter-section ${collapsedSections.languages ? 'collapsed' : ''}`}>
            <button className="section-header" onClick={() => toggleSection('languages')}>
              <h4>Programming Language</h4>
              <ChevronDownIcon />
            </button>
            <div className="section-content">
              <ul className="filter-list">
                {languages.map((language) => (
                  <li key={language.id} className="filter-item">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={filters.languages?.includes(language.id) || false}
                        onChange={() => handleLanguageChange(language.id)}
                      />
                      <span className="checkbox-label">{language.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rating Section */}
          <div className={`filter-section ${collapsedSections.rating ? 'collapsed' : ''}`}>
            <button className="section-header" onClick={() => toggleSection('rating')}>
              <h4>Rating</h4>
              <ChevronDownIcon />
            </button>
            <div className="section-content">
              <ul className="filter-list rating-list">
                {ratingOptions.map((option) => (
                  <li key={option.value} className="filter-item">
                    <label className="custom-radio">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === option.value}
                        onChange={() => handleRatingChange(option.value)}
                      />
                      <span className="rating-stars">
                        {option.stars > 0 ? (
                          renderStars(option.stars)
                        ) : (
                          <span className="all-ratings">All</span>
                        )}
                      </span>
                      <span className="rating-label">{option.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clear All Button */}
        {hasActiveFilters() && (
          <div className="filter-footer">
            <button className="clear-filters-btn" onClick={onClearFilters}>
              <XIcon />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="filter-overlay" onClick={() => setIsMobileOpen(false)}></div>
      )}
    </>
  );
};

export default ProductFilter;
