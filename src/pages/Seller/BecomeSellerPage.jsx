import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Globe,
  Wrench,
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  Zap,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import './BecomeSellerPage.css';

const BecomeSellerPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    businessName: user?.name || '',
    businessType: 'individual',
    description: '',
    website: '',
    portfolio: '',
    experience: '2-4 năm',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Hồ sơ đăng ký tác giả đã được gửi thành công! Đội ngũ CodeMart sẽ xem xét và phản hồi trong vòng 24 giờ làm việc.'
    );
    navigate('/seller/dashboard');
  };

  const benefits = [
    {
      icon: TrendingUp,
      color: 'indigo',
      title: 'Hoa hồng hấp dẫn 80%',
      description:
        'Nhận 80% giá trị mỗi lượt tải mã nguồn. Không mất phí duy trì hàng tháng hay phí mở gian hàng.',
    },
    {
      icon: Globe,
      color: 'blue',
      title: 'Tiếp cận 15.000+ Lập trình viên',
      description:
        'Mã nguồn của bạn được quảng bá tới hàng nghìn lập trình viên, startup và doanh nghiệp công nghệ tại Việt Nam.',
    },
    {
      icon: ShieldCheck,
      color: 'emerald',
      title: 'Bảo vệ tác quyền & Escrow',
      description:
        'Mỗi giao dịch được cấp License Key riêng biệt, cơ chế ký quỹ Escrow 3 ngày đảm bảo an toàn thanh toán.',
    },
    {
      icon: Wrench,
      color: 'amber',
      title: 'Bộ công cụ quản lý chuyên nghiệp',
      description:
        'Bảng điều khiển tác giả hiện đại, theo dõi doanh thu theo thời gian thực, quản lý phiên bản và rút tiền 24/7.',
    },
    {
      icon: Sparkles,
      color: 'purple',
      title: 'Bàn giao mã nguồn tự động',
      description:
        'Hệ thống tự động kích hoạt link tải file .ZIP và gửi License qua email ngay khi người mua hoàn tất thanh toán.',
    },
    {
      icon: Users,
      color: 'rose',
      title: 'Cộng đồng Creator Việt',
      description:
        'Tham gia mạng lưới tác giả chất lượng cao, giao lưu kỹ thuật và nhận hỗ trợ độc quyền từ ban quản trị.',
    },
  ];

  const requirements = [
    'Mã nguồn nguyên bản (Original Work) - Do chính bạn hoặc đội ngũ của bạn phát triển.',
    'Chất lượng đạt chuẩn - Source code sạch, có tài liệu README và hướng dẫn cài đặt cụ thể.',
    'Quyền sở hữu pháp lý - Đảm bảo không vi phạm bản quyền hay nhúng thư viện có phí chưa được cấp phép.',
    'Hỗ trợ khách hàng - Sẵn sàng giải đáp thắc mắc của người mua trong vòng 24 - 48 giờ.',
  ];

  if (!isAuthenticated) {
    return (
      <div className="become-seller-page-modern">
        <div className="seller-landing-container">
          <div className="unauth-hero-card">
            <div className="unauth-icon-wrap">
              <Zap size={32} className="text-primary" />
            </div>
            <h1 className="unauth-title">Trở thành Tác Giả Bán Mã Nguồn trên CodeMart</h1>
            <p className="unauth-subtitle">
              Vui lòng đăng nhập hoặc tạo tài khoản lập trình viên để bắt đầu đăng ký gian hàng bán
              source code của bạn.
            </p>
            <div className="unauth-btn-row">
              <button
                type="button"
                className="btn-unauth primary"
                onClick={() => navigate('/auth/login')}
              >
                Đăng nhập tài khoản
              </button>
              <button
                type="button"
                className="btn-unauth secondary"
                onClick={() => navigate('/auth/register')}
              >
                Đăng ký tài khoản mới
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="become-seller-page-modern">
      <div className="seller-landing-container">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Trở thành Tác giả CodeMart', path: null }]} />

        {/* Hero Section */}
        <section className="creator-hero-banner">
          <div className="creator-hero-copy">
            <div className="creator-pill-tag">
              <Sparkles size={12} />
              <span>Chương trình Đối tác Tác Giả 2025</span>
            </div>
            <h1 className="creator-hero-headline">
              Biến mã nguồn của bạn thành <span className="text-gradient">Thu nhập thụ động</span>{' '}
              bền vững
            </h1>
            <p className="creator-hero-desc">
              Gia nhập sàn giao dịch mã nguồn công nghệ hàng đầu Việt Nam. Nhận hoa hồng tới 80%,
              bàn giao tự động và thanh toán về tài khoản ngân hàng nội địa 24/7.
            </p>
            <div className="creator-stats-ribbon">
              <div className="ribbon-stat-item">
                <strong>15.000+</strong>
                <span>Lập trình viên mua code</span>
              </div>
              <div className="ribbon-divider"></div>
              <div className="ribbon-stat-item">
                <strong>80%</strong>
                <span>Hoa hồng tác giả</span>
              </div>
              <div className="ribbon-divider"></div>
              <div className="ribbon-stat-item">
                <strong>24h</strong>
                <span>Duyệt hồ sơ nhanh</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Creator Benefits Grid */}
        <section className="creator-benefits-section">
          <div className="section-title-center">
            <h2>Quyền lợi độc quyền dành cho Tác giả CodeMart</h2>
            <p>Môi trường bán mã nguồn số minh bạch, an toàn và tối ưu nhất cho nhà phát triển</p>
          </div>

          <div className="benefits-cards-grid">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="benefit-feature-card">
                  <div className={`benefit-icon-box ${b.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="benefit-feature-title">{b.title}</h3>
                  <p className="benefit-feature-desc">{b.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Application Form & Guidelines */}
        <section className="creator-application-section">
          <div className="application-grid-layout">
            {/* Guidelines Card */}
            <div className="guidelines-card">
              <div className="guidelines-head">
                <ShieldCheck size={20} className="text-emerald" />
                <h3>Tiêu chuẩn xét duyệt tác giả</h3>
              </div>
              <ul className="guidelines-list">
                {requirements.map((req, idx) => (
                  <li key={idx} className="guideline-item">
                    <CheckCircle2 size={15} className="text-emerald" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <div className="escrow-note-box">
                <h4>Chính sách bảo hộ Escrow</h4>
                <p>
                  Tiền bán được giữ an toàn tại ví sàn trong 3 ngày để người mua kiểm thử. Sau đó
                  tiền sẽ tự động chuyển vào số dư khả dụng của bạn.
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="application-form-card">
              <div className="form-card-head">
                <UserCheck size={20} className="text-primary" />
                <div>
                  <h3>Đơn đăng ký trở thành Tác giả</h3>
                  <p>Điền thông tin giới thiệu ngắn để chúng tôi kích hoạt gian hàng của bạn</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="creator-form-body">
                <div className="form-field-group">
                  <label className="form-field-label">
                    Tên hiển thị gian hàng / Studio <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Ví dụ: DevMaster Studio hoặc Tên bạn"
                    className="form-input-text"
                    required
                  />
                </div>

                <div className="form-fields-grid-2">
                  <div className="form-field-group">
                    <label className="form-field-label">Loại hình</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="form-select-box"
                    >
                      <option value="individual">Lập trình viên cá nhân (Freelancer)</option>
                      <option value="team">Team / Nhóm phát triển</option>
                      <option value="company">Công ty phần mềm</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Kinh nghiệm phát triển</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="form-select-box"
                    >
                      <option value="1-2 năm">1 - 2 năm</option>
                      <option value="2-4 năm">2 - 4 năm</option>
                      <option value="5+ năm">Trên 5 năm</option>
                    </select>
                  </div>
                </div>

                <div className="form-fields-grid-2">
                  <div className="form-field-group">
                    <label className="form-field-label">Link Portfolio / GitHub</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://github.com/your-username"
                      className="form-input-text"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Website cá nhân / Studio</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.dev"
                      className="form-input-text"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">
                    Giới thiệu ngắn về chuyên môn & loại mã nguồn bạn dự định bán{' '}
                    <span className="required-star">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ví dụ: Tôi chuyên phát triển ứng dụng web React + Laravel, đã có hơn 4 năm kinh nghiệm làm các hệ thống TMĐT và SaaS..."
                    rows={3}
                    className="form-textarea-box"
                    required
                  />
                </div>

                <label className="terms-checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                  />
                  <span>
                    Tôi đồng ý với Quy chế hoạt động đối tác và cam kết chỉ bán mã nguồn do tôi sở
                    hữu bản quyền hợp pháp.
                  </span>
                </label>

                <button
                  type="submit"
                  className="btn-submit-application"
                  disabled={!formData.agreeToTerms}
                >
                  <span>Gửi hồ sơ đăng ký tác giả</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
