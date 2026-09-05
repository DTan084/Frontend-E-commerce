import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Clock,
  Hash,
  Command,
  Star,
  FolderTree,
  Package,
  SearchX,
  ArrowRight,
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
  const activeFilter = 'all';

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 250);

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

  const fetchSuggestions = useCallback(
    async (searchQuery) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 150));
        const results = getSearchSuggestions(searchQuery, activeFilter);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeFilter]
  );

  // Fetch suggestions when query changes
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery);
    } else {
      setSuggestions(null);
    }
  }, [debouncedQuery, fetchSuggestions]);

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
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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

  const getAllSuggestionItems = () => {
    if (!suggestions) return [];
    return [
      ...(suggestions.popular || []),
      ...(suggestions.products || []),
      ...(suggestions.categories || []),
      ...(suggestions.tags || []),
    ];
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

  const highlightMatch = (text, matchQuery) => {
    if (!matchQuery) return text;
    const regex = new RegExp(`(${matchQuery})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <strong key={i} className="highlight-match">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const showDropdown = isFocused && (query.length >= 2 || searchHistory.length > 0);

  return (
    <div className={`smart-search-bar ${variant}`} ref={searchRef}>
      <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <Search size={17} className="search-icon" />

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

      {/* Modern Floating Dropdown */}
      {showDropdown && (
        <div className="search-dropdown-spotlight">
          {isLoading ? (
            <div className="search-loading-box">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="search-skeleton-item" />
              ))}
            </div>
          ) : query.length < 2 && searchHistory.length > 0 ? (
            // Search History
            <div className="search-group-section">
              <div className="search-group-header">
                <div className="group-title-label">
                  <Clock size={13} />
                  <span>Tìm kiếm gần đây</span>
                </div>
                <button type="button" className="btn-clear-history" onClick={clearHistory}>
                  Xóa tất cả
                </button>
              </div>
              <div className="search-items-list">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`search-history-row ${selectedIndex === index ? 'selected' : ''}`}
                    onClick={() => handleHistoryClick(item)}
                  >
                    <Clock size={14} className="history-icon" />
                    <span className="history-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : suggestions &&
            Object.keys(suggestions).some((key) => suggestions[key]?.length > 0) ? (
            // Suggestions Sections
            <div className="search-results-scrollable">
              {/* Products Section */}
              {suggestions.products?.length > 0 && (
                <div className="search-group-section">
                  <div className="search-group-header">
                    <div className="group-title-label">
                      <Package size={13} />
                      <span>Mã nguồn phù hợp</span>
                    </div>
                    <span className="group-count-badge">{suggestions.products.length} gợi ý</span>
                  </div>
                  <div className="search-items-list">
                    {suggestions.products.map((item, index) => {
                      const itemIndex = (suggestions.popular?.length || 0) + index;
                      return (
                        <div
                          key={item.id}
                          className={`search-product-card-row ${selectedIndex === itemIndex ? 'selected' : ''}`}
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="search-prod-thumb"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="search-prod-info">
                            <div className="search-prod-title">
                              {highlightMatch(item.title, query)}
                            </div>
                            <div className="search-prod-meta">
                              <span className="search-prod-price">
                                {item.price.toLocaleString('vi-VN')}₫
                              </span>
                              <div className="search-prod-rating">
                                <Star
                                  size={11}
                                  className="star-filled"
                                  fill="#f59e0b"
                                  color="#f59e0b"
                                />
                                <span>{(item.rating || 5.0).toFixed(1)}</span>
                              </div>
                              {item.category && (
                                <span className="search-prod-category">{item.category}</span>
                              )}
                            </div>
                          </div>
                          <ArrowRight size={14} className="search-prod-arrow" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Technologies / Tags Section */}
              {suggestions.tags?.length > 0 && (
                <div className="search-group-section">
                  <div className="search-group-header">
                    <div className="group-title-label">
                      <Hash size={13} />
                      <span>Công nghệ & Framework</span>
                    </div>
                  </div>
                  <div className="search-tags-wrap">
                    {suggestions.tags.map((item, index) => {
                      const itemIndex =
                        (suggestions.popular?.length || 0) +
                        (suggestions.products?.length || 0) +
                        index;
                      return (
                        <button
                          key={item.id || index}
                          type="button"
                          className={`search-tech-chip ${selectedIndex === itemIndex ? 'selected' : ''}`}
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <Hash size={11} />
                          <span>{highlightMatch(item.name, query)}</span>
                          <span className="tech-count">({item.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Categories Section */}
              {suggestions.categories?.length > 0 && (
                <div className="search-group-section">
                  <div className="search-group-header">
                    <div className="group-title-label">
                      <FolderTree size={13} />
                      <span>Danh mục liên quan</span>
                    </div>
                  </div>
                  <div className="search-items-list">
                    {suggestions.categories.map((item, index) => {
                      const itemIndex =
                        (suggestions.popular?.length || 0) +
                        (suggestions.products?.length || 0) +
                        (suggestions.tags?.length || 0) +
                        index;
                      return (
                        <div
                          key={item.id}
                          className={`search-category-row ${selectedIndex === itemIndex ? 'selected' : ''}`}
                          onClick={() => handleSuggestionClick(item)}
                        >
                          <FolderTree size={13} className="cat-icon" />
                          <span className="cat-text">{highlightMatch(item.name, query)}</span>
                          <span className="cat-badge">{item.productCount} mã nguồn</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : query.length >= 2 ? (
            // No Results
            <div className="search-empty-state-box">
              <SearchX size={32} className="text-muted" />
              <h4>Không tìm thấy mã nguồn nào cho "{query}"</h4>
              <p>Thử tìm kiếm với các từ khóa phổ biến bên dưới:</p>
              <div className="search-popular-keywords">
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
                    className="popular-kw-chip"
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

          {/* Spotlight Footer */}
          <div className="search-dropdown-footer">
            <div className="footer-shortcut-item">
              <kbd>↑</kbd>
              <kbd>↓</kbd>
              <span>Điều hướng</span>
            </div>
            <div className="footer-shortcut-item">
              <kbd>↵</kbd>
              <span>Chọn / Xem kết quả</span>
            </div>
            <div className="footer-shortcut-item">
              <kbd>ESC</kbd>
              <span>Đóng</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearchBar;
