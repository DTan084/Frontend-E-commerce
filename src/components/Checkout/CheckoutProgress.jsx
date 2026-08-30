import React from 'react';
import { ShoppingCart, FileText, CreditCard, CheckCircle2, Check } from 'lucide-react';
import './CheckoutProgress.css';

const CheckoutProgress = ({ currentStep = 2 }) => {
  const steps = [
    { number: 1, label: 'Giỏ hàng', icon: ShoppingCart },
    { number: 2, label: 'Thông tin & Nhận mã', icon: FileText },
    { number: 3, label: 'Phương thức thanh toán', icon: CreditCard },
    { number: 4, label: 'Hoàn tất & Nhận License', icon: CheckCircle2 },
  ];

  return (
    <div className="checkout-progress-modern">
      <div className="progress-wizard-strip">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div
                className={`wizard-step-node ${isActive ? 'is-active' : ''} ${
                  isCompleted ? 'is-completed' : ''
                }`}
              >
                <div className="step-circle-badge">
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : <StepIcon size={14} />}
                </div>
                <div className="step-label-group">
                  <span className="step-step-title">Bước {step.number}</span>
                  <span className="step-name-text">{step.label}</span>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`wizard-line-connector ${
                    currentStep > step.number ? 'is-filled' : ''
                  }`}
                >
                  <div className="connector-inner-fill"></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutProgress;
