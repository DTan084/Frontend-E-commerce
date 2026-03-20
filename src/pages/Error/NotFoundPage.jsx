import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPages.css';

const NotFoundPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Trang không tồn tại</h2>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/" className="btn-home">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
