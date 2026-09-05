import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setLoading(true);

    // Simulate sending reset email
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="auth-form-card">
      <div className="auth-card-header">
        <div className="auth-icon-badge">
          <KeyRound size={22} className="text-primary" />
        </div>
        <h1 className="auth-title">Khôi phục mật khẩu</h1>
        <p className="auth-subtitle">
          Nhập email đăng ký tài khoản CodeMart để nhận hướng dẫn và liên kết đặt lại mật khẩu bảo
          mật.
        </p>
      </div>

      {error && (
        <div className="auth-alert error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {isSubmitted ? (
        <div className="auth-success-flow">
          <div className="success-icon-wrap">
            <CheckCircle2 size={36} className="text-emerald" />
          </div>
          <h3 className="success-flow-title">Đã gửi hướng dẫn khôi phục!</h3>
          <p className="success-flow-desc">
            Chúng tôi đã gửi email chứa đường dẫn đặt lại mật khẩu tới địa chỉ: <br />
            <strong>{email}</strong>
          </p>
          <div className="success-tips-box">
            <p className="tip-text">
              Vui lòng kiểm tra hòm thư đến hoặc thư mục Spam. Liên kết có hiệu lực trong vòng{' '}
              <strong>15 phút</strong>.
            </p>
          </div>

          <div className="auth-flow-actions">
            <button
              type="button"
              className="btn-auth-secondary"
              onClick={() => setIsSubmitted(false)}
            >
              Gửi lại email khác
            </button>
            <Link to="/auth/login" className="btn-auth-primary">
              <ArrowLeft size={15} />
              <span>Quay lại Đăng nhập</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="modern-auth-form">
          <div className="form-field-group">
            <label htmlFor="email" className="form-label">
              Địa chỉ Email nhận liên kết <span className="text-danger">*</span>
            </label>
            <div className="input-with-icon">
              <Mail size={17} className="input-leading-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="form-input"
              />
            </div>
          </div>

          <button type="submit" className="btn-auth-primary submit-btn" disabled={loading}>
            {loading ? <span>Đang xử lý gửi email...</span> : <span>Gửi liên kết khôi phục</span>}
          </button>

          <div className="auth-card-footer">
            <Link to="/auth/login" className="auth-back-link">
              <ArrowLeft size={14} />
              <span>Quay lại trang Đăng nhập</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
