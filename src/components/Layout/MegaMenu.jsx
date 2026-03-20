import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Globe,
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
  Palette,
  FileText,
  Layout,
  Plug,
  Mail,
  Code2,
  Database,
  Blocks,
  Star,
  Zap,
  Flame,
  Clock,
  Crown,
  Gift,
  Upload,
  ArrowRight,
} from 'lucide-react';
import './MegaMenu.css';

const MOCK_FEATURED_PRODUCTS = [
  {
    id: 1,
    title: 'Premium React Admin Dashboard',
    price: 49,
    rating: 4.9,
    reviews: 234,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'E-commerce Mobile App UI Kit',
    price: 39,
    rating: 5.0,
    reviews: 189,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    title: 'Modern Landing Page Template',
    price: 29,
    rating: 4.8,
    reviews: 156,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    title: 'Full Stack SaaS Boilerplate',
    price: 79,
    rating: 4.9,
    reviews: 298,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=200&fit=crop',
  },
];

const MegaMenu = ({ isOpen, onClose }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Categories data with icons and gradients
  const categories = [
    {
      icon: Globe,
      name: 'Web Applications',
      count: 2345,
      slug: 'web-applications',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Smartphone,
      name: 'Mobile Apps',
      count: 1876,
      slug: 'mobile-apps',
      gradient: 'from-purple-400 to-pink-400',
    },
    {
      icon: ShoppingCart,
      name: 'E-commerce',
      count: 1543,
      slug: 'ecommerce',
      gradient: 'from-green-400 to-emerald-400',
    },
    {
      icon: LayoutDashboard,
      name: 'Admin Panels',
      count: 2109,
      slug: 'admin-panels',
      gradient: 'from-orange-400 to-red-400',
    },
    {
      icon: Palette,
      name: 'UI Kits',
      count: 987,
      slug: 'ui-kits',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: FileText,
      name: 'CMS & Blogs',
      count: 765,
      slug: 'cms-blogs',
      gradient: 'from-indigo-400 to-purple-400',
    },
    {
      icon: Layout,
      name: 'Landing Pages',
      count: 1234,
      slug: 'landing-pages',
      gradient: 'from-yellow-400 to-orange-400',
    },
    {
      icon: Plug,
      name: 'Plugins',
      count: 654,
      slug: 'plugins',
      gradient: 'from-cyan-400 to-blue-400',
    },
    {
      icon: Mail,
      name: 'Email Templates',
      count: 432,
      slug: 'email-templates',
      gradient: 'from-teal-400 to-green-400',
    },
    {
      icon: Code2,
      name: 'Scripts & Snippets',
      count: 876,
      slug: 'scripts',
      gradient: 'from-violet-400 to-purple-400',
    },
    {
      icon: Database,
      name: 'Databases',
      count: 321,
      slug: 'databases',
      gradient: 'from-gray-400 to-slate-400',
    },
    {
      icon: Blocks,
      name: 'Components',
      count: 543,
      slug: 'components',
      gradient: 'from-lime-400 to-green-400',
    },
  ];

  // Quick access links
  const quickLinks = [
    {
      icon: Flame,
      label: 'Hot Deals',
      path: '/products?sort=deals',
      iconColor: 'text-orange-500',
      badge: { text: 'Sale', bg: 'bg-red-100', color: 'text-red-600' },
    },
    {
      icon: Star,
      label: 'Top Rated',
      path: '/products?sort=rating',
      iconColor: 'text-yellow-500',
    },
    {
      icon: Clock,
      label: 'New Arrivals',
      path: '/products?sort=newest',
      iconColor: 'text-blue-500',
      badge: { text: 'New', bg: 'bg-green-100', color: 'text-green-600' },
    },
    {
      icon: Crown,
      label: 'Premium Collection',
      path: '/products?type=premium',
      iconColor: 'text-purple-500',
    },
    {
      icon: Gift,
      label: 'Free Items',
      path: '/products?price=free',
      iconColor: 'text-pink-500',
    },
  ];

  // Load featured products
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate async fetch from mock data
      setTimeout(() => {
        setFeaturedProducts(MOCK_FEATURED_PRODUCTS);
        setLoading(false);
      }, 300);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Escape key to close
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  };

  // Navigate handlers
  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
    onClose();
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
    onClose();
  };

  const handleQuickLinkClick = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="mega-menu"
      ref={menuRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="mega-menu-container">
        <div className="mega-menu-grid">
          {/* COLUMN 1-2: MAIN CATEGORIES */}
          <div className="mega-menu-categories">
            <h3 className="mega-menu-section-title">All Categories</h3>

            <div className="categories-grid">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.slug}
                    className="category-item"
                    onClick={() => handleCategoryClick(category.slug)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`category-icon bg-gradient-to-br ${category.gradient}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="category-content">
                      <div className="category-name">{category.name}</div>
                      <div className="category-count">{category.count.toLocaleString()} items</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3: FEATURED PRODUCTS */}
          <div className="mega-menu-featured">
            <h3 className="mega-menu-section-title">
              <Star className="w-4 h-4 inline-block mr-2 text-yellow-500" />
              Featured This Week
            </h3>

            <div className="featured-products-list">
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading...</div>
              ) : (
                <>
                  {featuredProducts.map((product, index) => (
                    <button
                      key={product.id}
                      className="featured-product-card"
                      onClick={() => handleProductClick(product.id)}
                      style={{ animationDelay: `${index * 50 + 200}ms` }}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-thumbnail"
                        loading="lazy"
                      />
                      <div className="product-content">
                        <h4 className="product-title">{product.title}</h4>
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="rating-count">({product.reviews})</span>
                        </div>
                      </div>
                    </button>
                  ))}

                  <Link to="/products?featured=true" className="view-all-link" onClick={onClose}>
                    View all featured →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* COLUMN 4: QUICK LINKS */}
          <div className="mega-menu-quick-links">
            <h3 className="mega-menu-section-title">
              <Zap className="w-4 h-4 inline-block mr-2 text-blue-500" />
              Quick Access
            </h3>

            <div className="quick-links-list">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    className="quick-link-item"
                    onClick={() => handleQuickLinkClick(link.path)}
                    style={{ animationDelay: `${index * 50 + 300}ms` }}
                  >
                    <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    <span className="quick-link-label">{link.label}</span>
                    {link.badge && (
                      <span className={`quick-link-badge ${link.badge.bg} ${link.badge.color}`}>
                        {link.badge.text}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="quick-links-divider"></div>

            {/* CTA Banner */}
            <div className="cta-banner" style={{ animationDelay: '500ms' }}>
              <Upload className="w-8 h-8 text-blue-600 mb-2" />
              <h4 className="cta-title">Become a Seller</h4>
              <p className="cta-description">Start earning by selling your code</p>
              <button
                className="cta-button"
                onClick={() => {
                  navigate('/seller/register');
                  onClose();
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-1 inline-block" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
