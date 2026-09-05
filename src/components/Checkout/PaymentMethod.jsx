import React, { useState } from 'react';
import { QrCode, Smartphone, Building2, CreditCard, Lock, ShieldCheck, Check } from 'lucide-react';
import './PaymentMethod.css';

const PaymentMethod = ({ selectedMethod, setSelectedMethod, cardDetails, setCardDetails }) => {
  const [activeMethod, setActiveMethod] = useState(selectedMethod || 'vnpay');

  const methods = [
    {
      id: 'vnpay',
      name: 'VNPAY QR & ATM Nội Địa',
      desc: 'Quét mã VNPAY QR bằng App ngân hàng (VCB, MB, BIDV, Techcombank...)',
      icon: QrCode,
      badge: 'Khuyên dùng',
      color: '#005baa',
    },
    {
      id: 'momo',
      name: 'Ví Điện Tử MoMo',
      desc: 'Thanh toán siêu tốc 1 chạm qua ứng dụng MoMo',
      icon: Smartphone,
      badge: 'Tức thì',
      color: '#a50064',
    },
    {
      id: 'bank',
      name: 'Chuyển Khoản Ngân Hàng (VietQR)',
      desc: 'Chuyển khoản nhanh 24/7, hệ thống kích hoạt License tự động sau 30s',
      icon: Building2,
      badge: 'Phí 0đ',
      color: '#059669',
    },
    {
      id: 'card',
      name: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
      desc: 'Thanh toán bảo mật chuẩn quốc tế PCI-DSS',
      icon: CreditCard,
      badge: null,
      color: '#4f46e5',
    },
  ];

  const handleSelect = (id) => {
    setActiveMethod(id);
    setSelectedMethod(id);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;

    if (name === 'cardNumber') {
      formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    } else if (name === 'expiry') {
      formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substr(0, 5);
    } else if (name === 'cvv') {
      formatted = value.replace(/\D/g, '').substr(0, 4);
    }

    setCardDetails((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };

  return (
    <div className="payment-method-modern">
      {/* Section Header */}
      <div className="payment-card-head">
        <div className="head-title-row">
          <CreditCard size={18} className="text-indigo" />
          <h3 className="payment-main-title">Phương thức thanh toán</h3>
        </div>
        <p className="payment-sub-desc">
          Tất cả giao dịch đều được mã hóa 256-bit SSL và bảo vệ bởi chính sách Escrow CodeMart.
        </p>
      </div>

      {/* Methods List */}
      <div className="payment-methods-grid">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = activeMethod === method.id;

          return (
            <div
              key={method.id}
              className={`payment-option-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => handleSelect(method.id)}
            >
              <div className="option-radio-visual">
                {isSelected && <span className="radio-dot"></span>}
              </div>

              <div className="option-icon-wrap" style={{ color: method.color }}>
                <Icon size={20} />
              </div>

              <div className="option-info-wrap">
                <div className="option-name-row">
                  <span className="option-name-text">{method.name}</span>
                  {method.badge && <span className="option-badge-tag">{method.badge}</span>}
                </div>
                <p className="option-desc-text">{method.desc}</p>
              </div>

              {isSelected && (
                <div className="option-check-pill">
                  <Check size={13} strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Conditional Sub-panel based on selection */}
      {activeMethod === 'bank' && (
        <div className="payment-guide-box bank-guide">
          <div className="guide-title-row">
            <Building2 size={16} />
            <span>Thông tin chuyển khoản tự động (VietQR)</span>
          </div>
          <p className="guide-desc">
            Sau khi bấm <strong>"Xác nhận đặt hàng"</strong>, hệ thống sẽ hiển thị mã QR VietQR có
            sẵn nội dung chuyển khoản. Bạn chỉ cần quét mã để chuyển khoản chính xác, License sẽ
            được cấp sau 30 giây!
          </p>
        </div>
      )}

      {activeMethod === 'card' && (
        <div className="payment-card-input-panel">
          <div className="card-panel-head">
            <Lock size={15} />
            <span>Nhập thông tin thẻ quốc tế an toàn</span>
          </div>

          <div className="card-fields-grid">
            <div className="card-field-group full">
              <label className="card-label">Số thẻ tín dụng / Ghi nợ *</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails?.cardNumber || ''}
                onChange={handleCardChange}
                placeholder="4111 2222 3333 4444"
                maxLength="19"
                className="card-text-input"
              />
            </div>

            <div className="card-field-group full">
              <label className="card-label">Tên chủ thẻ (In trên thẻ) *</label>
              <input
                type="text"
                name="cardName"
                value={cardDetails?.cardName || ''}
                onChange={handleCardChange}
                placeholder="NGUYEN VAN A"
                className="card-text-input uppercase"
              />
            </div>

            <div className="card-field-group">
              <label className="card-label">Hạn dùng (MM/YY) *</label>
              <input
                type="text"
                name="expiry"
                value={cardDetails?.expiry || ''}
                onChange={handleCardChange}
                placeholder="12/28"
                maxLength="5"
                className="card-text-input"
              />
            </div>

            <div className="card-field-group">
              <label className="card-label">Mã bảo mật CVV *</label>
              <input
                type="password"
                name="cvv"
                value={cardDetails?.cvv || ''}
                onChange={handleCardChange}
                placeholder="•••"
                maxLength="4"
                className="card-text-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Security Note Footer */}
      <div className="payment-security-note-strip">
        <ShieldCheck size={15} className="text-emerald" />
        <span>Giao dịch an toàn • Cam kết hoàn tiền 100% nếu mã nguồn không đúng mô tả</span>
      </div>
    </div>
  );
};

export default PaymentMethod;
