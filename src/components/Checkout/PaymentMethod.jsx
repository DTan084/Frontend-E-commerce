import React, { useState } from 'react';
import './PaymentMethod.css';

const PaymentMethod = ({ selectedMethod, setSelectedMethod, cardDetails, setCardDetails }) => {
  const [showCardForm, setShowCardForm] = useState(selectedMethod === 'card');

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit / Debit Card',
      icon: '💳',
      description: 'Pay securely with your card',
      logos: ['visa', 'mastercard', 'amex', 'jcb']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Fast and secure payment',
      comingSoon: false
    },
    {
      id: 'momo',
      name: 'MoMo Wallet',
      icon: '📱',
      description: 'Pay with MoMo e-wallet',
      comingSoon: false
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank transfer',
      comingSoon: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setShowCardForm(methodId === 'card');
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }
    
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substr(0, 4);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <div className="payment-method">
      <div className="section-header">
        <h2 className="section-title">
          <span className="icon">💰</span>
          Payment Method
        </h2>
        <p className="section-subtitle">Choose your preferred payment option</p>
      </div>

      {/* Payment Methods Grid */}
      <div className="payment-methods-grid">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''} ${method.comingSoon ? 'disabled' : ''}`}
            onClick={() => !method.comingSoon && handleMethodSelect(method.id)}
          >
            <div className="method-radio">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => handleMethodSelect(method.id)}
                disabled={method.comingSoon}
              />
              <span className="radio-custom"></span>
            </div>

            <div className="method-content">
              <div className="method-header">
                <span className="method-icon">{method.icon}</span>
                <div className="method-info">
                  <h4 className="method-name">{method.name}</h4>
                  <p className="method-description">{method.description}</p>
                </div>
              </div>

              {method.logos && (
                <div className="card-logos">
                  {method.logos.map(logo => (
                    <span key={logo} className={`card-logo ${logo}`}>{logo.toUpperCase()}</span>
                  ))}
                </div>
              )}

              {method.comingSoon && (
                <span className="coming-soon-badge">Coming Soon</span>
              )}
            </div>

            <div className="selected-indicator">
              <span className="check-icon">✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Form */}
      {showCardForm && (
        <div className="card-details-form">
          <div className="form-header">
            <h3 className="form-title">
              <span className="icon">🔒</span>
              Card Details
            </h3>
            <div className="security-badges">
              <span className="badge">SSL Secure</span>
              <span className="badge">256-bit Encrypted</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="cardNumber" className="form-label">
                Card Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber || ''}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className="form-input card-input"
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="cardName" className="form-label">
                Cardholder Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={cardDetails.cardName || ''}
                onChange={handleCardChange}
                placeholder="JOHN DOE"
                className="form-input"
                style={{ textTransform: 'uppercase' }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiry" className="form-label">
                Expiry Date <span className="required">*</span>
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={cardDetails.expiry || ''}
                onChange={handleCardChange}
                placeholder="MM/YY"
                maxLength="5"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv" className="form-label">
                CVV <span className="required">*</span>
                <span className="help-icon" title="3-4 digit security code on the back of your card">?</span>
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv || ''}
                onChange={handleCardChange}
                placeholder="123"
                maxLength="4"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="security-notice">
            <span className="icon">🔒</span>
            <p>Your payment information is encrypted and secure. We never store your card details.</p>
          </div>
        </div>
      )}

      {/* Other Payment Instructions */}
      {selectedMethod === 'bank' && (
        <div className="payment-instructions">
          <h4>Bank Transfer Instructions</h4>
          <div className="bank-details">
            <p><strong>Bank:</strong> Vietcombank</p>
            <p><strong>Account:</strong> 0123456789</p>
            <p><strong>Name:</strong> WebSource Marketplace</p>
            <p><strong>Reference:</strong> ORDER-{Date.now()}</p>
          </div>
          <p className="note">Please include the reference number in your transfer</p>
        </div>
      )}

      {selectedMethod === 'momo' && (
        <div className="payment-instructions">
          <h4>MoMo Payment</h4>
          <p>You will be redirected to MoMo app to complete the payment.</p>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="payment-instructions">
          <h4>PayPal Payment</h4>
          <p>You will be redirected to PayPal to complete your purchase securely.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
