import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authenticateUser } from '../../data/mockUsers';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Authenticate user với mock data
      const result = authenticateUser(formData.email, formData.password);

      if (result.success) {
        // Đăng nhập thành công - lưu vào AuthContext
        login(result.user, result.token);

        // Redirect về trang chủ
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        // Đăng nhập thất bại
        setError(result.message || 'Email hoặc mật khẩu không đúng');
      }
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Quick login function for testing
  const quickLogin = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Đăng nhập</h2>

        {/* Test Accounts - Development Only */}
        {showTestAccounts && (
          <div className="test-accounts-banner">
            <div className="test-accounts-header">
              <span>🧪 Test Accounts (Development Mode)</span>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowTestAccounts(false)}
                title="Ẩn"
              >
                ×
              </button>
            </div>
            <div className="test-accounts-grid">
              <button
                type="button"
                className="test-account-btn admin"
                onClick={() => quickLogin('admin@test.com', 'admin123')}
              >
                <span className="role-badge">Admin</span>
                <span className="email">admin@test.com</span>
                <span className="password">admin123</span>
              </button>
              <button
                type="button"
                className="test-account-btn user"
                onClick={() => quickLogin('user@test.com', 'user123')}
              >
                <span className="role-badge">User</span>
                <span className="email">user@test.com</span>
                <span className="password">user123</span>
              </button>
              <button
                type="button"
                className="test-account-btn demo"
                onClick={() => quickLogin('demo@test.com', 'demo123')}
              >
                <span className="role-badge">Demo</span>
                <span className="email">demo@test.com</span>
                <span className="password">demo123</span>
              </button>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Ghi nhớ đăng nhập
            </label>
            <Link to="/auth/forgot-password">Quên mật khẩu?</Link>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Chưa có tài khoản? <Link to="/auth/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
