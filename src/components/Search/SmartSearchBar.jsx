import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Hash,
  Command,
  Star,
  FolderTree,
  Sparkles,
  SearchX,
} from 'lucide-react';
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
  const [activeFilter] = useState('all');

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
      await new Promise((resolve) => setTimeout(resolve, 200));
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

    if (item.title && item.slug) {
      navigate(`/product/${item.slug}`);
      setIsFocused(false);
      return;
    }

    if (item.name && item.slug && item.productCount !== undefined) {
      navigate(`/products?category=${item.slug}`);
      setIsFocused(false);
      return;
    }

    if (item.name && item.count && item.color) {
      const searchText = item.name;
      setQuery(searchText);
      handleSearch(searchText);
      return;
    }

    if (item.name && item.count !== undefined && !item.color && !item.slug && !item.productCount) {
      navigate(`/products?feature=${encodeURIComponent(item.name)}`);
      setIsFocused(false);
      return;
    }

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
          <Star
            key={i}
            size={12}
            className={`search-star ${i < Math.floor(rating || 5) ? 'filled' : ''}`}
            fill={i < Math.floor(rating || 5) ? '#fbbf24' : 'none'}
          />
        ))}
      </div>
    );
  };

  const showDropdown = isFocused && (query.length >= 2 || searchHistory.length > 0);

  return (
    <div className={`smart-search-bar ${variant}`} ref={searchRef}>
      <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <Search size={18} className="search-icon" />

        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Tìm mã nguồn React, Vue, Flutter, Spring Boot, Laravel..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
        />

        <div className="search-actions">
          <kbd className="search-kbd">
            <Command size={11} />K
          </kbd>

          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              aria-label="Xóa tìm kiếm"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="search-dropdown">
          {isLoading ? (
            <div className="search-loading">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="search-skeleton" />
              ))}
            </div>
          ) : query.length < 2 && searchHistory.length > 0 ? (
            // Search History
            <div className="search-section">
              <div className="search-section-header">
                <div className="section-title">
                  <Clock size={14} />
                  <span>Tìm kiếm gần đây</span>
                </div>
                <button type="button" className="clear-history-btn" onClick={clearHistory}>
                  Xóa tất cả
                </button>
              </div>
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className={`search-item ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleHistoryClick(item)}
                >
                  <Clock size={14} className="item-icon" />
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
                    <div className="section-title">
                      <TrendingUp size={14} />
                      <span>Phổ biến nhất</span>
                    </div>
                  </div>
                  {suggestions.popular.map((item, index) => (
                    <div
                      key={item.id || index}
                      className={`search-item ${selectedIndex === index ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <TrendingUp size={14} className="item-icon" />
                      <span className="item-text">{highlightMatch(item.text, query)}</span>
                      {item.count && (
                        <span className="item-count">{item.count.toLocaleString()}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {suggestions.products?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <div className="section-title">
                      <Sparkles size={14} />
                      <span>Sản phẩm gợi ý</span>
                    </div>
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
                    <div className="section-title">
                      <FolderTree size={14} />
                      <span>Danh mục liên quan</span>
                    </div>
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
                        <FolderTree size={14} className="item-icon" />
                        <span className="item-text">{highlightMatch(item.name, query)}</span>
                        <span className="item-count">{item.productCount} mã nguồn</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {suggestions.tags?.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">
                    <div className="section-title">
                      <Hash size={14} />
                      <span>Công nghệ</span>
                    </div>
                  </div>
                  {suggestions.tags.map((item, index) => {
                    const itemIndex =
                      (suggestions.popular?.length || 0) +
                      (suggestions.products?.length || 0) +
                      (suggestions.categories?.length || 0) +
                      index;
                    return (
                      <div
                        key={item.id || index}
                        className={`search-item ${selectedIndex === itemIndex ? 'selected' : ''}`}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        <Hash size={14} className="item-icon" />
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
              <div className="no-results-icon-wrapper">
                <SearchX size={36} />
              </div>
              <h4>Không tìm thấy kết quả cho "{query}"</h4>
              <p>Thử tìm kiếm với các từ khóa phổ biến:</p>
              <div className="suggested-chips">
                {[
                  'React',
                  'Spring Boot',
                  'NodeJS',
                  'Flutter',
                  'Next.js',
                  'Bán hàng',
                  'Quản lý',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
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

export default SmartSearchBar;
