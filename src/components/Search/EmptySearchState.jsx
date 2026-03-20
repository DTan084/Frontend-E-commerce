import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  suggestCorrections, 
  findClosestMatch, 
  getSmartRecommendations,
  getRelatedSearchSuggestions 
} from '../../utils/searchUtils';
import ProductCard from '../Product/ProductCard';
import { getAllCategories } from '../../data/categories';
import { mockSearchData } from '../../data/mockSearch';
import './EmptySearchState.css';

const EmptySearchState = ({ query, allProducts, onClearSearch }) => {
  const navigate = useNavigate();

  // Get popular categories from real data
  const allCategories = getAllCategories();
  const popularCategories = allCategories.slice(0, 8).map(cat => ({
    name: cat.name,
    icon: cat.icon,
    slug: cat.slug,
    id: cat.id
  }));

  // Get popular technologies from real data
  const popularTechs = mockSearchData.tags.slice(0, 8).map(tag => ({
    name: tag.name,
    count: tag.count,
    color: tag.color
  }));

  // Get typo suggestion
  const typoSuggestion = suggestCorrections(query);

  // Try to find similar products by title
  const productTitles = allProducts?.map(p => p.name || p.title) || [];
  const closestMatch = findClosestMatch(query, productTitles, 0.4); // Lower threshold

  // Get smart recommendations (products with partial matches)
  const smartRecommendations = getSmartRecommendations(query, allProducts || [], 6);

  // Get related search suggestions
  const relatedSearches = getRelatedSearchSuggestions(query);

  // Get best selling products as final fallback
  const bestSellingProducts = allProducts
    ?.filter(p => p.isBestSeller || p.isHot)
    .slice(0, 6) || [];

  return (
    <div className="empty-search-state">
      {/* Main Message */}
      <div className="empty-search-header">
        <h2 className="empty-title">
          Không tìm thấy kết quả cho "{query}"
        </h2>
        <p className="empty-subtitle">
          Chúng tôi không tìm thấy source code phù hợp với từ khóa bạn nhập
        </p>
      </div>

      {/* Suggestions Section */}
      <div className="empty-suggestions">
        {/* Typo Correction - Priority 1 */}
        {typoSuggestion && typoSuggestion !== query && (
          <div className="suggestion-box typo-suggestion highlight">
            <div className="suggestion-icon">💡</div>
            <div className="suggestion-content">
              <h3>Có phải bạn muốn tìm:</h3>
              <button 
                className="suggestion-button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(typoSuggestion)}`)}
              >
                <span className="suggestion-text">{typoSuggestion}</span>
                <span className="suggestion-arrow">→</span>
              </button>
              <p className="suggestion-hint">Đã tự động sửa lỗi chính tả cho bạn</p>
            </div>
          </div>
        )}

        {/* Similar Match - Priority 2 */}
        {closestMatch.match && closestMatch.score > 0.4 && (
          <div className="suggestion-box similar-suggestion">
            <div className="suggestion-icon">🎯</div>
            <div className="suggestion-content">
              <h3>Sản phẩm tương tự:</h3>
              <button 
                className="suggestion-button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(closestMatch.match)}`)}
              >
                <span className="suggestion-text">{closestMatch.match}</span>
                <span className="match-score">
                  {Math.round(closestMatch.score * 100)}% khớp
                </span>
                <span className="suggestion-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Related Searches - Priority 3 */}
        {relatedSearches.length > 0 && (
          <div className="suggestion-box related-searches">
            <div className="suggestion-icon">🔎</div>
            <div className="suggestion-content">
              <h3>Tìm kiếm liên quan:</h3>
              <div className="related-search-chips">
                {relatedSearches.map((search, index) => (
                  <button
                    key={index}
                    className="search-chip"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(search)}`)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Tips */}
        <div className="suggestion-box tips-suggestion">
          <div className="suggestion-icon">📝</div>
          <div className="suggestion-content">
            <h3>Gợi ý tìm kiếm:</h3>
            <ul className="tips-list">
              <li>Kiểm tra lại chính tả của từ khóa</li>
              <li>Thử sử dụng từ khóa chung chung hơn (VD: "web" thay vì "website bán hàng")</li>
              <li>Thử tìm theo công nghệ (React, Laravel, Vue...)</li>
              <li>Thử tìm theo tính năng (ecommerce, chat, admin...)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Smart Recommendations - Based on partial matches */}
      {smartRecommendations.length > 0 && (
        <div className="fallback-products-section smart-recommendations">
          <h3 className="section-title">
            <span className="title-icon">✨</span>
            Có thể bạn đang tìm
            <span className="section-subtitle">Các sản phẩm liên quan đến "{query}"</span>
          </h3>
          <div className="products-grid-standard">
            {smartRecommendations.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                viewMode="grid"
              />
            ))}
          </div>
        </div>
      )}

      {/* Popular Categories */}
      <div className="popular-categories-section">
        <h3 className="section-title">
          <span className="title-icon">🔥</span>
          Danh mục phổ biến
          <span className="section-subtitle">Khám phá các công nghệ hàng đầu</span>
        </h3>
        <div className="categories-grid">
          {popularCategories.map((category, index) => (
            <button
              key={index}
              className="category-card"
              onClick={() => navigate(`/products?category=${category.id}`)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Technologies */}
      <div className="popular-categories-section">
        <h3 className="section-title">
          <span className="title-icon">💻</span>
          Công nghệ phổ biến
          <span className="section-subtitle">Tìm theo ngôn ngữ lập trình</span>
        </h3>
        <div className="categories-grid">
          {popularTechs.map((tech, index) => (
            <button
              key={index}
              className="category-card"
              onClick={() => navigate(`/search?q=${encodeURIComponent(tech.name)}`)}
              style={{ borderColor: tech.color }}
            >
              <div className="category-icon" style={{ backgroundColor: tech.color + '20', color: tech.color }}>
                #
              </div>
              <div className="category-name">{tech.name}</div>
              <div className="category-count">{tech.count} sản phẩm</div>
            </button>
          ))}
        </div>
      </div>

      {/* Best Selling Products - Final Fallback */}
      {bestSellingProducts.length > 0 && (
        <div className="fallback-products-section">
          <h3 className="section-title">
            <span className="title-icon">⭐</span>
            Sản phẩm bán chạy nhất
            <span className="section-subtitle">Được nhiều người mua nhất</span>
          </h3>
          <div className="products-grid-standard">
            {bestSellingProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                viewMode="grid"
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="empty-cta-section">
        <div className="cta-card">
          <div className="cta-icon">💬</div>
          <h3>Không tìm thấy source code phù hợp?</h3>
          <p>Bạn có thể yêu cầu code theo nhu cầu riêng hoặc liên hệ với chúng tôi</p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/contact')}
            >
              Liên hệ tư vấn
            </button>
            <button 
              className="cta-button secondary"
              onClick={onClearSearch}
            >
              Xóa tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchState;
