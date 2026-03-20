import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAllCategories } from '../../data/categories';
import { getAllProducts } from '../../data/mockProducts';
import SmartSearchBar from '../Search/SmartSearchBar';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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

  const cartItemCount = cart?.length || 0;

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Left Section - Logo */}
          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/logo_tmdt.png" alt="TMDT Logo" className="logo-image" />
              <span className="logo-text">TMDT</span>
            </Link>
          </div>

          {/* Center Section - Search */}
          <div className="header-center">
            <SmartSearchBar onSearch={handleSearch} />
          </div>

          {/* Right Section - Navigation */}
          <div className="header-right">
            {/* Categories Dropdown - Desktop Only */}
            <div className="categories-dropdown desktop-only" ref={categoriesMenuRef}>
              <button
                className="categories-btn"
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              >
                <span>Danh mục</span>
                <ChevronDownIcon className={showCategoriesMenu ? 'rotated' : ''} />
              </button>
              
              {showCategoriesMenu && (
                <div className="categories-menu">
                  <CategoriesMenu onClose={() => setShowCategoriesMenu(false)} />
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="cart-btn">
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </Link>

            {/* Mobile Search Button */}
            <button 
              className="mobile-search-btn mobile-only"
              onClick={() => setShowMobileSearch(true)}
            >
              <SearchIcon />
            </button>

            {/* User Menu */}
            {user ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt={user.name}
                    className="user-avatar"
                  />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <img
                        src={user.avatar || 'https://via.placeholder.com/40'}
                        alt={user.name}
                        className="user-avatar-large"
                      />
                      <div className="user-details">
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    {/* User Menu Items */}
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <UserIcon />
                      <span>Hồ sơ</span>
                    </Link>

                    <Link to="/user/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <OrdersIcon />
                      <span>Đơn hàng của tôi</span>
                    </Link>

                    <Link to="/wishlist" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <HeartIcon />
                      <span>Yêu thích</span>
                    </Link>

                    {/* Seller Menu Items */}
                    {(user.role === 'seller' || user.role === 'admin') && (
                      <>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-section-title">Khu vực người bán</div>
                        
                        <Link to="/seller/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <DashboardIcon />
                          <span>Bảng điều khiển</span>
                        </Link>

                        <Link to="/seller/products" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <BoxIcon />
                          <span>Sản phẩm của tôi</span>
                        </Link>

                        <Link to="/seller/sales" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <TrendingUpIcon />
                          <span>Doanh số & Doanh thu</span>
                        </Link>

                        <Link to="/seller/withdrawals" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <WalletIcon />
                          <span>Rút tiền</span>
                        </Link>

                        <Link to="/seller/upload" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <UploadIcon />
                          <span>Đăng sản phẩm</span>
                        </Link>
                      </>
                    )}

                    {/* Admin Menu Items */}
                    {user.role === 'admin' && (
                      <>
                        <div className="dropdown-divider"></div>
                        <div className="dropdown-section-title">Khu vực quản trị</div>
                        
                        <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <ShieldIcon />
                          <span>Bảng quản trị</span>
                        </Link>

                        <Link to="/admin/users" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <UsersIcon />
                          <span>Quản lý người dùng</span>
                        </Link>

                        <Link to="/admin/sellers" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <StoreIcon />
                          <span>Quản lý người bán</span>
                        </Link>

                        <Link to="/admin/products" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <BoxIcon />
                          <span>Sản phẩm</span>
                        </Link>

                        <Link to="/admin/products/pending" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <ClockIcon />
                          <span>Sản phẩm chờ duyệt</span>
                        </Link>

                        <Link to="/admin/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <OrdersIcon />
                          <span>Quản lý đơn hàng</span>
                        </Link>

                        <Link to="/admin/categories" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                          <TagIcon />
                          <span>Quản lý danh mục</span>
                        </Link>
                      </>
                    )}

                    <div className="dropdown-divider"></div>

                    <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <SettingsIcon />
                      <span>Cài đặt</span>
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <LogOutIcon />
                      <span>Đăng xuất</span>
                    </button>
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
              className="mobile-menu-btn mobile-only"
              onClick={() => setShowMobileMenu(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-header">
            <h3>Search</h3>
            <button onClick={() => setShowMobileSearch(false)}>
              <XIcon />
            </button>
          </div>
          <div className="mobile-search-content">
            <SmartSearchBar onSearch={handleSearch} />
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {showMobileMenu && (
        <>
          <div 
            className="mobile-menu-overlay"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="mobile-menu-sidebar">
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button onClick={() => setShowMobileMenu(false)}>
                <XIcon />
              </button>
            </div>

            <nav className="mobile-menu-nav">
              {user && (
                <div className="mobile-user-info">
                  <img
                    src={user.avatar || 'https://via.placeholder.com/40'}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
              )}

              <Link to="/" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                <HomeIcon />
                <span>Home</span>
              </Link>

              <div className="mobile-categories">
                <button className="mobile-menu-item">
                  <GridIcon />
                  <span>Categories</span>
                  <ChevronDownIcon className="ml-auto" />
                </button>
              </div>

              <Link to="/become-seller" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                <StoreIcon />
                <span>Become a Seller</span>
              </Link>

              {user ? (
                <>
                  {/* User Menu Items */}
                  <Link to="/profile" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                    <UserIcon />
                    <span>My Account</span>
                  </Link>

                  <Link to="/user/orders" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                    <OrdersIcon />
                    <span>My Orders</span>
                  </Link>

                  <Link to="/wishlist" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                    <HeartIcon />
                    <span>Wishlist</span>
                  </Link>

                  {/* Seller Menu Items */}
                  {(user.role === 'seller' || user.role === 'admin') && (
                    <>
                      <div className="mobile-menu-divider">
                        <span>Seller Area</span>
                      </div>

                      <Link to="/seller/dashboard" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <DashboardIcon />
                        <span>Seller Dashboard</span>
                      </Link>

                      <Link to="/seller/products" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <BoxIcon />
                        <span>My Products</span>
                      </Link>

                      <Link to="/seller/sales" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <TrendingUpIcon />
                        <span>Sales & Revenue</span>
                      </Link>

                      <Link to="/seller/withdrawals" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <WalletIcon />
                        <span>Withdrawals</span>
                      </Link>

                      <Link to="/seller/upload" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <UploadIcon />
                        <span>Upload Product</span>
                      </Link>
                    </>
                  )}

                  {/* Admin Menu Items */}
                  {user.role === 'admin' && (
                    <>
                      <div className="mobile-menu-divider">
                        <span>Admin Area</span>
                      </div>

                      <Link to="/admin" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <ShieldIcon />
                        <span>Admin Dashboard</span>
                      </Link>

                      <Link to="/admin/users" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <UsersIcon />
                        <span>Users Management</span>
                      </Link>

                      <Link to="/admin/sellers" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <StoreIcon />
                        <span>Sellers Management</span>
                      </Link>

                      <Link to="/admin/products" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <BoxIcon />
                        <span>Products</span>
                      </Link>

                      <Link to="/admin/products/pending" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <ClockIcon />
                        <span>Pending Products</span>
                      </Link>

                      <Link to="/admin/orders" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <OrdersIcon />
                        <span>Orders Management</span>
                      </Link>

                      <Link to="/admin/categories" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                        <TagIcon />
                        <span>Categories</span>
                      </Link>
                    </>
                  )}

                  <Link to="/settings" className="mobile-menu-item" onClick={() => setShowMobileMenu(false)}>
                    <SettingsIcon />
                    <span>Cài đặt</span>
                  </Link>

                  <button className="mobile-menu-item logout" onClick={handleLogout}>
                    <LogOutIcon />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link 
                    to="/auth/login" 
                    className="btn-login" 
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/auth/register" 
                    className="btn-signup" 
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

// Categories Menu Component
const CategoriesMenu = ({ onClose }) => {
  // Get categories from centralized config with actual product counts
  const allProducts = getAllProducts();
  const categories = getAllCategories().map(cat => ({
    name: cat.name,
    icon: cat.icon,
    count: allProducts.filter(p => p.category === cat.id).length,
    link: `/products?category=${cat.id}`
  })).filter(cat => cat.count > 0); // Only show categories with products

  return (
    <div className="user-dropdown">
      <div className="dropdown-section-title">Duyệt theo danh mục</div>
      
      {categories.map(category => (
        <Link
          key={category.name}
          to={category.link}
          className="dropdown-item"
          onClick={onClose}
        >
          <span>{category.name}</span>
        </Link>
      ))}

      <div className="dropdown-divider"></div>
      
      <Link to="/categories" className="dropdown-item" onClick={onClose}>
        <span>📦</span>
        <span>Xem tất cả danh mục</span>
      </Link>
    </div>
  );
};

// Custom SVG Icons
// eslint-disable-next-line no-unused-vars
const Code2Icon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m6-12h-6m-6 0h6m9 3.2 1 1.7m-18 0 1-1.7m15.6 8.6-1-1.7m-15.6 0-1 1.7M20 12h-6m-6 0H2" />
  </svg>
);

// eslint-disable-next-line no-unused-vars
const PackageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const StoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const WalletIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export default Header;
