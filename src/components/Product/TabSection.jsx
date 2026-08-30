import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Cpu,
  History,
  CheckCircle2,
  Rocket,
  Palette,
  Smartphone,
  ShieldCheck,
  Server,
  Code2,
  Globe,
  Plus,
  ArrowUp,
  Check,
} from 'lucide-react';
import './TabSection.css';

const TabSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Mô tả chi tiết', icon: FileText },
    { id: 'features', label: 'Tính năng chính', icon: Sparkles },
    { id: 'requirements', label: 'Yêu cầu hệ thống', icon: Cpu },
    { id: 'changelog', label: 'Lịch sử phiên bản', icon: History },
  ];

  return (
    <div className="product-tab-section-modern">
      {/* Tab Headers */}
      <div className="tab-navigation-bar">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComp size={17} className="tab-nav-icon" />
              <span className="tab-nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="tab-panels-wrapper">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="tab-panel-item">
            <h3 className="tab-panel-heading">Tổng quan & Mô tả mã nguồn</h3>
            <div className="description-text-body">
              <p>{product.description}</p>

              <h4 className="sub-heading-title">Gói bàn giao bao gồm:</h4>
              <ul className="included-perks-list">
                {(
                  product.included || [
                    'Mã nguồn hoàn chỉnh 100% (Clean code, chuẩn cấu trúc)',
                    'Tài liệu hướng dẫn cài đặt từng bước (PDF & Markdown)',
                    'Bộ dữ liệu mẫu (Database SQL dump hoặc seeders)',
                    'Hỗ trợ giải đáp thắc mắc và xử lý lỗi cài đặt ban đầu',
                    'Cập nhật miễn phí các bản vá bảo mật tiếp theo',
                  ]
                ).map((item, index) => (
                  <li key={index} className="perk-list-item">
                    <CheckCircle2 size={16} className="perk-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="sub-heading-title">Công nghệ & Framework sử dụng:</h4>
              <div className="tech-stack-pills-row">
                {(product.technologies || product.technology || ['React', 'Node.js', 'MySQL']).map(
                  (tech, index) => (
                    <span key={index} className="tech-stack-pill">
                      <Code2 size={13} />
                      <span>{tech}</span>
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="tab-panel-item">
            <h3 className="tab-panel-heading">Tính năng nổi bật</h3>
            <div className="features-cards-grid">
              {(
                product.features || [
                  {
                    title: 'Giao diện tối ưu trải nghiệm (UI/UX)',
                    description:
                      'Thiết kế chuẩn Modern Flat & Glassmorphism, thân thiện người dùng và tối ưu chuyển đổi.',
                  },
                  {
                    title: 'Bảo mật & Phân quyền nhiều cấp độ',
                    description:
                      'Tích hợp xác thực JWT, chống SQL Injection, XSS, CSRF và phân quyền Role-based.',
                  },
                  {
                    title: 'Tối ưu tốc độ & SEO Onpage',
                    description:
                      'Cấu trúc thẻ semantic chuẩn SEO, lazy loading hình ảnh và điểm PageSpeed cao.',
                  },
                  {
                    title: 'Tích hợp thanh toán & API tiện lợi',
                    description:
                      'Sẵn sàng kết nối các cổng thanh toán VNPay, MoMo, ZaloPay, PayPal và webhook.',
                  },
                ]
              ).map((feature, index) => (
                <div key={index} className="feature-item-card">
                  <div className="feature-card-icon-box">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="feature-card-details">
                    <h5 className="feature-item-title">
                      {typeof feature === 'object' ? feature.title : feature}
                    </h5>
                    {typeof feature === 'object' && feature.description && (
                      <p className="feature-item-desc">{feature.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="highlights-banner-section">
              <h4 className="sub-heading-title">Tiêu chuẩn kỹ thuật đạt được</h4>
              <div className="highlights-four-grid">
                <div className="highlight-box">
                  <div
                    className="highlight-icon-wrap"
                    style={{ color: '#0ea5e9', background: 'rgba(14, 165, 233, 0.1)' }}
                  >
                    <Rocket size={22} />
                  </div>
                  <h5>Hiệu năng cực nhanh</h5>
                  <p>Tối ưu truy vấn & cache</p>
                </div>
                <div className="highlight-box">
                  <div
                    className="highlight-icon-wrap"
                    style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}
                  >
                    <Palette size={22} />
                  </div>
                  <h5>Thiết kế hiện đại</h5>
                  <p>Chuẩn UX/UI công nghệ</p>
                </div>
                <div className="highlight-box">
                  <div
                    className="highlight-icon-wrap"
                    style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}
                  >
                    <Smartphone size={22} />
                  </div>
                  <h5>Full Responsive</h5>
                  <p>Mượt mà trên Mobile & PC</p>
                </div>
                <div className="highlight-box">
                  <div
                    className="highlight-icon-wrap"
                    style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)' }}
                  >
                    <ShieldCheck size={22} />
                  </div>
                  <h5>Bảo mật nghiêm ngặt</h5>
                  <p>Không chứa mã độc</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="tab-panel-item">
            <h3 className="tab-panel-heading">Yêu cầu môi trường & Cài đặt</h3>

            <div className="requirements-category-box">
              <h4 className="req-category-title">
                <Server size={18} className="req-icon" />
                <span>Yêu cầu máy chủ / Server:</span>
              </h4>
              <ul className="req-specs-list">
                {(
                  product.requirements?.server || [
                    'PHP 8.0+ / Node.js 18+ (tùy stack công nghệ)',
                    'MySQL 5.7+ / MariaDB 10.3+ / PostgreSQL 13+',
                    'Web Server: Nginx hoặc Apache (bật mod_rewrite)',
                    'Bộ nhớ tối thiểu: 512MB RAM (Khuyến nghị 1GB+)',
                    'Dung lượng ổ cứng trống: Tối thiểu 500MB',
                  ]
                ).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="requirements-category-box">
              <h4 className="req-category-title">
                <Code2 size={18} className="req-icon" />
                <span>Công cụ phát triển & Build:</span>
              </h4>
              <ul className="req-specs-list">
                {(
                  product.requirements?.development || [
                    'Node.js & npm / yarn / pnpm phiên bản LTS',
                    'Composer v2.x (dành cho các dự án PHP/Laravel)',
                    'Git để quản lý và đồng bộ mã nguồn',
                    'Trình soạn thảo khuyến nghị: VS Code',
                  ]
                ).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="requirements-category-box">
              <h4 className="req-category-title">
                <Globe size={18} className="req-icon" />
                <span>Trình duyệt tương thích:</span>
              </h4>
              <ul className="req-specs-list">
                {(
                  product.requirements?.browser || [
                    'Google Chrome, Microsoft Edge (phiên bản mới nhất)',
                    'Mozilla Firefox, Apple Safari (phiên bản mới nhất)',
                    'Hỗ trợ đầy đủ các trình duyệt trên thiết bị di động iOS & Android',
                  ]
                ).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Changelog Tab */}
        {activeTab === 'changelog' && (
          <div className="tab-panel-item">
            <h3 className="tab-panel-heading">Lịch sử phát hành & Cập nhật</h3>

            <div className="changelog-timeline-list">
              {(
                product.changelog || [
                  {
                    version: '1.2.0',
                    date: '20/08/2026',
                    current: true,
                    changes: [
                      { type: 'added', text: 'Tích hợp thêm cổng thanh toán MoMo và ZaloPay.' },
                      {
                        type: 'improved',
                        text: 'Tối ưu tốc độ tải trang và nâng cấp giao diện giỏ hàng.',
                      },
                      {
                        type: 'fixed',
                        text: 'Sửa lỗi hiển thị modal xem nhanh trên màn hình nhỏ.',
                      },
                    ],
                  },
                  {
                    version: '1.1.0',
                    date: '15/07/2026',
                    current: false,
                    changes: [
                      {
                        type: 'added',
                        text: 'Bổ sung tính năng lọc sản phẩm theo khoảng giá và rating.',
                      },
                      { type: 'improved', text: 'Nâng cấp bảo mật JWT token và refresh session.' },
                    ],
                  },
                  {
                    version: '1.0.0',
                    date: '01/06/2026',
                    current: false,
                    changes: [
                      { type: 'added', text: 'Phát hành phiên bản đầu tiên của mã nguồn.' },
                    ],
                  },
                ]
              ).map((entry, index) => (
                <div key={index} className="changelog-entry-card">
                  <div className="changelog-entry-header">
                    <div className="version-tag-wrapper">
                      <span
                        className={`changelog-version-pill ${entry.current ? 'current-active' : ''}`}
                      >
                        v{entry.version}
                      </span>
                      {entry.current && <span className="latest-label">Bản mới nhất</span>}
                    </div>
                    <span className="changelog-release-date">{entry.date}</span>
                  </div>

                  <ul className="changelog-changes-list">
                    {(entry.changes || []).map((change, changeIndex) => (
                      <li key={changeIndex} className={`change-bullet-item ${change.type}`}>
                        <span className={`change-badge ${change.type}`}>
                          {change.type === 'added' && <Plus size={12} />}
                          {change.type === 'improved' && <ArrowUp size={12} />}
                          {change.type === 'fixed' && <Check size={12} />}
                          <span>
                            {change.type === 'added'
                              ? 'Thêm mới'
                              : change.type === 'improved'
                                ? 'Cải tiến'
                                : 'Sửa lỗi'}
                          </span>
                        </span>
                        <span className="change-text-content">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSection;
