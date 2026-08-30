import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import './RecentSales.css';

const RecentSales = () => {
  const navigate = useNavigate();

  const recentSales = [
    {
      id: 1,
      orderCode: '#ORD-8821',
      product: {
        name: 'Mã Nguồn E-commerce React + Laravel',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100',
        category: 'Thương mại điện tử',
      },
      buyer: {
        name: 'Nguyễn Văn Long',
        email: 'long.dev@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      },
      amount: 1500000,
      license: 'Regular',
      date: '25 phút trước',
      status: 'completed',
    },
    {
      id: 2,
      orderCode: '#ORD-8820',
      product: {
        name: 'Giao Diện Admin Dashboard Pro Vue.js',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
        category: 'Admin Template',
      },
      buyer: {
        name: 'Phạm Minh Tuấn',
        email: 'tuanpm@tech.vn',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
      },
      amount: 1200000,
      license: 'Regular',
      date: '2 giờ trước',
      status: 'completed',
    },
    {
      id: 3,
      orderCode: '#ORD-8819',
      product: {
        name: 'Fullstack SaaS Boilerplate Next.js',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100',
        category: 'Fullstack App',
      },
      buyer: {
        name: 'Lê Hoàng Sơn',
        email: 'son.le@startup.io',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      amount: 3500000,
      license: 'Extended',
      date: '5 giờ trước',
      status: 'completed',
    },
    {
      id: 4,
      orderCode: '#ORD-8818',
      product: {
        name: 'Ứng Dụng Flutter Đặt Đồ Ăn 2 Đầu',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100',
        category: 'Mobile App',
      },
      buyer: {
        name: 'Vũ Thị Hằng',
        email: 'hang.vu@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      },
      amount: 2800000,
      license: 'Regular',
      date: '1 ngày trước',
      status: 'completed',
    },
  ];

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <div className="recent-sales-card-modern">
      <div className="recent-sales-head">
        <div className="sales-head-title-wrap">
          <ShoppingBag size={18} className="text-emerald" />
          <div>
            <h2 className="recent-sales-title">Đơn bán gần đây</h2>
            <p className="recent-sales-subtitle">Lượt mua mã nguồn mới nhất từ khách hàng</p>
          </div>
        </div>
        <button
          type="button"
          className="btn-view-all-sales"
          onClick={() => navigate('/seller/sales')}
        >
          <span>Xem tất cả</span>
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="recent-sales-feed-list">
        {recentSales.map((sale) => (
          <div key={sale.id} className="sale-record-row">
            {/* Product Media & Info */}
            <div className="sale-product-col">
              <img
                src={sale.product.image}
                alt={sale.product.name}
                className="sale-product-thumb"
              />
              <div className="sale-product-text">
                <span className="sale-product-name">{sale.product.name}</span>
                <span className="sale-order-meta">
                  {sale.orderCode} • {sale.product.category}
                </span>
              </div>
            </div>

            {/* Buyer Col */}
            <div className="sale-buyer-col">
              <img src={sale.buyer.avatar} alt={sale.buyer.name} className="sale-buyer-avatar" />
              <div className="sale-buyer-info">
                <span className="sale-buyer-name">{sale.buyer.name}</span>
                <span className="sale-time-pill">
                  <Clock size={11} />
                  <span>{sale.date}</span>
                </span>
              </div>
            </div>

            {/* Amount & License */}
            <div className="sale-financial-col">
              <strong className="sale-price-val">{formatVND(sale.amount)}</strong>
              <span className="sale-license-badge">{sale.license} License</span>
            </div>

            {/* Status */}
            <div className="sale-status-col">
              <span className="badge-sale-status completed">
                <CheckCircle2 size={12} />
                <span>Thành công</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
