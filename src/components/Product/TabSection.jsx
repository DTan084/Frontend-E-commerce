import React, { useState } from 'react';
import './TabSection.css';

const TabSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Mô tả', icon: '📝' },
    { id: 'features', label: 'Tính năng', icon: '✨' },
    { id: 'requirements', label: 'Yêu cầu', icon: '⚙️' },
    { id: 'changelog', label: 'Lịch sử phiên bản', icon: '📋' }
  ];

  return (
    <div className="tab-section">
      {/* Tab Headers */}
      <div className="tab-headers">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-header ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="tab-panel">
            <h3 className="panel-title">Mô tả sản phẩm</h3>
            <div className="description-content">
              <p>{product.description}</p>
              
              <h4>Bao gồm:</h4>
              <ul className="included-list">
                {(product.included || [
                  'Mã nguồn đầy đủ có chú thích',
                  'Tài liệu hướng dẫn chi tiết (PDF & HTML)',
                  'Video hướng dẫn cài đặt và tùy chỉnh',
                  'Dữ liệu mẫu và nội dung demo',
                  'Cập nhật miễn phí 6 tháng',
                  'Hỗ trợ email ưu tiên'
                ]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h4>Công nghệ sử dụng:</h4>
              <div className="tech-stack">
                {(product.technologies || product.technology || []).map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-panel">
            <h3 className="panel-title">Tính năng chính</h3>
            <div className="features-grid">
              {(product.features || []).map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{typeof feature === 'object' ? feature.icon : '✓'}</div>
                  <div className="feature-content">
                    <h5 className="feature-title">
                      {typeof feature === 'object' ? feature.title : feature}
                    </h5>
                    {typeof feature === 'object' && feature.description && (
                      <p className="feature-description">{feature.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="additional-features">
              <h4>Điểm nổi bật khác:</h4>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <span className="icon">🚀</span>
                  <h5>Hiệu năng cao</h5>
                  <p>Tối ưu hóa tốc độ và hiệu quả</p>
                </div>
                <div className="highlight-item">
                  <span className="icon">🎨</span>
                  <h5>Thiết kế hiện đại</h5>
                  <p>Giao diện đẹp với hiệu ứng mượt mà</p>
                </div>
                <div className="highlight-item">
                  <span className="icon">📱</span>
                  <h5>Responsive hoàn toàn</h5>
                  <p>Hoạt động hoàn hảo trên mọi thiết bị</p>
                </div>
                <div className="highlight-item">
                  <span className="icon">🔒</span>
                  <h5>Mã nguồn an toàn</h5>
                  <p>Được xây dựng theo chuẩn bảo mật</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="tab-panel">
            <h3 className="panel-title">Yêu cầu hệ thống</h3>
            
            <div className="requirements-section">
              <h4>Yêu cầu máy chủ:</h4>
              <ul className="requirements-list">
                {(product.requirements?.server || [
                  'PHP: Version 8.0 or higher',
                  'MySQL: Version 5.7 or higher / MariaDB 10.2+',
                  'Apache/Nginx: With mod_rewrite enabled',
                  'Memory: Minimum 256MB RAM',
                  'Disk Space: At least 500MB free'
                ]).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="requirements-section">
              <h4>Công cụ phát triển:</h4>
              <ul className="requirements-list">
                {(product.requirements?.development || [
                  'Node.js: v16.x trở lên',
                  'npm/yarn: Phiên bản mới nhất',
                  'Composer: v2.x trở lên',
                  'Git: Để quản lý phiên bản'
                ]).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="requirements-section">
              <h4>Trình duyệt hỗ trợ:</h4>
              <ul className="requirements-list">
                {(product.requirements?.browser || [
                  'Chrome (2 phiên bản mới nhất)',
                  'Firefox (2 phiên bản mới nhất)',
                  'Safari (2 phiên bản mới nhất)',
                  'Edge (2 phiên bản mới nhất)'
                ]).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'changelog' && (
          <div className="tab-panel">
            <h3 className="panel-title">Lịch sử phiên bản</h3>
            
            <div className="changelog-list">
              {(product.changelog || []).map((entry, index) => (
                <div key={index} className="changelog-item">
                  <div className="version-header">
                    <span className={`version-badge ${entry.current ? 'current' : ''}`}>
                      v{entry.version}
                    </span>
                    <span className="version-date">{entry.date}</span>
                  </div>
                  <ul className="changes-list">
                    {(entry.changes || []).map((change, changeIndex) => (
                      <li key={changeIndex} className={change.type}>
                        {change.type === 'added' && 'Thêm mới: '}
                        {change.type === 'improved' && 'Cải thiện: '}
                        {change.type === 'fixed' && 'Sửa lỗi: '}
                        {change.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {(!product.changelog || product.changelog.length === 0) && (
                <div className="changelog-item">
                  <div className="version-header">
                    <span className="version-badge current">v{product.version || '1.0.0'}</span>
                    <span className="version-date">{product.lastUpdate || 'Gần đây'}</span>
                  </div>
                  <ul className="changes-list">
                    <li className="added">Thêm mới: Phiên bản đầu tiên</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
