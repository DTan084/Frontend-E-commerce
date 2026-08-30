import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Code2, HelpCircle, Package } from 'lucide-react';
import './ErrorPages.css';

const NotFoundPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="error-page-modern">
      <div className="container">
        <div className="error-card-box">
          {/* Visual Code Tag */}
          <div className="error-code-badge">
            <Code2 size={16} />
            <span>HTTP Error 404</span>
          </div>

          <h1 className="error-giant-title">404</h1>

          <h2 className="error-main-heading">Trang bạn tìm kiếm không tồn tại</h2>
          <p className="error-sub-description">
            Đường dẫn có thể đã bị thay đổi, mã nguồn đã bị gỡ bỏ hoặc bạn đã nhập sai địa chỉ URL.
            Hãy thử tìm kiếm bên dưới hoặc quay lại trang chủ.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="error-quick-search-form">
            <Search size={16} className="error-search-icon" />
            <input
              type="text"
              className="error-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm mã nguồn, giao diện, template..."
            />
            <button type="submit" className="btn-error-search-submit">
              <span>Tìm kiếm</span>
            </button>
          </form>

          {/* Action Links */}
          <div className="error-actions-group">
            <Link to="/" className="btn-error-home-primary">
              <Home size={15} />
              <span>Về Trang Chủ CodeMart</span>
            </Link>

            <Link to="/products" className="btn-error-explore-secondary">
              <Package size={15} />
              <span>Khám Phá Kho Mã Nguồn</span>
            </Link>

            <Link to="/faq" className="btn-error-help-outline">
              <HelpCircle size={15} />
              <span>Trung Tâm Hỗ Trợ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
