import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Upload, Star, Users, Check, ArrowRight } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // eslint-disable-next-line no-unused-vars
  const [counters, setCounters] = useState({
    products: 0,
    customers: 0,
    rating: 0,
    secure: 0,
  });

  // eslint-disable-next-line no-unused-vars
  const floatingProducts = [
    {
      id: 1,
      name: 'React Admin Dashboard Pro',
      price: 49,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      position: 'top-20 left-10',
    },
    {
      id: 2,
      name: 'E-commerce Full Stack',
      price: 89,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=300&fit=crop',
      position: 'top-40 right-20',
    },
    {
      id: 3,
      name: 'SaaS Landing Page Kit',
      price: 39,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      position: 'bottom-20 left-20',
    },
    {
      id: 4,
      name: 'Mobile App UI Components',
      price: 59,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      position: 'bottom-32 right-16',
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const trustIndicators = [
    { icon: Package, label: 'Products', value: 10000, suffix: '+' },
    { icon: Users, label: 'Customers', value: 50000, suffix: '+' },
    { icon: Star, label: 'Rating', value: 4.9, suffix: '' },
    { icon: Check, label: 'Secure', value: 100, suffix: '%' },
  ];

  // eslint-disable-next-line no-unused-vars
  const popularCategories = [
    { name: 'React', slug: 'react', icon: '' },
    { name: 'Vue.js', slug: 'vuejs', icon: '' },
    { name: 'Laravel', slug: 'laravel', icon: '' },
    { name: 'Node.js', slug: 'nodejs', icon: '' },
    { name: 'Admin Panels', slug: 'admin-panels', icon: '' },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targets = {
      products: 10000,
      customers: 50000,
      rating: 4.9,
      secure: 100,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        products: Math.floor(targets.products * progress),
        customers: Math.floor(targets.customers * progress),
        rating: parseFloat((targets.rating * progress).toFixed(1)),
        secure: Math.floor(targets.secure * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-gradient-layer-2"></div>
        <div className="hero-gradient-layer-3"></div>
        <div className="hero-pattern"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      {/* 
      <div className="floating-cards">
        {floatingProducts.map((product) => (
          <div
            key={product.id}
            className={`floating-card ${product.position}`}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          >
            <img src={product.image} alt={product.name} />
            <div className="floating-card-content">
              <h4>{product.name}</h4>
              <div className="floating-card-footer">
                <span className="price">${product.price}</span>
                <span className="rating">
                  <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Thị trường
            <br />
            <span className="gradient-text">Mã nguồn cao cấp</span>
          </h1>

          <p className="hero-subtitle">
            Mua & Bán giao diện web chất lượng, bộ UI và mã nguồn hoàn chỉnh.
            <br />
            Tham gia cùng hàng nghìn lập trình viên và thiết kế trên toàn thế giới.
          </p>



          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate('/products')}
            >
              Xem tất cả sản phẩm
              <ArrowRight size={20} />
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate('/seller/register')}
            >
              <Upload size={20} />
              Trở thành người bán
            </button>
          </div>


          {/* <div className="scroll-indicator" onClick={handleScroll}>
            <div className="scroll-icon"></div>
            <span>Scroll to explore</span>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
