import React, { useState } from 'react';
import { Wallet, Clock, CheckCircle2, PlusCircle, X, CreditCard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import './WithdrawalsPage.css';

const mockWithdrawals = [
  {
    id: 'WD-001',
    date: '2025-11-15',
    amount: 15000000,
    method: 'Ngân hàng',
    bankName: 'Vietcombank',
    accountNumber: '1234567890',
    accountName: 'NGUYEN VAN LONG',
    status: 'completed',
    processedDate: '2025-11-16',
  },
  {
    id: 'WD-002',
    date: '2025-11-10',
    amount: 8500000,
    method: 'Ví MoMo',
    accountNumber: '0901234567',
    accountName: 'NGUYEN VAN LONG',
    status: 'processing',
    estimatedDate: '2025-11-20',
  },
  {
    id: 'WD-003',
    date: '2025-11-05',
    amount: 12000000,
    method: 'Ngân hàng',
    bankName: 'Techcombank',
    accountNumber: '9876543210',
    accountName: 'NGUYEN VAN LONG',
    status: 'completed',
    processedDate: '2025-11-06',
  },
];

const VIETNAM_BANKS = [
  'Vietcombank - Ngân hàng Ngoại thương Việt Nam',
  'MB Bank - Ngân hàng Quân Đội',
  'Techcombank - Ngân hàng Kỹ Thương',
  'ACB - Ngân hàng Á Châu',
  'VPBank - Ngân hàng Việt Nam Thịnh Vượng',
  'TPBank - Ngân hàng Tiên Phong',
  'BIDV - Ngân hàng Đầu tư và Phát triển',
  'VietinBank - Ngân hàng Công Thương',
  'Ví MoMo (SĐT đăng ký)',
];

const WithdrawalsPage = () => {
  const { user } = useAuth();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawList, setWithdrawList] = useState(mockWithdrawals);

  const [withdrawForm, setWithdrawForm] = useState({
    amount: '',
    bankName: VIETNAM_BANKS[0],
    accountNumber: '',
    accountName: '',
  });

  const availableBalance = 23500000;
  const minimumWithdraw = 500000;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(withdrawForm.amount);
    if (!numAmount || numAmount < minimumWithdraw) {
      alert(`Số tiền rút tối thiểu là ${formatPrice(minimumWithdraw)}!`);
      return;
    }
    if (numAmount > availableBalance) {
      alert('Số dư khả dụng không đủ để thực hiện giao dịch này!');
      return;
    }

    const newWithdrawal = {
      id: `WD-00${withdrawList.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      amount: numAmount,
      method: withdrawForm.bankName.includes('MoMo') ? 'Ví MoMo' : 'Ngân hàng',
      bankName: withdrawForm.bankName,
      accountNumber: withdrawForm.accountNumber,
      accountName: withdrawForm.accountName.toUpperCase(),
      status: 'processing',
      estimatedDate: 'Trong vòng 24 giờ',
    };

    setWithdrawList([newWithdrawal, ...withdrawList]);
    setShowWithdrawModal(false);
    setWithdrawForm({
      amount: '',
      bankName: VIETNAM_BANKS[0],
      accountNumber: '',
      accountName: '',
    });
    alert('Yêu cầu rút tiền đã được ghi nhận và đang được xử lý giải ngân!');
  };

  const totalWithdrawn = withdrawList
    .filter((w) => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingAmount = withdrawList
    .filter((w) => w.status !== 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="seller-dashboard-page-modern withdrawals-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Kênh người bán', path: '/seller/dashboard' },
            { label: 'Rút tiền & Ngân hàng', path: null },
          ]}
        />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={user} />

          {/* Main Content */}
          <main className="seller-main-workspace">
            {/* Header */}
            <div className="withdrawals-head-banner">
              <div>
                <h1 className="withdrawals-main-title">Quản lý số dư & Rút tiền</h1>
                <p className="withdrawals-main-subtitle">
                  Rút doanh thu bán mã nguồn về tài khoản ngân hàng nội địa Việt Nam hoặc ví điện tử
                </p>
              </div>

              <button
                type="button"
                className="btn-create-payout"
                onClick={() => setShowWithdrawModal(true)}
              >
                <PlusCircle size={15} />
                <span>Tạo lệnh rút tiền</span>
              </button>
            </div>

            {/* Balances Overview Grid */}
            <div className="withdrawals-overview-grid">
              <div className="payout-card-main">
                <div className="payout-card-header">
                  <div className="payout-head-title">
                    <Wallet size={18} className="text-primary" />
                    <span>Số dư khả dụng</span>
                  </div>
                  <span className="payout-escrow-tag">
                    <ShieldCheck size={12} className="text-emerald" />
                    <span>Bảo vệ Escrow</span>
                  </span>
                </div>

                <div className="payout-balance-amount">{formatPrice(availableBalance)}</div>

                <div className="payout-card-footer">
                  <span>
                    Hạn mức rút tối thiểu: <strong>{formatPrice(minimumWithdraw)}</strong>
                  </span>
                </div>
              </div>

              <div className="payout-metric-box emerald">
                <div className="metric-box-head">
                  <span className="metric-box-lbl">Đã rút thành công</span>
                  <div className="metric-box-icon emerald">
                    <CheckCircle2 size={16} />
                  </div>
                </div>
                <h3 className="metric-box-val">{formatPrice(totalWithdrawn)}</h3>
                <span className="metric-box-sub">Tất cả các đợt rút</span>
              </div>

              <div className="payout-metric-box amber">
                <div className="metric-box-head">
                  <span className="metric-box-lbl">Đang chờ xử lý</span>
                  <div className="metric-box-icon amber">
                    <Clock size={16} />
                  </div>
                </div>
                <h3 className="metric-box-val">{formatPrice(pendingAmount)}</h3>
                <span className="metric-box-sub">Dự kiến hoàn tất trong 24h</span>
              </div>
            </div>

            {/* Payout History Table */}
            <div className="withdrawals-history-card">
              <div className="history-table-header">
                <h3 className="history-table-title">Lịch sử các đợt rút tiền</h3>
                <span className="history-count-pill">{withdrawList.length} giao dịch</span>
              </div>

              <div className="table-responsive-wrapper">
                <table className="withdrawals-data-table">
                  <thead>
                    <tr>
                      <th>Mã giao dịch</th>
                      <th>Ngày yêu cầu</th>
                      <th>Số tiền rút</th>
                      <th>Tài khoản thụ hưởng</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawList.map((wd) => (
                      <tr key={wd.id} className="withdrawal-row">
                        <td className="td-wd-id">
                          <strong>{wd.id}</strong>
                        </td>
                        <td className="td-wd-date">
                          <span>{formatDate(wd.date)}</span>
                        </td>
                        <td className="td-wd-amount">
                          <strong className="text-primary">{formatPrice(wd.amount)}</strong>
                        </td>
                        <td className="td-wd-account">
                          <div className="wd-account-cell">
                            <span className="account-bank-name">{wd.bankName}</span>
                            <span className="account-owner-info">
                              {wd.accountNumber} • {wd.accountName || 'CHỦ TÀI KHOẢN'}
                            </span>
                          </div>
                        </td>
                        <td className="td-wd-status">
                          {wd.status === 'completed' ? (
                            <span className="status-badge-pill status-active">
                              <CheckCircle2 size={12} />
                              <span>Đã chuyển tiền</span>
                            </span>
                          ) : (
                            <span className="status-badge-pill status-pending">
                              <Clock size={12} />
                              <span>Đang xử lý</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Payout Modal */}
      {showWithdrawModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-payout-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-payout-header">
              <div className="modal-title-wrap">
                <CreditCard size={18} className="text-primary" />
                <h3>Yêu cầu rút tiền về Ngân hàng</h3>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowWithdrawModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="modal-payout-form">
              <div className="form-field-group">
                <label className="form-field-label">
                  Số tiền muốn rút (VNĐ) <span className="required-star">*</span>
                </label>
                <input
                  type="number"
                  className="form-input-text"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                  placeholder={`Tối thiểu ${minimumWithdraw.toLocaleString()} ₫`}
                  min={minimumWithdraw}
                  max={availableBalance}
                  required
                />
                <span className="field-hint-text">
                  Số dư khả dụng: {formatPrice(availableBalance)}
                </span>
              </div>

              <div className="form-field-group">
                <label className="form-field-label">
                  Ngân hàng / Ví nhận tiền <span className="required-star">*</span>
                </label>
                <select
                  className="form-select-box"
                  value={withdrawForm.bankName}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })}
                >
                  {VIETNAM_BANKS.map((bank, idx) => (
                    <option key={idx} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-fields-grid-2">
                <div className="form-field-group">
                  <label className="form-field-label">
                    Số tài khoản <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input-text"
                    value={withdrawForm.accountNumber}
                    onChange={(e) =>
                      setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value })
                    }
                    placeholder="Ví dụ: 1029384756"
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">
                    Tên chủ tài khoản (In hoa) <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input-text"
                    value={withdrawForm.accountName}
                    onChange={(e) =>
                      setWithdrawForm({ ...withdrawForm, accountName: e.target.value })
                    }
                    placeholder="NGUYEN VAN A"
                    required
                  />
                </div>
              </div>

              <div className="modal-payout-actions">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setShowWithdrawModal(false)}
                >
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-modal-confirm">
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
