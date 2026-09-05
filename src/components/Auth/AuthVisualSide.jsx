import React from 'react';
import { Code2, ShieldCheck, Zap, Star } from 'lucide-react';
import './AuthVisualSide.css';

const AuthVisualSide = () => {
  return (
    <div className="auth-visual-side">
      <div className="auth-visual-overlay"></div>

      <div className="auth-visual-content">
        {/* Top Tagline */}
        <div className="visual-badge">
          <Code2 size={15} />
          <span>Sàn Giao Dịch Mã Nguồn Hàng Đầu Việt Nam</span>
        </div>

        <h2 className="visual-headline">
          Xây dựng sản phẩm nhanh hơn với hàng ngàn mã nguồn chất lượng cao
        </h2>

        <p className="visual-subtext">
          Gia nhập cộng đồng hơn 15.000 lập trình viên. Mua bán, chia sẻ và tích hợp source code bản
          quyền an toàn tuyệt đối với cơ chế bảo vệ Escrow.
        </p>

        {/* Floating Code Snippet Card */}
        <div className="visual-code-card">
          <div className="code-card-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="code-filename">codemart.config.js</span>
          </div>
          <pre className="code-content">
            <code>
              <span className="c-keyword">import</span> {'{'} CodeMart {'}'}{' '}
              <span className="c-keyword">from</span>{' '}
              <span className="c-string">'@codemart/sdk'</span>;{'\n\n'}
              <span className="c-comment">{'// Khởi tạo giao dịch an toàn với Escrow'}</span>
              {'\n'}
              <span className="c-keyword">const</span> order ={' '}
              <span className="c-keyword">await</span> CodeMart.createOrder({'{'}
              {'\n'}
              {'  '}sourceId: <span className="c-string">'SRC_REACT_ECOMMERCE_PRO'</span>,{'\n'}
              {'  '}instantZipDownload: <span className="c-boolean">true</span>,{'\n'}
              {'  '}lifetimeWarranty: <span className="c-boolean">true</span>
              {'\n'}
              {'}'});{'\n\n'}
              <span className="c-keyword">console</span>.log(order.licenseKey);{' '}
              <span className="c-comment">{'// CM-987-READY'}</span>
            </code>
          </pre>
        </div>

        {/* Feature Highlights Grid */}
        <div className="visual-features-grid">
          <div className="visual-feature-item">
            <div className="feature-icon-wrap emerald">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4>Bảo hành Escrow 3 ngày</h4>
              <p>Tiền thanh toán được giữ an toàn tới khi mã nguồn hoạt động đúng cam kết.</p>
            </div>
          </div>

          <div className="visual-feature-item">
            <div className="feature-icon-wrap amber">
              <Zap size={18} />
            </div>
            <div>
              <h4>Bàn giao .ZIP tức thì</h4>
              <p>Tải mã nguồn và nhận License Key ngay lập tức sau khi xác nhận thanh toán.</p>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="visual-testimonial-card">
          <div className="testimonial-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
            ))}
            <span className="rating-score">5.0 / 5.0</span>
          </div>
          <p className="testimonial-quote">
            "CodeMart giúp đội ngũ của mình tiết kiệm hơn 200 giờ phát triển cho các dự án khách
            hàng. Source code sạch, dễ mở rộng và hỗ trợ kỹ thuật cực kỳ nhanh!"
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">TN</div>
            <div>
              <div className="author-name">Trần Nhật Nam</div>
              <div className="author-role">Senior Fullstack Developer & Agency Founder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVisualSide;
