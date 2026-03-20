import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './WithdrawalsPage.css';

const mockWithdrawals = [
  {
    id: 'WD-001',
    date: '2025-11-15',
    amount: 15000000,
    method: 'Ngân hàng',
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    status: 'completed',
    processedDate: '2025-11-16'
  },
  {
    id: 'WD-002',
    date: '2025-11-10',
    amount: 8500000,
    method: 'MoMo',
    accountNumber: '0901234567',
    status: 'processing',
    estimatedDate: '2025-11-20'
  },
  {
    id: 'WD-003',
    date: '2025-11-05',
    amount: 12000000,
    method: 'Ngân hàng',
    bankName: 'Techcombank',
    accountNumber: '9876543210',
    status: 'pending'
  }
];

const WithdrawalsPage = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    amount: '',
    method: 'bank',
    bankName: '',
    accountNumber: '',
    accountName: ''
  });

  const availableBalance = 23500000;
  const minimumWithdraw = 500000;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    alert('Yêu cầu rút tiền đã được gửi!');
    setShowWithdrawModal(false);
    setWithdrawForm({
      amount: '',
      method: 'bank',
      bankName: '',
      accountNumber: '',
      accountName: ''
    });
  };

  const totalWithdrawn = mockWithdrawals
    .filter(w => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingAmount = mockWithdrawals
    .filter(w => w.status !== 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="withdrawals-page">
      {/* Header */}
      <section className="withdrawals-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/seller/dashboard">Seller Dashboard</Link>
            <span>/</span>
            <span>Rút tiền</span>
          </div>

          <h1>💳 Quản lý rút tiền</h1>
          <p>Rút tiền về tài khoản ngân hàng hoặc ví điện tử</p>
        </div>
      </section>

      {/* Balance Overview */}
      <section className="balance-section">
        <div className="container">
          <div className="balance-grid">
            <div className="balance-card main">
              <div className="card-header">
                <h3>💰 Số dư khả dụng</h3>
                <button 
                  className="btn-withdraw"
                  onClick={() => setShowWithdrawModal(true)}
                >
                  Rút tiền
                </button>
              </div>
              <div className="balance-amount">{formatPrice(availableBalance)}</div>
              <div className="balance-note">
                Số tiền tối thiểu: {formatPrice(minimumWithdraw)}
              </div>
            </div>

            <div className="balance-card">
              <div className="card-icon">✅</div>
              <div className="card-info">
                <div className="card-label">Đã rút</div>
                <div className="card-value">{formatPrice(totalWithdrawn)}</div>
              </div>
            </div>

            <div className="balance-card">
              <div className="card-icon">⏳</div>
              <div className="card-info">
                <div className="card-label">Đang xử lý</div>
                <div className="card-value">{formatPrice(pendingAmount)}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Withdrawal History */}
      <section className="history-section">
        <div className="container">
          <div className="history-card">
            <h2>📋 Lịch sử rút tiền</h2>
            
            <div className="table-responsive">
              <table className="withdrawals-table">
                <thead>
                  <tr>
                    <th>Mã GD</th>
                    <th>Ngày yêu cầu</th>
                    <th>Số tiền</th>
                    <th>Phương thức</th>
                    <th>Thông tin TK</th>
                    <th>Trạng thái</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {mockWithdrawals.map(withdrawal => (
                    <tr key={withdrawal.id}>
                      <td><strong>{withdrawal.id}</strong></td>
                      <td>{formatDate(withdrawal.date)}</td>
                      <td className="amount">{formatPrice(withdrawal.amount)}</td>
                      <td>
                        {withdrawal.method === 'Ngân hàng' ? '🏦' : '📱'} {withdrawal.method}
                      </td>
                      <td>
                        {withdrawal.bankName && <div><strong>{withdrawal.bankName}</strong></div>}
                        <div>{withdrawal.accountNumber}</div>
                      </td>
                      <td>
                        <span className={`status-badge ${withdrawal.status}`}>
                          {withdrawal.status === 'completed' && '✅ Hoàn thành'}
                          {withdrawal.status === 'processing' && '⚙️ Đang xử lý'}
                          {withdrawal.status === 'pending' && '⏳ Chờ duyệt'}
                        </span>
                      </td>
                      <td>
                        {withdrawal.processedDate && (
                          <span className="note-success">
                            Đã chuyển: {formatDate(withdrawal.processedDate)}
                          </span>
                        )}
                        {withdrawal.estimatedDate && (
                          <span className="note-info">
                            Dự kiến: {formatDate(withdrawal.estimatedDate)}
                          </span>
                        )}
                        {!withdrawal.processedDate && !withdrawal.estimatedDate && (
                          <span className="note-pending">Đang chờ xử lý</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💳 Yêu cầu rút tiền</h2>
              <button className="modal-close" onClick={() => setShowWithdrawModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="withdraw-form">
              <div className="form-group">
                <label>Số tiền muốn rút *</label>
                <input
                  type="number"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({...withdrawForm, amount: e.target.value})}
                  min={minimumWithdraw}
                  max={availableBalance}
                  required
                  placeholder="Nhập số tiền..."
                />
                <div className="form-note">
                  Số dư khả dụng: <strong>{formatPrice(availableBalance)}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>Phương thức *</label>
                <select
                  value={withdrawForm.method}
                  onChange={(e) => setWithdrawForm({...withdrawForm, method: e.target.value})}
                  required
                >
                  <option value="bank">Ngân hàng</option>
                  <option value="momo">MoMo</option>
                  <option value="zalopay">ZaloPay</option>
                </select>
              </div>

              {withdrawForm.method === 'bank' && (
                <div className="form-group">
                  <label>Tên ngân hàng *</label>
                  <input
                    type="text"
                    value={withdrawForm.bankName}
                    onChange={(e) => setWithdrawForm({...withdrawForm, bankName: e.target.value})}
                    required
                    placeholder="VD: Vietcombank, Techcombank..."
                  />
                </div>
              )}

              <div className="form-group">
                <label>Số tài khoản *</label>
                <input
                  type="text"
                  value={withdrawForm.accountNumber}
                  onChange={(e) => setWithdrawForm({...withdrawForm, accountNumber: e.target.value})}
                  required
                  placeholder={withdrawForm.method === 'bank' ? 'Số tài khoản ngân hàng' : 'Số điện thoại'}
                />
              </div>

              <div className="form-group">
                <label>Tên tài khoản *</label>
                <input
                  type="text"
                  value={withdrawForm.accountName}
                  onChange={(e) => setWithdrawForm({...withdrawForm, accountName: e.target.value})}
                  required
                  placeholder="Tên chủ tài khoản"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowWithdrawModal(false)} className="btn-cancel">
                  Hủy
                </button>
                <button type="submit" className="btn-submit">
                  Xác nhận rút tiền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawalsPage;
