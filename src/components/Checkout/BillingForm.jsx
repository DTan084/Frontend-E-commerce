import React from 'react';
import './BillingForm.css';

const BillingForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const countries = [
    'Vietnam',
    'United States',
    'United Kingdom',
    'Singapore',
    'Thailand',
    'Malaysia',
    'Japan',
    'South Korea',
    'Australia'
  ];

  return (
    <div className="billing-form">
      {/* Contact Information */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">📧</span>
            Contact Information
          </h2>
          <p className="section-subtitle">We'll use this to send you order updates</p>
        </div>

        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`form-input ${errors?.email ? 'error' : ''}`}
              required
            />
            {errors?.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+84 901 234 567"
              className={`form-input ${errors?.phone ? 'error' : ''}`}
              required
            />
            {errors?.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">📍</span>
            Billing Address
          </h2>
          <p className="section-subtitle">Enter your billing details</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="John"
              className={`form-input ${errors?.firstName ? 'error' : ''}`}
              required
            />
            {errors?.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="Doe"
              className={`form-input ${errors?.lastName ? 'error' : ''}`}
              required
            />
            {errors?.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="company" className="form-label">
              Company Name <span className="optional">(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company || ''}
              onChange={handleChange}
              placeholder="Your Company Ltd."
              className="form-input"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="address" className="form-label">
              Street Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="123 Nguyen Hue Street"
              className={`form-input ${errors?.address ? 'error' : ''}`}
              required
            />
            {errors?.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              placeholder="Ho Chi Minh"
              className={`form-input ${errors?.city ? 'error' : ''}`}
              required
            />
            {errors?.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode" className="form-label">
              Postal Code <span className="required">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode || ''}
              onChange={handleChange}
              placeholder="700000"
              className={`form-input ${errors?.zipCode ? 'error' : ''}`}
              required
            />
            {errors?.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="country" className="form-label">
              Country <span className="required">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country || 'Vietnam'}
              onChange={handleChange}
              className={`form-select ${errors?.country ? 'error' : ''}`}
              required
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors?.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="icon">📝</span>
            Order Notes
          </h2>
          <p className="section-subtitle">Any special requirements? (Optional)</p>
        </div>

        <div className="form-group full-width">
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Special instructions for delivery, license details, etc..."
            className="form-textarea"
            rows="4"
          />
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
