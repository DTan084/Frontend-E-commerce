import React from 'react';
import { Mail, Phone, User, Building2, MapPin, FileText, AlertCircle, Info } from 'lucide-react';
import './BillingForm.css';

const BillingForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="billing-form-modern">
      {/* Primary Delivery & Contact Information */}
      <div className="billing-card-section">
        <div className="section-head-wrap">
          <div className="section-title-line">
            <Mail size={18} className="section-icon text-indigo" />
            <h3 className="section-main-title">Thông tin nhận mã nguồn & License</h3>
          </div>
          <p className="section-sub-desc">
            Vui lòng nhập chính xác email để hệ thống gửi tự động link tải source code và key bản
            quyền.
          </p>
        </div>

        <div className="form-fields-grid">
          {/* Email */}
          <div className="form-field-group full-width highlight-delivery-email">
            <label htmlFor="email" className="form-field-label">
              <span>Email nhận source code</span>
              <span className="field-required-star">*</span>
            </label>
            <div className="input-with-icon-wrap">
              <Mail size={16} className="input-affix-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className={`modern-text-input ${errors?.email ? 'is-invalid' : ''}`}
                required
              />
            </div>
            {errors?.email ? (
              <span className="input-error-text">
                <AlertCircle size={12} />
                <span>{errors.email}</span>
              </span>
            ) : (
              <span className="input-helper-text">
                <Info size={12} />
                <span>
                  Link tải Google Drive / GitHub & License key sẽ gửi về email này ngay khi thanh
                  toán.
                </span>
              </span>
            )}
          </div>

          {/* Full Name */}
          <div className="form-field-group">
            <label htmlFor="fullName" className="form-field-label">
              <span>Họ và tên</span>
              <span className="field-required-star">*</span>
            </label>
            <div className="input-with-icon-wrap">
              <User size={16} className="input-affix-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName || formData.name || ''}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className={`modern-text-input ${errors?.fullName ? 'is-invalid' : ''}`}
                required
              />
            </div>
            {errors?.fullName && (
              <span className="input-error-text">
                <AlertCircle size={12} />
                <span>{errors.fullName}</span>
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-field-group">
            <label htmlFor="phone" className="form-field-label">
              <span>Số điện thoại (Zalo hỗ trợ)</span>
              <span className="field-required-star">*</span>
            </label>
            <div className="input-with-icon-wrap">
              <Phone size={16} className="input-affix-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="0912 345 678"
                className={`modern-text-input ${errors?.phone ? 'is-invalid' : ''}`}
                required
              />
            </div>
            {errors?.phone && (
              <span className="input-error-text">
                <AlertCircle size={12} />
                <span>{errors.phone}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Business / Invoicing Details (Optional) */}
      <div className="billing-card-section">
        <div className="section-head-wrap">
          <div className="section-title-line">
            <Building2 size={18} className="section-icon text-blue" />
            <h3 className="section-main-title">Thông tin doanh nghiệp & Hóa đơn (Tùy chọn)</h3>
          </div>
          <p className="section-sub-desc">
            Điền nếu bạn cần xuất hóa đơn VAT điện tử hoặc đăng ký bản quyền doanh nghiệp.
          </p>
        </div>

        <div className="form-fields-grid">
          {/* Company Name */}
          <div className="form-field-group">
            <label htmlFor="companyName" className="form-field-label">
              <span>Tên công ty / Doanh nghiệp</span>
            </label>
            <div className="input-with-icon-wrap">
              <Building2 size={16} className="input-affix-icon" />
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                placeholder="Công ty TNHH Công Nghệ ABC"
                className="modern-text-input"
              />
            </div>
          </div>

          {/* City / Province */}
          <div className="form-field-group">
            <label htmlFor="city" className="form-field-label">
              <span>Tỉnh / Thành phố</span>
            </label>
            <div className="input-with-icon-wrap">
              <MapPin size={16} className="input-affix-icon" />
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                placeholder="Hà Nội / TP. Hồ Chí Minh / Đà Nẵng..."
                className="modern-text-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Notes */}
      <div className="billing-card-section">
        <div className="section-head-wrap">
          <div className="section-title-line">
            <FileText size={18} className="section-icon text-purple" />
            <h3 className="section-main-title">Ghi chú yêu cầu kỹ thuật</h3>
          </div>
          <p className="section-sub-desc">
            Thêm yêu cầu hỗ trợ cài đặt DB, môi trường Docker, hoặc ghi chú riêng cho tác giả (tùy
            chọn).
          </p>
        </div>

        <div className="form-field-group full-width">
          <textarea
            id="orderNotes"
            name="orderNotes"
            value={formData.orderNotes || ''}
            onChange={handleChange}
            placeholder="Ví dụ: Nhờ tác giả hỗ trợ config Docker Compose và hướng dẫn kết nối MySQL qua UltraView..."
            rows={3}
            className="modern-textarea-input"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
