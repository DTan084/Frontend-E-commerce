import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
    totalRevenue: mockRevenueStats.totalRevenue,
    totalSales: mockRevenueStats.totalOrders,
    averageRating: 4.8,
  };

  // Combine user data with seller stats
  const sellerData = {
    ...user,
    ...sellerStats,
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="seller-dashboard-page">
      <div className="seller-dashboard-container">
        {/* Sidebar */}
        <SellerSidebar seller={sellerData} />

        {/* Main Content */}
        <main className="seller-main-content">
          {/* Page Header */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1 className="dashboard-title">
                {getCurrentGreeting()}, {user?.name?.split(' ')[0] || 'Seller'}! 👋
              </h1>
              <p className="dashboard-subtitle">
                Here's what's happening with your store today
              </p>
            </div>
            
            <div className="header-actions">
              <button className="action-button notification-btn">
                <span className="btn-icon">🔔</span>
                <span className="notification-badge">5</span>
              </button>
              <button className="action-button upload-btn" onClick={() => navigate('/seller/upload')}>
                <span className="btn-icon">⬆️</span>
                <span className="btn-text">Upload Product</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <SellerStatsCards stats={sellerStats} />

          {/* Sales Chart */}
          <SalesChart />

          {/* Two Column Layout */}
          <div className="dashboard-two-column">
            {/* Recent Sales - Left Column */}
            <div className="column-left">
              <RecentSales />
            </div>

            {/* Top Products - Right Column */}
            <div className="column-right">
              <TopProducts />
            </div>
          </div>

          {/* Latest Reviews */}
          <LatestReviews />

          {/* Quick Actions Footer */}
          <div className="dashboard-footer">
            <div className="footer-card">
              <div className="footer-icon">📊</div>
              <div className="footer-content">
                <h4>Need Help?</h4>
                <p>Check our seller guide for tips</p>
              </div>
              <button className="footer-btn">Learn More</button>
            </div>

            <div className="footer-card">
              <div className="footer-icon">💡</div>
              <div className="footer-content">
                <h4>Boost Your Sales</h4>
                <p>Upgrade to Premium Seller</p>
              </div>
              <button className="footer-btn premium">Upgrade Now</button>
            </div>

            <div className="footer-card">
              <div className="footer-icon">📞</div>
              <div className="footer-content">
                <h4>Contact Support</h4>
                <p>We're here to help 24/7</p>
              </div>
              <button className="footer-btn">Get Support</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
