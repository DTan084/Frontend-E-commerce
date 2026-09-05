import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  FileCode2,
  Tag,
  ArrowLeft,
  ArrowRight,
  Save,
  ShieldCheck,
  Globe,
  FileText,
  Check,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import ImageUploader from '../../components/Seller/ImageUploader';
import FileUploader from '../../components/Seller/FileUploader';
import RichTextEditor from '../../components/Seller/RichTextEditor';
import TagInput from '../../components/Seller/TagInput';
import './UploadProductPage.css';

const UploadProductPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    shortDescription: '',
    description: '',
    version: '1.0.0',
    compatibility: ['React 18+', 'Node.js 18+'],
    demoUrl: '',
    documentationUrl: '',
    price: '',
    salePrice: '',
    license: 'regular',
    images: [],
    sourceFile: null,
    tags: ['React', 'Fullstack'],
    includeDocs: true,
    freeUpdates: true,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { value: '', label: '-- Chọn danh mục mã nguồn --' },
    { value: 'Website TMĐT', label: 'Website Thương Mại Điện Tử & Bán Hàng' },
    { value: 'Admin Template', label: 'Giao Diện Admin Dashboard & CMS' },
    { value: 'Fullstack SaaS', label: 'Fullstack SaaS & Web Application' },
    { value: 'Mobile App', label: 'Ứng Dụng Di Động (Flutter / React Native)' },
    { value: 'Backend API', label: 'Backend RESTful API & Microservices' },
    { value: 'AI & Automation', label: 'AI, Machine Learning & Scripts Tự Động' },
  ];

  const compatibilityOptions = [
    'React 18+',
    'Next.js 14+',
    'Vue.js 3+',
    'Node.js 18+',
    'Laravel 10+',
    'Spring Boot 3+',
    'Flutter 3+',
    'MySQL 8.0+',
    'PostgreSQL',
    'Docker',
    'Tailwind CSS',
    'TypeScript',
  ];

  const licenseTypes = [
    {
      value: 'regular',
      label: 'Regular License (Tiêu chuẩn)',
      description: 'Dành cho người mua triển khai trên 1 sản phẩm / 1 domain duy nhất.',
    },
    {
      value: 'extended',
      label: 'Extended License (Mở rộng)',
      description: 'Cho phép người mua triển khai trên nhiều dự án và thương mại hóa lại.',
    },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const toggleCompatibility = (option) => {
    setFormData((prev) => ({
      ...prev,
      compatibility: prev.compatibility.includes(option)
        ? prev.compatibility.filter((item) => item !== option)
        : [...prev.compatibility, option],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tên mã nguồn';
      if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';
      if (!formData.shortDescription.trim())
        newErrors.shortDescription = 'Vui lòng nhập tóm tắt ngắn';
      if (!formData.price) newErrors.price = 'Vui lòng nhập giá bán';
      if (formData.price && parseFloat(formData.price) <= 0)
        newErrors.price = 'Giá bán phải lớn hơn 0';
    }

    if (step === 2) {
      if (formData.images.length === 0) newErrors.images = 'Cần tải lên ít nhất 1 hình ảnh mô tả';
      if (!formData.sourceFile) newErrors.sourceFile = 'Cần tải lên file mã nguồn nén (.ZIP)';
    }

    if (step === 3) {
      if (formData.tags.length === 0) newErrors.tags = 'Cần thêm ít nhất 1 thẻ tag công nghệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('tmdt_product_draft', JSON.stringify(formData));
      setIsSaving(false);
      alert('Đã lưu bản nháp mã nguồn thành công!');
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSaving(true);
    setTimeout(() => {
      const newProduct = {
        id: Date.now(),
        title: formData.title,
        category: formData.category,
        description: formData.shortDescription,
        price: parseFloat(formData.price) || 0,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        submitDate: new Date().toISOString().split('T')[0],
        seller: user?.name || 'Tác giả CodeMart',
        image:
          formData.images.length > 0
            ? formData.images[0].preview
            : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
        tags: formData.tags,
        status: 'pending',
        sales: 0,
        rating: 5.0,
      };

      const pending = JSON.parse(localStorage.getItem('tmdt_pending_products') || '[]');
      pending.push(newProduct);
      localStorage.setItem('tmdt_pending_products', JSON.stringify(pending));
      localStorage.removeItem('tmdt_product_draft');

      setIsSaving(false);
      navigate('/seller/products');
    }, 1200);
  };

  const formatVND = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const steps = [
    { number: 1, title: 'Thông tin & Định giá', icon: Package },
    { number: 2, title: 'Tệp ZIP & Media', icon: FileCode2 },
    { number: 3, title: 'Tags & Đăng duyệt', icon: Tag },
  ];

  return (
    <div className="seller-dashboard-page-modern upload-product-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Kênh người bán', path: '/seller/dashboard' },
            { label: 'Đăng bán mã nguồn', path: null },
          ]}
        />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={user} />

          {/* Form Content */}
          <main className="seller-main-workspace">
            {/* Header */}
            <div className="upload-head-banner">
              <div className="upload-head-left">
                <button
                  type="button"
                  className="btn-back-link"
                  onClick={() => navigate('/seller/products')}
                >
                  <ArrowLeft size={14} />
                  <span>Quay lại kho mã nguồn</span>
                </button>
                <h1 className="upload-main-title">Đăng bán mã nguồn mới</h1>
                <p className="upload-main-subtitle">
                  Chia sẻ source code chất lượng cao tới cộng đồng 15.000+ lập trình viên trên
                  CodeMart
                </p>
              </div>

              <div className="upload-head-actions">
                <button
                  type="button"
                  className="btn-save-draft"
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                >
                  <Save size={14} />
                  <span>Lưu bản nháp</span>
                </button>
              </div>
            </div>

            {/* Step Wizard Indicator */}
            <div className="upload-wizard-progress">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.number;
                const isActive = currentStep === step.number;
                return (
                  <React.Fragment key={step.number}>
                    <div
                      className={`wizard-step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                      onClick={() => isCompleted && setCurrentStep(step.number)}
                    >
                      <div className="wizard-step-circle">
                        {isCompleted ? <Check size={14} /> : <Icon size={14} />}
                      </div>
                      <div className="wizard-step-labels">
                        <span className="step-count-lbl">Bước {step.number}</span>
                        <span className="step-name-lbl">{step.title}</span>
                      </div>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`wizard-step-connector ${isCompleted ? 'completed' : ''}`}
                      ></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="upload-product-form-box">
              {/* STEP 1: Basic Info & Pricing */}
              {currentStep === 1 && (
                <div className="form-step-pane">
                  <div className="form-section-card">
                    <h3 className="section-card-title">1. Thông tin cơ bản về mã nguồn</h3>

                    <div className="form-field-group">
                      <label className="form-field-label">
                        Tên mã nguồn sản phẩm <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-input-text ${errors.title ? 'error' : ''}`}
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Ví dụ: Fullstack E-commerce Website React & Laravel RESTful API"
                        maxLength={120}
                      />
                      {errors.title && <span className="field-error-msg">{errors.title}</span>}
                    </div>

                    <div className="form-fields-grid-2">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Danh mục mã nguồn <span className="required-star">*</span>
                        </label>
                        <select
                          className={`form-select-box ${errors.category ? 'error' : ''}`}
                          value={formData.category}
                          onChange={(e) => handleChange('category', e.target.value)}
                        >
                          {categories.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <span className="field-error-msg">{errors.category}</span>
                        )}
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Phiên bản ban đầu</label>
                        <input
                          type="text"
                          className="form-input-text"
                          value={formData.version}
                          onChange={(e) => handleChange('version', e.target.value)}
                          placeholder="1.0.0"
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">
                        Tóm tắt ngắn gọn <span className="required-star">*</span>
                      </label>
                      <textarea
                        className={`form-textarea-box ${errors.shortDescription ? 'error' : ''}`}
                        value={formData.shortDescription}
                        onChange={(e) => handleChange('shortDescription', e.target.value)}
                        placeholder="Mô tả tóm tắt giá trị cốt lõi, công nghệ nổi bật trong 1-2 câu ngắn..."
                        rows={2}
                        maxLength={220}
                      />
                      {errors.shortDescription && (
                        <span className="field-error-msg">{errors.shortDescription}</span>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">Mô tả chi tiết & Hướng dẫn cài đặt</label>
                      <RichTextEditor
                        value={formData.description}
                        onChange={(val) => handleChange('description', val)}
                        placeholder="Nhập mô tả tính năng chi tiết, hướng dẫn cài đặt, cấu hình môi trường..."
                      />
                    </div>
                  </div>

                  {/* Pricing & License Card */}
                  <div className="form-section-card">
                    <h3 className="section-card-title">2. Thiết lập định giá (VND) & Giấy phép</h3>

                    <div className="form-fields-grid-2">
                      <div className="form-field-group">
                        <label className="form-field-label">
                          Giá niêm yết (VNĐ) <span className="required-star">*</span>
                        </label>
                        <input
                          type="number"
                          className={`form-input-text ${errors.price ? 'error' : ''}`}
                          value={formData.price}
                          onChange={(e) => handleChange('price', e.target.value)}
                          placeholder="Ví dụ: 1500000"
                          min="0"
                          step="10000"
                        />
                        {errors.price && <span className="field-error-msg">{errors.price}</span>}
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Giá khuyến mãi (Tùy chọn)</label>
                        <input
                          type="number"
                          className="form-input-text"
                          value={formData.salePrice}
                          onChange={(e) => handleChange('salePrice', e.target.value)}
                          placeholder="Ví dụ: 1200000"
                          min="0"
                          step="10000"
                        />
                        <span className="field-hint-text">Để trống nếu không áp dụng giảm giá</span>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">Loại License mặc định</label>
                      <div className="license-cards-grid">
                        {licenseTypes.map((lic) => (
                          <label
                            key={lic.value}
                            className={`license-select-card ${formData.license === lic.value ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="license"
                              value={lic.value}
                              checked={formData.license === lic.value}
                              onChange={(e) => handleChange('license', e.target.value)}
                            />
                            <div className="license-card-info">
                              <span className="license-card-title">{lic.label}</span>
                              <p className="license-card-desc">{lic.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Files & Media */}
              {currentStep === 2 && (
                <div className="form-step-pane">
                  <div className="form-section-card">
                    <h3 className="section-card-title">1. Hình ảnh chụp màn hình & Giao diện</h3>
                    <ImageUploader
                      images={formData.images}
                      setImages={(imgs) => handleChange('images', imgs)}
                      maxImages={5}
                    />
                    {errors.images && <span className="field-error-msg">{errors.images}</span>}
                  </div>

                  <div className="form-section-card">
                    <h3 className="section-card-title">2. Tệp nén mã nguồn & Demo</h3>
                    <FileUploader
                      file={formData.sourceFile}
                      setFile={(f) => handleChange('sourceFile', f)}
                      maxSize={200 * 1024 * 1024}
                    />
                    {errors.sourceFile && (
                      <span className="field-error-msg">{errors.sourceFile}</span>
                    )}

                    <div className="form-fields-grid-2" style={{ marginTop: '20px' }}>
                      <div className="form-field-group">
                        <label className="form-field-label">
                          <Globe size={14} />
                          <span>Link Demo trực tuyến (Tùy chọn)</span>
                        </label>
                        <input
                          type="url"
                          className="form-input-text"
                          value={formData.demoUrl}
                          onChange={(e) => handleChange('demoUrl', e.target.value)}
                          placeholder="https://demo.yourdomain.com"
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">
                          <FileText size={14} />
                          <span>Link tài liệu trực tuyến (Tùy chọn)</span>
                        </label>
                        <input
                          type="url"
                          className="form-input-text"
                          value={formData.documentationUrl}
                          onChange={(e) => handleChange('documentationUrl', e.target.value)}
                          placeholder="https://docs.yourdomain.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section-card">
                    <h3 className="section-card-title">3. Khả năng tương thích & Môi trường</h3>
                    <div className="compatibility-chips-grid">
                      {compatibilityOptions.map((opt) => {
                        const isChecked = formData.compatibility.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            className={`btn-compat-chip ${isChecked ? 'active' : ''}`}
                            onClick={() => toggleCompatibility(opt)}
                          >
                            {isChecked && <Check size={12} />}
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Tags & Review */}
              {currentStep === 3 && (
                <div className="form-step-pane">
                  <div className="form-section-card">
                    <h3 className="section-card-title">1. Gắn thẻ công nghệ & Tìm kiếm</h3>
                    <TagInput
                      tags={formData.tags}
                      setTags={(t) => handleChange('tags', t)}
                      maxTags={10}
                    />
                    {errors.tags && <span className="field-error-msg">{errors.tags}</span>}
                  </div>

                  <div className="form-section-card">
                    <h3 className="section-card-title">
                      2. Xác nhận thông tin sản phẩm trước khi gửi duyệt
                    </h3>
                    <div className="publish-review-summary-grid">
                      <div className="review-metric-item">
                        <span className="review-lbl">Tên mã nguồn:</span>
                        <strong className="review-val">{formData.title || 'Chưa đặt'}</strong>
                      </div>
                      <div className="review-metric-item">
                        <span className="review-lbl">Danh mục:</span>
                        <strong className="review-val">{formData.category || 'Chưa chọn'}</strong>
                      </div>
                      <div className="review-metric-item">
                        <span className="review-lbl">Giá bán niêm yết:</span>
                        <strong className="review-val text-primary">
                          {formatVND(formData.price)}
                          {formData.salePrice && ` (Khuyến mãi: ${formatVND(formData.salePrice)})`}
                        </strong>
                      </div>
                      <div className="review-metric-item">
                        <span className="review-lbl">Hình ảnh đính kèm:</span>
                        <strong className="review-val">{formData.images.length} ảnh</strong>
                      </div>
                      <div className="review-metric-item">
                        <span className="review-lbl">Tệp mã nguồn .ZIP:</span>
                        <strong className="review-val text-emerald">
                          {formData.sourceFile ? formData.sourceFile.name : 'Chưa tải lên'}
                        </strong>
                      </div>
                      <div className="review-metric-item">
                        <span className="review-lbl">Thẻ tags:</span>
                        <strong className="review-val">
                          {formData.tags.join(', ') || 'Chưa có'}
                        </strong>
                      </div>
                    </div>

                    <div className="escrow-agreement-banner">
                      <ShieldCheck size={20} className="text-emerald" />
                      <div>
                        <h4>Cam kết kiểm duyệt & Bảo vệ Escrow CodeMart</h4>
                        <p>
                          Mã nguồn của bạn sẽ được đội ngũ kỹ thuật CodeMart kiểm tra mã độc và tính
                          toàn vẹn trong vòng 24h trước khi mở bán công khai.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="upload-form-nav-strip">
                {currentStep > 1 && (
                  <button type="button" className="btn-wizard-prev" onClick={handlePrevious}>
                    <ArrowLeft size={14} />
                    <span>Quay lại bước trước</span>
                  </button>
                )}

                <div className="wizard-nav-right">
                  {currentStep < 3 ? (
                    <button type="button" className="btn-wizard-next" onClick={handleNext}>
                      <span>Tiếp theo</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button type="submit" className="btn-wizard-submit" disabled={isSaving}>
                      <Zap size={15} />
                      <span>{isSaving ? 'Đang xử lý gửi duyệt...' : 'Gửi duyệt mã nguồn'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UploadProductPage;
