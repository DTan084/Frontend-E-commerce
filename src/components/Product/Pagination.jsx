import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-wrapper">
      <nav className="pagination-nav" aria-label="Phân trang danh sách">
        {/* Previous Button */}
        <button
          type="button"
          className={`pagination-nav-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Trang trước"
        >
          <ChevronLeft size={16} />
          <span className="btn-text">Trước</span>
        </button>

        {/* Page Numbers */}
        <div className="page-numbers-group">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              type="button"
              className={`page-num-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
              onClick={() => handlePageClick(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className={`pagination-nav-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Trang sau"
        >
          <span className="btn-text">Sau</span>
          <ChevronRight size={16} />
        </button>
      </nav>

      {/* Page Info */}
      <div className="pagination-info-text">
        Trang <strong className="current-page">{currentPage}</strong> /{' '}
        <span className="total-pages">{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
