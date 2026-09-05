import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import ProductsTable from '../../components/Seller/ProductsTable';
import './MyProductsPage.css';

const MyProductsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([
    {
      id: 1,
      title: 'Mã Nguồn E-commerce React + Laravel',
      category: 'Website TMĐT',
      price: 1800000,
      salePrice: 1500000,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      status: 'active',
      sales: 50,
      rating: 4.8,
      uploadedAt: '2025-10-01',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Giao Diện Admin Dashboard Pro Vue.js',
      category: 'Admin Template',
      price: 1500000,
      salePrice: 1200000,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      status: 'active',
      sales: 42,
      rating: 4.8,
      uploadedAt: '2025-10-15',
      isFeatured: true,
    },
    {
      id: 3,
      title: 'Fullstack SaaS Boilerplate Next.js 14',
      category: 'Fullstack SaaS',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      status: 'pending',
      sales: 0,
      uploadedAt: '2025-10-25',
      isFeatured: false,
    },
    {
      id: 4,
      title: 'Ứng Dụng Flutter Đặt Đồ Ăn 2 Đầu',
      category: 'Mobile App',
      price: 3000000,
      salePrice: 2800000,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      status: 'active',
      sales: 25,
      rating: 4.6,
      uploadedAt: '2025-09-10',
      isFeatured: false,
    },
    {
      id: 5,
      title: 'RESTful API Microservices Spring Boot',
      category: 'Backend API',
      price: 2200000,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      status: 'rejected',
      sales: 0,
      uploadedAt: '2025-10-20',
      rejectionReason: 'Thiếu tệp Docker Compose và hướng dẫn cấu hình database MySQL.',
      isFeatured: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Statistics
  const stats = {
    total: allProducts.length,
    active: allProducts.filter((p) => p.status === 'active').length,
    pending: allProducts.filter((p) => p.status === 'pending').length,
    rejected: allProducts.filter((p) => p.status === 'rejected').length,
    totalSales: allProducts.reduce((sum, p) => sum + (p.sales || 0), 0),
  };

  const handleEdit = (id) => {
    navigate(`/seller/products/${id}/edit`);
  };

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleDelete = (id) => {
    setAllProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const filterTabs = [
    { id: 'all', label: 'Tất cả mã nguồn', count: stats.total },
    {
      id: 'active',
      label: 'Đang bán',
      count: stats.active,
      icon: CheckCircle2,
      color: 'text-emerald',
    },
    { id: 'pending', label: 'Chờ duyệt', count: stats.pending, icon: Clock, color: 'text-amber' },
    {
      id: 'rejected',
      label: 'Cần chỉnh sửa',
      count: stats.rejected,
      icon: AlertCircle,
      color: 'text-danger',
    },
  ];

  return (
    <div className="seller-dashboard-page-modern my-products-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Kênh người bán', path: '/seller/dashboard' },
            { label: 'Kho mã nguồn của tôi', path: null },
          ]}
        />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={user} />

          {/* Main Content Area */}
          <main className="seller-main-workspace">
            {/* Header */}
            <div className="my-products-head-banner">
              <div>
                <h1 className="my-products-title">
                  Kho mã nguồn của tôi <span className="title-count-chip">({stats.total})</span>
                </h1>
                <p className="my-products-subtitle">
                  Quản lý danh sách source code đã tải lên, cập nhật phiên bản và theo dõi trạng
                  thái kiểm duyệt
                </p>
              </div>

              <button
                type="button"
                className="btn-head-upload"
                onClick={() => navigate('/seller/upload')}
              >
                <PlusCircle size={16} />
                <span>Đăng bán mã nguồn mới</span>
              </button>
            </div>

            {/* Filter Tabs Bar */}
            <div className="product-status-tabs-row">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`btn-status-tab ${filterStatus === tab.id ? 'active' : ''}`}
                    onClick={() => {
                      setFilterStatus(tab.id);
                      setCurrentPage(1);
                    }}
                  >
                    {Icon && <Icon size={14} className={tab.color} />}
                    <span>{tab.label}</span>
                    <span className="tab-count-pill">{tab.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Search & Category Filter Controls */}
            <div className="my-products-toolbar">
              <div className="search-input-box-wrapper">
                <Search size={16} className="search-icon-prefix" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên mã nguồn hoặc từ khóa..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="search-input-field"
                />
              </div>

              <div className="category-select-wrapper">
                <Filter size={14} className="filter-select-icon" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="category-dropdown-select"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="Website TMĐT">Website TMĐT</option>
                  <option value="Admin Template">Admin Template</option>
                  <option value="Fullstack SaaS">Fullstack SaaS</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Backend API">Backend API</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <ProductsTable
              products={currentProducts}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="my-products-pagination">
                <button
                  type="button"
                  className="btn-page-nav"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => p - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Trang trước</span>
                </button>

                <div className="page-numbers-strip">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      type="button"
                      className={`btn-page-number ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentPage(i + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-page-nav"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => p + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>Trang sau</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyProductsPage;
