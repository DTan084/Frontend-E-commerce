import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'tech_support',
    orderId: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'tech_support',
        orderId: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="contact-page-modern">
      {/* Hero Banner */}
      <section className="contact-hero-banner">
        <div className="container">
          <div className="contact-hero-content">
            <div className="contact-tag-pill">
              <Headphones size={13} />
              <span>Trung Tâm Hỗ Trợ Khách Hàng 24/7</span>
            </div>
            <h1 className="contact-hero-title">Liên hệ & Gửi Yêu cầu Hỗ trợ</h1>
            <p className="contact-hero-subtitle">
              Đội ngũ chuyên gia kỹ thuật và chăm sóc khách hàng CodeMart luôn sẵn sàng hỗ trợ giải
              đáp mọi thắc mắc về mã nguồn, thanh toán Escrow và bản quyền.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-split-grid">
            {/* Left Channels Column */}
            <div className="contact-channels-col">
              <div className="channels-card-box">
                <h2 className="channels-title">Kênh Liên hệ Trực tiếp</h2>
                <p className="channels-sub">
                  Phản hồi nhanh chóng trong vòng 15 - 30 phút làm việc
                </p>

                <div className="channels-list">
                  <div className="channel-item-row">
                    <div className="channel-icon-avatar indigo">
                      <Phone size={18} />
                    </div>
                    <div className="channel-info-text">
                      <span className="channel-lbl">Tổng đài Hỗ trợ Kỹ thuật</span>
                      <strong className="channel-val">1900 6868 (Phím 1)</strong>
                      <small className="channel-note">Hoạt động từ 08:00 - 22:00 hàng ngày</small>
                    </div>
                  </div>

                  <div className="channel-item-row">
                    <div className="channel-icon-avatar emerald">
                      <Mail size={18} />
                    </div>
                    <div className="channel-info-text">
                      <span className="channel-lbl">Email Tiếp nhận Ticket</span>
                      <strong className="channel-val">support@codemart.vn</strong>
                      <small className="channel-note">Hỗ trợ 24/7 bao gồm cuối tuần và lễ</small>
                    </div>
                  </div>

                  <div className="channel-item-row">
                    <div className="channel-icon-avatar blue">
                      <MessageSquare size={18} />
                    </div>
                    <div className="channel-info-text">
                      <span className="channel-lbl">Live Chat Trực tuyến</span>
                      <strong className="channel-val">Chat với Chuyên viên</strong>
                      <small className="channel-note">
                        Nhấn vào biểu tượng chat ở góc phải màn hình
                      </small>
                    </div>
                  </div>

                  <div className="channel-item-row">
                    <div className="channel-icon-avatar purple">
                      <MapPin size={18} />
                    </div>
                    <div className="channel-info-text">
                      <span className="channel-lbl">Văn phòng Công nghệ CodeMart</span>
                      <strong className="channel-val">
                        Tòa nhà Innovation Hub, Q. Cầu Giấy, Hà Nội
                      </strong>
                      <small className="channel-note">
                        Chi nhánh TP.HCM: Q. 1, TP. Hồ Chí Minh
                      </small>
                    </div>
                  </div>
                </div>

                <div className="escrow-assurance-box">
                  <ShieldCheck size={20} className="text-emerald" />
                  <div>
                    <strong>Bảo vệ Quyền lợi Escrow 3 Ngày</strong>
                    <p>
                      Mọi giao dịch mã nguồn đều được bảo lưu thanh toán cho đến khi bạn xác nhận
                      file hoạt động tốt.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Ticket Form */}
            <div className="contact-form-col">
              <div className="ticket-form-card">
                <div className="form-card-header">
                  <h2>Gửi Phiếu Hỗ trợ (Ticket)</h2>
                  <p>Điền đầy đủ thông tin để kỹ thuật viên hỗ trợ bạn chính xác nhất</p>
                </div>

                {isSuccess ? (
                  <div className="ticket-success-alert">
                    <CheckCircle2 size={36} className="text-emerald" />
                    <h3>Gửi Phiếu Hỗ Trợ Thành Công!</h3>
                    <p>
                      Mã ticket <strong>#TK-{Math.floor(100000 + Math.random() * 900000)}</strong>{' '}
                      đã được ghi nhận. Kỹ thuật viên CodeMart sẽ liên hệ lại qua email trong thời
                      gian sớm nhất.
                    </p>
                    <button
                      type="button"
                      className="btn-send-another-ticket"
                      onClick={() => setIsSuccess(false)}
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="ticket-submit-form">
                    <div className="form-fields-row">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Họ và tên <span className="required-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-input-text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ví dụ: Nguyễn Văn An"
                          required
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">
                          Địa chỉ Email <span className="required-star">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-input-text"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="an.nguyen@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-fields-row">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Chủ đề cần hỗ trợ <span className="required-star">*</span>
                        </label>
                        <select
                          name="subject"
                          className="form-select-dropdown"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="tech_support">Hỗ trợ cài đặt & Lỗi mã nguồn</option>
                          <option value="escrow_billing">
                            Tra soát thanh toán & Ký quỹ Escrow
                          </option>
                          <option value="seller_inquiry">Đăng ký trở thành Tác giả bán code</option>
                          <option value="license_dmca">Báo cáo bản quyền tác giả / DMCA</option>
                          <option value="enterprise">Hợp tác doanh nghiệp & B2B</option>
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Mã đơn hàng / License (nếu có)</label>
                        <input
                          type="text"
                          name="orderId"
                          className="form-input-text"
                          value={formData.orderId}
                          onChange={handleChange}
                          placeholder="Ví dụ: ORD-8821 hoặc CM-ECOM-9842"
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">
                        Nội dung chi tiết yêu cầu <span className="required-star">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        className="form-textarea-box"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Mô tả chi tiết vấn đề bạn gặp phải, thông báo lỗi hoặc yêu cầu cụ thể..."
                        required
                      />
                    </div>

                    <button type="submit" className="btn-submit-ticket-cta" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>Đang gửi phiếu...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Gửi Phiếu Hỗ Trợ Ngay</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
