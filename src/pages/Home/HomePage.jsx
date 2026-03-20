import React, { useState, useEffect } from 'react';
import { getFeaturedProducts, getAllProducts } from '../../data/mockProducts';
import HeroSection from '../../components/Home/HeroSection';
import StatsBar from '../../components/Home/StatsBar';
import ProductGrid from '../../components/Home/ProductGrid';
import { CategoryGrid } from '../../components/Home/CategoryCard';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import TestimonialSlider from '../../components/Home/TestimonialSlider';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Load featured products from mock data
    const featured = getFeaturedProducts();
    setFeaturedProducts(featured);

    // Get latest products (sorted by date, take 6)
    const allProducts = getAllProducts();
    const latest = [...allProducts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
    setLatestProducts(latest);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Stats Bar */}
      <StatsBar />

      {/* Featured Products (4 columns) */}
      <ProductGrid
        title="Sản phẩm nổi bật"
        subtitle="Mã nguồn và giao diện cao cấp được tuyển chọn"
        products={featuredProducts.slice(0, 8)}
        columns={4}
        viewAllLink="/products?featured=true"
      />

      {/* Categories Grid (6 cards) */}
      <CategoryGrid />

      {/* Latest Products (3 columns) */}
      <ProductGrid
        title="Sản phẩm mới nhất"
        subtitle="Sản phẩm mới được thêm vào thị trường"
        products={latestProducts}
        columns={3}
        viewAllLink="/products"
      />

      {/* Why Choose Us (3 columns) */}
      <WhyChooseUs />

      {/* Testimonials Slider */}
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;
