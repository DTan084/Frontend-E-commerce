import React from 'react';
import { Flame, Star, TrendingUp, TrendingDown, Package, Award } from 'lucide-react';
import './TopProducts.css';

const TopProducts = () => {
  const topProducts = [
    {
      id: 1,
      rank: 1,
      name: 'Mã Nguồn E-commerce React + Laravel',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      sales: 156,
      revenue: 234000000,
      rating: 4.9,
      reviews: 89,
      trend: 'up',
      trendValue: '+12%',
    },
    {
      id: 2,
      rank: 2,
      name: 'Giao Diện Admin Dashboard Pro Vue.js',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      sales: 142,
      revenue: 170400000,
      rating: 4.8,
      reviews: 76,
      trend: 'up',
      trendValue: '+8%',
    },
    {
      id: 3,
      rank: 3,
      name: 'Fullstack SaaS Boilerplate Next.js',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      sales: 138,
      revenue: 483000000,
      rating: 4.7,
      reviews: 65,
      trend: 'up',
      trendValue: '+5%',
    },
    {
      id: 4,
      rank: 4,
      name: 'Ứng Dụng Flutter Đặt Đồ Ăn 2 Đầu',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      sales: 125,
      revenue: 350000000,
      rating: 4.6,
      reviews: 58,
      trend: 'down',
      trendValue: '-2%',
    },
  ];

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="top-products-card-modern">
      <div className="top-products-head">
        <div className="top-head-title-wrap">
          <Flame size={18} className="text-amber" />
          <div>
            <h2 className="top-products-title">Mã nguồn bán chạy nhất</h2>
            <p className="top-products-subtitle">Top source code mang lại doanh thu cao nhất</p>
          </div>
        </div>
        <div className="top-products-counter">
          <Award size={14} className="text-amber" />
          <span>Top {topProducts.length}</span>
        </div>
      </div>

      <div className="top-products-grid-list">
        {topProducts.map((product) => (
          <div key={product.id} className="top-product-row-card">
            {/* Rank Number Badge */}
            <div className={`rank-pill-badge rank-${product.rank}`}>
              <span>#{product.rank}</span>
            </div>

            {/* Media */}
            <div className="top-product-media-wrap">
              <img src={product.image} alt={product.name} className="top-product-img" />
            </div>

            {/* Info */}
            <div className="top-product-details">
              <h3 className="top-product-name">{product.name}</h3>

              <div className="top-product-meta-strip">
                <div className="rating-pill">
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span>{product.rating}</span>
                  <span className="reviews-count">({product.reviews})</span>
                </div>
                <span className="meta-dot-divider">•</span>
                <span className="sales-total-pill">
                  <Package size={12} />
                  <span>{product.sales} lượt tải</span>
                </span>
              </div>
            </div>

            {/* Revenue & Trend */}
            <div className="top-product-finance-col">
              <strong className="top-revenue-val">{formatVND(product.revenue)}</strong>
              <div className={`trend-pill ${product.trend}`}>
                {product.trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                <span>{product.trendValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
