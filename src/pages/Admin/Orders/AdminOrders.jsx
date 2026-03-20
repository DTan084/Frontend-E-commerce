import React, { useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock orders data
  const orders = [
    {
      id: 12345,
      customer: 'John Doe',
      email: 'john@example.com',
      products: 3,
      total: '$245.00',
      status: 'completed',
      payment: 'Credit Card',
      date: '2025-10-31',
      shippingAddress: '123 Main St, New York, NY 10001',
    },
    {
      id: 12344,
      customer: 'Sarah Smith',
      email: 'sarah@example.com',
      products: 2,
      total: '$189.50',
      status: 'processing',
      payment: 'PayPal',
      date: '2025-10-31',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
    },
    {
      id: 12343,
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      products: 5,
      total: '$320.00',
      status: 'shipped',
      payment: 'Credit Card',
      date: '2025-10-30',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
    },
    {
      id: 12342,
      customer: 'Emily Brown',
      email: 'emily@example.com',
      products: 1,
      total: '$156.75',
      status: 'cancelled',
      payment: 'Bank Transfer',
      date: '2025-10-30',
      shippingAddress: '321 Elm St, Houston, TX 77001',
    },
    {
      id: 12341,
      customer: 'David Wilson',
      email: 'david@example.com',
      products: 4,
      total: '$428.00',
      status: 'pending',
      payment: 'COD',
      date: '2025-10-29',
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
    },
    {
      id: 12340,
      customer: 'Lisa Anderson',
      email: 'lisa@example.com',
      products: 2,
      total: '$298.25',
      status: 'completed',
      payment: 'VNPay',
      date: '2025-10-29',
      shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101',
    },
  ];

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    console.log(`Update order ${orderId} to ${newStatus}`);
    setSelectedOrder(null);
  };

  return (
    <div className="admin-orders-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🛒</span>
            Orders Management
          </h1>
          <p className="page-subtitle">Track and manage all customer orders</p>
        </div>
        <button className="export-btn">
          <span className="btn-icon">📥</span>
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="orders-stats">
        <div className="stat-card total">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">📦</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">⏳</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card processing">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">🔄</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.processing}</span>
            <span className="stat-label">Processing</span>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="orders-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by order ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="order-id">#{order.id}</td>
                <td>
                  <div className="customer-info">
                    <span className="customer-name">{order.customer}</span>
                    <span className="customer-email">{order.email}</span>
                  </div>
                </td>
                <td className="products-count">{order.products} items</td>
                <td className="order-total">{order.total}</td>
                <td className="payment-method">{order.payment}</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status === 'pending' && '⏳'}
                    {order.status === 'processing' && '🔄'}
                    {order.status === 'shipped' && '🚚'}
                    {order.status === 'completed' && '✅'}
                    {order.status === 'cancelled' && '❌'}
                    {order.status}
                  </span>
                </td>
                <td className="order-date">{order.date}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewOrder(order)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn print"
                      title="Print Invoice"
                    >
                      🖨️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.id}</h2>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="order-section">
                <h3>🧑 Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.customer}</p>
                <p><strong>Email:</strong> {selectedOrder.email}</p>
                <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
              </div>
              <div className="order-section">
                <h3>💳 Payment Information</h3>
                <p><strong>Method:</strong> {selectedOrder.payment}</p>
                <p><strong>Total:</strong> {selectedOrder.total}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${selectedOrder.status}`}>{selectedOrder.status}</span></p>
              </div>
              <div className="order-section">
                <h3>📦 Order Information</h3>
                <p><strong>Products:</strong> {selectedOrder.products} items</p>
                <p><strong>Order Date:</strong> {selectedOrder.date}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="status-btn pending"
                onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
              >
                Mark as Pending
              </button>
              <button 
                className="status-btn processing"
                onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
              >
                Mark as Processing
              </button>
              <button 
                className="status-btn shipped"
                onClick={() => handleUpdateStatus(selectedOrder.id, 'shipped')}
              >
                Mark as Shipped
              </button>
              <button 
                className="status-btn completed"
                onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn">Previous</button>
        <div className="page-numbers">
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
        </div>
        <button className="page-btn">Next</button>
      </div>
    </div>
  );
};

export default AdminOrders;
