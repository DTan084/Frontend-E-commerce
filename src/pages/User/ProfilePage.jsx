import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Camera,
  CheckCircle2,
  Smartphone,
  Mail,
  Save,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import './UserPages.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Nguyễn Văn Dev',
    username: 'dev_nguyen2026',
    email: user?.email || 'dev@example.com',
    phone: '0912345678',
    role: 'Fullstack Software Engineer',
    bio: 'Lập trình viên đam mê mã nguồn mở, React, Node.js & giải pháp Cloud.',
  });

  // Password State
  const [passData, setPassData] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: '',
  });
  const [showPass, setShowPass] = useState(false);

  // Notifications State
  const [notifs, setNotifs] = useState({
    sourceCodeUpdates: true,
    orderReceipts: true,
    promotions: false,
    securityAlerts: true,
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePassSubmit = (e) => {
    e.preventDefault();
    if (passData.newPass !== passData.confirmPass) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }
    setSaveSuccess(true);
    setPassData({ currentPass: '', newPass: '', confirmPass: '' });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="profile-page-modern">
      <div className="profile-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Bàn làm việc', path: '/user/dashboard' },
            { label: 'Cài đặt tài khoản', path: null },
          ]}
        />

        <div className="profile-layout-row">
          {/* User Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Profile Content */}
          <main className="profile-main-content">
            {/* Header Card with Tabs */}
            <div className="profile-hero-header-card">
              <div className="profile-header-meta">
                <div className="profile-avatar-large-wrap">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User Avatar"
                    className="profile-avatar-img"
                  />
                  <button
                    type="button"
                    className="btn-change-avatar-badge"
                    title="Thay đổi ảnh đại diện"
                  >
                    <Camera size={13} />
                  </button>
                </div>

                <div className="profile-text-meta">
                  <h1 className="profile-user-display-name">{profileData.name}</h1>
                  <p className="profile-user-email-tag">
                    <Mail size={13} />
                    <span>{profileData.email}</span>
                    <span className="verified-chip-sm">Đã xác minh</span>
                  </p>
                </div>
              </div>

              {/* Setting Navigation Tabs */}
              <div className="profile-setting-tabs">
                <button
                  type="button"
                  className={`prof-tab-btn ${activeTab === 'general' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('general')}
                >
                  <User size={15} />
                  <span>Hồ sơ cá nhân</span>
                </button>
                <button
                  type="button"
                  className={`prof-tab-btn ${activeTab === 'security' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <Shield size={15} />
                  <span>Bảo mật & 2FA</span>
                </button>
                <button
                  type="button"
                  className={`prof-tab-btn ${activeTab === 'notifications' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={15} />
                  <span>Cài đặt thông báo</span>
                </button>
              </div>
            </div>

            {/* Success Toast */}
            {saveSuccess && (
              <div className="profile-success-banner">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Đã lưu các thay đổi thông tin tài khoản thành công!</span>
              </div>
            )}

            {/* Tab 1: General Info */}
            {activeTab === 'general' && (
              <div className="profile-tab-card-body">
                <h3 className="section-block-title">Thông tin cá nhân & Liên hệ</h3>
                <p className="section-block-desc">
                  Quản lý thông tin hiển thị trên CodeMart và địa chỉ email nhận mã nguồn.
                </p>

                <form onSubmit={handleProfileSubmit} className="profile-form-grid">
                  <div className="form-field-dual">
                    <div className="form-field-group">
                      <label className="field-label-txt">Họ và tên *</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="field-input-box"
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="field-label-txt">Tên đăng nhập (Username)</label>
                      <input
                        type="text"
                        value={profileData.username}
                        onChange={(e) =>
                          setProfileData({ ...profileData, username: e.target.value })
                        }
                        className="field-input-box"
                      />
                    </div>
                  </div>

                  <div className="form-field-dual">
                    <div className="form-field-group">
                      <label className="field-label-txt">
                        Địa chỉ Email (Nhận License & Source code)
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        disabled
                        className="field-input-box disabled-field"
                      />
                      <span className="field-helper-note">
                        Email tài khoản không thể thay đổi trực tiếp để bảo vệ bản quyền.
                      </span>
                    </div>
                    <div className="form-field-group">
                      <label className="field-label-txt">Số điện thoại liên hệ</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="field-input-box"
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label-txt">Chức danh / Chuyên môn</label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                      className="field-input-box"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="field-label-txt">Giới thiệu ngắn (Bio)</label>
                    <textarea
                      rows="3"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="field-input-box field-textarea"
                    />
                  </div>

                  <div className="profile-form-footer">
                    <button type="submit" className="btn-save-profile-action">
                      <Save size={15} />
                      <span>Lưu thông tin hồ sơ</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Security */}
            {activeTab === 'security' && (
              <div className="profile-tab-card-body">
                <h3 className="section-block-title">Đổi mật khẩu tài khoản</h3>
                <p className="section-block-desc">
                  Để đảm bảo an toàn, vui lòng sử dụng mật khẩu mạnh có ít nhất 8 ký tự kết hợp chữ
                  số và ký tự đặc biệt.
                </p>

                <form onSubmit={handlePassSubmit} className="profile-form-grid">
                  <div className="form-field-group">
                    <label className="field-label-txt">Mật khẩu hiện tại</label>
                    <div className="pass-input-wrapper">
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passData.currentPass}
                        onChange={(e) => setPassData({ ...passData, currentPass: e.target.value })}
                        placeholder="Nhập mật khẩu đang sử dụng"
                        className="field-input-box"
                        required
                      />
                      <button
                        type="button"
                        className="btn-toggle-eye-icon"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-field-dual">
                    <div className="form-field-group">
                      <label className="field-label-txt">Mật khẩu mới</label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passData.newPass}
                        onChange={(e) => setPassData({ ...passData, newPass: e.target.value })}
                        placeholder="Tối thiểu 8 ký tự"
                        className="field-input-box"
                        required
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="field-label-txt">Xác nhận mật khẩu mới</label>
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passData.confirmPass}
                        onChange={(e) => setPassData({ ...passData, confirmPass: e.target.value })}
                        placeholder="Nhập lại mật khẩu mới"
                        className="field-input-box"
                        required
                      />
                    </div>
                  </div>

                  <div className="profile-form-footer">
                    <button type="submit" className="btn-save-profile-action">
                      <KeyRound size={15} />
                      <span>Cập nhật mật khẩu mới</span>
                    </button>
                  </div>
                </form>

                <div className="security-divider-line"></div>

                {/* 2FA Toggle Card */}
                <div className="two-factor-auth-card">
                  <div className="two-factor-left-info">
                    <div className="two-factor-icon-wrap">
                      <Smartphone size={22} className="text-indigo" />
                    </div>
                    <div>
                      <h4 className="two-factor-title">Xác thực 2 yếu tố (2FA)</h4>
                      <p className="two-factor-desc">
                        Bảo vệ tài khoản và kho mã nguồn của bạn bằng mã OTP qua ứng dụng Google
                        Authenticator hoặc tin nhắn SMS.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-enable-2fa-pill"
                    onClick={() =>
                      alert('Tính năng bảo mật 2FA đang được kích hoạt cho tài khoản của bạn.')
                    }
                  >
                    Kích hoạt 2FA
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Notifications */}
            {activeTab === 'notifications' && (
              <div className="profile-tab-card-body">
                <h3 className="section-block-title">Tùy chọn thông báo</h3>
                <p className="section-block-desc">
                  Chọn loại thông báo bạn muốn nhận qua Email và thông báo đẩy.
                </p>

                <div className="notif-preferences-list">
                  <label className="notif-toggle-row">
                    <div className="notif-info-meta">
                      <strong className="notif-item-title">
                        Cập nhật mã nguồn & Phiên bản mới
                      </strong>
                      <span className="notif-item-sub">
                        Nhận email ngay khi tác giả phát hành bản cập nhật vá lỗi hoặc nâng cấp cho
                        source code bạn đã mua.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.sourceCodeUpdates}
                      onChange={(e) =>
                        setNotifs({ ...notifs, sourceCodeUpdates: e.target.checked })
                      }
                      className="modern-switch-checkbox"
                    />
                  </label>

                  <label className="notif-toggle-row">
                    <div className="notif-info-meta">
                      <strong className="notif-item-title">Hóa đơn & Biên lai giao dịch</strong>
                      <span className="notif-item-sub">
                        Gửi hóa đơn điện tử kèm mã License Key qua email ngay khi thanh toán đơn
                        hàng thành công.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.orderReceipts}
                      onChange={(e) => setNotifs({ ...notifs, orderReceipts: e.target.checked })}
                      className="modern-switch-checkbox"
                    />
                  </label>

                  <label className="notif-toggle-row">
                    <div className="notif-info-meta">
                      <strong className="notif-item-title">Cảnh báo bảo mật tài khoản</strong>
                      <span className="notif-item-sub">
                        Thông báo ngay khi phát hiện đăng nhập từ thiết bị lạ hoặc thay đổi mật
                        khẩu.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifs.securityAlerts}
                      onChange={(e) => setNotifs({ ...notifs, securityAlerts: e.target.checked })}
                      className="modern-switch-checkbox"
                    />
                  </label>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
