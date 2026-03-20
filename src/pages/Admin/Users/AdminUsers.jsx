import React, { useState } from 'react';
import './AdminUsers.css';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock users data
  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@test.com',
      role: 'admin',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=667eea&color=fff',
      joinDate: '2025-01-15',
      lastLogin: '2025-10-31',
      totalOrders: 0,
      totalSpent: '$0',
    },
    {
      id: 2,
      name: 'Nguyễn Văn A',
      email: 'user@test.com',
      role: 'buyer',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=764ba2&color=fff',
      joinDate: '2025-02-20',
      lastLogin: '2025-10-30',
      totalOrders: 12,
      totalSpent: '$1,245',
    },
    {
      id: 3,
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      role: 'buyer',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=f093fb&color=fff',
      joinDate: '2025-03-10',
      lastLogin: '2025-10-29',
      totalOrders: 8,
      totalSpent: '$892',
    },
    {
      id: 4,
      name: 'Demo Seller',
      email: 'demo@test.com',
      role: 'seller',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Demo+Seller&background=4caf50&color=fff',
      joinDate: '2025-04-01',
      lastLogin: '2025-10-31',
      totalOrders: 25,
      totalSpent: '$3,240',
    },
    {
      id: 5,
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      role: 'buyer',
      status: 'inactive',
      avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=ff9800&color=fff',
      joinDate: '2025-05-12',
      lastLogin: '2025-08-15',
      totalOrders: 3,
      totalSpent: '$156',
    },
    {
      id: 6,
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      role: 'seller',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Pham+Thi+D&background=e91e63&color=fff',
      joinDate: '2025-06-18',
      lastLogin: '2025-10-30',
      totalOrders: 18,
      totalSpent: '$2,150',
    },
    {
      id: 7,
      name: 'Hoàng Văn E',
      email: 'hoangvane@gmail.com',
      role: 'buyer',
      status: 'suspended',
      avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+E&background=9c27b0&color=fff',
      joinDate: '2025-07-22',
      lastLogin: '2025-09-10',
      totalOrders: 5,
      totalSpent: '$420',
    },
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    sellers: users.filter(u => u.role === 'seller').length,
    buyers: users.filter(u => u.role === 'buyer').length,
  };

  const handleViewDetails = (userId) => {
    console.log('View user:', userId);
  };

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    console.log(`Toggle user ${userId} status to ${newStatus}`);
  };

  return (
    <div className="admin-users-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">👥</span>
            Users Management
          </h1>
          <p className="page-subtitle">Manage all users, sellers, and administrators</p>
        </div>
        <button className="add-user-btn">
          <span className="btn-icon">➕</span>
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="users-stats">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">👤</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Users</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.active}</span>
            <span className="stat-label">Active Users</span>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">🏪</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.sellers}</span>
            <span className="stat-label">Sellers</span>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon-wrapper">
            <span className="stat-icon">🛍️</span>
          </div>
          <div className="stat-content">
            <span className="stat-value">{stats.buyers}</span>
            <span className="stat-label">Buyers</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="users-filters">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Last Login</th>
              <th>Orders</th>
              <th>Spent</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <td>
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' && '🛡️'}
                    {user.role === 'seller' && '🏪'}
                    {user.role === 'buyer' && '🛍️'}
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td className="date-cell">{user.joinDate}</td>
                <td className="date-cell">{user.lastLogin}</td>
                <td className="orders-cell">{user.totalOrders}</td>
                <td className="spent-cell">{user.totalSpent}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn view"
                      onClick={() => handleViewDetails(user.id)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEditUser(user.id)}
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn toggle"
                      onClick={() => handleToggleStatus(user.id, user.status)}
                      title={user.status === 'active' ? 'Suspend' : 'Activate'}
                    >
                      {user.status === 'active' ? '🔒' : '🔓'}
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No users found</p>
          </div>
        )}
      </div>

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

export default AdminUsers;
