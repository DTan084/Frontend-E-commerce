import React from 'react';
import { Sparkles, Headphones, ShieldCheck, Coins } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Mã nguồn chất lượng cao',
      description:
        'Tất cả mã nguồn đều được kiểm duyệt cấu trúc, quét bảo mật và tối ưu hóa trước khi xuất bản. Code sạch, tài liệu rõ ràng.',
      color: '#4f46e5',
      bg: 'rgba(79, 70, 229, 0.1)',
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ kỹ thuật 24/7',
      description:
        'Nhận trợ giúp cài đặt và hướng dẫn tích hợp từ tác giả mã nguồn và đội ngũ kỹ thuật CodeMart bất kỳ lúc nào.',
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.1)',
    },
    {
      icon: ShieldCheck,
      title: 'Giao dịch an toàn & minh bạch',
      description:
        'Mọi thanh toán được bảo vệ và xử lý qua cổng bảo mật tiêu chuẩn. Tải link mã nguồn ngay lập tức sau khi thanh toán.',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
    {
      icon: Coins,
      title: 'Chính sách hoàn tiền',
      description:
        'Cam kết hoàn tiền trong trường hợp mã nguồn lỗi kỹ thuật không thể khắc phục hoặc không đúng mô tả cam kết.',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tại sao chọn CodeMart?</h2>
          <p className="section-subtitle">
            Nền tảng mua bán mã nguồn uy tín được hơn 25.000 lập trình viên và doanh nghiệp tin cậy
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div
                  className="feature-icon-wrapper"
                  style={{ backgroundColor: feature.bg, color: feature.color }}
                >
                  <IconComponent size={26} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
