import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import CheckoutProgress from '../../components/Checkout/CheckoutProgress';
import BillingForm from '../../components/Checkout/BillingForm';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import CheckoutOrderSummary from '../../components/Checkout/CheckoutOrderSummary';
import Toast from '../../components/common/Toast';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  const appliedCoupon = location.state?.appliedCoupon || null;
  const discountAmount = location.state?.discountAmount || 0;

  const [formData, setFormData] = useState({
    email: user?.email || 'customer@example.com',
    phone: user?.phone || '0912345678',
    fullName: user?.name || user?.username || 'Nguyễn Văn A',
    companyName: '',
    city: 'Hà Nội',
    orderNotes: '',
  });

  const [selectedMethod, setSelectedMethod] = useState('vnpay');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Redirect if cart empty
  useEffect(() => {
    if (!items || items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Vui lòng nhập email hợp lệ để nhận mã nguồn';
    }
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ (từ 9-11 số)';
    }
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }

    if (selectedMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 15) {
        newErrors.cardNumber = 'Vui lòng nhập số thẻ hợp lệ';
      }
      if (!cardDetails.cardName) {
        newErrors.cardName = 'Vui lòng nhập tên in trên thẻ';
      }
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        newErrors.expiry = 'Hạn dùng không hợp lệ (MM/YY)';
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Mã CVV không hợp lệ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setToast({
        show: true,
        message: 'Vui lòng xác nhận đồng ý với Điều khoản dịch vụ và Giấy phép bản quyền.',
        type: 'error',
      });
      return;
    }

    if (!validateForm()) {
      setToast({
        show: true,
        message: 'Vui lòng kiểm tra lại thông tin nhận mã nguồn.',
        type: 'error',
      });
      return;
    }

    setProcessing(true);

    const subtotal = items.reduce((sum, item) => {
      const p = Number(item.discount_price) || Number(item.price) || 0;
      return sum + p;
    }, 0);
    const tax = Math.max(0, (subtotal - discountAmount) * 0.1);
    const finalTotal = Math.max(0, subtotal - discountAmount + tax);

    // Simulate safe order creation & payment gateway handshake
    setTimeout(() => {
      setProcessing(false);
      const generatedOrderId = `ORD-${Date.now().toString().slice(-8)}`;

      const orderData = {
        orderId: generatedOrderId,
        items: [...items],
        formData: { ...formData },
        paymentMethod: selectedMethod,
        appliedCoupon,
        subtotal,
        discount: discountAmount,
        tax,
        total: finalTotal,
        createdAt: new Date().toISOString(),
      };

      // Save order to store if ordersDataService exists
      try {
        const existingOrders = JSON.parse(localStorage.getItem('tmdt_orders') || '[]');
        localStorage.setItem('tmdt_orders', JSON.stringify([orderData, ...existingOrders]));
      } catch (err) {
        console.error('Error saving order:', err);
      }

      clearCart();

      // Navigate to checkout success
      navigate('/checkout/success', {
        state: { orderData },
      });
    }, 800);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="checkout-page-modern">
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="checkout-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Giỏ hàng', path: '/cart' },
            { label: 'Thanh toán & Nhận mã nguồn', path: null },
          ]}
        />

        {/* Wizard Stepper */}
        <CheckoutProgress currentStep={2} />

        {/* 2-Column Checkout Grid */}
        <form className="checkout-main-form" onSubmit={handleSubmit}>
          {/* Left Column - Forms */}
          <div className="checkout-forms-col">
            {/* Delivery & Invoicing Form */}
            <BillingForm formData={formData} setFormData={setFormData} errors={errors} />

            {/* Payment Method Selector */}
            <PaymentMethod
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
            />

            {/* Terms of Service Acceptance */}
            <div className="checkout-terms-card">
              <label className="custom-terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                />
                <span className="checkbox-visual">
                  {agreeToTerms && <Check size={13} strokeWidth={3} />}
                </span>
                <span className="terms-label-text">
                  Tôi đã đọc và đồng ý với{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Điều khoản sử dụng
                  </a>
                  , chính sách bản quyền License CodeMart và quy chế bảo hành Escrow.
                </span>
              </label>
            </div>

            {/* Submit Action Button */}
            <div className="checkout-submit-wrap">
              <button
                type="submit"
                className={`btn-confirm-checkout-action ${processing ? 'is-processing' : ''}`}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader2 size={18} className="spin-icon" />
                    <span>Đang khởi tạo đơn hàng & kết nối cổng...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Xác nhận thanh toán & Nhận mã nguồn</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="checkout-footer-guarantee">
                <ShieldCheck size={16} className="text-emerald" />
                <span>Giao dịch bảo mật 100% qua chuẩn mã hóa SHA-256</span>
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Order Summary */}
          <div className="checkout-sidebar-col">
            <CheckoutOrderSummary
              items={items}
              appliedCoupon={appliedCoupon}
              discountAmount={discountAmount}
              onBack={() => navigate('/cart')}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
