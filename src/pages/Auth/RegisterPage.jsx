import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { registerUser } from '../../data/mockUsers';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: '', color: '' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, text: 'Yếu', color: '#ef4444', percent: 25 };
    if (score === 2) return { score: 2, text: 'Trung bình', color: '#f59e0b', percent: 50 };
    if (score === 3) return { score: 3, text: 'Khá', color: '#3b82f6', percent: 75 };
    return { score: 4, text: 'Rất mạnh', color: '#10b981', percent: 100 };
  };

  const strength = calculatePasswordStrength(formData.password);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeTerms) {
      setError('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư để tiếp tục.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu cần tối thiểu 6 ký tự.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    setLoading(true);

    try {
      const result = registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        login(result.user, result.token);
        setTimeout(() => {
          navigate('/user/dashboard');
        }, 400);
      } else {
        setError(result.message || 'Đăng ký không thành công. Vui lòng thử lại.');
      }
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      const demoUser = {
        id: Date.now(),
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
          <UserPlus size={22} className="text-primary" />
        </div>
        <h1 className="auth-title">Đăng ký tài khoản</h1>
        <p className="auth-subtitle">
          Tạo tài khoản CodeMart miễn phí để mua sắm và tải mã nguồn chất lượng cao.
        </p>
      </div>

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
          <span>Đăng ký với Google</span>
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
          <span>Đăng ký với GitHub</span>
        </button>
      </div>

      <div className="auth-divider-line">
        <span>Hoặc điền thông tin đăng ký</span>
      </div>

      {error && (
        <div className="auth-alert error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Register Form */}
      <form onSubmit={handleSubmit} className="modern-auth-form">
        <div className="form-field-group">
          <label htmlFor="name" className="form-label">
            Họ và tên của bạn <span className="text-danger">*</span>
          </label>
          <div className="input-with-icon">
            <User size={17} className="input-leading-icon" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
              className="form-input"
              autoComplete="name"
            />
          </div>
        </div>

        <div className="form-field-group">
          <label htmlFor="email" className="form-label">
            Địa chỉ Email (Nhận mã nguồn & License) <span className="text-danger">*</span>
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
          <label htmlFor="password" className="form-label">
            Mật khẩu bảo mật <span className="text-danger">*</span>
          </label>
          <div className="input-with-icon">
            <Lock size={17} className="input-leading-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tối thiểu 6 ký tự"
              required
              className="form-input"
              autoComplete="new-password"
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

          {/* Password Strength Meter */}
          {formData.password && (
            <div className="password-strength-wrap">
              <div className="strength-bar-track">
                <div
                  className="strength-bar-fill"
                  style={{
                    width: `${strength.percent}%`,
                    backgroundColor: strength.color,
                  }}
                ></div>
              </div>
              <div className="strength-info-row">
                <span className="strength-label">Độ mạnh mật khẩu:</span>
                <span className="strength-text" style={{ color: strength.color, fontWeight: 700 }}>
                  {strength.text}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="form-field-group">
          <label htmlFor="confirmPassword" className="form-label">
            Xác nhận mật khẩu <span className="text-danger">*</span>
          </label>
          <div className="input-with-icon">
            <Lock size={17} className="input-leading-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu của bạn"
              required
              className="form-input"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="btn-toggle-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-remember-row">
          <label className="custom-checkbox-label">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <span>
              Tôi đồng ý với{' '}
              <Link to="/terms" target="_blank">
                Điều khoản dịch vụ
              </Link>{' '}
              và{' '}
              <Link to="/privacy" target="_blank">
                Chính sách bảo mật
              </Link>{' '}
              của CodeMart.
            </span>
          </label>
        </div>

        <button type="submit" className="btn-auth-primary submit-btn" disabled={loading}>
          {loading ? (
            <span>Đang tạo tài khoản...</span>
          ) : (
            <>
              <span>Tạo tài khoản CodeMart</span>
              <UserPlus size={16} />
            </>
          )}
        </button>
      </form>

      <div className="auth-card-footer">
        <p>
          Đã có tài khoản CodeMart?{' '}
          <Link to="/auth/login" className="auth-switch-link">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
