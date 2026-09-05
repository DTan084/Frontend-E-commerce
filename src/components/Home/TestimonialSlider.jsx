import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      role: 'CEO tại TechStart',
      initials: 'NA',
      avatarBg: '#4f46e5',
      rating: 5,
      text: 'Thị trường tuyệt vời! Tôi đã tìm thấy template React hoàn hảo cho startup của mình. Chất lượng code xuất sắc và tài liệu rất chi tiết. Tiết kiệm cho chúng tôi hàng tháng phát triển.',
      company: 'TechStart Inc.',
    },
    {
      id: 2,
      name: 'Trần Minh Khoa',
      role: 'Lập trình viên Full Stack',
      initials: 'TK',
      avatarBg: '#06b6d4',
      rating: 5,
      text: 'Thị trường mã nguồn tốt nhất tôi từng sử dụng. Code sạch, tài liệu đầy đủ và hỗ trợ khách hàng tuyệt vời. Template Spring Boot & React tôi mua đã vượt quá mọi mong đợi.',
      company: 'Freelancer',
    },
    {
      id: 3,
      name: 'Lê Thị Mai',
      role: 'Quản lý sản phẩm',
      initials: 'LM',
      avatarBg: '#ec4899',
      rating: 5,
      text: 'Bộ sưu tập template cao cấp đáng kinh ngạc. Chúng tôi mua giải pháp thương mại điện tử và thật sự đáng từng đồng. Tích hợp mượt mà và hỗ trợ siêu nhiệt tình.',
      company: 'ShopFlow',
    },
    {
      id: 4,
      name: 'Phạm Hoàng Long',
      role: 'Nhà sáng lập Startup',
      initials: 'PL',
      avatarBg: '#10b981',
      rating: 5,
      text: 'Nền tảng này thay đổi cuộc chơi cho các startup. Code chất lượng cao với giá cả hợp lý. Bộ dashboard quản trị giúp chúng tôi ra mắt MVP chỉ trong 3 ngày.',
      company: 'DataFlow',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonial-slider-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Khách hàng nói gì về CodeMart</h2>
          <p className="section-subtitle">
            Tham gia cùng hàng nghìn lập trình viên và doanh nghiệp hài lòng
          </p>
        </div>

        <div className="testimonial-slider">
          <div
            className="testimonial-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="quote-icon-box">
                    <Quote size={24} className="quote-icon" />
                  </div>

                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="star-filled"
                        fill="#f59e0b"
                        color="#f59e0b"
                      />
                    ))}
                  </div>

                  <p className="testimonial-text">"{testimonial.text}"</p>

                  <div className="testimonial-author">
                    <div
                      className="author-avatar-fallback"
                      style={{ backgroundColor: testimonial.avatarBg }}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">
                        {testimonial.role} • <span className="company">{testimonial.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="slider-button prev"
            onClick={prevSlide}
            aria-label="Đánh giá trước"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="slider-button next"
            onClick={nextSlide}
            aria-label="Đánh giá tiếp theo"
          >
            <ChevronRight size={20} />
          </button>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Xem đánh giá ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
