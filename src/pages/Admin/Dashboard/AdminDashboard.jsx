import React, { useState } from 'react';
import './AdminDashboard.css';
import AdminStats from '../../../components/Admin/AdminStats';
import RevenueChart from '../../../components/Admin/RevenueChart';
import ActivityLog from '../../../components/Admin/ActivityLog';
import { mockOrders } from '../../../data/mockOrders';
import { getPendingProducts } from '../../../data/mockPendingProducts';

const STATUS_MAP = {
  completed: { label: 'Completed', color: 'green' },
  processing: { label: 'Processing', color: 'blue' },
  pending: { label: 'Pending', color: 'orange' },
  cancelled: { label: 'Cancelled', color: 'red' },
};

const AdminDashboard = () => {
  const recentOrders = mockOrders.map((order) => ({
    id: order.id,
    customer: order.userName,
    amount: order.total.toLocaleString('vi-VN') + ' ₫',
    ...(STATUS_MAP[order.status] || { label: order.status, color: 'gray' }),
    status: (STATUS_MAP[order.status] || { label: order.status }).label,
    statusColor: (STATUS_MAP[order.status] || { color: 'gray' }).color,
    date: order.orderDate?.split('T')[0] || '',
  }));

  const initialApprovals = getPendingProducts().map((p) => ({
    id: p.id,
    productImage: p.images[0],
    productName: p.name,
    seller: p.seller,
    submittedDate: p.submitDate,
    category: p.category,
  }));

  const [pendingApprovals, setPendingApprovals] = useState(initialApprovals);

  const handleApprove = (id) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="admin-dashboard-content">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="title-icon">📊</span>
            Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="header-right">
          <div className="date-display">
            <span className="date-icon">📅</span>
            <span className="date-text">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      <AdminStats />

      <RevenueChart />

      <div className="dashboard-grid">
        <div className="recent-orders-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">
                <span className="title-icon">🛍️</span>
                Recent Orders
              </h2>
              <p className="card-subtitle">Latest orders from customers</p>
            </div>
            <button className="view-all-btn">
              View All
              <span className="btn-icon">→</span>
            </button>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id}</td>
                    <td className="customer-name">{order.customer}</td>
                    <td className="order-amount">{order.amount}</td>
                    <td>
                      <span className={`status-badge ${order.statusColor}`}>{order.status}</span>
                    </td>
                    <td className="order-date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pending-approvals-card">
          <div className="card-header">
            <div className="header-left">
              <h2 className="card-title">
                <span className="title-icon">⏳</span>
                Pending Approvals
              </h2>
              <p className="card-subtitle">Products waiting for review</p>
            </div>
            <span className="pending-badge">{pendingApprovals.length}</span>
          </div>

          <div className="approvals-list">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="approval-item">
                <img src={item.productImage} alt={item.productName} className="product-thumb" />
                <div className="approval-info">
                  <h3 className="product-name">{item.productName}</h3>
                  <p className="seller-name">by {item.seller}</p>
                  <div className="approval-meta">
                    <span className="category-badge">{item.category}</span>
                    <span className="submitted-date">Submitted: {item.submittedDate}</span>
                  </div>
                </div>
                <div className="approval-actions">
                  <button className="approve-btn" onClick={() => handleApprove(item.id)}>
                    ✓
                  </button>
                  <button className="reject-btn" onClick={() => handleReject(item.id)}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="view-all-pending-btn">
            View All Pending
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>

      <ActivityLog />
    </div>
  );
};

export default AdminDashboard;
