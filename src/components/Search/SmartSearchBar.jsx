import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { getSearchSuggestions } from '../../data/mockSearch';
import { searchDataService } from '../../services/data';
import './SmartSearchBar.css';

const SmartSearchBar = ({ variant = 'default', onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [activeFilter, setActiveFilter] = useState('all');

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Load search history from localStorage
  useEffect(() => {
    const history = searchDataService.getHistory();
    setSearchHistory(history);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, activeFilter]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (searchQuery) => {
    setIsLoading(true);
    try {
      // Simulate async mock query delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Use mock data
      const results = getSearchSuggestions(searchQuery, activeFilter);
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions(null);
    inputRef.current?.focus();
  };

  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Save to history
    const newHistory = [searchQuery, ...searchHistory.filter((h) => h !== searchQuery)].slice(0, 5);
    setSearchHistory(newHistory);
    searchDataService.saveHistory(newHistory);

    // Perform search
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&filter=${activeFilter}`);
    }
    setIsFocused(false);
  };

  const handleSuggestionClick = (item) => {
    if (!item) return;

    // Handle product click - navigate to product detail
    if (item.title && item.slug) {
      navigate(`/product/${item.slug}`);
      setIsFocused(false);
      return;
    }

    // Handle category click - navigate to products with category filter
    if (item.name && item.slug && item.productCount !== undefined) {
      navigate(`/products?category=${item.slug}`);
      setIsFocused(false);
      return;
    }

    // Handle tag click (technology) - search by tag name
    if (item.name && item.count && item.color) {
      const searchText = item.name;
      setQuery(searchText);
      handleSearch(searchText);
      return;
    }

    // Handle feature click - navigate to products with feature filter
    if (item.name && item.count !== undefined && !item.color && !item.slug && !item.productCount) {
      // Navigate to products page with feature filter
      navigate(`/products?feature=${encodeURIComponent(item.name)}`);
      setIsFocused(false);
      return;
    }

    // Handle popular search click
    if (item.text) {
      setQuery(item.text);
      handleSearch(item.text);
      return;
    }
  };

  const handleHistoryClick = (historyQuery) => {
    setQuery(historyQuery);
    handleSearch(historyQuery);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    searchDataService.clearHistory();
  };

  const handleKeyDown = (e) => {
    if (!suggestions) return;

    const allItems = getAllSuggestionItems();

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && allItems[selectedIndex]) {
        handleSuggestionClick(allItems[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const getAllSuggestionItems = () => {
    if (!suggestions) return [];
    return [
      ...(suggestions.popular || []),
      ...(suggestions.products || []),
      ...(suggestions.categories || []),
      ...(suggestions.tags || []),
      ...(suggestions.features || []),
    ];
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => (regex.test(part) ? <strong key={i}>{part}</strong> : part));
  };

  const renderStars = (rating) => {
    return (
      <div className="search-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`search-star ${i < rating ? 'filled' : ''}`}>
            <StarIcon />
          </span>
        ))}
      </div>
    );
  };

  const showDropdown = isFocused && (query.length >= 2 || searchHistory.length > 0);

  return (
    <div className={`smart-search-bar ${variant}`} ref={searchRef}>
      <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <SearchIcon className="search-icon" />

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Tìm kiếm website bán hàng, quản lý, tin tức, giáo dục..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />

        <div className="search-actions">
          <kbd className="search-kbd">
            <CommandIcon />K
          </kbd>

          {query && (
            <button className="search-clear-btn" onClick={handleClear}>
              <XIcon />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="search-dropdown">
          {isLoading ? (
            <div className="search-loading">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="search-skeleton" />
              ))}
            </div>
          ) : query.length < 2 && searchHistory.length > 0 ? (
            // Search History
            <div className="search-section">
              <div className="search-section-header">
                <div className="section-title">
                  <ClockIcon />
                  <span>Tìm kiếm gần đây</span>
                </div>
                <button className="clear-history-btn" onClick={clearHistory}>
                  Xóa
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className={`search-item ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleHistoryClick(item)}
                >
                  <ClockIcon className="item-icon" />
                  <span className="item-text">{item}</span>
                </div>
              ))}
            </div>
          ) : suggestions &&
            Object.keys(suggestions).some((key) => suggestions[key]?.length > 0) ? (
            // Suggestions
            <>
              {suggestions.popular?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <TrendingIcon />
                    <span>Tìm kiếm phổ biến</span>
                  </div>
                  {suggestions.popular.map((item, index) => (
                    <div
                      key={item.id}
                      className={`search-item ${selectedIndex === index ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <TrendingIcon className="item-icon" />
                      <span className="item-text">{highlightMatch(item.text, query)}</span>
                      <span className="item-count">{item.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {suggestions.products?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <SearchIcon />
                    <span>Sản phẩm</span>
                  </div>
                  {suggestions.products.map((item, index) => {
                    const itemIndex = (suggestions.popular?.length || 0) + index;
                    return (
                      <div
                        key={item.id}
                        className={`search-item product-item ${selectedIndex === itemIndex ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <img src={item.thumbnail} alt={item.title} className="product-thumbnail" />
                        <div className="product-info">
                          <div className="product-title">{highlightMatch(item.title, query)}</div>
                          <div className="product-meta">
                            <span className="product-price">
                              {item.price.toLocaleString('vi-VN')}₫
                            </span>
                            {renderStars(item.rating)}
                            <span className="product-category">{item.category}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {suggestions.categories?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <FolderIcon />
                    <span>Danh mục</span>
                  </div>
                  {suggestions.categories.map((item, index) => {
                    const itemIndex =
                      (suggestions.popular?.length || 0) +
                      (suggestions.products?.length || 0) +
                      index;
                    return (
                      <div
                        key={item.id}
                        className={`search-item ${selectedIndex === itemIndex ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <FolderIcon className="item-icon" />
                        <span className="item-text">{highlightMatch(item.name, query)}</span>
                        <span className="item-count">{item.productCount} sản phẩm</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {suggestions.tags?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <HashIcon />
                    <span>Công nghệ</span>
                  </div>
                  {suggestions.tags.map((item, index) => {
                    const itemIndex =
                      (suggestions.popular?.length || 0) +
                      (suggestions.products?.length || 0) +
                      (suggestions.categories?.length || 0) +
                      index;
                    return (
                      <div
                        key={item.id}
                        className={`search-item ${selectedIndex === itemIndex ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <HashIcon className="item-icon" />
                        <span className="item-text">{highlightMatch(item.name, query)}</span>
                        <span className="item-count">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {suggestions.features?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <StarIcon />
                    <span>Tính năng</span>
                  </div>
                  {suggestions.features.map((item, index) => {
                    const itemIndex =
                      (suggestions.popular?.length || 0) +
                      (suggestions.products?.length || 0) +
                      (suggestions.categories?.length || 0) +
                      (suggestions.tags?.length || 0) +
                      index;
                    return (
                      <div
                        key={item.id}
                        className={`search-item ${selectedIndex === itemIndex ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <StarIcon className="item-icon" />
                        <span className="item-text">{highlightMatch(item.name, query)}</span>
                        <span className="item-count">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : query.length >= 2 ? (
            // No Results
            <div className="search-no-results">
              <div className="no-results-icon">🔍</div>
              <h4>Không tìm thấy kết quả cho "{query}"</h4>
              <p>Thử tìm kiếm:</p>
              <div className="suggested-chips">
                {['React', 'PHP', 'Laravel', 'Bán hàng', 'Quản lý', 'Tin tức'].map((tag) => (
                  <button
                    key={tag}
                    className="suggested-chip"
                    onClick={() => {
                      setQuery(tag);
                      handleSearch(tag);
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

// Custom SVG Icons
const SearchIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TrendingIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const HashIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const CommandIcon = ({ className }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FolderIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export default SmartSearchBar;
