import React from 'react';
import './CheckoutProgress.css';

const CheckoutProgress = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: 'Giỏ hàng', icon: '🛒' },
    { number: 2, label: 'Thông tin thanh toán', icon: '📋' },
    { number: 3, label: 'Thanh toán', icon: '💳' },
    { number: 4, label: 'Xác nhận', icon: '✅' }
  ];

  return (
    <div className="checkout-progress">
      <div className="progress-container">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <div className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="step-circle">
                {currentStep > step.number ? (
                  <span className="check-icon">✓</span>
                ) : (
                  <span className="step-icon">{step.icon}</span>
                )}
              </div>
              <div className="step-label">
                <span className="step-number">Bước {step.number}</span>
                <span className="step-text">{step.label}</span>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`progress-line ${currentStep > step.number ? 'completed' : ''}`}>
                <div className="line-fill"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;
