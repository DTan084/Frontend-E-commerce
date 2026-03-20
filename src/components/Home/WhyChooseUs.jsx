import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: '✨',
      title: 'Mã nguồn chất lượng cao',
      description: 'Tất cả mã nguồn đều được kiểm duyệt, kiểm tra và tối ưu hóa bởi các chuyên gia. Mã sạch, có tài liệu rõ ràng và sẵn sàng sử dụng.',
      color: '#667eea'
    },
    {
      icon: '⚡',
      title: 'Hỗ trợ nhanh 24/7',
      description: 'Nhận trợ giúp ngay lập tức từ đội ngũ hỗ trợ tận tâm bất cứ lúc nào. Vấn đề kỹ thuật, yêu cầu tùy chỉnh hay câu hỏi - chúng tôi luôn sẵn sàng hỗ trợ.',
      color: '#f093fb'
    },
    {
      icon: '🔐',
      title: 'Mã nguồn an toàn và đáng tin cậy',
      description: 'Bảo mật là ưu tiên hàng đầu. Mọi mã nguồn tuân theo thực hành tốt nhất trong ngành để đảm bảo độ tin cậy và an toàn cho ứng dụng.',
      color: '#e4da48ff'
    },
    {
      icon: '💎',
      title: 'Bảo hành hoàn tiền',
      description: 'Đảm bảo hài lòng 100% hoặc hoàn tiền trong vòng 30 ngày. Không cần lý do. Chúng tôi cam kết về chất lượng mọi sản phẩm.',
      color: '#f5576c'
    }
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
          <p className="section-subtitle">
            Tham gia cùng hàng nghìn lập trình viên hài lòng tin tưởng chúng tôi về mã nguồn cao cấp và dịch vụ xuất sắc
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon-wrapper">
                <div
                  className="feature-icon"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}
                >
                  <span className="icon-emoji">{feature.icon}</span>
                </div>
                <div className="icon-glow" style={{ background: feature.color }}></div>
              </div>

              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>

              <div className="feature-badge">
                <span className="badge-text">Được hơn 25.000 lập trình viên tin tưởng</span>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default WhyChooseUs;
