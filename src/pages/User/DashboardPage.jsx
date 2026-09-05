import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import StatsCards from '../../components/Dashboard/StatsCards';
import RecentOrders from '../../components/Dashboard/RecentOrders';
import PurchasedProducts from '../../components/Dashboard/PurchasedProducts';
import ActivityTimeline from '../../components/Dashboard/ActivityTimeline';
import { mockDashboardStats } from '../../data/mockDashboard';
import { mockOrders } from '../../data/mockOrders';
import mockPurchasedProducts from '../../data/mockPurchasedProducts';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Xin chào');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Chào buổi sáng');
    } else if (hour < 18) {
      setGreeting('Chào buổi chiều');
    } else {
      setGreeting('Chào buổi tối');
    }
  }, []);

  const stats = {
    totalOrders: mockDashboardStats.totalPurchases || 8,
    activeProducts: mockDashboardStats.activeProducts || 5,
    totalRevenue: mockDashboardStats.totalSpent || 3600000,
    averageRating: 4.9,
  };

  const orders = mockOrders.slice(0, 3).map((order) => ({
    id: order.id,
    date: order.orderDate?.split('T')[0] || '',
    status: order.status,
    total: order.total,
    productName: order.items[0]?.productName || '',
    productImage:
      order.items[0]?.productImage ||
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    downloadUrl: order.downloadLinks?.[0]?.link || '#',
  }));

  const recentPurchases = mockPurchasedProducts.slice(0, 3).map((p, idx) => ({
    id: p.id,
    title: p.name,
    image: p.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    price: p.price,
    downloadCount: p.downloadCount || 3,
    category: p.category || 'Mã nguồn',
    licenseKey: `CM-897-82193045-${idx + 1}`,
  }));

  return (
    <div className="dashboard-page-modern">
      <div className="dashboard-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Bàn làm việc', path: null }]} />

        <div className="dashboard-layout-row">
          {/* Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Dashboard Workspace */}
          <main className="dashboard-main-workspace">
            {/* Header Greeting Banner */}
            <div className="dashboard-welcome-hero">
              <div className="hero-text-side">
                <div className="hero-badge-pill">
                  <Sparkles size={13} />
                  <span>Trung tâm thành viên CodeMart</span>
                </div>
                <h1 className="hero-greeting-title">
                  {greeting},{' '}
                  <span className="text-gradient">{user?.name || 'Lập trình viên'}!</span>
                </h1>
                <p className="hero-subtext">
                  Quản lý kho mã nguồn sở hữu, kiểm tra key license bản quyền và cập nhật phiên bản
                  mới nhất.
                </p>
              </div>

              <div className="hero-quick-actions">
                <button
                  type="button"
                  className="btn-hero-action primary"
                  onClick={() => navigate('/products')}
                >
                  <ShoppingBag size={15} />
                  <span>Khám phá mã nguồn</span>
                </button>
                <button
                  type="button"
                  className="btn-hero-action secondary"
                  onClick={() => navigate('/user/purchases')}
                >
                  <KeyRound size={15} />
                  <span>Kho License</span>
                </button>
              </div>
            </div>

            {/* Metric Stats Cards */}
            <StatsCards stats={stats} />

            {/* 2-Column Content Grid */}
            <div className="dashboard-content-split">
              {/* Left Column: Recent Orders & Purchased Code */}
              <div className="dashboard-split-left">
                <RecentOrders orders={orders} />
                <PurchasedProducts products={recentPurchases} />
              </div>

              {/* Right Column: Activity Timeline */}
              <div className="dashboard-split-right">
                <ActivityTimeline />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
