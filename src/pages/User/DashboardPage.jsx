import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import StatsCards from '../../components/Dashboard/StatsCards';
import RecentOrders from '../../components/Dashboard/RecentOrders';
import PurchasedProducts from '../../components/Dashboard/PurchasedProducts';
import ActivityTimeline from '../../components/Dashboard/ActivityTimeline';
import { mockDashboardStats } from '../../data/mockDashboard';
import { mockOrders } from '../../data/mockOrders';
import mockPurchasedProducts from '../../data/mockPurchasedProducts';
import './DashboardPage.css';

const ACTIVITY_CONFIG = {
  purchase: { icon: '🛍️', color: '#667eea' },
  download: { icon: '⬇', color: '#48bb78' },
  wishlist: { icon: '❤️', color: '#f56565' },
  review: { icon: '⭐', color: '#f6ad55' },
  register: { icon: '🎉', color: '#9f7aea' },
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const stats = {
    totalOrders: mockDashboardStats.totalPurchases,
    activeProducts: mockDashboardStats.activeProducts,
    totalRevenue: mockDashboardStats.totalSpent,
    averageRating: 4.8,
  };

  const orders = mockOrders.slice(0, 3).map(order => ({
    id: order.id,
    date: order.orderDate?.split('T')[0] || '',
    status: order.status,
    total: order.total,
    productName: order.items[0]?.productName || '',
    productImage: order.items[0]?.productImage || 'https://via.placeholder.com/80',
    downloadUrl: order.downloadLinks?.[0]?.link || '#',
  }));

  const activities = mockDashboardStats.recentActivity.map(activity => ({
    ...activity,
    description: activity.amount > 0
      ? `${activity.amount.toLocaleString('vi-VN')} ₫`
      : '',
    timestamp: new Date(activity.date).toLocaleDateString('vi-VN'),
    ...(ACTIVITY_CONFIG[activity.type] || { icon: '📌', color: '#718096' }),
  }));

  const recentPurchases = mockPurchasedProducts.slice(0, 4).map(p => ({
    id: p.id,
    title: p.name,
    image: p.image,
    price: p.price,
    downloadCount: p.downloadCount,
    category: 'Source Code',
    rating: 4.8,
  }));

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Welcome Header */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1 className="dashboard-title">
                {greeting}, <span className="user-name">{user?.name || 'Khách'}!</span>
              </h1>
              <p className="dashboard-subtitle">
                Đây là những gì đang diễn ra với tài khoản của bạn hôm nay
              </p>
            </div>
            <div className="header-actions">
              <button className="action-btn notification-btn">
                <span className="btn-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
              <button className="action-btn help-btn">
                <span className="btn-icon">❓</span>
                Trợ giúp
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Content Grid */}
          <div className="dashboard-content-grid">
            {/* Left Column */}
            <div className="dashboard-left-column">
              {/* Recent Orders */}
              <RecentOrders orders={orders} />

              {/* Purchased Products */}
              <PurchasedProducts products={recentPurchases} />
            </div>

            {/* Right Column */}
            <div className="dashboard-right-column">
              {/* Activity Timeline */}
              <ActivityTimeline activities={activities} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
