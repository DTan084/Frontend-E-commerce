import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Store, ShieldCheck, Download } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const popularTags = [
    { name: 'React', query: 'React' },
    { name: 'Spring Boot', query: 'Spring Boot' },
    { name: 'Node.js', query: 'NodeJS' },
    { name: 'Flutter', query: 'Flutter' },
    { name: 'Laravel', query: 'Laravel' },
    { name: 'Vue.js', query: 'Vue' },
    { name: 'Next.js', query: 'Next.js' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient-orb orb-1"></div>
        <div className="hero-gradient-orb orb-2"></div>
        <div className="hero-grid-pattern"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-layout">
          {/* Left Column: Headline, Subtitle, CTAs, Tags */}
          <div className="hero-left-content">
            <div className="hero-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>SÀN GIAO DỊCH MÃ NGUỒN HÀNG ĐẦU</span>
            </div>

            <h1 className="hero-title">
              Khám phá & Sở hữu <br />
              <span className="gradient-text">Mã nguồn chất lượng cao</span>
            </h1>

            <p className="hero-subtitle">
              Tiết kiệm 80% thời gian phát triển với hàng nghìn mã nguồn website, ứng dụng di động
              và hệ thống quản trị hoàn chỉnh được kiểm duyệt kỹ lưỡng.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => navigate('/products')}
              >
                <span>Khám phá mã nguồn</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-hero-secondary"
                onClick={() => navigate('/become-seller')}
              >
                <Store size={18} />
                <span>Bán mã nguồn của bạn</span>
              </button>
            </div>

            {/* Popular Technology Chips */}
            <div className="hero-tech-tags">
              <span className="tags-label">Phổ biến:</span>
              <div className="tags-list">
                {popularTags.map((tag) => (
                  <Link
                    key={tag.name}
                    to={`/products?search=${encodeURIComponent(tag.query)}`}
                    className="tech-chip"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Floating Code Preview & Trust Highlights */}
          <div className="hero-right-visual">
            <div className="code-preview-card">
              <div className="code-card-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-title">CodeMart_App.tsx</div>
                <span className="window-badge">Verified</span>
              </div>

              <div className="code-card-body">
                <div className="code-line">
                  <span className="code-keyword">import</span> {'{ Marketplace }'}{' '}
                  <span className="code-keyword">from</span>{' '}
                  <span className="code-string">'@codemart/core'</span>;
                </div>
                <div className="code-line">
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-function">Project</span> = () =&gt; {'{'}
                </div>
                <div className="code-line indent">
                  <span className="code-keyword">return</span> (
                </div>
                <div className="code-line indent-2">
                  &lt;<span className="code-tag">FastDelivery</span>{' '}
                  <span className="code-attr">cleanCode</span>=
                  <span className="code-string">"100%"</span>{' '}
                  <span className="code-attr">instantDownload</span> /&gt;
                </div>
                <div className="code-line indent">);</div>
                <div className="code-line">{'}'};</div>
              </div>

              {/* Floating Stat Badges */}
              <div className="floating-stat-badge stat-top">
                <div className="badge-icon-box green">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="badge-title">100% Mã sạch</p>
                  <p className="badge-sub">Đã quét bảo mật & chạy thử</p>
                </div>
              </div>

              <div className="floating-stat-badge stat-bottom">
                <div className="badge-icon-box purple">
                  <Download size={18} />
                </div>
                <div>
                  <p className="badge-title">50,000+ Lượt tải</p>
                  <p className="badge-sub">Bởi cộng đồng lập trình viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
