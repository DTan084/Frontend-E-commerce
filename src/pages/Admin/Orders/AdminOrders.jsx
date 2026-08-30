import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  KeyRound,
  FileSpreadsheet,
  X,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import './AdminOrders.css';

const initialOrders = [
  {
    id: 'ORD-8821',
    customer: 'Nguyễn Văn Long',
    email: 'user@test.com',
    productName: 'Mã Nguồn E-commerce React + Laravel',
    total: 1500000,
    fee: 300000,
    netSeller: 1200000,
    status: 'completed',
    payment: 'VietQR Pro',
    licenseKey: 'CM-ECOM-9842-PRO',
    date: '18/11/2025',
  },
  {
    id: 'ORD-8820',
    customer: 'Phạm Minh Tuấn',
    email: 'phamminhtuan@dev.io',
    productName: 'Giao Diện Admin Dashboard Pro Vue.js',
    total: 1200000,
    fee: 240000,
    netSeller: 960000,
    status: 'completed',
    payment: 'VNPay QR',
    licenseKey: 'CM-DASH-3319-STD',
    date: '17/11/2025',
  },
  {
    id: 'ORD-8819',
    customer: 'Lê Hoàng Sơn',
    email: 'son.le@startup.vn',
    productName: 'Fullstack SaaS Boilerplate Next.js 14',
    total: 3500000,
    fee: 700000,
    netSeller: 2800000,
    status: 'completed',
    payment: 'Thẻ Quốc Tế (Visa/Master)',
    licenseKey: 'CM-SAAS-7710-EXT',
    date: '16/11/2025',
  },
  {
    id: 'ORD-8818',
    customer: 'Vũ Thị Hằng',
    email: 'hangvu@gmail.com',
    productName: 'Ứng Dụng Flutter Đặt Đồ Ăn 2 Đầu',
    total: 2800000,
    fee: 560000,
    netSeller: 2240000,
    status: 'escrow_hold',
    payment: 'Ví MoMo',
    licenseKey: 'CM-FLUT-5512-PRO',
    date: '15/11/2025',
  },
  {
    id: 'ORD-8817',
    customer: 'Trịnh Gia Huy',
    email: 'giahuy@fpt.edu.vn',
    productName: 'RESTful API Microservices Spring Boot',
    total: 2200000,
    fee: 440000,
    netSeller: 1760000,
    status: 'completed',
    payment: 'VietQR Pro',
    licenseKey: 'CM-API-1109-DEV',
    date: '14/11/2025',
  },
  {
    id: 'ORD-8816',
    customer: 'Đặng Quốc Bảo',
    email: 'baodang@yahoo.com',
    productName: 'Plugin Tích Hợp Cổng Thanh Toán VNPay',
    total: 650000,
    fee: 130000,
    netSeller: 520000,
    status: 'cancelled',
    payment: 'Hết hạn thanh toán',
    licenseKey: 'Chưa cấp',
    date: '13/11/2025',
  },
];

const AdminOrders = () => {
  const [ordersList] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const filteredOrders = ordersList.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalGMV = ordersList
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalPlatformFees = ordersList
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.fee, 0);

  return (
    <div className="admin-page-container admin-orders-page-modern">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <ShoppingBag size={13} />
            <span>Giao Dịch Sàn & Ký Quỹ Escrow</span>
          </div>
          <h1 className="admin-page-main-title">Quản lý Đơn hàng & License Key</h1>
          <p className="admin-page-main-desc">
            Theo dõi dòng tiền mua mã nguồn, kiểm soát thời hạn bảo lưu Escrow 3 ngày và cấp mã
            License Key tự động
          </p>
        </div>

        <div className="header-stats-badges-row">
          <div className="stat-chip indigo">
            <CreditCard size={14} />
            <span>GMV: {formatVND(totalGMV)}</span>
          </div>
          <div className="stat-chip emerald">
            <ShieldCheck size={14} />
            <span>Phí sàn (20%): {formatVND(totalPlatformFees)}</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-table-toolbar-box">
        <div className="toolbar-search-wrap">
          <Search size={15} className="toolbar-search-icon" />
          <input
            type="text"
            className="toolbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã đơn, khách hàng, mã nguồn..."
          />
        </div>

        <div className="toolbar-filters-row">
          <div className="toolbar-select-wrap">
            <Filter size={13} className="select-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="toolbar-select-dropdown"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Đã hoàn tất thanh toán</option>
              <option value="escrow_hold">Đang giữ tại Escrow (3 ngày)</option>
              <option value="cancelled">Đã hủy / Thất bại</option>
            </select>
          </div>

          <button
            type="button"
            className="btn-export-csv-action"
            onClick={() => alert('Đã xuất báo cáo đối soát đơn hàng CSV thành công!')}
          >
            <FileSpreadsheet size={14} />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-data-table-card">
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Người mua</th>
                <th>Mã nguồn đã mua</th>
                <th>Cổng thanh toán</th>
                <th>Tổng tiền</th>
                <th>Phí sàn (20%)</th>
                <th>License Key</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="td-empty-table">
                    <ShoppingBag size={32} className="text-muted" />
                    <p>Không tìm thấy đơn hàng nào phù hợp</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="admin-table-row">
                    <td className="td-order-id-cell">
                      <strong>#{order.id}</strong>
                      <small className="text-muted d-block">{order.date}</small>
                    </td>

                    <td className="td-buyer-cell">
                      <strong className="buyer-name-txt">{order.customer}</strong>
                      <span className="buyer-email-txt">{order.email}</span>
                    </td>

                    <td className="td-product-ordered">
                      <span className="prod-ordered-title">{order.productName}</span>
                    </td>

                    <td className="td-gateway-cell">
                      <span className="payment-gateway-tag">{order.payment}</span>
                    </td>

                    <td className="td-total-price">
                      <strong className="text-primary">{formatVND(order.total)}</strong>
                    </td>

                    <td className="td-fee-col">
                      <span className="fee-text-sm">+{formatVND(order.fee)}</span>
                    </td>

                    <td className="td-license-col">
                      {order.licenseKey !== 'Chưa cấp' ? (
                        <span className="license-badge-tag">
                          <KeyRound size={11} />
                          <code>{order.licenseKey}</code>
                        </span>
                      ) : (
                        <span className="text-muted">Chưa cấp</span>
                      )}
                    </td>

                    <td className="td-order-status-cell">
                      {order.status === 'completed' && (
                        <span className="status-badge-pill emerald">
                          <CheckCircle2 size={11} />
                          <span>Hoàn tất</span>
                        </span>
                      )}
                      {order.status === 'escrow_hold' && (
                        <span className="status-badge-pill amber">
                          <Clock size={11} />
                          <span>Giữ Escrow</span>
                        </span>
                      )}
                      {order.status === 'cancelled' && (
                        <span className="status-badge-pill rose">
                          <XCircle size={11} />
                          <span>Đã hủy</span>
                        </span>
                      )}
                    </td>

                    <td className="td-actions-cell">
                      <button
                        type="button"
                        className="btn-tbl-action"
                        onClick={() => setSelectedOrder(order)}
                        title="Xem chi tiết"
                      >
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-order-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>Chi tiết Đơn hàng #{selectedOrder.id}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <div className="modal-order-receipt-card">
                <div className="receipt-row">
                  <span>Khách hàng:</span>
                  <strong>
                    {selectedOrder.customer} ({selectedOrder.email})
                  </strong>
                </div>
                <div className="receipt-row">
                  <span>Sản phẩm:</span>
                  <strong>{selectedOrder.productName}</strong>
                </div>
                <div className="receipt-row">
                  <span>Cổng thanh toán:</span>
                  <span>{selectedOrder.payment}</span>
                </div>
                <div className="receipt-row">
                  <span>Tổng tiền thanh toán:</span>
                  <strong className="text-primary">{formatVND(selectedOrder.total)}</strong>
                </div>
                <div className="receipt-row">
                  <span>Phí sàn CodeMart (20%):</span>
                  <strong className="text-emerald">{formatVND(selectedOrder.fee)}</strong>
                </div>
                <div className="receipt-row">
                  <span>Thực nhận Tác giả (80%):</span>
                  <strong>{formatVND(selectedOrder.netSeller)}</strong>
                </div>
                <div className="receipt-row">
                  <span>License Key đã bàn giao:</span>
                  <code>{selectedOrder.licenseKey}</code>
                </div>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-close-action"
                onClick={() => setSelectedOrder(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
