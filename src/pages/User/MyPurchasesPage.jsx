import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileCode2, Search, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import PurchasedProductCard from '../../components/Purchases/PurchasedProductCard';
import './MyPurchasesPage.css';

const MyPurchasesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allPurchases = [
    {
      id: 1,
      title: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      category: 'Bán hàng - TMĐT',
      language: 'React 18 • PHP Laravel',
      purchasedDate: '2026-08-20',
      orderId: 'ORD-8921034',
      licenseKey: 'CM-897-82193045-1',
      downloadCount: 3,
      status: 'active',
    },
    {
      id: 2,
      title: 'Mã Nguồn Website Tin Tức - Laravel + Vue.js',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400',
      category: 'Tin tức & Báo chí',
      language: 'Laravel 10 • Vue 3',
      purchasedDate: '2026-08-15',
      orderId: 'ORD-8921033',
      licenseKey: 'CM-1794-82193045-2',
      downloadCount: 5,
      status: 'active',
    },
    {
      id: 3,
      title: 'Admin Dashboard - React Material UI',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      category: 'Giao diện & UI',
      language: 'React • MUI 5 • Vite',
      purchasedDate: '2026-08-10',
      orderId: 'ORD-8921032',
      licenseKey: 'CM-2691-82193045-3',
      downloadCount: 2,
      status: 'active',
    },
    {
      id: 4,
      title: 'Ứng Dụng Đặt Đồ Ăn - Flutter & Firebase',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      category: 'Mobile App',
      language: 'Flutter 3 • Firebase',
      purchasedDate: '2026-08-01',
      orderId: 'ORD-8921031',
      licenseKey: 'CM-3588-82193045-4',
      downloadCount: 4,
      status: 'active',
    },
  ];

  const filteredPurchases = allPurchases.filter((purchase) => {
    const matchesFilter = activeFilter === 'all' || purchase.status === activeFilter;
    const matchesSearch =
      (purchase.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (purchase.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filters = [
    { id: 'all', label: 'Tất cả mã nguồn', count: allPurchases.length },
    {
      id: 'active',
      label: 'License hoạt động',
      count: allPurchases.filter((p) => p.status === 'active').length,
    },
  ];

  return (
    <div className="purchases-page-modern">
      <div className="purchases-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Bàn làm việc', path: '/user/dashboard' },
            { label: 'Kho mã nguồn đã mua', path: null },
          ]}
        />

        <div className="purchases-layout-row">
          {/* User Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Vault Content */}
          <main className="purchases-main-content">
            {/* Header Title Card */}
            <div className="purchases-hero-header-card">
              <div className="purchases-title-group">
                <div className="purchases-icon-wrap">
                  <FileCode2 size={22} className="text-emerald" />
                </div>
                <div>
                  <h1 className="purchases-main-title">Kho mã nguồn sở hữu</h1>
                  <p className="purchases-sub-desc">
                    Tải về source code bản quyền không giới hạn lần tải và kiểm tra cập nhật mới
                    nhất từ tác giả.
                  </p>
                </div>
              </div>

              <div className="purchases-badge-pill-right">
                <ShieldCheck size={14} className="text-emerald" />
                <span>Bảo hành source code trọn đời</span>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="purchases-filter-bar-card">
              <div className="purchases-search-input-wrap">
                <Search size={16} className="search-affix-icon" />
                <input
                  type="text"
                  placeholder="Tìm theo tên mã nguồn hoặc công nghệ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="purchases-search-field"
                />
              </div>

              <div className="purchases-status-tabs-strip">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    className={`vault-tab-btn ${activeFilter === filter.id ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <span>{filter.label}</span>
                    <span className="vault-count-chip">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchases List */}
            <div className="purchases-feed-list">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase) => (
                  <PurchasedProductCard key={purchase.id} product={purchase} />
                ))
              ) : (
                <div className="empty-purchases-view-modern">
                  <div className="empty-icon-halo">
                    <FileCode2 size={40} className="text-muted" />
                  </div>
                  <h3>Chưa có mã nguồn nào trong kho</h3>
                  <p>Bạn chưa sở hữu mã nguồn nào hoặc không tìm thấy kết quả phù hợp.</p>
                  <button
                    type="button"
                    className="btn-explore-vault-cta"
                    onClick={() => navigate('/products')}
                  >
                    Khám phá kho mã nguồn ngay
                  </button>
                </div>
              )}
            </div>

            {/* Summary Metrics */}
            <div className="vault-summary-metrics-strip">
              <div className="metric-box-card">
                <span className="metric-box-title">Tổng mã nguồn sở hữu</span>
                <span className="metric-box-num text-primary">{allPurchases.length} bộ code</span>
              </div>
              <div className="metric-box-card">
                <span className="metric-box-title">Tổng lượt tải .ZIP</span>
                <span className="metric-box-num text-emerald">
                  {allPurchases.reduce((acc, p) => acc + (p.downloadCount || 0), 0)} lượt
                </span>
              </div>
              <div className="metric-box-card">
                <span className="metric-box-title">Trạng thái License</span>
                <span className="metric-box-num text-indigo">100% Hoạt động</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyPurchasesPage;
