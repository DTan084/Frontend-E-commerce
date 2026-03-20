import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CheckoutProgress from '../../components/Checkout/CheckoutProgress';
import BillingForm from '../../components/Checkout/BillingForm';
import PaymentMethod from '../../components/Checkout/PaymentMethod';
import CheckoutOrderSummary from '../../components/Checkout/CheckoutOrderSummary';
import Toast from '../../components/common/Toast';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  const [currentStep] = useState(2); // Step 2: Checkout Details
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    firstName: '',
    lastName: '',
    company: '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    country: 'Vietnam',
    notes: '',
  });
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Contact validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    // Billing validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';

    // Card validation if card payment selected
    if (selectedMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Valid card number is required';
      }
      if (!cardDetails.cardName) newErrors.cardName = 'Cardholder name is required';
      if (!cardDetails.expiry || cardDetails.expiry.length < 5) {
        newErrors.expiry = 'Valid expiry date is required';
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Valid CVV is required';
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
        message: 'Please agree to the Terms of Service to continue',
        type: 'error',
      });
      return;
    }

    if (!validateForm()) {
      setToast({
        show: true,
        message: 'Please fill in all required fields correctly',
        type: 'error',
      });
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      clearCart();

      // Navigate to success page with order data
      navigate('/checkout/success', {
        state: {
          orderData: {
            orderId: `ORD-${Date.now()}`,
            items,
            formData,
            paymentMethod: selectedMethod,
            total: items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
          },
        },
      });
    }, 2000);
  };

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="checkout-page">
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Progress Steps */}
      <CheckoutProgress currentStep={currentStep} />

      {/* Main Checkout Content */}
      <div className="checkout-container">
        <form className="checkout-form-container" onSubmit={handleSubmit}>
          {/* Left Column - Forms */}
          <div className="checkout-left">
            {/* Billing Form */}
            <BillingForm formData={formData} setFormData={setFormData} errors={errors} />

            {/* Payment Method */}
            <PaymentMethod
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
            />

            {/* Terms Checkbox */}
            <div className="terms-section">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
                <span className="checkbox-text">
                  I agree to the{' '}
                  <a href="/terms" target="_blank">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`checkout-submit-btn ${processing ? 'processing' : ''}`}
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="spinner"></span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="icon">🔒</span>
                  <span>Complete Order</span>
                </>
              )}
            </button>

            <div className="security-note">
              <span className="icon">🔒</span>
              <p>Your payment is secure and encrypted with 256-bit SSL</p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-right">
            <CheckoutOrderSummary
              items={items}
              appliedCoupon={null}
              onBack={() => navigate('/cart')}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
