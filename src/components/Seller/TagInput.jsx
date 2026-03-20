import React, { useState, useRef } from 'react';
import './TagInput.css';

const TagInput = ({ tags = [], setTags, maxTags = 10, placeholder = 'Add tags...' }) => {
  const [inputValue, setInputValue] = useState('');
  const suggestedTags = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java',
    'Web Development', 'Mobile App', 'E-commerce', 'Dashboard', 'API',
    'Frontend', 'Backend', 'Full Stack', 'UI/UX', 'Bootstrap', 'Tailwind',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'AWS', 'Docker',
    'WordPress', 'Laravel', 'Django', 'Flask', 'Express', 'Next.js',
    'Vue.js', 'Angular', 'Responsive', 'Admin Panel', 'CRM', 'CMS',
  ];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Filter suggested tags
  const filteredSuggestions = suggestedTags.filter(
    tag => 
      !tags.includes(tag) && 
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      inputValue.length > 0
  );

  // Add tag
  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    
    if (!trimmedTag) return;
    
    if (tags.length >= maxTags) {
      alert(`Maximum ${maxTags} tags allowed!`);
      return;
    }

    if (tags.includes(trimmedTag)) {
      alert('This tag already exists!');
      return;
    }

    setTags([...tags, trimmedTag]);
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Remove tag
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  };

  // Handle key down
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (tag) => {
    addTag(tag);
  };

  // Popular tags by category
  const popularCategories = {
    '🔥 Trending': ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'],
    '💻 Languages': ['JavaScript', 'Python', 'Java', 'PHP', 'C++'],
    '🎨 Design': ['UI/UX', 'Responsive', 'Bootstrap', 'Material UI', 'Figma'],
    '🗄️ Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase', 'Redis'],
    '☁️ Cloud': ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Heroku'],
  };

  return (
    <div className="tag-input-container">
      {/* Header */}
      <div className="tag-input-header">
        <h3 className="tag-input-title">
          🏷️ Tags <span className="required">*</span>
        </h3>
        <div className="tag-count">
          <span className={tags.length >= maxTags ? 'count-max' : ''}>
            {tags.length} / {maxTags}
          </span>
        </div>
      </div>

      {/* Input Area */}
      <div className="tag-input-wrapper">
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag-badge">
              <span className="tag-text">{tag}</span>
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeTag(index)}
                aria-label="Remove tag"
              >
                ✕
              </button>
            </div>
          ))}
          
          <input
            ref={inputRef}
            type="text"
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(inputValue.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={tags.length >= maxTags}
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <div className="suggestions-header">
              <span className="suggestions-icon">💡</span>
              <span className="suggestions-title">Suggestions</span>
            </div>
            <div className="suggestions-list">
              {filteredSuggestions.slice(0, 8).map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(tag)}
                >
                  <span className="suggestion-icon">🔍</span>
                  <span className="suggestion-text">{tag}</span>
                  <span className="suggestion-add">+</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popular Tags */}
      <div className="popular-tags-section">
        <div className="popular-header">
          <span className="popular-icon">✨</span>
          <span className="popular-title">Popular Tags</span>
        </div>
        
        {Object.entries(popularCategories).map(([category, categoryTags]) => (
          <div key={category} className="popular-category">
            <div className="category-name">{category}</div>
            <div className="category-tags">
              {categoryTags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  className={`popular-tag ${tags.includes(tag) ? 'added' : ''}`}
                  onClick={() => !tags.includes(tag) && addTag(tag)}
                  disabled={tags.includes(tag) || tags.length >= maxTags}
                >
                  {tag}
                  {tags.includes(tag) && <span className="check-icon">✓</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="tag-tips">
        <div className="tip-item">
          <span className="tip-icon">💡</span>
          <span className="tip-text">
            <strong>Tip:</strong> Press Enter or comma to add a tag. Press Backspace to remove the last tag.
          </span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">🎯</span>
          <span className="tip-text">
            <strong>Best Practice:</strong> Use relevant tags to help buyers find your product easily.
          </span>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
