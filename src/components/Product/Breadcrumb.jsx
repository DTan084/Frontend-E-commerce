import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link home-link">
              <Home size={14} className="breadcrumb-home-icon" />
              <span>Trang chủ</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const targetUrl = item.link || item.path;

            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? 'active' : ''}`}
                aria-current={isLast ? 'page' : undefined}
              >
                <ChevronRight size={13} className="breadcrumb-separator" />
                {targetUrl && !isLast ? (
                  <Link to={targetUrl} className="breadcrumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span className="breadcrumb-current">{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
