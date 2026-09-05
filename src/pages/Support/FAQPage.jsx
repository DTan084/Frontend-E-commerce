import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  ShoppingBag,
  Lock,
  Award,
  Store,
  Headphones,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './FAQPage.css';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQId, setOpenFAQId] = useState(1);

  const categories = [
    { id: 'all', name: 'Tất cả câu hỏi', icon: HelpCircle },
    { id: 'purchase', name: 'Mua & Tải mã nguồn', icon: ShoppingBag },
    { id: 'escrow', name: 'Ký quỹ Escrow & Bảo vệ', icon: Lock },
    { id: 'license', name: 'Giấy phép Bản quyền (License)', icon: Award },
    { id: 'seller', name: 'Bán Code & Hoa hồng 20%', icon: Store },
    { id: 'support', name: 'Hỗ trợ Kỹ thuật', icon: Headphones },
  ];

  const faqData = [
    {
      id: 1,
      category: 'purchase',
      question: 'Sau khi thanh toán thành công, tôi có thể tải mã nguồn ở đâu?',
      answer:
        'Ngay sau khi giao dịch được xác nhận (qua VietQR, VNPay, MoMo hoặc Thẻ quốc tế), bạn có thể truy cập mục "Mã nguồn đã mua" trong trang cá nhân để tải trực tiếp file .ZIP bản quyền và nhận License Key kích hoạt ngay lập tức.',
    },
    {
      id: 2,
      category: 'purchase',
      question: 'Tôi có thể tải lại mã nguồn bao nhiêu lần sau khi mua?',
      answer:
        'Không giới hạn số lần tải! Mã nguồn bạn đã mua sẽ được lưu trữ vĩnh viễn trong tài khoản CodeMart của bạn, kèm theo quyền tải xuống các bản cập nhật sửa lỗi miễn phí trong tương lai từ tác giả.',
    },
    {
      id: 3,
      category: 'escrow',
      question: 'Cơ chế Ký quỹ Escrow 3 ngày bảo vệ người mua như thế nào?',
      answer:
        'Khi bạn thanh toán, số tiền được hệ thống Escrow CodeMart bảo lưu an toàn trong 3 ngày. Trong thời gian này, bạn kiểm tra mã nguồn xem có khớp với mô tả và có lỗi gì không. Nếu file bị lỗi nghiêm trọng hoặc thiếu file mà tác giả không hỗ trợ trong 48h, bạn có quyền yêu cầu hoàn tiền 100%.',
    },
    {
      id: 4,
      category: 'escrow',
      question: 'Quy trình yêu cầu hoàn tiền diễn ra như thế nào?',
      answer:
        'Bạn chỉ cần vào mục "Lịch sử mua hàng", chọn đơn hàng cần hỗ trợ và nhấn "Yêu cầu hoàn tiền Escrow", đính kèm ảnh chụp màn hình lỗi. Ban quản trị CodeMart sẽ tiến hành kiểm tra mã nguồn và xử lý hoàn tiền về tài khoản ngân hàng của bạn trong 24h.',
    },
    {
      id: 5,
      category: 'license',
      question: 'Sự khác biệt giữa Giấy phép Standard License và Extended License?',
      answer:
        'Standard License cho phép bạn triển khai mã nguồn trên 1 dự án / tên miền thương mại hoặc học tập. Extended License cho phép bạn tùy biến, tích hợp vào sản phẩm SaaS bán lại cho nhiều khách hàng trả phí.',
    },
    {
      id: 6,
      category: 'license',
      question: 'Tôi có được phép chỉnh sửa mã nguồn sau khi mua không?',
      answer:
        'Hoàn toàn được phép! Bạn sở hữu 100% quyền tùy biến, thay đổi giao diện, thêm tính năng, thay đổi cơ sở dữ liệu để phù hợp với dự án của riêng mình.',
    },
    {
      id: 7,
      category: 'seller',
      question: 'Chính sách phân chia doanh thu và phí sàn tại CodeMart là bao nhiêu?',
      answer:
        'Tác giả nhận tới 80% giá trị mỗi đơn hàng bán ra. CodeMart chỉ thu 20% phí nền tảng để duy trì hệ thống máy chủ, quét bảo mật, cổng thanh toán tự động và hỗ trợ khách hàng.',
    },
    {
      id: 8,
      category: 'seller',
      question: 'Rút tiền doanh thu về tài khoản ngân hàng mất bao lâu?',
      answer:
        'Sau khi đơn hàng qua thời hạn Escrow 3 ngày, số dư sẵn sàng rút sẽ hiển thị trong ví tác giả. Bạn có thể tạo lệnh rút về mọi ngân hàng Việt Nam (Vietcombank, MB Bank, Techcombank...), tiền về tài khoản trong vòng 2 - 4 giờ làm việc.',
    },
    {
      id: 9,
      category: 'support',
      question: 'Nếu tôi gặp khó khăn khi cài đặt mã nguồn trên localhost thì sao?',
      answer:
        'Mỗi mã nguồn trên CodeMart đều bắt buộc có file README.md hướng dẫn chi tiết từng câu lệnh setup. Ngoài ra, bạn có thể nhắn tin trực tiếp cho tác giả qua kênh trao đổi đơn hàng hoặc gửi ticket để kỹ thuật viên CodeMart hỗ trợ.',
    },
  ];

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQId(openFAQId === id ? null : id);
  };

  return (
    <div className="faq-page-modern">
      {/* Hero Banner */}
      <section className="faq-hero-banner">
        <div className="container">
          <div className="faq-hero-content">
            <div className="faq-brand-tag">
              <Sparkles size={14} />
              <span>Trung Tâm Hỏi Đáp & Kiến Thức</span>
            </div>
            <h1 className="faq-hero-title">Câu Hỏi Thường Gặp (FAQ)</h1>
            <p className="faq-hero-subtitle">
              Tìm kiếm câu trả lời nhanh chóng cho mọi thắc mắc về quy trình mua bán mã nguồn, bảo
              vệ Escrow và bản quyền số tại CodeMart.
            </p>

            {/* Live Search Input */}
            <div className="faq-search-box-wrap">
              <Search size={18} className="faq-search-icon" />
              <input
                type="text"
                className="faq-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm (ví dụ: Escrow, hoàn tiền, license, rút tiền...)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="faq-main-section">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="faq-categories-bar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`faq-cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={14} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-accordion-container">
            {filteredFAQs.length === 0 ? (
              <div className="faq-empty-state">
                <HelpCircle size={40} className="text-muted" />
                <h3>Không tìm thấy câu hỏi phù hợp</h3>
                <p>Thử tìm kiếm với từ khóa khác hoặc liên hệ đội ngũ hỗ trợ của chúng tôi.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const isOpen = openFAQId === faq.id;
                return (
                  <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-accordion-question-btn"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-toggle-icon">
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="faq-accordion-answer-box">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Need More Help Banner */}
          <div className="faq-help-footer-card">
            <div className="help-card-left">
              <MessageSquare size={24} className="text-primary" />
              <div>
                <h3>Bạn vẫn còn câu hỏi chưa được giải đáp?</h3>
                <p>
                  Đội ngũ kỹ thuật viên và chăm sóc khách hàng CodeMart luôn sẵn sàng trợ giúp bạn
                  24/7.
                </p>
              </div>
            </div>

            <Link to="/contact" className="btn-faq-contact-cta">
              <span>Gửi Yêu Cầu Hỗ Trợ</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
