import React, { useState, useEffect } from 'react';
import {
  Filter,
  RotateCcw,
  X,
  ChevronDown,
  Star,
  DollarSign,
  Cpu,
  Sparkles,
  Layers,
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
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import { mockSearchData } from '../../data/mockSearch';
import './FilterSidebar.css';

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

const FilterSidebar = ({ filters, onFilterChange, onClearAll, showFilters = true, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice ?? 0,
    max: filters.maxPrice ?? 5000000,
  });

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    technologies: true,
    features: true,
    rating: true,
  });

  useEffect(() => {
    setPriceRange({
      min: filters.minPrice ?? 0,
      max: filters.maxPrice ?? 5000000,
    });
  }, [filters.minPrice, filters.maxPrice]);

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
  const categories = getAllCategories()
    .map((cat) => ({
      id: cat.id,
      label: cat.name,
      icon: cat.icon,
      count: allProducts.filter((p) => p.category === cat.id).length,
    }))
    .filter((cat) => cat.count > 0);

  // Get technologies from real data with actual counts
  const technologies = (mockSearchData.tags || []).map((tag) => ({
    id: tag.name,
    label: tag.name,
    count: tag.count,
  }));

  // Get popular features from real data
  const features = (mockSearchData.features || []).slice(0, 10);

  const ratings = [
    { value: 5, stars: 5, label: '5 sao' },
    { value: 4, stars: 4, label: '4 sao trở lên' },
    { value: 3, stars: 3, label: '3 sao trở lên' },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleTechnologyChange = (techId) => {
    const currentTech = filters.technologies || [];
    const newTech = currentTech.includes(techId)
      ? currentTech.filter((id) => id !== techId)
      : [...currentTech, techId];
    onFilterChange({ ...filters, technologies: newTech });
  };

  const handleFeatureChange = (featureName) => {
    const currentFeatures = filters.features || [];
    const newFeatures = currentFeatures.includes(featureName)
      ? currentFeatures.filter((f) => f !== featureName)
      : [...currentFeatures, featureName];
    onFilterChange({ ...filters, features: newFeatures });
  };

  const handlePriceChange = (type, value) => {
    const numValue = Math.max(0, parseInt(value, 10) || 0);
    const newRange = { ...priceRange, [type]: numValue };
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const hasActiveFilters =
    (filters.categories && filters.categories.length > 0) ||
    (filters.technologies && filters.technologies.length > 0) ||
    (filters.features && filters.features.length > 0) ||
    filters.rating ||
    (filters.minPrice !== undefined && filters.minPrice > 0) ||
    (filters.maxPrice !== undefined && filters.maxPrice < 5000000);

  return (
    <>
      {/* Mobile Backdrop */}
      {showFilters && <div className="filter-backdrop" onClick={onClose} />}

      <aside className={`filter-sidebar ${showFilters ? 'show' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title-group">
            <div className="filter-icon-box">
              <Filter size={16} />
            </div>
            <h3 className="sidebar-title">Bộ lọc tìm kiếm</h3>
          </div>

          <div className="sidebar-actions">
            {hasActiveFilters && (
              <button
                type="button"
                className="clear-all-btn"
                onClick={onClearAll}
                title="Đặt lại bộ lọc"
              >
                <RotateCcw size={13} />
                <span>Đặt lại</span>
              </button>
            )}
            {/* Mobile Close Button */}
            <button
              type="button"
              className="close-sidebar-btn"
              onClick={onClose}
              aria-label="Đóng bộ lọc"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="filter-scrollable-body">
          {/* Categories Filter */}
          <div className="filter-section">
            <button
              type="button"
              className="section-header-btn"
              onClick={() => toggleSection('categories')}
            >
              <div className="section-title-wrapper">
                <Layers size={15} className="section-type-icon" />
                <h4 className="filter-section-title">Danh mục</h4>
              </div>
              <ChevronDown
                size={16}
                className={`section-arrow ${expandedSections.categories ? 'rotated' : ''}`}
              />
            </button>

            {expandedSections.categories && (
              <div className="section-content">
                {categories.map((category) => {
                  const IconComp = categoryIconMap[category.id] || Code2;
                  const isChecked = (filters.categories || []).includes(category.id);

                  return (
                    <label
                      key={category.id}
                      className={`custom-checkbox-item ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryChange(category.id)}
                        className="native-checkbox"
                      />
                      <span className="checkbox-visual" />
                      <div className="category-option-body">
                        <IconComp size={14} className="cat-option-icon" />
                        <span className="label-text">{category.label}</span>
                      </div>
                      <span className="item-count-badge">{category.count}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <button
              type="button"
              className="section-header-btn"
              onClick={() => toggleSection('price')}
            >
              <div className="section-title-wrapper">
                <DollarSign size={15} className="section-type-icon" />
                <h4 className="filter-section-title">Khoảng giá (VNĐ)</h4>
              </div>
              <ChevronDown
                size={16}
                className={`section-arrow ${expandedSections.price ? 'rotated' : ''}`}
              />
            </button>

            {expandedSections.price && (
              <div className="section-content price-section-body">
                <div className="price-range-slider-wrapper">
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="sleek-slider"
                  />
                </div>

                <div className="price-inputs-row">
                  <div className="price-input-box">
                    <span className="price-input-label">Từ</span>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      placeholder="0"
                      min="0"
                      step="50000"
                    />
                  </div>
                  <span className="price-dash">—</span>
                  <div className="price-input-box">
                    <span className="price-input-label">Đến</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      placeholder="5,000,000"
                      min="0"
                      step="50000"
                    />
                  </div>
                </div>

                <div className="price-summary-tag">
                  {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                </div>

                <button type="button" className="apply-price-btn" onClick={applyPriceFilter}>
                  Áp dụng giá
                </button>
              </div>
            )}
          </div>

          {/* Technologies Filter */}
          <div className="filter-section">
            <button
              type="button"
              className="section-header-btn"
              onClick={() => toggleSection('technologies')}
            >
              <div className="section-title-wrapper">
                <Cpu size={15} className="section-type-icon" />
                <h4 className="section-title">Công nghệ & Framework</h4>
              </div>
              <ChevronDown
                size={16}
                className={`section-arrow ${expandedSections.technologies ? 'rotated' : ''}`}
              />
            </button>

            {expandedSections.technologies && (
              <div className="section-content tech-pills-wrap">
                {technologies.map((tech) => {
                  const isChecked = (filters.technologies || []).includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      className={`tech-filter-pill ${isChecked ? 'active' : ''}`}
                      onClick={() => handleTechnologyChange(tech.id)}
                    >
                      <span>{tech.label}</span>
                      {tech.count > 0 && <span className="pill-count">{tech.count}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Features Filter */}
          <div className="filter-section">
            <button
              type="button"
              className="section-header-btn"
              onClick={() => toggleSection('features')}
            >
              <div className="section-title-wrapper">
                <Sparkles size={15} className="section-type-icon" />
                <h4 className="section-title">Tính năng nổi bật</h4>
              </div>
              <ChevronDown
                size={16}
                className={`section-arrow ${expandedSections.features ? 'rotated' : ''}`}
              />
            </button>

            {expandedSections.features && (
              <div className="section-content">
                {features.map((feature) => {
                  const isChecked = (filters.features || []).includes(feature.name);
                  return (
                    <label
                      key={feature.id}
                      className={`custom-checkbox-item ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFeatureChange(feature.name)}
                        className="native-checkbox"
                      />
                      <span className="checkbox-visual" />
                      <span className="label-text">{feature.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <button
              type="button"
              className="section-header-btn"
              onClick={() => toggleSection('rating')}
            >
              <div className="section-title-wrapper">
                <Star size={15} className="section-type-icon" />
                <h4 className="section-title">Đánh giá khách hàng</h4>
              </div>
              <ChevronDown
                size={16}
                className={`section-arrow ${expandedSections.rating ? 'rotated' : ''}`}
              />
            </button>

            {expandedSections.rating && (
              <div className="section-content">
                {ratings.map((rating) => {
                  const isSelected = filters.rating === rating.value;
                  return (
                    <label
                      key={rating.value}
                      className={`custom-radio-item ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={isSelected}
                        onChange={() => onFilterChange({ ...filters, rating: rating.value })}
                        className="native-radio"
                      />
                      <span className="radio-visual" />
                      <div className="rating-stars-group">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`filter-star ${i < rating.stars ? 'filled' : 'empty'}`}
                            fill={i < rating.stars ? '#f59e0b' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="label-text rating-text">{rating.label}</span>
                    </label>
                  );
                })}

                {filters.rating && (
                  <button
                    type="button"
                    className="clear-rating-btn"
                    onClick={() => onFilterChange({ ...filters, rating: null })}
                  >
                    Xóa lọc đánh giá
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Apply Bar */}
        <div className="mobile-sidebar-footer">
          <button type="button" className="btn-mobile-apply" onClick={onClose}>
            Xem kết quả lọc
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
