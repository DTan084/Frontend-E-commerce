import React, { useState } from 'react';
import {
  Store,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Lock,
  Unlock,
  Star,
  ShieldCheck,
  Eye,
  X,
} from 'lucide-react';
import './SellersManagementPage.css';

const initialSellers = [
  {
    id: 1,
    name: 'Nguyễn Văn Long',
    email: 'seller1@example.com',
    businessName: 'Tech Solutions VN',
    phone: '0901234567',
    joinDate: '15/01/2025',
    status: 'active',
    totalProducts: 25,
    totalSales: 124500000,
    rating: 4.8,
    reviews: 156,
    commission: 20, // 20% platform fee
    isVerified: true,
  },
  {
    id: 2,
    name: 'Trần Thị Bích',
    email: 'seller2@example.com',
    businessName: 'Creative UI Studio',
    phone: '0907654321',
    joinDate: '22/03/2025',
    status: 'active',
    totalProducts: 18,
    totalSales: 89000000,
    rating: 4.6,
    reviews: 98,
    commission: 20,
    isVerified: true,
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    email: 'seller3@example.com',
    businessName: 'WebDev Pro Freelancer',
    phone: '0912345678',
    joinDate: '10/06/2025',
    status: 'pending',
    totalProducts: 1,
    totalSales: 0,
    rating: 0,
    reviews: 0,
    commission: 20,
    isVerified: false,
  },
  {
    id: 4,
    name: 'Phạm Minh Tuấn',
    email: 'seller4@example.com',
    businessName: 'Mobile App Factory',
    phone: '0908765432',
    joinDate: '05/11/2024',
    status: 'suspended',
    totalProducts: 12,
    totalSales: 156000000,
    rating: 3.9,
    reviews: 67,
    commission: 20,
    isVerified: false,
  },
];

const SellersManagementPage = () => {
  const [sellersList, setSellersList] = useState(initialSellers);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleToggleStatus = (sellerId) => {
    setSellersList((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          const newStatus = s.status === 'active' ? 'suspended' : 'active';
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  const handleToggleVerify = (sellerId) => {
    setSellersList((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          return { ...s, isVerified: !s.isVerified };
        }
        return s;
      })
    );
  };

  const handleApproveSeller = (sellerId) => {
    setSellersList((prev) =>
      prev.map((s) => {
        if (s.id === sellerId) {
          return { ...s, status: 'active', isVerified: true };
        }
        return s;
      })
    );
    alert('Đã phê duyệt hồ sơ tác giả và kích hoạt gian hàng thành công!');
  };

  const filteredSellers = sellersList.filter((seller) => {
    const matchesStatus = filterStatus === 'all' || seller.status === filterStatus;
    const matchesSearch =
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countActive = sellersList.filter((s) => s.status === 'active').length;
  const countPending = sellersList.filter((s) => s.status === 'pending').length;

  return (
    <div className="admin-page-container admin-sellers-page-modern">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <Store size={13} />
            <span>Chương Trình Đối Tác & Tác Giả CodeMart</span>
          </div>
          <h1 className="admin-page-main-title">Quản lý Đối tác Tác giả (Sellers)</h1>
          <p className="admin-page-main-desc">
            Phê duyệt hồ sơ đăng ký mở gian hàng, cấp huy hiệu Verified Tác giả và quản lý chính
            sách hoa hồng
          </p>
        </div>

        <div className="header-stats-badges-row">
          <div className="stat-chip emerald">
            <CheckCircle2 size={14} />
            <span>{countActive} Tác giả hoạt động</span>
          </div>
          <div className="stat-chip amber">
            <Clock size={14} />
            <span>{countPending} Hồ sơ chờ duyệt</span>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tác giả, tên studio, email..."
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
              <option value="active">Đang hoạt động</option>
              <option value="pending">Chờ xét duyệt</option>
              <option value="suspended">Tạm khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="admin-data-table-card">
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Tác giả / Studio</th>
                <th>Liên hệ</th>
                <th>Mã nguồn đang bán</th>
                <th>Tổng doanh thu</th>
                <th>Đánh giá sao</th>
                <th>Phí sàn (Fee)</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredSellers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="td-empty-table">
                    <Store size={32} className="text-muted" />
                    <p>Không tìm thấy tác giả nào</p>
                  </td>
                </tr>
              ) : (
                filteredSellers.map((seller) => (
                  <tr key={seller.id} className="admin-table-row">
                    <td className="td-seller-profile-cell">
                      <div className="seller-cell-flex">
                        <div className="seller-avatar-initials">
                          {seller.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="seller-names-col">
                          <div className="seller-name-row">
                            <strong className="seller-name-txt">{seller.name}</strong>
                            {seller.isVerified && (
                              <span className="verified-chip" title="Tác giả đã xác thực">
                                <ShieldCheck size={11} />
                                <span>Verified</span>
                              </span>
                            )}
                          </div>
                          <span className="seller-studio-name">{seller.businessName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="td-contact-cell">
                      <span className="contact-email">{seller.email}</span>
                      <small className="contact-phone">{seller.phone}</small>
                    </td>

                    <td className="td-prods-count">
                      <span className="count-tag-pill">{seller.totalProducts} source code</span>
                    </td>

                    <td className="td-seller-revenue">
                      <strong className="text-primary">{formatVND(seller.totalSales)}</strong>
                    </td>

                    <td className="td-rating-cell">
                      {seller.rating > 0 ? (
                        <span className="rating-pill-tag">
                          <Star size={11} fill="#f59e0b" color="#f59e0b" />
                          <strong>{seller.rating}</strong>
                          <small>({seller.reviews})</small>
                        </span>
                      ) : (
                        <span className="text-muted">Chưa có đánh giá</span>
                      )}
                    </td>

                    <td className="td-commission-cell">
                      <span className="commission-rate-tag">{seller.commission}% sàn thu</span>
                    </td>

                    <td className="td-seller-status">
                      {seller.status === 'active' && (
                        <span className="status-badge-pill emerald">
                          <CheckCircle2 size={11} />
                          <span>Đang bán</span>
                        </span>
                      )}
                      {seller.status === 'pending' && (
                        <span className="status-badge-pill amber">
                          <Clock size={11} />
                          <span>Chờ duyệt</span>
                        </span>
                      )}
                      {seller.status === 'suspended' && (
                        <span className="status-badge-pill rose">
                          <Lock size={11} />
                          <span>Bị khóa</span>
                        </span>
                      )}
                    </td>

                    <td className="td-actions-cell">
                      <div className="actions-btn-strip">
                        {seller.status === 'pending' ? (
                          <button
                            type="button"
                            className="btn-tbl-action unlock"
                            onClick={() => handleApproveSeller(seller.id)}
                            title="Duyệt mở gian hàng"
                          >
                            <CheckCircle2 size={13} />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className={`btn-tbl-action ${seller.status === 'active' ? 'lock' : 'unlock'}`}
                            onClick={() => handleToggleStatus(seller.id)}
                            title={seller.status === 'active' ? 'Khóa gian hàng' : 'Mở khóa'}
                          >
                            {seller.status === 'active' ? <Lock size={13} /> : <Unlock size={13} />}
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn-tbl-action"
                          onClick={() => setSelectedSeller(seller)}
                          title="Xem chi tiết"
                        >
                          <Eye size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seller Detail Modal */}
      {selectedSeller && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedSeller(null)}>
          <div className="modal-seller-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>Hồ sơ Tác giả #{selectedSeller.id}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedSeller(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <div className="modal-seller-header">
                <div className="modal-seller-avatar-large">
                  {selectedSeller.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4>{selectedSeller.name}</h4>
                  <p>
                    {selectedSeller.businessName} • {selectedSeller.email}
                  </p>
                </div>
              </div>

              <div className="modal-info-grid">
                <div className="modal-info-field">
                  <span className="field-lbl">Số điện thoại</span>
                  <span className="field-val">{selectedSeller.phone}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Ngày tham gia sàn</span>
                  <span className="field-val">{selectedSeller.joinDate}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Tổng doanh thu bán</span>
                  <span className="field-val text-primary">
                    {formatVND(selectedSeller.totalSales)}
                  </span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Mã nguồn đang bán</span>
                  <span className="field-val">{selectedSeller.totalProducts} source code</span>
                </div>
              </div>

              <div className="modal-verify-toggle-row">
                <span>Huy hiệu Verified Tác giả uy tín:</span>
                <button
                  type="button"
                  className={`btn-verify-badge-toggle ${selectedSeller.isVerified ? 'verified' : ''}`}
                  onClick={() => handleToggleVerify(selectedSeller.id)}
                >
                  <ShieldCheck size={14} />
                  <span>
                    {selectedSeller.isVerified ? 'Đã cấp Huy hiệu' : 'Chưa cấp (Nhấn để cấp)'}
                  </span>
                </button>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-close-action"
                onClick={() => setSelectedSeller(null)}
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

export default SellersManagementPage;
