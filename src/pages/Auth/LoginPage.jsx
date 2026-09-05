import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, FlaskConical, X } from 'lucide-react';
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
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTestAccounts, setShowTestAccounts] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Authenticate user with mock data
      const result = authenticateUser(formData.email, formData.password);

      if (result.success) {
        login(result.user, result.token);
        setTimeout(() => {
          navigate(result.user?.role === 'admin' ? '/admin' : '/user/dashboard');
        }, 400);
      } else {
        setError(result.message || 'Email hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill function for developer testing
  const quickFillAccount = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  const handleSocialLogin = (provider) => {
    // Quick demo login for social provider
    setLoading(true);
    setTimeout(() => {
      const demoUser = {
        id: 99,
        name: provider === 'google' ? 'Google Developer' : 'GitHub Contributor',
        email: `${provider.toLowerCase()}@codemart.dev`,
        role: 'user',
        avatar:
          provider === 'google'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      };
      login(demoUser, `mock-oauth-token-${Date.now()}`);
      navigate('/user/dashboard');
    }, 600);
  };

  return (
    <div className="auth-form-card">
      <div className="auth-card-header">
        <div className="auth-icon-badge">
          <LogIn size={22} className="text-primary" />
        </div>
        <h1 className="auth-title">Chào mừng trở lại!</h1>
        <p className="auth-subtitle">
          Đăng nhập để quản lý mã nguồn, tải file ZIP và tra cứu License Key của bạn.
        </p>
      </div>

      {/* Test Accounts Bar for Instant Evaluation */}
      {showTestAccounts && (
        <div className="dev-test-accounts-panel">
          <div className="test-panel-top">
            <div className="test-panel-label">
              <FlaskConical size={14} className="text-indigo" />
              <span>Tài khoản kiểm thử nhanh (Demo Mode)</span>
            </div>
            <button
              type="button"
              className="btn-close-test-panel"
              onClick={() => setShowTestAccounts(false)}
              title="Ẩn bảng demo"
            >
              <X size={14} />
            </button>
          </div>
          <div className="test-account-chips-row">
            <button
              type="button"
              className="btn-quick-chip admin"
              onClick={() => quickFillAccount('admin@test.com', 'admin123')}
            >
              <span className="chip-badge admin">Admin</span>
              <span className="chip-text">admin@test.com</span>
            </button>
            <button
              type="button"
              className="btn-quick-chip user"
              onClick={() => quickFillAccount('user@test.com', 'user123')}
            >
              <span className="chip-badge user">User</span>
              <span className="chip-text">user@test.com</span>
            </button>
            <button
              type="button"
              className="btn-quick-chip demo"
              onClick={() => quickFillAccount('demo@test.com', 'demo123')}
            >
              <span className="chip-badge demo">Demo</span>
              <span className="chip-text">demo@test.com</span>
            </button>
          </div>
        </div>
      )}

      {/* Social Login Buttons */}
      <div className="social-auth-grid">
        <button
          type="button"
          className="btn-social-auth google"
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
        >
          <svg className="social-icon-svg" viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          className="btn-social-auth github"
          onClick={() => handleSocialLogin('github')}
          disabled={loading}
        >
          <svg
            className="social-icon-svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>GitHub</span>
        </button>
      </div>

      <div className="auth-divider-line">
        <span>Hoặc tiếp tục với Email</span>
      </div>

      {error && (
        <div className="auth-alert error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="modern-auth-form">
        <div className="form-field-group">
          <label htmlFor="email" className="form-label">
            Email tài khoản <span className="text-danger">*</span>
          </label>
          <div className="input-with-icon">
            <Mail size={17} className="input-leading-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="form-input"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="form-field-group">
          <div className="field-label-row">
            <label htmlFor="password" className="form-label">
              Mật khẩu <span className="text-danger">*</span>
            </label>
            <Link to="/auth/forgot-password" className="link-forgot-pass">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="input-with-icon">
            <Lock size={17} className="input-leading-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu của bạn"
              required
              className="form-input"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="btn-toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-remember-row">
          <label className="custom-checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Ghi nhớ đăng nhập trên thiết bị này</span>
          </label>
        </div>

        <button type="submit" className="btn-auth-primary submit-btn" disabled={loading}>
          {loading ? (
            <span>Đang xác thực tài khoản...</span>
          ) : (
            <>
              <span>Đăng nhập CodeMart</span>
              <LogIn size={16} />
            </>
          )}
        </button>
      </form>

      <div className="auth-card-footer">
        <p>
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="auth-switch-link">
            Đăng ký tài khoản mới
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
