import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ShoppingBag, Clock, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';
import AdminStats from '../../../components/Admin/AdminStats';
import RevenueChart from '../../../components/Admin/RevenueChart';
import ActivityLog from '../../../components/Admin/ActivityLog';
import { mockOrders } from '../../../data/mockOrders';
import { getPendingProducts } from '../../../data/mockPendingProducts';
import './AdminDashboard.css';

const STATUS_MAP = {
  completed: { label: 'Đã hoàn tất', color: 'emerald' },
  processing: { label: 'Đang xử lý', color: 'blue' },
  pending: { label: 'Chờ thanh toán', color: 'amber' },
  cancelled: { label: 'Đã hủy', color: 'rose' },
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const recentOrders = mockOrders.slice(0, 5).map((order) => ({
    id: order.id,
    customer: order.userName,
    amount: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
      order.total
    ),
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
    price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price),
  }));

  const [pendingApprovals, setPendingApprovals] = useState(initialApprovals);

  const handleApprove = (id) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
    alert(`Đã duyệt mở bán mã nguồn #${id} thành công!`);
  };

  const handleReject = (id) => {
    setPendingApprovals((prev) => prev.filter((a) => a.id !== id));
    alert(`Đã từ chối mã nguồn #${id} và gửi lý do cho tác giả.`);
  };

  const todayStr = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="admin-dashboard-page-modern">
      {/* Header Banner */}
      <div className="admin-dash-hero-banner">
        <div className="dash-hero-left">
          <div className="dash-hero-pill">
            <ShieldCheck size={13} />
            <span>Hệ Thống Trung Tâm Quản Trị CodeMart</span>
          </div>
          <h1 className="dash-hero-title">Bảng Điều Khiển Quản Trị Hệ Thống</h1>
          <p className="dash-hero-subtitle">
            Theo dõi dòng tiền ký quỹ Escrow, kiểm duyệt mã nguồn tác giả và quản lý đơn hàng toàn
            sàn
          </p>
        </div>

        <div className="dash-hero-right">
          <div className="dash-date-badge">
            <Calendar size={15} />
            <span>{todayStr}</span>
          </div>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <AdminStats />

      {/* Global Revenue & GMV Chart */}
      <RevenueChart />

      {/* 2-Column Split: Recent Orders & Pending Approvals */}
      <div className="admin-dashboard-split-grid">
        {/* Recent Orders Card */}
        <div className="admin-dash-table-card">
          <div className="dash-card-header">
            <div className="dash-card-header-left">
              <div className="dash-card-icon-wrap emerald">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h2 className="dash-card-title">Đơn hàng giao dịch gần đây</h2>
                <p className="dash-card-sub">Lượt mua mã nguồn và ký quỹ mới nhất</p>
              </div>
            </div>

            <button
              type="button"
              className="btn-dash-link-action"
              onClick={() => navigate('/admin/orders')}
            >
              <span>Xem tất cả</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="admin-dash-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Người mua</th>
                  <th>Giá trị</th>
                  <th>Trạng thái</th>
                  <th>Ngày</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="admin-dash-row">
                    <td className="td-order-id">#{order.id}</td>
                    <td className="td-cust-name">{order.customer}</td>
                    <td className="td-order-price">{order.amount}</td>
                    <td>
                      <span className={`status-badge-pill ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="td-order-date">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Code Reviews Card */}
        <div className="admin-dash-table-card">
          <div className="dash-card-header">
            <div className="dash-card-header-left">
              <div className="dash-card-icon-wrap amber">
                <Clock size={18} />
              </div>
              <div>
                <h2 className="dash-card-title">Mã nguồn đang chờ duyệt</h2>
                <p className="dash-card-sub">Source code cần quét bảo mật và phê duyệt</p>
              </div>
            </div>

            <span className="dash-pending-count-pill">{pendingApprovals.length} chờ</span>
          </div>

          <div className="dash-approvals-list">
            {pendingApprovals.length === 0 ? (
              <div className="dash-approvals-empty">
                <ShieldCheck size={32} className="text-emerald" />
                <p>Tất cả mã nguồn đã được xử lý duyệt!</p>
              </div>
            ) : (
              pendingApprovals.map((item) => (
                <div key={item.id} className="dash-approval-item-row">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="approval-thumb-img"
                  />

                  <div className="approval-details-col">
                    <h3 className="approval-prod-name">{item.productName}</h3>
                    <div className="approval-meta-row">
                      <span className="approval-seller-lbl">Tác giả: {item.seller}</span>
                      <span className="meta-dot">•</span>
                      <span className="approval-price-lbl">{item.price}</span>
                    </div>
                  </div>

                  <div className="approval-quick-actions">
                    <button
                      type="button"
                      className="btn-quick-approve"
                      onClick={() => handleApprove(item.id)}
                      title="Phê duyệt mở bán"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-quick-reject"
                      onClick={() => handleReject(item.id)}
                      title="Từ chối mã nguồn"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="dash-card-footer-action">
            <button
              type="button"
              className="btn-full-pending-pipeline"
              onClick={() => navigate('/admin/pending-products')}
            >
              <span>Mở Pipeline Kiểm Duyệt Chi Tiết</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <ActivityLog />
    </div>
  );
};

export default AdminDashboard;
