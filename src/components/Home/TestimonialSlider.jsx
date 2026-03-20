import React, { useState, useEffect } from 'react';
import './TestimonialSlider.css';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      role: 'CEO tại TechStart',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=667eea&color=fff&size=100',
      rating: 5,
      text: 'Thị trường tuyệt vời! Tôi đã tìm thấy template React hoàn hảo cho startup của mình. Chất lượng code xuất sắc và tài liệu rất chi tiết. Tiết kiệm cho chúng tôi hàng tháng phát triển.',
      company: 'TechStart Inc.'
    },
    {
      id: 2,
      name: 'Trần Minh Khoa',
      role: 'Lập trình viên Full Stack',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Minh+Khoa&background=764ba2&color=fff&size=100',
      rating: 5,
      text: 'Thị trường mã nguồn tốt nhất tôi từng sử dụng. Code sạch, tài liệu đầy đủ và hỗ trợ khách hàng tuyệt vời. Template Laravel admin tôi mua đã vượt quá mọi mong đợi.',
      company: 'Freelancer'
    },
    {
      id: 3,
      name: 'Lê Thị Mai',
      role: 'Quản lý sản phẩm',
      avatar: 'https://ui-avatars.com/api/?name=Le+Thi+Mai&background=f093fb&color=fff&size=100',
      rating: 5,
      text: 'Bộ sưu tập template cao cấp đáng kinh ngạc. Chúng tôi mua giải pháp thương mại điện tử và thật sự đáng từng đồng. Tích hợp mượt mà và hỗ trợ tuyệt vời.',
      company: 'ShopFlow'
    },
    {
      id: 4,
      name: 'Phạm Hoàng Long',
      role: 'Nhà sáng lập Startup',
      avatar: 'https://ui-avatars.com/api/?name=Pham+Hoang+Long&background=4facfe&color=fff&size=100',
      rating: 5,
      text: 'Nền tảng này thay đổi cuộc chơi cho các startup. Code chất lượng cao với giá cả phải chăng. Template dashboard Vue.js giúp chúng tôi ra mắt MVP trong thời gian kỷ lục.',
      company: 'DataFlow'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

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
          <h2 className="section-title">Khách hàng nói gì về chúng tôi</h2>
          <p className="section-subtitle">
            Tham gia cùng hàng nghìn lập trình viên và doanh nghiệp hài lòng
          </p>
        </div>

        <div className="testimonial-slider">
          <div className="testimonial-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="quote-icon">❝</div>
                  
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>

                  <p className="testimonial-text">{testimonial.text}</p>

                  <div className="testimonial-author">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="author-avatar"
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                      <p className="author-company">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="testimonial-decoration"></div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-button prev" onClick={prevSlide} aria-label="Previous testimonial">
            ‹
          </button>
          <button className="slider-button next" onClick={nextSlide} aria-label="Next testimonial">
            ›
          </button>

          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
