import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ShieldCheck,
  Zap,
  Lock,
  Headphones,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Github,
  Facebook,
  Twitter,
  Linkedin,
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setIsSubmitting(false);

      setTimeout(() => {
        setSubscribeStatus('');
      }, 4000);
    }, 800);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      {/* Top Trust Features Bar */}
      <div className="footer-trust-bar">
        <div className="footer-container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon-box">
                <ShieldCheck size={20} />
              </div>
              <div className="trust-text">
                <h4>100% Đã kiểm duyệt</h4>
                <p>Mã nguồn chạy thử an toàn</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Zap size={20} />
              </div>
              <div className="trust-text">
                <h4>Tải về tức thì</h4>
                <p>Nhận link & source ngay</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Lock size={20} />
              </div>
              <div className="trust-text">
                <h4>Bảo mật thanh toán</h4>
                <p>Giao dịch an toàn mã hóa</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon-box">
                <Headphones size={20} />
              </div>
              <div className="trust-text">
                <h4>Hỗ trợ 24/7</h4>
                <p>Đồng hành cùng lập trình viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Column 1 - Brand & About */}
            <div className="footer-column brand-col">
              <Link to="/" className="footer-brand">
                <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
              </Link>
              <p className="footer-description">
                Sàn giao dịch mã nguồn, template và giải pháp phần mềm chất lượng cao hàng đầu dành
                cho lập trình viên và doanh nghiệp.
              </p>

              <div className="social-links">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="footer-column">
              <h4 className="footer-title">Khám phá</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/" className="footer-link">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="footer-link">
                    Tất cả mã nguồn
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="footer-link">
                    Danh mục sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/become-seller" className="footer-link highlight">
                    Kênh bán mã nguồn
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="footer-link">
                    Về chúng tôi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Support & Policies */}
            <div className="footer-column">
              <h4 className="footer-title">Hỗ trợ & Pháp lý</h4>
              <ul className="footer-links">
                <li>
                  <Link to="/faq" className="footer-link">
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="footer-link">
                    Liên hệ hỗ trợ
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="footer-link">
                    Điều khoản dịch vụ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link to="/refund" className="footer-link">
                    Chính sách hoàn tiền
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div className="footer-column newsletter-col">
              <h4 className="footer-title">Đăng ký nhận tin</h4>
              <p className="newsletter-description">
                Nhận thông báo về các mã nguồn mới nhất, ưu đãi giảm giá và tài liệu lập trình miễn
                phí mỗi tuần.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="newsletter-input-wrapper">
                  <Mail size={16} className="mail-icon" />
                  <input
                    type="email"
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="submit"
                    className="newsletter-submit-btn"
                    disabled={isSubmitting}
                    aria-label="Đăng ký"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
              {subscribeStatus === 'success' && (
                <div className="subscribe-message success">
                  <CheckCircle2 size={14} />
                  <span>Đăng ký nhận tin thành công! Cảm ơn bạn.</span>
                </div>
              )}
              {subscribeStatus === 'error' && (
                <div className="subscribe-message error">
                  <AlertCircle size={14} />
                  <span>Vui lòng nhập địa chỉ email hợp lệ!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} <strong>CodeMart</strong>. Bản quyền thuộc về nền tảng thương mại điện
              tử mã nguồn.
            </p>
            <div className="payment-methods">
              <span className="payment-text">Hỗ trợ thanh toán:</span>
              <div className="payment-badges">
                <span className="pay-badge">MOMO</span>
                <span className="pay-badge">VNPAY</span>
                <span className="pay-badge">ZALOPAY</span>
                <span className="pay-badge">VISA / MASTER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
