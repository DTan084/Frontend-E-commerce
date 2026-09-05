import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode2, Download, Key, Copy, Check, ArrowRight } from 'lucide-react';
import './PurchasedProducts.css';

const PurchasedProducts = ({ products = [] }) => {
  const navigate = useNavigate();
  const [copiedKey, setCopiedKey] = useState(null);

  const defaultProducts =
    products.length > 0
      ? products
      : [
          {
            id: 1,
            title: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
            category: 'Bán hàng - TMĐT',
            licenseKey: 'CM-897-82193045-1',
            downloadCount: 3,
          },
          {
            id: 2,
            title: 'Mã Nguồn Website Tin Tức - Laravel + Vue.js',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
            category: 'Tin tức',
            licenseKey: 'CM-1794-82193045-2',
            downloadCount: 5,
          },
          {
            id: 3,
            title: 'Admin Dashboard - React Material UI',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
            category: 'Giao diện & UI',
            licenseKey: 'CM-2691-82193045-3',
            downloadCount: 2,
          },
        ];

  const handleCopyLicense = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="purchased-products-card-modern">
      <div className="purchased-card-head">
        <div className="purchased-head-title-wrap">
          <FileCode2 size={18} className="text-emerald" />
          <h3 className="purchased-section-title">Kho mã nguồn sở hữu</h3>
          <span className="purchased-count-chip">{defaultProducts.length} bộ code</span>
        </div>
        <button
          type="button"
          className="btn-view-all-purchases"
          onClick={() => navigate('/user/purchases')}
        >
          <span>Xem kho tải về</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="purchased-products-grid">
        {defaultProducts.map((product) => (
          <div key={product.id} className="purchased-item-card-modern">
            <div className="purchased-card-thumb-wrap">
              <img
                src={product.image || '/placeholder-product.png'}
                alt={product.title}
                className="purchased-card-img"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                }}
              />
              <span className="purchased-card-cat-badge">{product.category}</span>
            </div>

            <div className="purchased-card-body">
              <h4 className="purchased-card-title">{product.title}</h4>

              <div className="purchased-license-strip">
                <div className="license-pill-info">
                  <Key size={12} className="text-indigo" />
                  <span className="license-txt-code">{product.licenseKey}</span>
                </div>
                <button
                  type="button"
                  className="btn-copy-license-mini"
                  onClick={() => handleCopyLicense(product.licenseKey)}
                  title="Sao chép License Key"
                >
                  {copiedKey === product.licenseKey ? (
                    <Check size={12} className="text-emerald" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </div>

              <div className="purchased-card-actions">
                <button
                  type="button"
                  className="btn-card-download-zip"
                  onClick={() => alert(`Đang chuẩn bị gói source code cho [${product.title}]!`)}
                >
                  <Download size={13} />
                  <span>Tải mã nguồn (.ZIP)</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedProducts;
