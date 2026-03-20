import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import { mockSearchData } from '../../data/mockSearch';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, onClearAll, showFilters = true, onClose }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || { min: 0, max: 5000000 });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    technologies: true,
    features: true,
    rating: true
  });

  // Lock body scroll when mobile filters are open
  useEffect(() => {
    if (window.innerWidth <= 992 && showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFilters]);

  // Get categories from centralized config with product counts
  const allProducts = getAllProducts();
  const categories = getAllCategories().map(cat => ({
    id: cat.id,
    label: cat.name,
    icon: cat.icon,
    count: allProducts.filter(p => p.category === cat.id).length
  })).filter(cat => cat.count > 0); // Only show categories with products

  // Get technologies from real data with actual counts
  const technologies = mockSearchData.tags.map(tag => ({
    id: tag.name,
    label: tag.name,
    count: tag.count
  }));

  // Get popular features from real data
  const features = mockSearchData.features.slice(0, 10);

  const ratings = [
    { value: 5, label: '5 sao', icon: '⭐⭐⭐⭐⭐' },
    { value: 4, label: '4+ sao', icon: '⭐⭐⭐⭐' },
    { value: 3, label: '3+ sao', icon: '⭐⭐⭐' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleTechnologyChange = (techId) => {
    const currentTech = filters.technologies || [];
    const newTech = currentTech.includes(techId)
      ? currentTech.filter(id => id !== techId)
      : [...currentTech, techId];
    onFilterChange({ ...filters, technologies: newTech });
  };

  const handleFeatureChange = (featureName) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(featureName)
      ? currentFeatures.filter(f => f !== featureName)
      : [...currentFeatures, featureName];
    onFilterChange({ ...filters, features: newFeatures });
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: parseInt(value) };
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onFilterChange({ 
      ...filters, 
      minPrice: priceRange.min,
      maxPrice: priceRange.max 
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {showFilters && (
        <div className="filter-backdrop" onClick={onClose}></div>
      )}

      <aside className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="icon">🔍</span>
            Bộ lọc
          </h3>
          <div className="sidebar-actions">
            <button className="clear-all-btn" onClick={onClearAll}>
              <span className="icon">✕</span>
              Xóa tất cả
            </button>
            {/* Mobile Close Button */}
            <button className="close-sidebar-btn" onClick={onClose} aria-label="Đóng bộ lọc">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

      {/* Categories Filter */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('categories')}
        >
          <h4 className="section-title">Danh mục</h4>
          <span className={`toggle-icon ${expandedSections.categories ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.categories && (
          <div className="section-content">
            {categories.map(category => (
              <label key={category.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={(filters.categories || []).includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <span className="label-text">{category.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('price')}
        >
          <h4 className="section-title">Khoảng giá</h4>
          <span className={`toggle-icon ${expandedSections.price ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.price && (
          <div className="section-content">
            <div className="price-inputs">
              <div className="price-input-group">
                <label>Tối thiểu</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  placeholder="0"
                />
              </div>
              <span className="price-separator">—</span>
              <div className="price-input-group">
                <label>Tối đa</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  placeholder="5,000,000"
                />
              </div>
            </div>
            <div className="price-range-slider">
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="slider"
              />
            </div>
            <div className="price-display">
              {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
            </div>
            <button className="apply-btn" onClick={applyPriceFilter}>
              Áp dụng
            </button>
          </div>
        )}
      </div>

      {/* Technologies Filter */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('technologies')}
        >
          <h4 className="section-title">Công nghệ</h4>
          <span className={`toggle-icon ${expandedSections.technologies ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.technologies && (
          <div className="section-content">
            {technologies.map(tech => (
              <label key={tech.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={(filters.technologies || []).includes(tech.id)}
                  onChange={() => handleTechnologyChange(tech.id)}
                />
                <span className="label-text">{tech.label}</span>
                
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Features Filter */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('features')}
        >
          <h4 className="section-title">Tính năng</h4>
          <span className={`toggle-icon ${expandedSections.features ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.features && (
          <div className="section-content">
            {features.map(feature => (
              <label key={feature.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={(filters.features || []).includes(feature.name)}
                  onChange={() => handleFeatureChange(feature.name)}
                />
                <span className="label-text">{feature.name}</span>
                
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="filter-section">
        <button 
          className="section-header"
          onClick={() => toggleSection('rating')}
        >
          <h4 className="section-title">Đánh giá</h4>
          <span className={`toggle-icon ${expandedSections.rating ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        {expandedSections.rating && (
          <div className="section-content">
            {ratings.map(rating => (
              <label key={rating.value} className="radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating.value}
                  onChange={() => onFilterChange({ ...filters, rating: rating.value })}
                />
                <span className="rating-stars">{rating.icon}</span>
                <span className="label-text">trở lên</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
    </>
  );
};

export default FilterSidebar;
