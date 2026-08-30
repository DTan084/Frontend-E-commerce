import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchX,
  Lightbulb,
  Target,
  Search,
  FileText,
  Sparkles,
  Flame,
  Code2,
  Star,
  MessageSquare,
  ArrowRight,
  ShoppingBag,
  Building2,
  Newspaper,
  BarChart3,
  Gamepad2,
  Home as HomeIcon,
  Plane,
  GraduationCap,
  Laptop,
} from 'lucide-react';
import {
  suggestCorrections,
  findClosestMatch,
  getSmartRecommendations,
  getRelatedSearchSuggestions,
} from '../../utils/searchUtils';
import ProductCard from '../Product/ProductCard';
import { getAllCategories } from '../../data/categories';
import { mockSearchData } from '../../data/mockSearch';
import './EmptySearchState.css';

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

const EmptySearchState = ({ query, allProducts, onClearSearch }) => {
  const navigate = useNavigate();

  const allCategories = getAllCategories();
  const popularCategories = allCategories.slice(0, 8).map((cat) => ({
    name: cat.name,
    icon: cat.icon,
    slug: cat.slug,
    id: cat.id,
  }));

  const popularTechs = (mockSearchData.tags || []).slice(0, 8).map((tag) => ({
    name: tag.name,
    count: tag.count,
    color: tag.color,
  }));

  const typoSuggestion = suggestCorrections(query);
  const productTitles = allProducts?.map((p) => p.name || p.title) || [];
  const closestMatch = findClosestMatch(query, productTitles, 0.4);
  const smartRecommendations = getSmartRecommendations(query, allProducts || [], 6);
  const relatedSearches = getRelatedSearchSuggestions(query);
  const bestSellingProducts =
    allProducts?.filter((p) => p.isBestSeller || p.isHot).slice(0, 6) || [];

  return (
    <div className="empty-search-state">
      {/* Header Banner */}
      <div className="empty-search-header">
        <div className="empty-search-icon-circle">
          <SearchX size={36} />
        </div>
        <h2 className="empty-title">Không tìm thấy kết quả cho "{query}"</h2>
        <p className="empty-subtitle">
          Chúng tôi không tìm thấy mã nguồn phù hợp trực tiếp với từ khóa của bạn. Hãy thử xem các
          gợi ý thông minh bên dưới.
        </p>
      </div>

      {/* Suggestions Section */}
      <div className="empty-suggestions-grid">
        {/* Typo Correction */}
        {typoSuggestion && typoSuggestion !== query && (
          <div className="suggestion-card typo-suggestion">
            <div className="suggestion-icon-badge amber">
              <Lightbulb size={18} />
            </div>
            <div className="suggestion-card-body">
              <h4>Có phải bạn muốn tìm:</h4>
              <button
                type="button"
                className="suggestion-action-btn"
                onClick={() => navigate(`/search?q=${encodeURIComponent(typoSuggestion)}`)}
              >
                <span>{typoSuggestion}</span>
                <ArrowRight size={14} />
              </button>
              <p className="suggestion-caption">Gợi ý sửa lỗi chính tả tự động</p>
            </div>
          </div>
        )}

        {/* Closest Match */}
        {closestMatch.match && closestMatch.score > 0.4 && (
          <div className="suggestion-card similar-suggestion">
            <div className="suggestion-icon-badge indigo">
              <Target size={18} />
            </div>
            <div className="suggestion-card-body">
              <h4>Mã nguồn gần giống nhất:</h4>
              <button
                type="button"
                className="suggestion-action-btn"
                onClick={() => navigate(`/search?q=${encodeURIComponent(closestMatch.match)}`)}
              >
                <span>{closestMatch.match}</span>
                <span className="match-tag-badge">
                  {Math.round(closestMatch.score * 100)}% khớp
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Related Searches */}
        {relatedSearches.length > 0 && (
          <div className="suggestion-card related-searches">
            <div className="suggestion-icon-badge blue">
              <Search size={18} />
            </div>
            <div className="suggestion-card-body">
              <h4>Từ khóa liên quan:</h4>
              <div className="related-chips-list">
                {relatedSearches.map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    className="related-keyword-chip"
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
        <div className="suggestion-card tips-suggestion">
          <div className="suggestion-icon-badge emerald">
            <FileText size={18} />
          </div>
          <div className="suggestion-card-body">
            <h4>Mẹo tìm kiếm hiệu quả:</h4>
            <ul className="search-tips-list">
              <li>Thử sử dụng từ khóa ngắn gọn hơn (Ví dụ: "React", "Ecommerce", "Admin")</li>
              <li>Tìm theo công nghệ Framework (Spring Boot, Flutter, Vue.js, Laravel)</li>
              <li>Kiểm tra lại bộ lọc khoảng giá hoặc đánh giá có thể quá hẹp</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Smart Recommendations */}
      {smartRecommendations.length > 0 && (
        <div className="fallback-section-block">
          <div className="fallback-section-header">
            <div className="fallback-header-title">
              <Sparkles size={20} className="section-title-icon" />
              <h3>Có thể bạn quan tâm</h3>
            </div>
            <p className="fallback-header-subtitle">Mã nguồn tương đồng với "{query}"</p>
          </div>
          <div className="products-grid-3col">
            {smartRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Popular Categories */}
      <div className="fallback-section-block">
        <div className="fallback-section-header">
          <div className="fallback-header-title">
            <Flame size={20} className="section-title-icon" />
            <h3>Danh mục mã nguồn phổ biến</h3>
          </div>
          <p className="fallback-header-subtitle">Khám phá theo lĩnh vực dự án</p>
        </div>
        <div className="categories-pills-grid">
          {popularCategories.map((category) => {
            const IconComp = categoryIconMap[category.id] || Code2;
            return (
              <button
                key={category.id}
                type="button"
                className="category-pill-card"
                onClick={() => navigate(`/products?category=${category.id}`)}
              >
                <div className="category-pill-icon">
                  <IconComp size={18} />
                </div>
                <span className="category-pill-name">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Technologies */}
      <div className="fallback-section-block">
        <div className="fallback-section-header">
          <div className="fallback-header-title">
            <Code2 size={20} className="section-title-icon" />
            <h3>Công nghệ & Framework thịnh hành</h3>
          </div>
          <p className="fallback-header-subtitle">Tìm kiếm theo ngôn ngữ lập trình</p>
        </div>
        <div className="tech-tags-grid">
          {popularTechs.map((tech, index) => (
            <button
              key={index}
              type="button"
              className="tech-tag-card"
              onClick={() => navigate(`/search?q=${encodeURIComponent(tech.name)}`)}
            >
              <span className="tech-tag-hash">#</span>
              <span className="tech-tag-name">{tech.name}</span>
              <span className="tech-tag-count">{tech.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Best Selling Products */}
      {bestSellingProducts.length > 0 && (
        <div className="fallback-section-block">
          <div className="fallback-section-header">
            <div className="fallback-header-title">
              <Star size={20} className="section-title-icon" />
              <h3>Mã nguồn bán chạy nhất sàn</h3>
            </div>
            <p className="fallback-header-subtitle">Được cộng đồng đánh giá và tải nhiều nhất</p>
          </div>
          <div className="products-grid-3col">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* CTA Box */}
      <div className="empty-search-cta-box">
        <div className="cta-icon-circle">
          <MessageSquare size={24} />
        </div>
        <div className="cta-content">
          <h3>Bạn cần phát triển dự án theo yêu cầu?</h3>
          <p>
            Đội ngũ lập trình viên CodeMart sẵn sàng hỗ trợ tư vấn và xây dựng mã nguồn theo thông
            số kỹ thuật của bạn.
          </p>
        </div>
        <div className="cta-action-buttons">
          <button type="button" className="cta-btn-primary" onClick={() => navigate('/contact')}>
            Liên hệ tư vấn
          </button>
          <button type="button" className="cta-btn-secondary" onClick={onClearSearch}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptySearchState;
