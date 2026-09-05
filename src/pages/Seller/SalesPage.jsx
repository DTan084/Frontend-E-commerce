import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Filter,
  KeyRound,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import './SalesPage.css';

const mockSalesData = {
  totalRevenue: 124500000,
  totalOrders: 142,
  avgOrderValue: 876000,
  pendingRevenue: 8500000,
  recentSales: [
    {
      id: 'SALE-001',
      orderId: '#ORD-8821',
      date: '2025-11-18',
      product: 'Mã Nguồn E-commerce React + Laravel',
      buyer: 'Nguyễn Văn Long',
      amount: 1500000,
      fee: 300000,
      netAmount: 1200000,
      licenseKey: 'CM-ECOM-9842-PRO',
      status: 'completed',
    },
    {
      id: 'SALE-002',
      orderId: '#ORD-8820',
      date: '2025-11-17',
      product: 'Giao Diện Admin Dashboard Pro Vue.js',
      buyer: 'Phạm Minh Tuấn',
      amount: 1200000,
      fee: 240000,
      netAmount: 960000,
      licenseKey: 'CM-DASH-3319-STD',
      status: 'completed',
    },
    {
      id: 'SALE-003',
      orderId: '#ORD-8819',
      date: '2025-11-16',
      product: 'Fullstack SaaS Boilerplate Next.js',
      buyer: 'Lê Hoàng Sơn',
      amount: 3500000,
      fee: 700000,
      netAmount: 2800000,
      licenseKey: 'CM-SAAS-7710-EXT',
      status: 'completed',
    },
    {
      id: 'SALE-004',
      orderId: '#ORD-8818',
      date: '2025-11-15',
      product: 'Ứng Dụng Flutter Đặt Đồ Ăn 2 Đầu',
      buyer: 'Vũ Thị Hằng',
      amount: 2800000,
      fee: 560000,
      netAmount: 2240000,
      licenseKey: 'CM-FLUT-5512-PRO',
      status: 'pending',
    },
    {
      id: 'SALE-005',
      orderId: '#ORD-8817',
      date: '2025-11-14',
      product: 'RESTful API Microservices Spring Boot',
      buyer: 'Trịnh Gia Huy',
      amount: 2200000,
      fee: 440000,
      netAmount: 1760000,
      licenseKey: 'CM-API-1109-DEV',
      status: 'completed',
    },
  ],
};

const SalesPage = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredSales = mockSalesData.recentSales.filter((sale) => {
    if (statusFilter !== 'all' && sale.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="seller-dashboard-page-modern sales-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Kênh người bán', path: '/seller/dashboard' },
            { label: 'Lịch sử doanh thu', path: null },
          ]}
        />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={user} />

          {/* Main Content */}
          <main className="seller-main-workspace">
            {/* Header */}
            <div className="sales-head-banner">
              <div>
                <h1 className="sales-main-title">Lịch sử doanh thu & Đơn hàng</h1>
                <p className="sales-main-subtitle">
                  Theo dõi chi tiết các lượt mua mã nguồn, phân bổ doanh thu thực nhận và bàn giao
                  License Key
                </p>
              </div>

              <div className="sales-head-actions">
                <button
                  type="button"
                  className="btn-export-report"
                  onClick={() => alert('Xuất báo cáo doanh thu CSV thành công!')}
                >
                  <FileSpreadsheet size={15} />
                  <span>Xuất báo cáo CSV</span>
                </button>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="sales-stats-grid">
              <div className="sales-stat-card indigo">
                <div className="stat-card-icon-wrap indigo">
                  <TrendingUp size={20} />
                </div>
                <div className="sales-stat-data">
                  <span className="sales-stat-lbl">Tổng doanh thu thực nhận</span>
                  <h3 className="sales-stat-val text-primary">
                    {formatPrice(mockSalesData.totalRevenue)}
                  </h3>
                  <span className="sales-stat-sub">Đã trừ phí sàn 20%</span>
                </div>
              </div>

              <div className="sales-stat-card emerald">
                <div className="stat-card-icon-wrap emerald">
                  <ShoppingBag size={20} />
                </div>
                <div className="sales-stat-data">
                  <span className="sales-stat-lbl">Tổng đơn bán hoàn tất</span>
                  <h3 className="sales-stat-val">{mockSalesData.totalOrders} đơn hàng</h3>
                  <span className="sales-stat-sub">Bàn giao License thành công</span>
                </div>
              </div>

              <div className="sales-stat-card amber">
                <div className="stat-card-icon-wrap amber">
                  <Clock size={20} />
                </div>
                <div className="sales-stat-data">
                  <span className="sales-stat-lbl">Đang giữ tại Escrow</span>
                  <h3 className="sales-stat-val">{formatPrice(mockSalesData.pendingRevenue)}</h3>
                  <span className="sales-stat-sub">Giải ngân sau 3 ngày bảo hành</span>
                </div>
              </div>
            </div>

            {/* Table Filter Toolbar */}
            <div className="sales-table-toolbar">
              <div className="sales-toolbar-title-wrap">
                <Filter size={15} className="text-secondary" />
                <span className="toolbar-title-text">Danh sách giao dịch</span>
              </div>

              <div className="sales-filters-group">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="sales-filter-select"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="completed">Đã hoàn tất</option>
                  <option value="pending">Chờ giải ngân Escrow</option>
                </select>
              </div>
            </div>

            {/* Sales Data Table */}
            <div className="sales-table-card">
              <div className="table-responsive-wrapper">
                <table className="sales-data-table">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Ngày mua</th>
                      <th>Mã nguồn & Người mua</th>
                      <th>Giá bán</th>
                      <th>Thực nhận (80%)</th>
                      <th>License Key</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="sales-table-row">
                        <td className="td-order-code">
                          <strong>{sale.orderId}</strong>
                        </td>

                        <td className="td-order-date">
                          <span>{formatDate(sale.date)}</span>
                        </td>

                        <td className="td-product-buyer">
                          <div className="product-buyer-cell">
                            <span className="cell-product-name">{sale.product}</span>
                            <span className="cell-buyer-name">Khách hàng: {sale.buyer}</span>
                          </div>
                        </td>

                        <td className="td-gross-amount">
                          <span>{formatPrice(sale.amount)}</span>
                        </td>

                        <td className="td-net-amount">
                          <strong className="text-emerald">{formatPrice(sale.netAmount)}</strong>
                          <small className="fee-pill">-20% phí sàn</small>
                        </td>

                        <td className="td-license-key">
                          <span className="license-key-tag">
                            <KeyRound size={11} />
                            <code>{sale.licenseKey}</code>
                          </span>
                        </td>

                        <td className="td-status-pill">
                          {sale.status === 'completed' ? (
                            <span className="status-badge-pill status-active">
                              <CheckCircle2 size={12} />
                              <span>Đã thanh toán</span>
                            </span>
                          ) : (
                            <span className="status-badge-pill status-pending">
                              <Clock size={12} />
                              <span>Đang giữ Escrow</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
