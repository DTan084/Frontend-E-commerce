import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Clock, RotateCcw } from 'lucide-react';
import './PolicyPages.css';

const RefundPage = () => {
  return (
    <div className="policy-page-modern">
      {/* Hero Banner */}
      <section className="policy-hero-banner">
        <div className="container">
          <div className="policy-hero-content">
            <div className="policy-brand-tag">
              <RotateCcw size={13} />
              <span>Chính Sách Bảo Vệ Quyền Lợi Khách Hàng</span>
            </div>
            <h1 className="policy-hero-title">Chính Sách Hoàn Tiền & Ký Quỹ Escrow</h1>
            <p className="policy-hero-subtitle">
              Cập nhật lần cuối: Ngày 28 tháng 08 năm 2026 • Cam kết hoàn tiền 100% trong 72 giờ bảo
              lưu Escrow nếu mã nguồn lỗi
            </p>
          </div>
        </div>
      </section>

      {/* Main Document */}
      <section className="policy-main-section">
        <div className="container">
          <div className="policy-doc-container">
            <div className="policy-intro-alert-box">
              <ShieldCheck size={24} className="text-emerald flex-shrink-0" />
              <p>
                Tại <strong>CodeMart</strong>, 100% giao dịch mã nguồn đều được bảo vệ bởi cơ chế{' '}
                <strong>Ký quỹ Escrow 3 ngày (72 giờ)</strong>. Khoản thanh toán chỉ được chuyển cho
                Tác giả khi bạn đã kiểm tra và hài lòng với chất lượng mã nguồn nhận được.
              </p>
            </div>

            {/* Section 1 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>1. Các trường hợp được CHẤP THUẬN hoàn tiền 100%</span>
              </h2>
              <p>
                Bạn có quyền yêu cầu hoàn lại toàn bộ số tiền thanh toán trong vòng 72 giờ kể từ khi
                mua nếu thuộc một trong các trường hợp sau:
              </p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>File bị lỗi hoặc thiếu tệp cốt lõi:</strong> Tệp .ZIP tải về bị lỗi giải
                    nén, thiếu file source code chính, hoặc không thể cài đặt theo hướng dẫn README.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Không đúng mô tả:</strong> Tính năng thực tế của mã nguồn khác biệt lớn
                    so với mô tả, video demo hoặc ảnh chụp màn hình do tác giả cung cấp.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Tác giả không hỗ trợ trong 48 giờ:</strong> Khi bạn báo lỗi nghiêm trọng
                    không thể chạy được dự án và tác giả không phản hồi khắc phục sau 48 giờ làm
                    việc.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-emerald flex-shrink-0" />
                  <span>
                    <strong>Vi phạm bảo mật / Bản quyền:</strong> Mã nguồn bị phát hiện chứa mã độc,
                    backdoor hoặc vi phạm bản quyền sở hữu trí tuệ đã được xác thực.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <XCircle size={18} className="text-danger" />
                <span>2. Các trường hợp KHÔNG ĐƯỢC áp dụng hoàn tiền</span>
              </h2>
              <p>Yêu cầu hoàn tiền sẽ bị từ chối trong các trường hợp sau:</p>
              <ul className="policy-checklist">
                <li>
                  <XCircle size={15} className="text-danger flex-shrink-0" />
                  <span>
                    <strong>Quá thời hạn Escrow 3 ngày:</strong> Đơn hàng đã quá 72 giờ kể từ khi
                    thanh toán thành công và tiền đã được giải ngân cho Tác giả.
                  </span>
                </li>
                <li>
                  <XCircle size={15} className="text-danger flex-shrink-0" />
                  <span>
                    <strong>Thay đổi ý định cá nhân:</strong> Bạn đổi ý không muốn làm dự án nữa sau
                    khi đã tải thành công mã nguồn về máy tính.
                  </span>
                </li>
                <li>
                  <XCircle size={15} className="text-danger flex-shrink-0" />
                  <span>
                    <strong>Thiếu môi trường hoặc kiến thức kỹ thuật cơ bản:</strong> Mã nguồn hoạt
                    động bình thường nhưng bạn chưa cài đặt Node.js/PHP/Java/Docker theo đúng cấu
                    hình yêu cầu đã nêu rõ trong phần mô tả sản phẩm.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="policy-doc-section">
              <h2 className="policy-section-heading">
                <Clock size={18} className="text-primary" />
                <span>3. Quy trình 4 bước Hoàn tiền Escrow</span>
              </h2>
              <p>Quy trình xử lý hoàn tiền được thực hiện hoàn toàn tự động và minh bạch:</p>
              <ul className="policy-checklist">
                <li>
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span>
                    <strong>Bước 1 - Gửi yêu cầu:</strong> Vào mục <em>"Mã nguồn đã mua"</em> &rarr;
                    Chọn đơn hàng &rarr; Nhấn <em>"Yêu cầu Hoàn tiền Escrow"</em> và mô tả lỗi kèm
                    ảnh/video.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span>
                    <strong>Bước 2 - Tác giả đối soát:</strong> Tác giả có 24h để hỗ trợ khắc phục
                    hoặc xác nhận đồng ý hoàn tiền.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span>
                    <strong>Bước 3 - Kiểm tra độc lập:</strong> Nếu tác giả không phản hồi, kỹ thuật
                    viên CodeMart sẽ trực tiếp chạy thử mã nguồn để thẩm định.
                  </span>
                </li>
                <li>
                  <CheckCircle2 size={15} className="text-primary flex-shrink-0" />
                  <span>
                    <strong>Bước 4 - Hoàn trả tiền:</strong> Sau khi chấp thuận, tiền được hoàn 100%
                    về tài khoản ngân hàng hoặc ví điện tử của bạn trong vòng 24 - 48 giờ làm việc.
                  </span>
                </li>
              </ul>
            </div>

            <div className="policy-doc-footer-note">
              <span>CodeMart Việt Nam • Bộ phận Giải quyết Tranh chấp Escrow</span>
              <span>Email: refund@codemart.vn</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPage;
