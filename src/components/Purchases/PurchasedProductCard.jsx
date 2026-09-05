import React, { useState } from 'react';
import {
  Download,
  Key,
  Copy,
  Check,
  BookOpen,
  MessageSquare,
  Code2,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import './PurchasedProductCard.css';

const PurchasedProductCard = ({ product }) => {
  const [showLicense, setShowLicense] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [downloadCount, setDownloadCount] = useState(product.downloadCount || 0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setTimeout(() => {
      setDownloadCount((prev) => prev + 1);
      setIsDownloading(false);
      alert(`Đang bắt đầu tải xuống mã nguồn: ${product.title || product.name}`);
    }, 1000);
  };

  const copyLicenseKey = () => {
    navigator.clipboard.writeText(product.licenseKey || 'CM-897-82193045-1');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="purchased-product-card-modern">
      {/* Product Image Section */}
      <div className="purchased-card-media">
        <img
          src={product.image || '/placeholder-product.png'}
          alt={product.title || product.name}
          className="purchased-product-thumb"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
          }}
        />
        <div className="owned-status-badge">
          <CheckCircle2 size={12} />
          <span>Bản quyền sở hữu</span>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="purchased-card-info-col">
        <div className="purchased-header-row">
          <div>
            <h3 className="purchased-item-title">{product.title || product.name}</h3>
            <div className="purchased-tags-strip">
              <span className="tech-badge-pill">{product.category || 'Mã nguồn'}</span>
              <span className="tech-badge-pill light">
                <Code2 size={11} />
                <span>{product.language || 'React • Node.js'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* License Box */}
        <div className="purchased-license-bar">
          <div className="license-col-left">
            <Key size={13} className="text-indigo" />
            <span className="license-label-text">License Key:</span>
            <code className="license-value-box">
              {showLicense ? product.licenseKey || 'CM-897-82193045-1' : '••••-••••-••••-••••'}
            </code>
          </div>

          <div className="license-col-actions">
            <button
              type="button"
              className="btn-license-ctrl"
              onClick={() => setShowLicense(!showLicense)}
              title={showLicense ? 'Ẩn key' : 'Hiện key'}
            >
              {showLicense ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
            <button
              type="button"
              className="btn-license-ctrl copy-action"
              onClick={copyLicenseKey}
              title="Sao chép License Key"
            >
              {copiedKey ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
              <span>{copiedKey ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons & Downloads */}
        <div className="purchased-footer-actions-row">
          <div className="action-buttons-group">
            <button
              type="button"
              className={`btn-primary-zip-dl ${isDownloading ? 'is-loading' : ''}`}
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download size={14} />
              <span>{isDownloading ? 'Đang nén...' : 'Tải mã nguồn (.ZIP)'}</span>
            </button>
            <button
              type="button"
              className="btn-secondary-action-pill"
              onClick={() =>
                alert(
                  'Tài liệu và hướng dẫn cài đặt được đính kèm trong thư mục README.md bên trong file ZIP.'
                )
              }
            >
              <BookOpen size={13} />
              <span>Tài liệu cài đặt</span>
            </button>
            <button
              type="button"
              className="btn-secondary-action-pill"
              onClick={() => alert('Đang kết nối với người bán mã nguồn để hỗ trợ kỹ thuật...')}
            >
              <MessageSquare size={13} />
              <span>Hỗ trợ kỹ thuật</span>
            </button>
          </div>

          <div className="purchased-download-metric">
            <span>
              Đã tải: <strong>{downloadCount}</strong>/∞ lần
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedProductCard;
