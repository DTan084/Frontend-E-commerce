import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Store, Sparkles, LifeBuoy, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import SellerStatsCards from '../../components/Seller/SellerStatsCards';
import SalesChart from '../../components/Seller/SalesChart';
import RecentSales from '../../components/Seller/RecentSales';
import TopProducts from '../../components/Seller/TopProducts';
import LatestReviews from '../../components/Seller/LatestReviews';
import { mockRevenueStats } from '../../data/mockSalesChart';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const sellerStats = {
    totalProducts: 25,
    activeProducts: 20,
    pendingProducts: 3,
    totalRevenue: mockRevenueStats.totalRevenue || 124500000,
    totalSales: mockRevenueStats.totalOrders || 142,
    averageRating: 4.8,
  };

  const sellerData = {
    ...user,
    ...sellerStats,
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <div className="seller-dashboard-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Kênh người bán', path: null }]} />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={sellerData} />

          {/* Main Workspace */}
          <main className="seller-main-workspace">
            {/* Header Hero Greeting Card */}
            <div className="seller-welcome-hero-card">
              <div className="seller-hero-text-side">
                <div className="seller-hero-badge">
                  <Zap size={13} />
                  <span>Kênh Tác Giả & Nhà Phát Triển CodeMart</span>
                </div>
                <h1 className="seller-hero-title">
                  {getCurrentGreeting()},{' '}
                  <span className="text-gradient">{user?.name || 'Tác giả'}!</span>
                </h1>
                <p className="seller-hero-subtitle">
                  Theo dõi hiệu suất bán mã nguồn, quản lý doanh thu và chăm sóc khách hàng mua code
                  của bạn.
                </p>
              </div>

              <div className="seller-hero-actions-side">
                <button
                  type="button"
                  className="btn-hero-seller primary"
                  onClick={() => navigate('/seller/upload')}
                >
                  <PlusCircle size={16} />
                  <span>Đăng bán code mới</span>
                </button>
                <button
                  type="button"
                  className="btn-hero-seller secondary"
                  onClick={() => navigate('/seller/products')}
                >
                  <Store size={16} />
                  <span>Kho mã nguồn</span>
                </button>
              </div>
            </div>

            {/* Metrics Stats Cards */}
            <SellerStatsCards stats={sellerStats} />

            {/* Interactive Sales Chart */}
            <SalesChart />

            {/* 2-Column Split: Recent Sales & Top Products */}
            <div className="seller-two-col-grid">
              <RecentSales />
              <TopProducts />
            </div>

            {/* Reviews from Buyers */}
            <LatestReviews />

            {/* Help & Creator Assurance Banner */}
            <div className="seller-creator-footer-cards">
              <div className="creator-tip-card">
                <div className="tip-card-icon indigo">
                  <Sparkles size={20} />
                </div>
                <div className="tip-card-text">
                  <h4>Bí quyết tăng doanh số</h4>
                  <p>Cập nhật tài liệu hướng dẫn và video demo giúp tỷ lệ mua hàng tăng 40%.</p>
                </div>
              </div>

              <div className="creator-tip-card">
                <div className="tip-card-icon emerald">
                  <ShieldCheck size={20} />
                </div>
                <div className="tip-card-text">
                  <h4>Bảo vệ tác quyền 100%</h4>
                  <p>Mỗi lượt mua được cấp License Key và mã hóa bản quyền riêng biệt.</p>
                </div>
              </div>

              <div className="creator-tip-card">
                <div className="tip-card-icon purple">
                  <LifeBuoy size={20} />
                </div>
                <div className="tip-card-text">
                  <h4>Hỗ trợ kỹ thuật tác giả 24/7</h4>
                  <p>Đội ngũ kiểm duyệt CodeMart sẵn sàng hỗ trợ giải đáp mọi thắc mắc.</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
