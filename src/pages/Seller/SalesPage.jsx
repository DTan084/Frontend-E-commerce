import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SalesPage.css';

const mockSalesData = {
  totalRevenue: 45000000,
  totalOrders: 156,
  avgOrderValue: 288461,
  pendingRevenue: 8500000,
  recentSales: [
    {
      id: 'SALE-001',
      orderId: 'ORD-2025-001',
      date: '2025-11-18',
      product: 'Mã Nguồn Website TMDT',
      buyer: 'Nguyễn Văn A',
      amount: 1500000,
      commission: 150000,
      netAmount: 1350000,
      status: 'completed'
    },
    {
      id: 'SALE-002',
      orderId: 'ORD-2025-002',
      date: '2025-11-17',
      product: 'Admin Dashboard React',
      buyer: 'Trần Thị B',
      amount: 900000,
      commission: 90000,
      netAmount: 810000,
      status: 'completed'
    },
    {
      id: 'SALE-003',
      orderId: 'ORD-2025-003',
      date: '2025-11-16',
      product: 'Landing Page SaaS',
      buyer: 'Lê Văn C',
      amount: 500000,
      commission: 50000,
      netAmount: 450000,
      status: 'pending'
    }
  ],
  monthlySales: [
    { month: 'T7', revenue: 12000000 },
    { month: 'T8', revenue: 15000000 },
    { month: 'T9', revenue: 18000000 },
    { month: 'T10', revenue: 22000000 },
    { month: 'T11', revenue: 25000000 }
  ]
};

const SalesPage = () => {
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredSales = mockSalesData.recentSales.filter(sale => {
    if (statusFilter !== 'all' && sale.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="sales-page">
      {/* Header */}
      <section className="sales-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/seller/dashboard">Seller Dashboard</Link>
            <span>/</span>
            <span>Doanh thu</span>
          </div>

          <h1>💰 Quản lý doanh thu</h1>
          <p>Theo dõi doanh thu và đơn hàng của bạn</p>
        </div>
      </section>

      {/* Stats */}
      <section className="sales-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                💵
              </div>
              <div className="stat-info">
                <div className="stat-label">Tổng doanh thu</div>
                <div className="stat-value">{formatPrice(mockSalesData.totalRevenue)}</div>
                <div className="stat-change positive">+12.5% so với tháng trước</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                📦
              </div>
              <div className="stat-info">
                <div className="stat-label">Tổng đơn hàng</div>
                <div className="stat-value">{mockSalesData.totalOrders}</div>
                <div className="stat-change positive">+8.3% so với tháng trước</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                📊
              </div>
              <div className="stat-info">
                <div className="stat-label">Giá trị TB/đơn</div>
                <div className="stat-value">{formatPrice(mockSalesData.avgOrderValue)}</div>
                <div className="stat-change positive">+3.2% so với tháng trước</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                ⏳
              </div>
              <div className="stat-info">
                <div className="stat-label">Chờ thanh toán</div>
                <div className="stat-value">{formatPrice(mockSalesData.pendingRevenue)}</div>
                <div className="stat-change">3 đơn hàng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart */}
      <section className="sales-chart">
        <div className="container">
          <div className="chart-card">
            <h2>📈 Biểu đồ doanh thu 5 tháng gần nhất</h2>
            <div className="chart-bars">
              {mockSalesData.monthlySales.map((data, index) => {
                const maxRevenue = Math.max(...mockSalesData.monthlySales.map(d => d.revenue));
                const height = (data.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${height}%` }}>
                      <div className="bar-value">{formatPrice(data.revenue)}</div>
                    </div>
                    <div className="bar-label">{data.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sales-filters">
        <div className="container">
          <div className="filters-row">
            <div className="filter-group">
              <label>Thời gian:</label>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="today">Hôm nay</option>
                <option value="week">Tuần này</option>
                <option value="month">Tháng này</option>
                <option value="year">Năm nay</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Trạng thái:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả</option>
                <option value="completed">Hoàn thành</option>
                <option value="pending">Chờ xử lý</option>
              </select>
            </div>

            <button className="btn-export">📥 Xuất báo cáo</button>
          </div>
        </div>
      </section>

      {/* Sales Table */}
      <section className="sales-table-section">
        <div className="container">
          <div className="table-card">
            <h2>Danh sách giao dịch</h2>
            <div className="table-responsive">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Mã GD</th>
                    <th>Ngày</th>
                    <th>Sản phẩm</th>
                    <th>Người mua</th>
                    <th>Doanh thu</th>
                    <th>Hoa hồng</th>
                    <th>Thực nhận</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSales.map(sale => (
                    <tr key={sale.id}>
                      <td><strong>{sale.id}</strong></td>
                      <td>{formatDate(sale.date)}</td>
                      <td>{sale.product}</td>
                      <td>{sale.buyer}</td>
                      <td className="amount">{formatPrice(sale.amount)}</td>
                      <td className="commission">-{formatPrice(sale.commission)}</td>
                      <td className="net-amount"><strong>{formatPrice(sale.netAmount)}</strong></td>
                      <td>
                        <span className={`status-badge ${sale.status}`}>
                          {sale.status === 'completed' ? '✅ Hoàn thành' : '⏳ Chờ xử lý'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalesPage;
