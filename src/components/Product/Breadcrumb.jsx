import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb-nav">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="icon">🏠</span>
              <span className="text">Trang chủ</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
            >
              <span className="separator">›</span>
              {(item.link || item.path) && index !== items.length - 1 ? (
                <Link to={item.link || item.path}>{item.label}</Link>
              ) : (
                <span className="text">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
