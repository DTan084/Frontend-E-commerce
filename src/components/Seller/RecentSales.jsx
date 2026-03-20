import React from 'react';
import './RecentSales.css';

const RecentSales = () => {
  const recentSales = [
    {
      id: 1,
      product: {
        name: 'Premium Admin Panel',
        image: 'https://via.placeholder.com/60x60/667eea/ffffff?text=Admin',
        category: 'Dashboard',
      },
      buyer: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/40x40/48bb78/ffffff?text=JD',
        email: 'john@example.com',
      },
      amount: 99,
      date: '1 hour ago',
      status: 'completed',
    },
    {
      id: 2,
      product: {
        name: 'E-commerce UI Kit',
        image: 'https://via.placeholder.com/60x60/48bb78/ffffff?text=Ecom',
        category: 'UI Kit',
      },
      buyer: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/40x40/ed8936/ffffff?text=JS',
        email: 'jane@example.com',
      },
      amount: 149,
      date: '3 hours ago',
      status: 'completed',
    },
    {
      id: 3,
      product: {
        name: 'Landing Page Builder',
        image: 'https://via.placeholder.com/60x60/ed8936/ffffff?text=Land',
        category: 'Template',
      },
      buyer: {
        name: 'Bob Martin',
        avatar: 'https://via.placeholder.com/40x40/9f7aea/ffffff?text=BM',
        email: 'bob@example.com',
      },
      amount: 79,
      date: '5 hours ago',
      status: 'completed',
    },
    {
      id: 4,
      product: {
        name: 'Mobile App Template',
        image: 'https://via.placeholder.com/60x60/9f7aea/ffffff?text=Mobile',
        category: 'Mobile',
      },
      buyer: {
        name: 'Sarah Wilson',
        avatar: 'https://via.placeholder.com/40x40/f093fb/ffffff?text=SW',
        email: 'sarah@example.com',
      },
      amount: 129,
      date: '8 hours ago',
      status: 'pending',
    },
    {
      id: 5,
      product: {
        name: 'SaaS Dashboard Pro',
        image: 'https://via.placeholder.com/60x60/f093fb/ffffff?text=SaaS',
        category: 'Dashboard',
      },
      buyer: {
        name: 'Mike Johnson',
        avatar: 'https://via.placeholder.com/40x40/38b2ac/ffffff?text=MJ',
        email: 'mike@example.com',
      },
      amount: 199,
      date: '12 hours ago',
      status: 'completed',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'Completed', color: '#48bb78', icon: '✓' },
      pending: { text: 'Pending', color: '#ed8936', icon: '⏳' },
      refunded: { text: 'Refunded', color: '#e53e3e', icon: '↩' },
    };
    return badges[status] || badges.completed;
  };

  return (
    <div className="recent-sales-container">
      <div className="recent-sales-header">
        <div className="header-title-section">
          <h2 className="section-title">
            💸 Recent Sales
          </h2>
          <p className="section-subtitle">
            Your latest transactions
          </p>
        </div>
        <button className="view-all-btn">
          View All →
        </button>
      </div>

      <div className="sales-list">
        {recentSales.map((sale, index) => {
          const statusBadge = getStatusBadge(sale.status);
          return (
            <div
              key={sale.id}
              className="sale-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Info */}
              <div className="sale-product">
                <div className="product-image-wrapper">
                  <img
                    src={sale.product.image}
                    alt={sale.product.name}
                    className="product-image"
                  />
                  <div className="product-category-badge">
                    {sale.product.category}
                  </div>
                </div>
                <div className="product-details">
                  <h4 className="product-name">{sale.product.name}</h4>
                  <span className="product-category">{sale.product.category}</span>
                </div>
              </div>

              {/* Buyer Info */}
              <div className="sale-buyer">
                <img
                  src={sale.buyer.avatar}
                  alt={sale.buyer.name}
                  className="buyer-avatar"
                />
                <div className="buyer-details">
                  <h4 className="buyer-name">{sale.buyer.name}</h4>
                  <span className="buyer-email">{sale.buyer.email}</span>
                </div>
              </div>

              {/* Date */}
              <div className="sale-date">
                <span className="date-icon">🕒</span>
                <span className="date-text">{sale.date}</span>
              </div>

              {/* Amount */}
              <div className="sale-amount">
                <strong className="amount-value">${sale.amount}</strong>
                <span className="amount-label">USD</span>
              </div>

              {/* Status */}
              <div className="sale-status">
                <span
                  className="status-badge"
                  style={{ background: `${statusBadge.color}15`, color: statusBadge.color }}
                >
                  <span className="status-icon">{statusBadge.icon}</span>
                  {statusBadge.text}
                </span>
              </div>

              {/* Actions */}
              <div className="sale-actions">
                <button className="action-btn view-btn" title="View Details">
                  👁️
                </button>
                <button className="action-btn invoice-btn" title="Download Invoice">
                  📄
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (hidden when there are sales) */}
      {recentSales.length === 0 && (
        <div className="empty-sales">
          <div className="empty-icon">💤</div>
          <h3>No Sales Yet</h3>
          <p>Your recent sales will appear here</p>
        </div>
      )}
    </div>
  );
};

export default RecentSales;
