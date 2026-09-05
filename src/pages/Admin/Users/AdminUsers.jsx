import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  Shield,
  Store,
  UserX,
  Edit3,
  Trash2,
  Lock,
  Unlock,
  X,
  CheckCircle2,
} from 'lucide-react';
import './AdminUsers.css';

const initialUsers = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'admin@test.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Admin+Master&background=4f46e5&color=fff',
    joinDate: '15/01/2025',
    lastLogin: 'Hôm nay, 10:30',
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: 2,
    name: 'Nguyễn Văn Long',
    email: 'user@test.com',
    role: 'buyer',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+Long&background=0284c7&color=fff',
    joinDate: '20/02/2025',
    lastLogin: 'Hôm qua, 18:45',
    totalOrders: 12,
    totalSpent: 18500000,
  },
  {
    id: 3,
    name: 'Trần Thị Bích',
    email: 'tranthib@gmail.com',
    role: 'buyer',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Bich&background=ec4899&color=fff',
    joinDate: '10/03/2025',
    lastLogin: '2 ngày trước',
    totalOrders: 8,
    totalSpent: 12400000,
  },
  {
    id: 4,
    name: 'Demo Seller Studio',
    email: 'demo@test.com',
    role: 'seller',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Demo+Seller&background=10b981&color=fff',
    joinDate: '01/04/2025',
    lastLogin: 'Vừa xong',
    totalOrders: 25,
    totalSpent: 75000000,
  },
  {
    id: 5,
    name: 'Lê Văn Cường',
    email: 'levanc@gmail.com',
    role: 'buyer',
    status: 'inactive',
    avatar: 'https://ui-avatars.com/api/?name=Le+Van+Cuong&background=f59e0b&color=fff',
    joinDate: '12/05/2025',
    lastLogin: '3 tuần trước',
    totalOrders: 2,
    totalSpent: 2800000,
  },
  {
    id: 6,
    name: 'Phạm Minh Tuấn',
    email: 'phamminhtuan@dev.io',
    role: 'seller',
    status: 'active',
    avatar: 'https://ui-avatars.com/api/?name=Pham+Minh+Tuan&background=8b5cf6&color=fff',
    joinDate: '18/06/2025',
    lastLogin: '3 giờ trước',
    totalOrders: 18,
    totalSpent: 42000000,
  },
  {
    id: 7,
    name: 'Hoàng Văn Em',
    email: 'hoangvanem@spammer.net',
    role: 'buyer',
    status: 'suspended',
    avatar: 'https://ui-avatars.com/api/?name=Hoang+Van+Em&background=ef4444&color=fff',
    joinDate: '22/07/2025',
    lastLogin: '1 tháng trước',
    totalOrders: 0,
    totalSpent: 0,
  },
];

const AdminUsers = () => {
  const [usersList, setUsersList] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleToggleStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản người dùng này?')) {
      setUsersList((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const filteredUsers = usersList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const countBuyers = usersList.filter((u) => u.role === 'buyer').length;
  const countSellers = usersList.filter((u) => u.role === 'seller').length;
  const countAdmins = usersList.filter((u) => u.role === 'admin').length;

  return (
    <div className="admin-page-container">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <Users size={13} />
            <span>Quản trị Thành viên & Phân quyền</span>
          </div>
          <h1 className="admin-page-main-title">Quản lý Tài khoản Người dùng</h1>
          <p className="admin-page-main-desc">
            Theo dõi, phân quyền vai trò (Admin / Seller / Buyer) và kiểm soát trạng thái hoạt động
            của toàn bộ tài khoản
          </p>
        </div>

        <div className="header-stats-badges-row">
          <div className="stat-chip blue">
            <UserCheck size={14} />
            <span>{countBuyers} Khách mua</span>
          </div>
          <div className="stat-chip emerald">
            <Store size={14} />
            <span>{countSellers} Tác giả</span>
          </div>
          <div className="stat-chip purple">
            <Shield size={14} />
            <span>{countAdmins} Super Admin</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="admin-table-toolbar-box">
        <div className="toolbar-search-wrap">
          <Search size={15} className="toolbar-search-icon" />
          <input
            type="text"
            className="toolbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo họ tên, email tài khoản..."
          />
        </div>

        <div className="toolbar-filters-row">
          <div className="toolbar-select-wrap">
            <Filter size={13} className="select-icon" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="toolbar-select-dropdown"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="buyer">Khách mua (Buyer)</option>
              <option value="seller">Tác giả (Seller)</option>
              <option value="admin">Quản trị (Admin)</option>
            </select>
          </div>

          <div className="toolbar-select-wrap">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="toolbar-select-dropdown"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Tạm ngưng</option>
              <option value="suspended">Bị khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="admin-data-table-card">
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Thành viên</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày gia nhập</th>
                <th>Lần đăng nhập cuối</th>
                <th>Tổng đơn / Chi tiêu</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="td-empty-table">
                    <UserX size={32} className="text-muted" />
                    <p>Không tìm thấy người dùng phù hợp với bộ lọc</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="admin-table-row">
                    <td className="td-user-profile">
                      <div className="user-cell-flex">
                        <img src={u.avatar} alt={u.name} className="user-table-avatar" />
                        <div className="user-names-col">
                          <strong className="user-name-txt">{u.name}</strong>
                          <span className="user-email-txt">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="td-role-pill">
                      {u.role === 'admin' && (
                        <span className="role-pill-badge admin">
                          <Shield size={11} />
                          <span>Super Admin</span>
                        </span>
                      )}
                      {u.role === 'seller' && (
                        <span className="role-pill-badge seller">
                          <Store size={11} />
                          <span>Tác giả (Seller)</span>
                        </span>
                      )}
                      {u.role === 'buyer' && (
                        <span className="role-pill-badge buyer">
                          <UserCheck size={11} />
                          <span>Khách mua</span>
                        </span>
                      )}
                    </td>

                    <td className="td-status-pill">
                      {u.status === 'active' && (
                        <span className="status-badge-pill emerald">
                          <CheckCircle2 size={11} />
                          <span>Hoạt động</span>
                        </span>
                      )}
                      {u.status === 'inactive' && (
                        <span className="status-badge-pill amber">
                          <span>Tạm ngưng</span>
                        </span>
                      )}
                      {u.status === 'suspended' && (
                        <span className="status-badge-pill rose">
                          <Lock size={11} />
                          <span>Bị khóa</span>
                        </span>
                      )}
                    </td>

                    <td className="td-date">{u.joinDate}</td>
                    <td className="td-date text-muted">{u.lastLogin}</td>

                    <td className="td-financial">
                      <strong>{u.totalOrders} đơn</strong>
                      <small>{formatVND(u.totalSpent)}</small>
                    </td>

                    <td className="td-actions-buttons">
                      <div className="actions-btn-strip">
                        <button
                          type="button"
                          className="btn-tbl-action"
                          onClick={() => setSelectedUser(u)}
                          title="Xem chi tiết"
                        >
                          <Edit3 size={13} />
                        </button>

                        {u.role !== 'admin' && (
                          <button
                            type="button"
                            className={`btn-tbl-action ${u.status === 'active' ? 'lock' : 'unlock'}`}
                            onClick={() => handleToggleStatus(u.id)}
                            title={u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                          >
                            {u.status === 'active' ? <Lock size={13} /> : <Unlock size={13} />}
                          </button>
                        )}

                        {u.role !== 'admin' && (
                          <button
                            type="button"
                            className="btn-tbl-action delete"
                            onClick={() => handleDeleteUser(u.id)}
                            title="Xóa tài khoản"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-user-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>Thông tin Tài khoản #{selectedUser.id}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setSelectedUser(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-user-body">
              <div className="modal-user-profile-header">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="modal-avatar-lg"
                />
                <div>
                  <h4>{selectedUser.name}</h4>
                  <p>{selectedUser.email}</p>
                </div>
              </div>

              <div className="modal-info-grid">
                <div className="modal-info-field">
                  <span className="field-lbl">Vai trò hiện tại</span>
                  <span className="field-val">{selectedUser.role.toUpperCase()}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Trạng thái</span>
                  <span className="field-val">{selectedUser.status}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Ngày gia nhập</span>
                  <span className="field-val">{selectedUser.joinDate}</span>
                </div>
                <div className="modal-info-field">
                  <span className="field-lbl">Tổng chi tiêu</span>
                  <span className="field-val text-primary">
                    {formatVND(selectedUser.totalSpent)}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-user-footer">
              <button
                type="button"
                className="btn-modal-close-action"
                onClick={() => setSelectedUser(null)}
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
