import React from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Award,
  AlertTriangle,
  Scale,
} from 'lucide-react';
import './PolicyPages.css';

const TermsPage = () => {
  return (
    <div className="policy-page-modern">
      {/* Hero Banner */}
      <section className="policy-hero-banner">
        <div className="container">
          <div className="policy-hero-content">
            <div className="policy-brand-tag">
              <Scale size={13} />
              <span>Khung Pháp Lý & Quy Định Sàn</span>
            </div>
            <h1 className="policy-hero-title">Điều Khoản Dịch Vụ (Terms of Service)</h1>
            <p className="policy-hero-subtitle">
              Cập nhật lần cuối: Ngày 28 tháng 08 năm 2026 • Áp dụng cho mọi người dùng và tác giả
              trên CodeMart
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
                Chào mừng bạn đến với <strong>CodeMart</strong>. Khi đăng ký tài khoản, mua hoặc bán
                mã nguồn trên nền tảng, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ các
                điều khoản và quy chế hoạt động dưới đây.
              </p>
            </div>

            {/* Section 1 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <FileText size={18} className="text-primary" />
                <span>1. Định nghĩa & Phạm vi áp dụng</span>
              </h2>
              <p>
                CodeMart là nền tảng thương mại điện tử trung gian cung cấp giải pháp phân phối mã
                nguồn phần mềm, mẫu giao diện, API và giấy phép bản quyền số giữa{' '}
                <strong>Tác giả (Seller)</strong> và <strong>Khách hàng (Buyer)</strong>.
              </p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Khách hàng (Buyer):</strong> Cá nhân hoặc tổ chức mua giấy phép sử dụng
                    mã nguồn trên CodeMart.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Tác giả (Seller):</strong> Nhà phát triển phần mềm đã được CodeMart xác
                    thực hồ sơ và cấp quyền mở gian hàng.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <Lock size={18} className="text-primary" />
                <span>2. Tài khoản & Trách nhiệm Bảo mật</span>
              </h2>
              <p>
                Người dùng chịu hoàn toàn trách nhiệm bảo mật thông tin đăng nhập, mật khẩu và mọi
                hoạt động phát sinh từ tài khoản của mình:
              </p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Cung cấp thông tin chính xác khi đăng ký tài khoản và hoàn tất định danh nếu là
                    Tác giả bán code.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Không chia sẻ tài khoản cho bên thứ ba hoặc sử dụng tài khoản với mục đích tấn
                    công, quét dữ liệu trái phép (crawling/scraping).
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <Award size={18} className="text-primary" />
                <span>3. Giấy phép Bản quyền (License) & Quyền Sở hữu</span>
              </h2>
              <p>
                Mọi giao dịch trên CodeMart là việc cấp{' '}
                <strong>Giấy phép sử dụng phần mềm (License)</strong>, quyền sở hữu trí tuệ gốc vẫn
                thuộc về Tác giả:
              </p>
              <h3 className="policy-sub-heading">3.1. Standard License (Giấy phép Tiêu chuẩn)</h3>
              <p>
                Cho phép người mua tùy biến và triển khai mã nguồn trên{' '}
                <strong>01 sản phẩm / domain thương mại duy nhất</strong> hoặc phục vụ mục đích học
                tập cá nhân. Nghiêm cấm phân phối lại nguyên trạng mã nguồn.
              </p>

              <h3 className="policy-sub-heading">3.2. Extended License (Giấy phép Mở rộng)</h3>
              <p>
                Cho phép người mua tích hợp mã nguồn vào sản phẩm SaaS tính phí người dùng cuối hoặc
                bàn giao cho nhiều khách hàng trong các dự án gia công phần mềm.
              </p>
            </div>

            {/* Section 4 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <ShieldCheck size={18} className="text-primary" />
                <span>4. Cơ chế Ký quỹ Escrow & Chính sách Thanh toán</span>
              </h2>
              <p>
                Để bảo vệ quyền lợi người mua và người bán, CodeMart áp dụng cơ chế{' '}
                <strong>Ký quỹ Escrow 3 ngày</strong> cho 100% đơn hàng:
              </p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Tiền thanh toán được giữ an toàn tại hệ thống Escrow trong vòng 72 giờ kể từ khi
                    mua.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    CodeMart thu <strong>20% phí nền tảng</strong> trên mỗi giao dịch thành công để
                    vận hành hệ thống kiểm duyệt và hỗ trợ khách hàng.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Tác giả nhận <strong>80% doanh thu thuần</strong> và có thể rút về tài khoản
                    ngân hàng ngay khi đơn hàng hoàn tất thời hạn Escrow.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <AlertTriangle size={18} className="text-primary" />
                <span>5. Cam kết Chất lượng & Nghiêm cấm Vi phạm</span>
              </h2>
              <p>Tác giả tải mã nguồn lên sàn cam kết:</p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Mã nguồn hoàn toàn thuộc quyền sở hữu hợp pháp hoặc tuân thủ đúng giấy phép
                    Open-Source (MIT, Apache, GPL).
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    Tuyệt đối không chứa backdoor, virus, trojan, mã độc đào coin hoặc hành vi đánh
                    cắp dữ liệu người dùng. Mọi hành vi vi phạm sẽ bị khóa tài khoản vĩnh viễn và xử
                    lý theo quy định pháp luật.
                  </span>
                </li>
              </ul>
            </div>

            <div className="policy-doc-footer-note">
              <span>CodeMart Việt Nam • Bộ phận Pháp chế & Tuân thủ</span>
              <span>Email: legal@codemart.vn</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
