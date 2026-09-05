import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthVisualSide from '../components/Auth/AuthVisualSide';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout-split">
      {/* Left Column: Form Content */}
      <div className="auth-form-column">
        {/* Top Header with Brand & Return Home */}
        <header className="auth-top-header">
          <Link to="/" className="auth-brand-link">
            <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
            <span className="auth-brand-name">CodeMart</span>
          </Link>

          <Link to="/" className="auth-back-home-btn">
            <ArrowLeft size={15} />
            <span>Về trang chủ</span>
          </Link>
        </header>

        {/* Dynamic Auth Page Content (Login / Register / Forgot Password) */}
        <div className="auth-page-container">
          <Outlet />
        </div>

        {/* Security & Copyright Footer */}
        <footer className="auth-form-footer">
          <p>© {new Date().getFullYear()} CodeMart Marketplace. Bảo mật mã hóa SSL 256-bit.</p>
        </footer>
      </div>

      {/* Right Column: Platform Visual Showcase */}
      <AuthVisualSide />
    </div>
  );
};

export default AuthLayout;
