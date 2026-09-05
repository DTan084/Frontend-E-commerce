import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  Key,
  Copy,
  Check,
  Mail,
  FileCode2,
  ArrowRight,
  Home,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { ordersDataService } from '../../services/data';
import { ROUTE_PATHS } from '../../routes/paths';
import { SUPPORT } from '../../config';
import './CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData || {};
  const [copiedId, setCopiedId] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const {
    orderId = 'ORD-' + Date.now().toString().slice(-8),
    total = 0,
    items = [],
    formData = {},
    paymentMethod = 'vnpay',
  } = orderData;

  const email = formData.email || 'user@example.com';
  const fullName = formData.fullName || 'Khách hàng';

  const paymentMethodNames = {
    vnpay: 'VNPAY QR & Thẻ ATM Nội Địa',
    momo: 'Ví Điện Tử MoMo',
    bank: 'Chuyển Khoản Ngân Hàng (VietQR)',
    card: 'Thẻ Quốc Tế (Visa / Mastercard)',
  };

  // Generate mock license key for each purchased item
  const itemsWithLicenses = items.map((item, idx) => ({
    ...item,
    licenseKey:
      `CM-${(item.id || 100) * 897}-${orderId.replace('ORD-', '')}-${idx + 1}`.toUpperCase(),
  }));

  // Create order in data store
  useEffect(() => {
    const orderCreatedKey = `order_created_${orderId}`;
    const alreadyCreated = sessionStorage.getItem(orderCreatedKey);

    if (items.length > 0 && !alreadyCreated) {
      ordersDataService
        .create(items, formData)
        .then(() => {
          sessionStorage.setItem(orderCreatedKey, 'true');
        })
        .catch(() => {});
    }
  }, [orderId, items, formData]);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyLicenseKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="checkout-success-page-modern">
      <div className="success-container-inner">
        {/* Celebration Header */}
        <div className="success-celebration-hero">
          <div className="success-badge-halo">
            <CheckCircle2 size={44} className="emerald-check-icon" />
          </div>

          <h1 className="success-main-heading">Thanh toán thành công!</h1>
          <p className="success-sub-heading">
            Cảm ơn bạn, <strong>{fullName}</strong>! Đơn hàng mã nguồn của bạn đã được xác thực hoàn
            tất.
          </p>

          <div className="order-id-pill-wrap">
            <span className="order-id-label">Mã đơn hàng:</span>
            <span className="order-id-code">#{orderId}</span>
            <button
              type="button"
              className="btn-copy-id"
              onClick={handleCopyOrderId}
              title="Sao chép mã đơn"
            >
              {copiedId ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copiedId ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Success Layout */}
        <div className="success-grid-layout">
          {/* Left: Purchased Products & Immediate Downloads */}
          <div className="success-products-col">
            <div className="success-card-panel">
              <div className="panel-header-row">
                <FileCode2 size={18} className="text-indigo" />
                <h3 className="panel-title">Mã nguồn & License đã kích hoạt</h3>
              </div>

              <div className="purchased-items-list">
                {itemsWithLicenses.map((item, idx) => (
                  <div key={idx} className="purchased-product-card">
                    <div className="purchased-thumb-wrap">
                      <img
                        src={item.image_url || item.image || '/placeholder-product.png'}
                        alt={item.title || item.name}
                        className="purchased-thumb-img"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400';
                        }}
                      />
                    </div>

                    <div className="purchased-details-wrap">
                      <h4 className="purchased-item-title">{item.title || item.name}</h4>
                      <div className="license-box-strip">
                        <div className="license-key-info">
                          <Key size={13} className="text-indigo" />
                          <span className="license-label">License:</span>
                          <code className="license-code">{item.licenseKey}</code>
                        </div>
                        <button
                          type="button"
                          className="btn-copy-license"
                          onClick={() => handleCopyLicenseKey(item.licenseKey)}
                          title="Sao chép License Key"
                        >
                          {copiedKey === item.licenseKey ? (
                            <Check size={12} className="text-emerald" />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="purchased-actions-wrap">
                      <a
                        href={item.downloadUrl || '#download'}
                        className="btn-instant-download-action"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(
                            `Đang chuẩn bị gói source code .ZIP cho [${item.title || item.name}]. Tải xuống sẽ bắt đầu ngay!`
                          );
                        }}
                      >
                        <Download size={15} />
                        <span>Tải mã nguồn (.ZIP)</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="success-card-panel">
              <div className="panel-header-row">
                <ShieldCheck size={18} className="text-emerald" />
                <h3 className="panel-title">Hướng dẫn tiếp theo</h3>
              </div>

              <div className="next-steps-timeline">
                <div className="timeline-step-item">
                  <div className="timeline-icon-wrap emerald">
                    <Mail size={16} />
                  </div>
                  <div className="timeline-content">
                    <h5 className="step-title">Kiểm tra Email nhận hàng</h5>
                    <p className="step-desc">
                      Hóa đơn điện tử, link tải Google Drive dự phòng và License Key đã được gửi đến{' '}
                      <strong>{email}</strong>.
                    </p>
                  </div>
                </div>

                <div className="timeline-step-item">
                  <div className="timeline-icon-wrap indigo">
                    <Key size={16} />
                  </div>
                  <div className="timeline-content">
                    <h5 className="step-title">Kích hoạt License & Cài đặt</h5>
                    <p className="step-desc">
                      Giải nén file ZIP, đọc file <code>README.md</code> đính kèm và điền License
                      Key vào file cấu hình môi trường <code>.env</code>.
                    </p>
                  </div>
                </div>

                <div className="timeline-step-item">
                  <div className="timeline-icon-wrap purple">
                    <Headphones size={16} />
                  </div>
                  <div className="timeline-content">
                    <h5 className="step-title">Hỗ trợ kỹ thuật 1-1</h5>
                    <p className="step-desc">
                      Nếu gặp khó khăn trong quá trình build hoặc kết nối Database, liên hệ ngay với
                      tác giả hoặc đội ngũ kỹ thuật CodeMart.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary Details & Quick Navigation */}
          <div className="success-sidebar-col">
            {/* Transaction Receipt Card */}
            <div className="success-card-panel summary-receipt-panel">
              <h3 className="receipt-title">Chi tiết thanh toán</h3>

              <div className="receipt-rows-list">
                <div className="receipt-row">
                  <span className="receipt-label">Email người nhận:</span>
                  <span className="receipt-val">{email}</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Phương thức:</span>
                  <span className="receipt-val">
                    {paymentMethodNames[paymentMethod] || 'Chuyển khoản / Cổng thanh toán'}
                  </span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Trạng thái:</span>
                  <span className="receipt-val status-paid">Đã thanh toán (Thành công)</span>
                </div>
                <div className="receipt-row">
                  <span className="receipt-label">Thời gian:</span>
                  <span className="receipt-val">
                    {new Date().toLocaleDateString('vi-VN')}{' '}
                    {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="receipt-divider"></div>

                <div className="receipt-row total-highlight">
                  <span className="total-title">Tổng số tiền:</span>
                  <span className="total-amount-val">{Number(total).toLocaleString('vi-VN')}₫</span>
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="success-nav-actions-card">
              <button
                type="button"
                className="btn-success-primary-nav"
                onClick={() => navigate(`/${ROUTE_PATHS.USER.ORDERS}`)}
              >
                <span>Xem đơn hàng của tôi</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-success-secondary-nav"
                onClick={() => navigate(ROUTE_PATHS.ROOT)}
              >
                <Home size={16} />
                <span>Về trang chủ</span>
              </button>
            </div>

            {/* Support Callout */}
            <div className="success-support-callout">
              <Headphones size={18} className="text-indigo" />
              <p className="callout-text">
                Cần trợ giúp cài đặt? Liên hệ hỗ trợ kỹ thuật qua Hotline{' '}
                <a href={SUPPORT.PHONE_HREF}>{SUPPORT.PHONE}</a> hoặc Email{' '}
                <a href={`mailto:${SUPPORT.EMAIL}`}>{SUPPORT.EMAIL}</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
