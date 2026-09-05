import React from 'react';
import { Lock, ShieldCheck, CheckCircle2, Eye, Database, KeyRound, FileCheck } from 'lucide-react';
import './PolicyPages.css';

const PrivacyPage = () => {
  return (
    <div className="policy-page-modern">
      {/* Hero Banner */}
      <section className="policy-hero-banner">
        <div className="container">
          <div className="policy-hero-content">
            <div className="policy-brand-tag">
              <Lock size={13} />
              <span>Bảo Vệ Dữ Liệu & Quyền Riêng Tư</span>
            </div>
            <h1 className="policy-hero-title">Chính Sách Bảo Mật (Privacy Policy)</h1>
            <p className="policy-hero-subtitle">
              Cập nhật lần cuối: Ngày 28 tháng 08 năm 2026 • Cam kết an toàn thông tin tuyệt đối cho
              khách hàng và tác giả
            </p>
          </div>
        </div>
      </section>

      {/* Main Document */}
      <section className="policy-main-section">
        <div className="container">
          <div className="policy-doc-container">
            <div className="policy-intro-alert-box">
              <ShieldCheck size={24} className="text-primary flex-shrink-0" />
              <p>
                <strong>CodeMart</strong> coi trọng việc bảo vệ quyền riêng tư của bạn. Chính sách
                này giải thích cách thức chúng tôi thu thập, xử lý, mã hóa và bảo vệ dữ liệu cá nhân
                khi bạn tương tác trên nền tảng.
              </p>
            </div>

            {/* Section 1 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <Database size={18} className="text-primary" />
                <span>1. Thông tin chúng tôi thu thập</span>
              </h2>
              <p>
                Chúng tôi chỉ thu thập các thông tin cần thiết phục vụ cho việc vận hành dịch vụ và
                hoàn tất giao dịch:
              </p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Thông tin định danh:</strong> Họ tên, địa chỉ email, số điện thoại và
                    ảnh đại diện khi đăng ký tài khoản.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Thông tin thanh toán:</strong> Mã giao dịch ngân hàng, lịch sử mua hàng,
                    mã License Key được tạo tự động.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, trình duyệt và thiết bị truy
                    cập để ngăn chặn các hành vi gian lận.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <FileCheck size={18} className="text-primary" />
                <span>2. Mục đích sử dụng thông tin</span>
              </h2>
              <p>Dữ liệu của bạn được sử dụng cho các mục đích chính đáng sau:</p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>Cung cấp quyền tải xuống mã nguồn và bàn giao License Key bản quyền.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Vận hành luồng bảo lưu Ký quỹ Escrow 3 ngày và xử lý hoàn tiền khi phát sinh yêu
                    cầu.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Gửi thông báo cập nhật phiên bản mới của mã nguồn từ tác giả bạn đã mua.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Hỗ trợ kỹ thuật và giải quyết các khiếu nại phát sinh trong quá trình sử dụng.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <KeyRound size={18} className="text-primary" />
                <span>3. Tiêu chuẩn An toàn & Mã hóa Giao dịch</span>
              </h2>
              <p>CodeMart áp dụng các tiêu chuẩn bảo mật ngân hàng cao cấp:</p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Mã hóa đường truyền toàn diện với giao thức <strong>SSL/TLS 256-bit</strong>.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Không lưu trữ thông tin thẻ:</strong> Mọi thanh toán qua thẻ quốc tế hay
                    mã QR đều được xử lý trực tiếp qua cổng thanh toán VNPay, VietQR và MoMo đạt
                    chuẩn bảo mật PCI-DSS.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    File mã nguồn được lưu trữ trên hạ tầng Cloud Storage bảo mật cao, chỉ cho phép
                    tải sau khi hoàn tất xác thực quyền sở hữu.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <Eye size={18} className="text-primary" />
                <span>4. Quyền của Người dùng đối với Dữ liệu</span>
              </h2>
              <p>Bạn có toàn quyền kiểm soát dữ liệu cá nhân của mình:</p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>Xem và cập nhật thông tin hồ sơ bất kỳ lúc nào trong trang cá nhân.</span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Yêu cầu trích xuất toàn bộ lịch sử mua hàng và danh sách License Key sở hữu.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Yêu cầu đóng tài khoản và xóa vĩnh viễn dữ liệu cá nhân khỏi hệ thống máy chủ.
                  </span>
                </li>
              </ul>
            </div>

            <div className="policy-doc-footer-note">
              <span>CodeMart Việt Nam • Đơn vị Bảo vệ Dữ liệu Khách hàng</span>
              <span>Email: privacy@codemart.vn</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
