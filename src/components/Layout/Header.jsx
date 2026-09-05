import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Heart,
  Package,
  Shield,
  Users,
  Clock,
  Tag,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Upload,
  Settings,
  Store,
  Code2,
  FolderTree,
  Sparkles,
  ShoppingBag,
  Building2,
  Newspaper,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Home as HomeIcon,
  Plane,
  GraduationCap,
  Laptop,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import SmartSearchBar from '../Search/SmartSearchBar';
import './Header.css';

// User Avatar with resilient Initials Fallback
const UserAvatar = ({ user, size = 'normal' }) => {
  const [imgError, setImgError] = useState(false);
  const name = user?.name || 'User';

  const getInitials = (n) => {
    if (!n) return 'U';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (user?.avatar && !imgError) {
    return (
      <img
        src={user.avatar}
        alt={name}
        className={`header-avatar ${size}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`header-avatar-initials ${size}`} title={name}>
      {getInitials(name)}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart, items } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const userMenuRef = useRef(null);
  const categoriesMenuRef = useRef(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(e.target)) {
        setShowCategoriesMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setShowUserMenu(false);
    setShowCategoriesMenu(false);
    setShowMobileMenu(false);
    setShowMobileSearch(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowMobileSearch(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const cartList = items || cart || [];
  const cartItemCount = cartList.length;

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Left Section - Logo & Categories */}
          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
            </Link>

            {/* Categories Dropdown Trigger */}
            <div className="categories-dropdown desktop-only" ref={categoriesMenuRef}>
              <button
                type="button"
                className={`categories-btn ${showCategoriesMenu ? 'active' : ''}`}
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              >
                <FolderTree size={16} />
                <span>Danh mục</span>
                <ChevronDown
                  size={14}
                  className={`arrow-icon ${showCategoriesMenu ? 'rotated' : ''}`}
                />
              </button>

              {showCategoriesMenu && (
                <div className="categories-popover">
                  <CategoriesMenu onClose={() => setShowCategoriesMenu(false)} />
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="header-center">
            <SmartSearchBar onSearch={handleSearch} />
          </div>

          {/* Right Section - Navigation & Actions */}
          <div className="header-right">
            {/* Quick Explore Link */}
            <Link to="/products" className="header-explore-btn desktop-only">
              <Sparkles size={16} />
              <span>Khám phá</span>
            </Link>

            {/* Become Seller CTA */}
            {(!user || user.role !== 'seller') && (
              <Link to="/become-seller" className="seller-cta-btn desktop-only">
                <Store size={15} />
                <span>Bán code</span>
              </Link>
            )}

            {/* Cart Button */}
            <Link to="/cart" className="cart-btn" aria-label="Giỏ hàng">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </Link>

            {/* Mobile Search Trigger */}
            <button
              type="button"
              className="mobile-search-btn mobile-only"
              onClick={() => setShowMobileSearch(true)}
              aria-label="Tìm kiếm"
            >
              <Search size={20} />
            </button>

            {/* User Menu / Auth Buttons */}
            {user ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  type="button"
                  className={`user-trigger-btn ${showUserMenu ? 'active' : ''}`}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="Menu tài khoản"
                >
                  <UserAvatar user={user} size="normal" />
                  <span className="user-name-label desktop-only">{user.name}</span>
                  <ChevronDown
                    size={14}
                    className={`user-arrow desktop-only ${showUserMenu ? 'rotated' : ''}`}
                  />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown-card">
                    {/* User Header Summary */}
                    <div className="user-dropdown-header">
                      <UserAvatar user={user} size="large" />
                      <div className="user-dropdown-info">
                        <p className="user-dropdown-name">{user.name}</p>
                        <p className="user-dropdown-email">{user.email}</p>
                        <span className={`role-pill ${user.role}`}>
                          {user.role === 'admin'
                            ? 'Quản trị viên'
                            : user.role === 'seller'
                              ? 'Người bán'
                              : 'Khách hàng'}
                        </span>
                      </div>
                    </div>

                    <div className="dropdown-divider" />

                    {/* Customer Links */}
                    <div className="dropdown-group">
                      <Link to="/profile" className="dropdown-item">
                        <User size={16} />
                        <span>Hồ sơ cá nhân</span>
                      </Link>
                      <Link to="/user/dashboard" className="dropdown-item">
                        <LayoutDashboard size={16} />
                        <span>Bàn làm việc</span>
                      </Link>
                      <Link to="/user/orders" className="dropdown-item">
                        <Package size={16} />
                        <span>Đơn hàng & Mã nguồn đã mua</span>
                      </Link>
                      <Link to="/wishlist" className="dropdown-item">
                        <Heart size={16} />
                        <span>Danh sách yêu thích</span>
                      </Link>
                    </div>

                    {/* Seller Links */}
                    {(user.role === 'seller' || user.role === 'admin') && (
                      <>
                        <div className="dropdown-divider" />
                        <div className="dropdown-group-title">Kênh người bán</div>
                        <div className="dropdown-group">
                          <Link to="/seller/dashboard" className="dropdown-item">
                            <Store size={16} />
                            <span>Tổng quan kinh doanh</span>
                          </Link>
                          <Link to="/seller/products" className="dropdown-item">
                            <ShoppingBag size={16} />
                            <span>Quản lý sản phẩm</span>
                          </Link>
                          <Link to="/seller/upload" className="dropdown-item highlight">
                            <Upload size={16} />
                            <span>Đăng mã nguồn mới</span>
                          </Link>
                          <Link to="/seller/sales" className="dropdown-item">
                            <TrendingUp size={16} />
                            <span>Doanh số bán hàng</span>
                          </Link>
                          <Link to="/seller/withdrawals" className="dropdown-item">
                            <Wallet size={16} />
                            <span>Yêu cầu rút tiền</span>
                          </Link>
                        </div>
                      </>
                    )}

                    {/* Admin Links */}
                    {user.role === 'admin' && (
                      <>
                        <div className="dropdown-divider" />
                        <div className="dropdown-group-title">Quản trị hệ thống</div>
                        <div className="dropdown-group">
                          <Link to="/admin" className="dropdown-item">
                            <Shield size={16} />
                            <span>Bảng quản trị Admin</span>
                          </Link>
                          <Link
                            to="/admin/products/pending"
                            className="dropdown-item highlight-admin"
                          >
                            <Clock size={16} />
                            <span>Duyệt sản phẩm chờ</span>
                          </Link>
                          <Link to="/admin/users" className="dropdown-item">
                            <Users size={16} />
                            <span>Quản lý thành viên</span>
                          </Link>
                          <Link to="/admin/sellers" className="dropdown-item">
                            <Store size={16} />
                            <span>Quản lý người bán</span>
                          </Link>
                          <Link to="/admin/orders" className="dropdown-item">
                            <Package size={16} />
                            <span>Quản lý đơn hàng</span>
                          </Link>
                          <Link to="/admin/categories" className="dropdown-item">
                            <Tag size={16} />
                            <span>Quản lý danh mục</span>
                          </Link>
                        </div>
                      </>
                    )}

                    <div className="dropdown-divider" />

                    {/* Footer Actions */}
                    <div className="dropdown-group">
                      <Link to="/profile" className="dropdown-item">
                        <Settings size={16} />
                        <span>Cài đặt tài khoản</span>
                      </Link>
                      <button type="button" className="dropdown-item logout" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons desktop-only">
                <Link to="/auth/login" className="btn-login">
                  Đăng nhập
                </Link>
                <Link to="/auth/register" className="btn-signup">
                  Đăng ký
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-btn mobile-only"
              onClick={() => setShowMobileMenu(true)}
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Drawer */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-header">
            <h3>Tìm kiếm mã nguồn</h3>
            <button type="button" onClick={() => setShowMobileSearch(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="mobile-search-content">
            <SmartSearchBar onSearch={handleSearch} />
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {showMobileMenu && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setShowMobileMenu(false)} />
          <div className="mobile-menu-sidebar">
            <div className="mobile-menu-header">
              <div className="logo">
                <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
              </div>
              <button type="button" className="close-btn" onClick={() => setShowMobileMenu(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {user ? (
                <div className="mobile-user-card">
                  <UserAvatar user={user} size="normal" />
                  <div className="mobile-user-details">
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-actions">
                  <Link
                    to="/auth/login"
                    className="btn-login-mobile"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/auth/register"
                    className="btn-signup-mobile"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Đăng ký tài khoản
                  </Link>
                </div>
              )}

              <div className="mobile-nav-section">
                <Link to="/" className="mobile-nav-item" onClick={() => setShowMobileMenu(false)}>
                  <Code2 size={18} />
                  <span>Trang chủ</span>
                </Link>
                <Link
                  to="/products"
                  className="mobile-nav-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Sparkles size={18} />
                  <span>Khám phá sản phẩm</span>
                </Link>
                <Link
                  to="/categories"
                  className="mobile-nav-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FolderTree size={18} />
                  <span>Tất cả danh mục</span>
                </Link>
                <Link
                  to="/become-seller"
                  className="mobile-nav-item"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Store size={18} />
                  <span>Trở thành người bán</span>
                </Link>
              </div>

              {user && (
                <>
                  <div className="mobile-nav-divider">Tài khoản</div>
                  <div className="mobile-nav-section">
                    <Link
                      to="/user/dashboard"
                      className="mobile-nav-item"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <LayoutDashboard size={18} />
                      <span>Bàn làm việc</span>
                    </Link>
                    <Link
                      to="/user/orders"
                      className="mobile-nav-item"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Package size={18} />
                      <span>Đơn hàng & Code đã mua</span>
                    </Link>
                    <Link
                      to="/wishlist"
                      className="mobile-nav-item"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Heart size={18} />
                      <span>Yêu thích</span>
                    </Link>
                  </div>

                  {(user.role === 'seller' || user.role === 'admin') && (
                    <>
                      <div className="mobile-nav-divider">Kênh người bán</div>
                      <div className="mobile-nav-section">
                        <Link
                          to="/seller/dashboard"
                          className="mobile-nav-item"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Store size={18} />
                          <span>Tổng quan người bán</span>
                        </Link>
                        <Link
                          to="/seller/upload"
                          className="mobile-nav-item"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Upload size={18} />
                          <span>Đăng mã nguồn</span>
                        </Link>
                        <Link
                          to="/seller/products"
                          className="mobile-nav-item"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <ShoppingBag size={18} />
                          <span>Mã nguồn của tôi</span>
                        </Link>
                      </div>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <div className="mobile-nav-divider">Quản trị</div>
                      <div className="mobile-nav-section">
                        <Link
                          to="/admin"
                          className="mobile-nav-item"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Shield size={18} />
                          <span>Bảng điều khiển Admin</span>
                        </Link>
                        <Link
                          to="/admin/products/pending"
                          className="mobile-nav-item"
                          onClick={() => setShowMobileMenu(false)}
                        >
                          <Clock size={18} />
                          <span>Duyệt sản phẩm</span>
                        </Link>
                      </div>
                    </>
                  )}

                  <div className="mobile-nav-section footer-actions">
                    <button type="button" className="mobile-nav-item logout" onClick={handleLogout}>
                      <LogOut size={18} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

// Categories Popover Menu Component with Icons & Colors
const categoryIconMap = {
  'ban-hang-tmdt': ShoppingBag,
  'gioi-thieu-dich-vu': Building2,
  'tin-tuc': Newspaper,
  'quan-ly': BarChart3,
  'giai-tri': Gamepad2,
  'dien-dan': MessageSquare,
  'bat-dong-san': HomeIcon,
  'du-lich-khach-san': Plane,
  'giao-duc-y-te': GraduationCap,
  'may-tinh-dich-vu': Laptop,
  khac: Code2,
};

const categoryColorMap = {
  'ban-hang-tmdt': { color: '#4f46e5', bg: 'rgba(79, 70, 229, 0.1)' },
  'gioi-thieu-dich-vu': { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)' },
  'tin-tuc': { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
  'quan-ly': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
  'giai-tri': { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  'dien-dan': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
  'bat-dong-san': { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
  'du-lich-khach-san': { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
  'giao-duc-y-te': { color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.1)' },
  'may-tinh-dich-vu': { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.1)' },
  khac: { color: '#64748b', bg: 'rgba(100, 116, 139, 0.1)' },
};

const CategoriesMenu = ({ onClose }) => {
  const allProducts = getAllProducts();
  const categories = getAllCategories()
    .map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: allProducts.filter((p) => p.category === cat.id).length,
      link: `/products?category=${cat.id}`,
    }))
    .filter((cat) => cat.count > 0);

  return (
    <div className="categories-menu-card">
      <div className="categories-menu-header">
        <FolderTree size={15} />
        <span>DANH MỤC MÃ NGUỒN</span>
      </div>

      <div className="categories-grid-list">
        {categories.map((category) => {
          const IconComp = categoryIconMap[category.id] || Code2;
          const styling = categoryColorMap[category.id] || {
            color: '#4f46e5',
            bg: 'rgba(79, 70, 229, 0.1)',
          };

          return (
            <Link
              key={category.id}
              to={category.link}
              className="category-menu-item"
              onClick={onClose}
            >
              <div className="category-menu-item-left">
                <div
                  className="category-item-icon-box"
                  style={{ backgroundColor: styling.bg, color: styling.color }}
                >
                  <IconComp size={15} />
                </div>
                <span className="category-item-name">{category.name}</span>
              </div>
              <span className="category-item-count">{category.count} sản phẩm</span>
            </Link>
          );
        })}
      </div>

      <div className="categories-menu-footer">
        <Link to="/categories" className="view-all-categories-link" onClick={onClose}>
          <span>Xem tất cả danh mục</span>
          <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
