import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SellersManagementPage.css';

const mockSellers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'seller1@example.com',
    businessName: 'Tech Solutions VN',
    phone: '0901234567',
    joinDate: '2025-01-15',
    status: 'active',
    totalProducts: 45,
    totalSales: 125000000,
    rating: 4.8,
    reviews: 156,
    commission: 10
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'seller2@example.com',
    businessName: 'Creative Design Studio',
    phone: '0907654321',
    joinDate: '2025-03-22',
    status: 'active',
    totalProducts: 32,
    totalSales: 89000000,
    rating: 4.6,
    reviews: 98,
    commission: 10
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'seller3@example.com',
    businessName: 'WebDev Pro',
    phone: '0912345678',
    joinDate: '2025-06-10',
    status: 'pending',
    totalProducts: 0,
    totalSales: 0,
    rating: 0,
    reviews: 0,
    commission: 10
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'seller4@example.com',
    businessName: 'Mobile App Factory',
    phone: '0908765432',
    joinDate: '2024-11-05',
    status: 'suspended',
    totalProducts: 28,
    totalSales: 156000000,
    rating: 3.9,
    reviews: 67,
    commission: 15
  }
];

const SellersManagementPage = () => {
  const [sellers, setSellers] = useState(mockSellers);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [selectedSeller, setSelectedSeller] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesStatus = filterStatus === 'all' || seller.status === filterStatus;
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStats = () => {
    return {
      total: sellers.length,
      active: sellers.filter(s => s.status === 'active').length,
      pending: sellers.filter(s => s.status === 'pending').length,
      suspended: sellers.filter(s => s.status === 'suspended').length
    };
  };

  const stats = getStats();

  const handleApproveSeller = (sellerId) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, status: 'active' } : s
    ));
    alert('Đã phê duyệt seller!');
  };

  const handleSuspendSeller = (sellerId) => {
    if (window.confirm('Bạn có chắc muốn tạm khóa seller này?')) {
      setSellers(sellers.map(s => 
        s.id === sellerId ? { ...s, status: 'suspended' } : s
      ));
    }
  };

  const handleActivateSeller = (sellerId) => {
    setSellers(sellers.map(s => 
      s.id === sellerId ? { ...s, status: 'active' } : s
    ));
    alert('Đã kích hoạt lại seller!');
  };

  return (
    <div className="sellers-management-page">
      {/* Header */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/admin">Admin</Link>
            <span>/</span>
            <span>Quản lý Sellers</span>
          </div>

          <h1>👥 Quản lý Sellers</h1>
          <p>Quản lý và phê duyệt tài khoản người bán</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                👥
              </div>
              <div className="stat-info">
                <div className="stat-label">Tổng Sellers</div>
                <div className="stat-value">{stats.total}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' }}>
                ✅
              </div>
              <div className="stat-info">
                <div className="stat-label">Đang hoạt động</div>
                <div className="stat-value">{stats.active}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' }}>
                ⏳
              </div>
              <div className="stat-info">
                <div className="stat-label">Chờ duyệt</div>
                <div className="stat-value">{stats.pending}</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}>
                🚫
              </div>
              <div className="stat-info">
                <div className="stat-label">Tạm khóa</div>
                <div className="stat-value">{stats.suspended}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm seller theo tên, email, doanh nghiệp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="status-filters">
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              Tất cả ({sellers.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
              onClick={() => setFilterStatus('active')}
            >
              ✅ Hoạt động ({stats.active})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              ⏳ Chờ duyệt ({stats.pending})
            </button>
            <button
              className={`filter-btn ${filterStatus === 'suspended' ? 'active' : ''}`}
              onClick={() => setFilterStatus('suspended')}
            >
              🚫 Tạm khóa ({stats.suspended})
            </button>
          </div>
        </div>
      </section>

      {/* Sellers Table */}
      <section className="table-section">
        <div className="container">
          <div className="table-card">
            <div className="table-responsive">
              <table className="sellers-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Thông tin</th>
                    <th>Doanh nghiệp</th>
                    <th>Liên hệ</th>
                    <th>Ngày tham gia</th>
                    <th>Sản phẩm</th>
                    <th>Doanh thu</th>
                    <th>Đánh giá</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSellers.map(seller => (
                    <tr key={seller.id}>
                      <td><strong>#{seller.id}</strong></td>
                      <td>
                        <div className="seller-info">
                          <strong>{seller.name}</strong>
                          <div className="seller-email">{seller.email}</div>
                        </div>
                      </td>
                      <td>{seller.businessName}</td>
                      <td>{seller.phone}</td>
                      <td>{formatDate(seller.joinDate)}</td>
                      <td className="text-center">{seller.totalProducts}</td>
                      <td className="amount">{formatPrice(seller.totalSales)}</td>
                      <td>
                        {seller.rating > 0 ? (
                          <div className="rating">
                            ⭐ {seller.rating} ({seller.reviews})
                          </div>
                        ) : (
                          <span className="no-rating">Chưa có</span>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${seller.status}`}>
                          {seller.status === 'active' && '✅ Hoạt động'}
                          {seller.status === 'pending' && '⏳ Chờ duyệt'}
                          {seller.status === 'suspended' && '🚫 Tạm khóa'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {seller.status === 'pending' && (
                            <button
                              className="btn-action approve"
                              onClick={() => handleApproveSeller(seller.id)}
                            >
                              Phê duyệt
                            </button>
                          )}
                          {seller.status === 'active' && (
                            <button
                              className="btn-action suspend"
                              onClick={() => handleSuspendSeller(seller.id)}
                            >
                              Tạm khóa
                            </button>
                          )}
                          {seller.status === 'suspended' && (
                            <button
                              className="btn-action activate"
                              onClick={() => handleActivateSeller(seller.id)}
                            >
                              Kích hoạt
                            </button>
                          )}
                          <button
                            className="btn-action view"
                            onClick={() => setSelectedSeller(seller)}
                          >
                            Chi tiết
                          </button>
                        </div>
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

export default SellersManagementPage;
