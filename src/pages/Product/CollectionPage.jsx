import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import ProductCard from '../../components/Product/ProductCard';
import ProductToolbar from '../../components/Product/ProductToolbar';
import Pagination from '../../components/Product/Pagination';
import './CollectionPage.css';

const COLLECTIONS = {
  trending: {
    title: '🔥 Đang thịnh hành',
    description: 'Sản phẩm hot mọi người đang quan tâm',
    filter: (products) => products.filter(p => p.isHot).sort((a, b) => (b.views || 0) - (a.views || 0))
  },
  'best-sellers': {
    title: '🏆 Bán chạy nhất',
    description: 'Sản phẩm bán chạy nhất mọi thời đại',
    filter: (products) => products.filter(p => p.isBestSeller).sort((a, b) => (b.sold || 0) - (a.sold || 0))
  },
  'new-arrivals': {
    title: '✨ Sản phẩm mới',
    description: 'Sản phẩm mới được thêm gần đây',
    filter: (products) => [...products].sort((a, b) => new Date(b.lastUpdate || b.created_at) - new Date(a.lastUpdate || a.created_at))
  },
  'on-sale': {
    title: '💰 Đang giảm giá',
    description: 'Sản phẩm có khuyến mãi đặc biệt',
    filter: (products) => products.filter(p => p.discount && p.discount > 0).sort((a, b) => (b.discount || 0) - (a.discount || 0))
  }
};

const CollectionPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const collection = COLLECTIONS[slug];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (collection) {
        const filteredProducts = collection.filter(mockProducts);
        setProducts(filteredProducts);
      }
      setLoading(false);
    }, 300);
  }, [slug, collection]);

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    let sorted = [...products];
    
    switch(newSort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        sorted.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      default:
        break;
    }
    
    setProducts(sorted);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!collection) {
    return (
      <div className="collection-page">
        <section className="collection-hero error">
          <div className="container">
            <h1>❌ Collection Not Found</h1>
            <p>The collection you're looking for doesn't exist.</p>
            <Link to="/" className="back-btn">← Back to Home</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="collection-page">
      {/* Collection Hero */}
      <section className="collection-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Collections</span>
            <span>/</span>
            <span>{collection.title}</span>
          </div>

          <div className="hero-content">
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            <div className="hero-stats">
              <span className="stat">
                📦 {products.length} products
              </span>
              <span className="stat">
                ⭐ Premium quality
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="collection-tabs">
            {Object.keys(COLLECTIONS).map(key => (
              <Link
                key={key}
                to={`/collections/${key}`}
                className={`collection-tab ${key === slug ? 'active' : ''}`}
              >
                {COLLECTIONS[key].title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <ProductToolbar
            totalProducts={products.length}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading {collection.title}...</p>
            </div>
          ) : currentProducts.length > 0 ? (
            <>
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {currentProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>Chưa có sản phẩm trong bộ sưu tập này</h3>
              <p>Quay lại sau để xem cập nhật!</p>
              <Link to="/products" className="browse-all-btn">
                Xem tất cả sản phẩm
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionPage;
