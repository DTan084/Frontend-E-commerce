import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './BecomeSellerPage.css';

const BecomeSellerPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    website: '',
    portfolio: '',
    experience: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate application submission
    alert('Application submitted successfully! We will review it within 1-3 business days.');
    navigate('/');
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Earn Money',
      description: 'Earn 70% commission on every sale. No upfront costs or monthly fees.'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Access millions of buyers worldwide looking for quality digital products.'
    },
    {
      icon: '🛠️',
      title: 'Easy Tools',
      description: 'Use our intuitive dashboard to upload, manage, and track your products.'
    },
    {
      icon: '📈',
      title: 'Growth Support',
      description: 'Get marketing support, analytics, and tips to grow your sales.'
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Your products and payments are protected with enterprise-level security.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Join a community of successful sellers and learn from the best.'
    }
  ];

  const requirements = [
    'Original work - All products must be your own creation',
    'High quality - Products must meet our quality standards',
    'Documentation - Provide clear documentation and support',
    'Legal rights - You must own all rights to sell the product',
    'Active support - Respond to customer inquiries within 48 hours'
  ];

  if (!isAuthenticated) {
    return (
      <div className="become-seller-page">
        <section className="seller-hero">
          <div className="container">
            <h1>🏪 Become a Seller</h1>
            <p>Please log in or create an account to apply as a seller</p>
            <div className="hero-actions">
              <button onClick={() => navigate('/auth/login')} className="btn-primary">
                Login
              </button>
              <button onClick={() => navigate('/auth/register')} className="btn-secondary">
                Sign Up
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="become-seller-page">
      <section className="seller-hero">
        <div className="container">
          <h1>🏪 Become a Seller on CodeMarket</h1>
          <p>Join thousands of developers earning money by selling their code</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Sell on CodeMarket?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="requirements-section">
        <div className="container">
          <h2 className="section-title">Requirements</h2>
          <div className="requirements-card">
            <ul className="requirements-list">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="application-section">
        <div className="container">
          <div className="application-card">
            <h2>Seller Application</h2>
            <div className="progress-bar">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Info</div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Review</div>
            </div>

            <form onSubmit={handleSubmit} className="seller-form">
              {step === 1 && (
                <div className="form-step">
                  <h3>Basic Information</h3>
                  <div className="form-group">
                    <label>Business/Brand Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Your Studio Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Business Type *</label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select type</option>
                      <option value="individual">Individual Developer</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="agency">Agency</option>
                      <option value="company">Company</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and what you plan to sell..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="btn-next">
                    Next Step →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h3>Portfolio & Experience</h3>
                  <div className="form-group">
                    <label>Website URL</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Portfolio Links</label>
                    <textarea
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="GitHub, Dribbble, Behance, or other portfolio links (one per line)"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label>Experience *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Less than 1 year</option>
                      <option value="intermediate">1-3 years</option>
                      <option value="advanced">3-5 years</option>
                      <option value="expert">5+ years</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={() => setStep(1)} className="btn-back">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="btn-next">
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <h3>Review & Submit</h3>
                  <div className="review-info">
                    <div className="review-item">
                      <strong>Business Name:</strong> {formData.businessName}
                    </div>
                    <div className="review-item">
                      <strong>Business Type:</strong> {formData.businessType}
                    </div>
                    <div className="review-item">
                      <strong>Experience:</strong> {formData.experience}
                    </div>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                      />
                      <span>
                        I agree to the <a href="/terms" target="_blank">Terms of Service</a> and{' '}
                        <a href="/privacy" target="_blank">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={() => setStep(2)} className="btn-back">
                      ← Back
                    </button>
                    <button type="submit" className="btn-submit">
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSellerPage;
