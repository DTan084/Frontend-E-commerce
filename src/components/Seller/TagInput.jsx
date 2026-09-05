import React, { useState, useRef } from 'react';
import { Tag as TagIcon, X, Plus, Sparkles } from 'lucide-react';
import './TagInput.css';

const TagInput = ({
  tags = [],
  setTags,
  maxTags = 10,
  placeholder = 'Nhập thẻ tag và nhấn Enter (ví dụ: React, Laravel, Docker)...',
}) => {
  const [inputValue, setInputValue] = useState('');
  const suggestedTags = [
    'React',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'Java',
    'E-commerce',
    'Dashboard',
    'REST API',
    'Spring Boot',
    'Laravel',
    'Next.js',
    'Vue.js',
    'Tailwind CSS',
    'Docker',
    'MySQL',
    'MongoDB',
    'PostgreSQL',
    'Flutter',
    'Redux Toolkit',
    'Microservices',
    'GraphQL',
  ];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const filteredSuggestions = suggestedTags.filter(
    (tag) =>
      !tags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      inputValue.length > 0
  );

  const addTag = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    if (tags.length >= maxTags) {
      alert(`Bạn chỉ được gắn tối đa ${maxTags} thẻ tag!`);
      return;
    }

    if (tags.some((t) => t.toLowerCase() === trimmedTag.toLowerCase())) {
      alert('Thẻ tag này đã tồn tại!');
      return;
    }

    setTags([...tags, trimmedTag]);
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const popularGroups = [
    { label: 'Thịnh hành', tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
    { label: 'Backend', tags: ['Laravel', 'Spring Boot', 'Node.js', 'MySQL'] },
    { label: 'Mobile & App', tags: ['Flutter', 'React Native', 'Firebase'] },
  ];

  return (
    <div className="tag-input-container-modern">
      <div className="tag-input-head">
        <div className="tag-title-pair">
          <TagIcon size={16} className="text-primary" />
          <span className="tag-title-text">
            Thẻ công nghệ & Từ khóa tìm kiếm <span className="required-star">*</span>
          </span>
        </div>
        <span className="tag-counter-badge">
          {tags.length} / {maxTags} tags
        </span>
      </div>

      {/* Main Tag Container Box */}
      <div className="tag-box-wrapper" onClick={() => inputRef.current?.focus()}>
        <div className="tags-chips-flow">
          {tags.map((tag, index) => (
            <span key={index} className="tag-pill-chip">
              <span>{tag}</span>
              <button
                type="button"
                className="btn-remove-tag"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                title="Xóa tag này"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {tags.length < maxTags && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(inputValue.length > 0)}
              placeholder={tags.length === 0 ? placeholder : 'Thêm tag...'}
              className="tag-raw-input"
            />
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="tag-suggestions-dropdown">
            {filteredSuggestions.slice(0, 6).map((suggested, idx) => (
              <button
                key={idx}
                type="button"
                className="btn-suggestion-item"
                onClick={() => addTag(suggested)}
              >
                <Plus size={12} />
                <span>{suggested}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Quick Tags */}
      <div className="recommended-tags-section">
        <div className="recommended-title-row">
          <Sparkles size={13} className="text-amber" />
          <span>Gợi ý thẻ phổ biến:</span>
        </div>
        <div className="popular-groups-strip">
          {popularGroups.map((group, gIdx) => (
            <div key={gIdx} className="popular-group-box">
              <span className="group-label">{group.label}:</span>
              {group.tags.map((t, tIdx) => {
                const isSelected = tags.includes(t);
                return (
                  <button
                    key={tIdx}
                    type="button"
                    disabled={isSelected || tags.length >= maxTags}
                    className={`btn-quick-tag-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => addTag(t)}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagInput;
