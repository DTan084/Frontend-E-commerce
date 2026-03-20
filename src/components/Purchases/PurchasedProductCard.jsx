import React, { useState } from 'react';
import './PurchasedProductCard.css';

const PurchasedProductCard = ({ product }) => {
  const [showLicense, setShowLicense] = useState(false);
  const [downloadCount, setDownloadCount] = useState(product.downloadCount || 0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setDownloadCount(downloadCount + 1);
      setIsDownloading(false);
      alert(`✅ Downloading ${product.title}...`);
    }, 1500);
  };

  const copyLicenseKey = () => {
    navigator.clipboard.writeText(product.licenseKey);
    alert('📋 License key copied to clipboard!');
  };

  const getTimeSince = (date) => {
    const now = new Date();
    const purchased = new Date(date);
    const days = Math.floor((now - purchased) / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="purchased-product-card">
      {/* Product Image */}
      <div className="product-image-section">
        <div className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.title}
            className="product-image"
          />
          <div className="image-badge">
            <span className="badge-icon">✓</span>
            <span className="badge-text">Owned</span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info-section">
        <div className="product-header">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-meta">
            <span className="meta-item category">
              <span className="meta-icon">📁</span>
              {product.category}
            </span>
            <span className="meta-divider">•</span>
            <span className="meta-item language">
              <span className="meta-icon">🌐</span>
              {product.language || 'Multiple'}
            </span>
          </div>
        </div>

        <div className="product-details">
          <div className="detail-row">
            <span className="detail-label">📅 Purchased:</span>
            <span className="detail-value">{new Date(product.purchasedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📦 Order:</span>
            <span className="detail-value order-id">#{product.orderId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🔑 License:</span>
            <div className="license-section">
              <code className="license-key" onClick={copyLicenseKey}>
                {showLicense ? product.licenseKey : '••••-••••-••••-••••'}
              </code>
              <button 
                className="toggle-license-btn"
                onClick={() => setShowLicense(!showLicense)}
                title={showLicense ? 'Hide' : 'Show'}
              >
                {showLicense ? '👁️' : '👁️‍🗨️'}
              </button>
              <button 
                className="copy-license-btn"
                onClick={copyLicenseKey}
                title="Copy"
              >
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button 
            className={`action-btn download-btn ${isDownloading ? 'downloading' : ''}`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <span className="spinner"></span>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <span className="btn-icon">⬇</span>
                <span>Download</span>
              </>
            )}
          </button>
          <button className="action-btn docs-btn">
            <span className="btn-icon">📄</span>
            <span>Documentation</span>
          </button>
          <button className="action-btn support-btn">
            <span className="btn-icon">💬</span>
            <span>Support</span>
          </button>
        </div>

        {/* Download Stats */}
        <div className="download-stats">
          <div className="stat-item">
            <span className="stat-icon">⬇</span>
            <span className="stat-text">
              Downloads: <strong>{downloadCount}/{product.downloadLimit || '∞'}</strong>
            </span>
          </div>
          <span className="stat-divider">|</span>
          <div className="stat-item">
            <span className="stat-icon">🕒</span>
            <span className="stat-text">
              Last: <strong>{getTimeSince(product.lastDownload || product.purchasedDate)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="card-glow"></div>
    </div>
  );
};

export default PurchasedProductCard;
