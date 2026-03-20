import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import ImageUploader from '../../components/Seller/ImageUploader';
import FileUploader from '../../components/Seller/FileUploader';
import RichTextEditor from '../../components/Seller/RichTextEditor';
import TagInput from '../../components/Seller/TagInput';
import './UploadProductPage.css';

const UploadProductPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    category: '',
    shortDescription: '',
    description: '',
    
    // Technical Details
    version: '',
    compatibility: [],
    demoUrl: '',
    documentationUrl: '',
    
    // Pricing
    price: '',
    salePrice: '',
    license: 'regular',
    
    // Media
    images: [],
    sourceFile: null,
    
    // Tags
    tags: [],
    
    // Options
    includeDocs: false,
    freeUpdates: false,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Categories
  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'web-templates', label: '🌐 Web Templates' },
    { value: 'wordpress', label: '📝 WordPress Themes' },
    { value: 'mobile-apps', label: '📱 Mobile Apps' },
    { value: 'ui-kits', label: '🎨 UI Kits' },
    { value: 'scripts', label: '⚙️ Scripts & Plugins' },
    { value: 'graphics', label: '🖼️ Graphics & Design' },
  ];

  // Compatibility options
  const compatibilityOptions = [
    'Chrome', 'Firefox', 'Safari', 'Edge',
    'Windows', 'MacOS', 'Linux',
    'iOS', 'Android',
    'React 18+', 'Node.js 16+',
  ];

  // License types
  const licenseTypes = [
    { value: 'regular', label: 'Regular License', description: 'For single end product' },
    { value: 'extended', label: 'Extended License', description: 'For multiple end products' },
  ];

  // Handle input change
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate step
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Product title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
      if (!formData.description.trim()) newErrors.description = 'Detailed description is required';
      if (!formData.price) newErrors.price = 'Price is required';
      if (formData.price && parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    }

    if (step === 2) {
      if (formData.images.length === 0) newErrors.images = 'At least one product image is required';
      if (!formData.sourceFile) newErrors.sourceFile = 'Source code file is required';
    }

    if (step === 3) {
      if (formData.tags.length === 0) newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save draft
  const handleSaveDraft = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      localStorage.setItem('product-draft', JSON.stringify(formData));
      setIsSaving(false);
      alert('✅ Draft saved successfully!');
    }, 1000);
  };

  // Submit product
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setIsSaving(true);
    
    setTimeout(() => {
      // Build new product object to save as pending
      const newProduct = {
        id: Date.now(),
        name: formData.title,
        category: formData.category,
        description: formData.shortDescription,
        price: parseFloat(formData.price) || 0,
        submitDate: new Date().toISOString().split('T')[0],
        seller: 'Current Seller',
        images: formData.images.length > 0
          ? formData.images
          : ['https://via.placeholder.com/400x300?text=Product'],
        technology: formData.tags,
        status: 'pending',
        reason: null,
      };

      // Save to pending products in localStorage
      const pending = JSON.parse(localStorage.getItem('tmdt_pending_products') || '[]');
      pending.push(newProduct);
      localStorage.setItem('tmdt_pending_products', JSON.stringify(pending));

      localStorage.removeItem('product-draft');
      setIsSaving(false);
      navigate('/seller/products');
    }, 2000);
  };

  // Toggle compatibility
  const toggleCompatibility = (option) => {
    setFormData(prev => ({
      ...prev,
      compatibility: prev.compatibility.includes(option)
        ? prev.compatibility.filter(item => item !== option)
        : [...prev.compatibility, option]
    }));
  };

  const steps = [
    { number: 1, title: 'Product Info', icon: '📝' },
    { number: 2, title: 'Files & Media', icon: '📁' },
    { number: 3, title: 'Tags & Publish', icon: '🚀' },
  ];

  return (
    <div className="upload-product-page">
      <SellerSidebar />
      
      <div className="upload-content">
        {/* Header */}
        <div className="upload-header">
          <div className="header-left">
            <button className="back-btn" onClick={() => navigate('/seller/dashboard')}>
              ← Back
            </button>
            <div>
              <h1 className="page-title">📦 Upload New Product</h1>
              <p className="page-subtitle">Share your amazing work with the world</p>
            </div>
          </div>
          <div className="header-actions">
            <button 
              type="button" 
              className="draft-btn"
              onClick={handleSaveDraft}
              disabled={isSaving}
            >
              💾 Save Draft
            </button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="step-progress">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div 
                className={`step-item ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                onClick={() => currentStep > step.number && setCurrentStep(step.number)}
                style={{ cursor: currentStep > step.number ? 'pointer' : 'default' }}
              >
                <div className="step-circle">
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <div className="step-info">
                  <div className="step-number">Step {step.number}</div>
                  <div className="step-title">{step.title}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${currentStep > step.number ? 'active' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="upload-form">
          {/* Step 1: Product Information */}
          {currentStep === 1 && (
            <div className="form-step" style={{ animation: 'fadeIn 0.5s' }}>
              <div className="form-section">
                <h2 className="section-title">📝 Basic Information</h2>
                
                <div className="form-group">
                  <label className="form-label">
                    Product Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g., Modern E-commerce Dashboard Template"
                    maxLength={100}
                  />
                  {errors.title && <div className="error-message">{errors.title}</div>}
                  <div className="input-hint">{formData.title.length}/100 characters</div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Category <span className="required">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.category ? 'error' : ''}`}
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    {errors.category && <div className="error-message">{errors.category}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Version
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.version}
                      onChange={(e) => handleChange('version', e.target.value)}
                      placeholder="e.g., 1.0.0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Short Description <span className="required">*</span>
                  </label>
                  <textarea
                    className={`form-textarea ${errors.shortDescription ? 'error' : ''}`}
                    value={formData.shortDescription}
                    onChange={(e) => handleChange('shortDescription', e.target.value)}
                    placeholder="Brief description of your product (max 200 characters)"
                    rows={3}
                    maxLength={200}
                  />
                  {errors.shortDescription && <div className="error-message">{errors.shortDescription}</div>}
                  <div className="input-hint">{formData.shortDescription.length}/200 characters</div>
                </div>

                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleChange('description', value)}
                  placeholder="Write a detailed description of your product, its features, and what makes it special..."
                />
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>

              <div className="form-section">
                <h2 className="section-title">💰 Pricing & License</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Regular Price ($) <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-input ${errors.price ? 'error' : ''}`}
                      value={formData.price}
                      onChange={(e) => handleChange('price', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && <div className="error-message">{errors.price}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Sale Price ($)
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.salePrice}
                      onChange={(e) => handleChange('salePrice', e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <div className="input-hint">Optional: Leave empty if no sale</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">License Type</label>
                  <div className="license-options">
                    {licenseTypes.map(license => (
                      <label key={license.value} className="license-card">
                        <input
                          type="radio"
                          name="license"
                          value={license.value}
                          checked={formData.license === license.value}
                          onChange={(e) => handleChange('license', e.target.value)}
                        />
                        <div className="license-info">
                          <div className="license-name">{license.label}</div>
                          <div className="license-desc">{license.description}</div>
                        </div>
                        <div className="license-check">✓</div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="section-title">🔧 Technical Details</h2>
                
                <div className="form-group">
                  <label className="form-label">Compatibility</label>
                  <div className="compatibility-grid">
                    {compatibilityOptions.map(option => (
                      <button
                        key={option}
                        type="button"
                        className={`compatibility-btn ${formData.compatibility.includes(option) ? 'active' : ''}`}
                        onClick={() => toggleCompatibility(option)}
                      >
                        {option}
                        {formData.compatibility.includes(option) && <span className="check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      className="form-input"
                      value={formData.demoUrl}
                      onChange={(e) => handleChange('demoUrl', e.target.value)}
                      placeholder="https://your-demo.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Documentation URL
                    </label>
                    <input
                      type="url"
                      className="form-input"
                      value={formData.documentationUrl}
                      onChange={(e) => handleChange('documentationUrl', e.target.value)}
                      placeholder="https://your-docs.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Files & Media */}
          {currentStep === 2 && (
            <div className="form-step" style={{ animation: 'fadeIn 0.5s' }}>
              <div className="form-section">
                <h2 className="section-title">🖼️ Product Images</h2>
                <ImageUploader
                  images={formData.images}
                  setImages={(images) => handleChange('images', images)}
                  maxImages={5}
                />
                {errors.images && <div className="error-message">{errors.images}</div>}
              </div>

              <div className="form-section">
                <h2 className="section-title">📦 Source Code</h2>
                <FileUploader
                  file={formData.sourceFile}
                  setFile={(file) => handleChange('sourceFile', file)}
                  maxSize={100 * 1024 * 1024} // 100MB
                />
                {errors.sourceFile && <div className="error-message">{errors.sourceFile}</div>}
              </div>
            </div>
          )}

          {/* Step 3: Tags & Publish */}
          {currentStep === 3 && (
            <div className="form-step" style={{ animation: 'fadeIn 0.5s' }}>
              <div className="form-section">
                <TagInput
                  tags={formData.tags}
                  setTags={(tags) => handleChange('tags', tags)}
                  maxTags={10}
                />
                {errors.tags && <div className="error-message">{errors.tags}</div>}
              </div>

              <div className="form-section">
                <h2 className="section-title">📋 Review Your Product</h2>
                <div className="review-card">
                  <div className="review-row">
                    <span className="review-label">Title:</span>
                    <span className="review-value">{formData.title || 'Not set'}</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Category:</span>
                    <span className="review-value">
                      {categories.find(c => c.value === formData.category)?.label || 'Not set'}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Price:</span>
                    <span className="review-value">
                      ${formData.price || '0.00'}
                      {formData.salePrice && <span className="sale-badge">Sale: ${formData.salePrice}</span>}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Images:</span>
                    <span className="review-value">{formData.images.length} image(s)</span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Source File:</span>
                    <span className="review-value">
                      {formData.sourceFile ? '✅ Uploaded' : '❌ Not uploaded'}
                    </span>
                  </div>
                  <div className="review-row">
                    <span className="review-label">Tags:</span>
                    <span className="review-value">{formData.tags.length} tag(s)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handlePrevious}
              >
                ← Previous
              </button>
            )}
            
            <div className="actions-right">
              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNext}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSaving}
                >
                  {isSaving ? '🔄 Publishing...' : '🚀 Publish Product'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;
