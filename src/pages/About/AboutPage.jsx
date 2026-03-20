import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>Về WebSource</h1>

        <section className="about-section">
          <h2>Chúng tôi là ai?</h2>
          <p>
            Dự án được phát triển bởi <strong>Nguyễn Đình Tân</strong>, với mục tiêu làm một bản
            frontend có giao diện cơ bản, rõ ràng và dễ theo dõi.
          </p>
        </section>

        <section className="mission-section">
          <h2>Sứ mệnh</h2>
          <p>
            WebSource hiện được định hướng là một <strong>sản phẩm frontend</strong> phục vụ học tập
            và demo nghiệp vụ thương mại điện tử. Hiện tại dự án tập trung ở mức UI basic, dùng dữ
            liệu mock để mô phỏng luồng sử dụng chính.
          </p>
        </section>

        <section className="values-section">
          <h2>Giá trị cốt lõi</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>💻 Giao diện cơ bản</h3>
              <p>Bố cục dễ nhìn, thành phần rõ ràng, tập trung vào luồng chính</p>
            </div>
            <div className="value-card">
              <h3>🧩 Frontend tập trung</h3>
              <p>Chủ yếu xử lý phần hiển thị, route và state phía client</p>
            </div>
            <div className="value-card">
              <h3>📱 Dễ dùng</h3>
              <p>Responsive ở mức cần thiết để dùng ổn trên desktop và mobile</p>
            </div>
            <div className="value-card">
              <h3>🔁 Dễ mở rộng</h3>
              <p>Có thể nâng cấp dần và tích hợp backend/API thật ở bước sau</p>
            </div>
          </div>
        </section>

        <section className="why-choose-section">
          <h2>Tại sao chọn WebSource?</h2>
          <div className="reasons-grid">
            <div className="reason-item">
              <span className="reason-icon">✅</span>
              <div>
                <h4>Phù hợp hiện trạng dự án</h4>
                <p>Bám đúng mô hình frontend + mock data hiện đang triển khai</p>
              </div>
            </div>
            <div className="reason-item">
              <span className="reason-icon">🔄</span>
              <div>
                <h4>Luồng UI nhất quán</h4>
                <p>Style và layout được giữ đồng đều ở các trang quan trọng</p>
              </div>
            </div>
            <div className="reason-item">
              <span className="reason-icon">🎓</span>
              <div>
                <h4>Dễ học và demo</h4>
                <p>Phù hợp làm đồ án, portfolio và thử nghiệm giao diện</p>
              </div>
            </div>
            <div className="reason-item">
              <span className="reason-icon">💰</span>
              <div>
                <h4>Sẵn sàng nâng cấp</h4>
                <p>Có thể mở rộng dần sang backend thật mà không phải làm lại từ đầu</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
