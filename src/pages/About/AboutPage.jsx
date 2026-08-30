import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Award,
  Users,
  Code2,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const stats = [
    { value: '15.000+', label: 'Lập trình viên & Doanh nghiệp', subtext: 'Tin cậy sử dụng' },
    { value: '1.450+', label: 'Mã nguồn đã kiểm duyệt', subtext: 'Đầy đủ tài liệu & demo' },
    { value: '99.8%', label: 'Giao dịch bảo vệ thành công', subtext: 'Qua hệ thống Escrow' },
    { value: '24/7', label: 'Hỗ trợ kỹ thuật chuyên sâu', subtext: 'Từ đội ngũ chuyên gia' },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Kiểm duyệt An toàn 100%',
      desc: 'Mọi source code đều trải qua quy trình quét tự động và đối soát mã độc trước khi phát hành lên sàn.',
      color: 'emerald',
    },
    {
      icon: Lock,
      title: 'Bảo vệ Ký quỹ Escrow 3 Ngày',
      desc: 'Khoản thanh toán được CodeMart tạm giữ an toàn 3 ngày cho đến khi khách hàng kiểm tra mã nguồn hoàn tất.',
      color: 'indigo',
    },
    {
      icon: Award,
      title: 'Bản quyền & License Minh bạch',
      desc: 'Mỗi giao dịch cấp License Key định danh duy nhất, cam kết pháp lý quyền tác giả và quyền thương mại.',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Cộng đồng Tác giả Verified',
      desc: 'Quy tụ hơn 1.200 chuyên gia, studio phần mềm và kỹ sư công nghệ hàng đầu Việt Nam.',
      color: 'purple',
    },
  ];

  const techStack = [
    { name: 'React / Next.js', count: '450+ mã nguồn' },
    { name: 'Vue.js / Nuxt', count: '280+ mã nguồn' },
    { name: 'Flutter / React Native', count: '320+ ứng dụng' },
    { name: 'Spring Boot / Java', count: '210+ backend API' },
    { name: 'Node.js / NestJS', count: '290+ microservices' },
    { name: 'Laravel / PHP', count: '380+ hệ thống web' },
  ];

  return (
    <div className="about-page-modern">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-brand-tag">
              <Sparkles size={14} />
              <span>Nền Tảng Công Nghệ Số Hàng Đầu</span>
            </div>
            <h1 className="about-hero-title">
              Kiến tạo Sàn Thương mại Điện tử Mã nguồn & Giấy phép Số Hiện đại
            </h1>
            <p className="about-hero-subtitle">
              CodeMart kết nối cộng đồng lập trình viên tài năng với các doanh nghiệp, startup và
              nhà sáng tạo, cung cấp các giải pháp phần mềm hoàn chỉnh, an toàn và tối ưu thời gian
              ra mắt sản phẩm.
            </p>
            <div className="about-hero-actions">
              <Link to="/products" className="btn-about-primary">
                <span>Khám phá Kho Mã Nguồn</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/become-seller" className="btn-about-secondary">
                <span>Trở thành Tác giả Bán Code</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="about-stats-section">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((item, idx) => (
              <div key={idx} className="about-stat-box">
                <h3 className="about-stat-num">{item.value}</h3>
                <span className="about-stat-lbl">{item.label}</span>
                <small className="about-stat-sub">{item.subtext}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="section-head-center">
            <span className="section-pre-title">Giá Trị Cốt Lõi</span>
            <h2 className="section-main-title">4 Trụ Cột Đảm Bảo Sự Tin Cậy Tuyệt Đối</h2>
            <p className="section-desc-txt">
              CodeMart được xây dựng dựa trên tiêu chuẩn kỹ thuật nghiêm ngặt và trải nghiệm người
              dùng vượt trội
            </p>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className={`pillar-card ${p.color}`}>
                  <div className={`pillar-icon-box ${p.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Story Split */}
      <section className="about-story-section">
        <div className="container">
          <div className="about-story-split">
            <div className="story-content-col">
              <div className="story-tag-pill">
                <Code2 size={13} />
                <span>Câu Chuyện Phát Triển</span>
              </div>
              <h2 className="story-heading">
                Rút ngắn thời gian phát triển phần mềm từ vài tháng xuống vài ngày
              </h2>
              <p className="story-paragraph">
                Được sáng lập với tầm nhìn giải phóng sức lao động sáng tạo cho giới kỹ sư phần mềm,{' '}
                <strong>CodeMart</strong> giải quyết bài toán lãng phí tài nguyên khi hàng ngàn lập
                trình viên phải viết lại từ đầu những chức năng nền tảng cơ bản.
              </p>
              <p className="story-paragraph">
                Tại CodeMart, bạn có thể tìm thấy toàn bộ hệ sinh thái mã nguồn: từ SaaS
                Boilerplate, sàn thương mại điện tử, ứng dụng di động Flutter, đến hệ thống Backend
                Microservices đạt chuẩn Production-ready.
              </p>

              <div className="story-bullet-points">
                <div className="bullet-row">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Tiết kiệm tới 80% chi phí và thời gian lập trình ban đầu</span>
                </div>
                <div className="bullet-row">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Mã nguồn sạch, có tài liệu hướng dẫn cấu hình từng bước</span>
                </div>
                <div className="bullet-row">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>Bản quyền và License minh bạch, hỗ trợ nâng cấp trọn đời</span>
                </div>
              </div>
            </div>

            <div className="story-visual-card">
              <div className="tech-ecosystem-card">
                <div className="tech-eco-head">
                  <Cpu size={20} className="text-primary" />
                  <h4>Hệ Sinh Thái Công Nghệ</h4>
                </div>
                <div className="tech-stack-list">
                  {techStack.map((tech, idx) => (
                    <div key={idx} className="tech-stack-row">
                      <div className="tech-dot-indicator"></div>
                      <span className="tech-stack-name">{tech.name}</span>
                      <span className="tech-stack-count">{tech.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-banner">
            <div className="cta-copy">
              <h2>Sẵn sàng đẩy nhanh tiến độ dự án của bạn?</h2>
              <p>
                Khám phá hơn 1.450+ mã nguồn chất lượng cao hoặc kiếm thêm thu nhập từ việc bán
                source code của bạn.
              </p>
            </div>
            <div className="cta-buttons-wrap">
              <Link to="/products" className="btn-cta-white">
                <span>Duyệt Mã Nguồn Ngay</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-cta-outline">
                <HelpCircle size={15} />
                <span>Liên Hệ Tư Vấn</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
