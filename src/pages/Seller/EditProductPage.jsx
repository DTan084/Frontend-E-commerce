import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, CheckCircle2, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Breadcrumb from '../../components/Product/Breadcrumb';
import SellerSidebar from '../../components/Seller/SellerSidebar';
import './EditProductPage.css';

const CATEGORIES = [
  { id: 'source-code', name: 'Website Thương Mại Điện Tử & Bán Hàng' },
  { id: 'theme-template', name: 'Giao Diện Admin Dashboard & CMS' },
  { id: 'fullstack-saas', name: 'Fullstack SaaS & Web Application' },
  { id: 'mobile-app', name: 'Ứng Dụng Di Động (Flutter / React Native)' },
  { id: 'backend-api', name: 'Backend RESTful API & Microservices' },
];

const TECHNOLOGIES = [
  'React',
  'Next.js',
  'Vue.js',
  'Node.js',
  'Laravel',
  'PHP',
  'Spring Boot',
  'Java',
  'Flutter',
  'Tailwind CSS',
  'Docker',
  'MySQL',
  'MongoDB',
];

const EditProductPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: 'source-code',
    technology: ['React', 'Laravel', 'MySQL'],
    version: '1.2.0',
    features: [
      'Kiến trúc phân tầng Clean Architecture',
      'Tích hợp cổng thanh toán VNPay & VietQR tự động',
      'Bảng điều khiển Admin quản lý toàn diện',
      'Đầy đủ file Docker Compose và database script',
    ],
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
    ],
    demoUrl: 'https://demo.example.com',
    documentationUrl: 'https://docs.example.com',
  });

  useEffect(() => {
    setTimeout(() => {
      setFormData({
        name: 'Mã Nguồn E-commerce React + Laravel',
        description:
          'Mã nguồn website thương mại điện tử hoàn chỉnh với React frontend và Laravel backend RESTful API.',
        price: '1800000',
        salePrice: '1500000',
        category: 'source-code',
        technology: ['React', 'Laravel', 'MySQL', 'Tailwind CSS'],
        version: '1.2.0',
        features: [
          'Kiến trúc phân tầng Clean Architecture',
          'Tích hợp cổng thanh toán VNPay & VietQR tự động',
          'Bảng điều khiển Admin quản lý toàn diện',
          'Đầy đủ file Docker Compose và database script',
        ],
        images: [
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
        ],
        demoUrl: 'https://demo.example.com',
        documentationUrl: 'https://docs.example.com',
      });
      setLoading(false);
    }, 400);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData((prev) => ({
      ...prev,
      technology: prev.technology.includes(tech)
        ? prev.technology.filter((t) => t !== tech)
        : [...prev.technology, tech],
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ''],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Đã cập nhật thông tin mã nguồn thành công!');
      navigate('/seller/products');
    }, 800);
  };

  if (loading) {
    return (
      <div className="seller-loading-state">
        <div className="seller-spinner"></div>
        <p>Đang tải thông tin mã nguồn...</p>
      </div>
    );
  }

  return (
    <div className="seller-dashboard-page-modern edit-product-page-modern">
      <div className="seller-container-inner">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Kênh người bán', path: '/seller/dashboard' },
            { label: 'Kho mã nguồn', path: '/seller/products' },
            { label: 'Chỉnh sửa mã nguồn', path: null },
          ]}
        />

        <div className="seller-layout-split-row">
          {/* Sidebar */}
          <SellerSidebar seller={user} />

          {/* Main Edit Form */}
          <main className="seller-main-workspace">
            {/* Header */}
            <div className="edit-head-banner">
              <div>
                <button
                  type="button"
                  className="btn-back-link"
                  onClick={() => navigate('/seller/products')}
                >
                  <ArrowLeft size={14} />
                  <span>Quay lại danh sách</span>
                </button>
                <h1 className="edit-main-title">Chỉnh sửa mã nguồn #{id}</h1>
                <p className="edit-main-subtitle">
                  Cập nhật thông tin phiên bản, giá bán và tài liệu hướng dẫn cho người mua
                </p>
              </div>

              <div className="edit-actions-top">
                <button
                  type="button"
                  className="btn-save-edit"
                  onClick={handleSubmit}
                  disabled={saving}
                >
                  <Save size={15} />
                  <span>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="edit-product-form-box">
              {/* Basic Info */}
              <div className="edit-section-card">
                <h3 className="section-card-title">1. Thông tin cơ bản & Danh mục</h3>

                <div className="form-field-group">
                  <label className="form-field-label">Tên sản phẩm mã nguồn</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input-text"
                    required
                  />
                </div>

                <div className="form-fields-grid-2">
                  <div className="form-field-group">
                    <label className="form-field-label">Danh mục sản phẩm</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select-box"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Phiên bản hiện tại</label>
                    <input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleChange}
                      className="form-input-text"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label className="form-field-label">Mô tả sản phẩm</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="form-textarea-box"
                    required
                  />
                </div>
              </div>

              {/* Pricing & Links */}
              <div className="edit-section-card">
                <h3 className="section-card-title">2. Thiết lập giá bán VND & Đường dẫn</h3>

                <div className="form-fields-grid-2">
                  <div className="form-field-group">
                    <label className="form-field-label">Giá niêm yết (VNĐ)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-input-text"
                      required
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Giá khuyến mãi (VNĐ)</label>
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleChange}
                      className="form-input-text"
                    />
                  </div>
                </div>

                <div className="form-fields-grid-2">
                  <div className="form-field-group">
                    <label className="form-field-label">Demo URL</label>
                    <input
                      type="url"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleChange}
                      className="form-input-text"
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">Documentation URL</label>
                    <input
                      type="url"
                      name="documentationUrl"
                      value={formData.documentationUrl}
                      onChange={handleChange}
                      className="form-input-text"
                    />
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div className="edit-section-card">
                <h3 className="section-card-title">3. Thẻ công nghệ tích hợp</h3>
                <div className="tech-checkbox-grid">
                  {TECHNOLOGIES.map((tech) => {
                    const isChecked = formData.technology.includes(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        className={`btn-tech-select-chip ${isChecked ? 'active' : ''}`}
                        onClick={() => handleTechnologyToggle(tech)}
                      >
                        {isChecked && <CheckCircle2 size={13} />}
                        <span>{tech}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features List */}
              <div className="edit-section-card">
                <div className="card-title-row-action">
                  <h3 className="section-card-title" style={{ margin: 0 }}>
                    4. Tính năng nổi bật
                  </h3>
                  <button type="button" className="btn-add-line-item" onClick={addFeature}>
                    <Plus size={13} />
                    <span>Thêm tính năng</span>
                  </button>
                </div>

                <div className="dynamic-inputs-list">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="dynamic-input-row">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder="Mô tả tính năng ngắn gọn..."
                        className="form-input-text"
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => removeFeature(idx)}
                          title="Xóa dòng"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Images URL list */}
              <div className="edit-section-card">
                <div className="card-title-row-action">
                  <h3 className="section-card-title" style={{ margin: 0 }}>
                    5. Hình ảnh Screenshots
                  </h3>
                  <button type="button" className="btn-add-line-item" onClick={addImage}>
                    <Plus size={13} />
                    <span>Thêm ảnh URL</span>
                  </button>
                </div>

                <div className="dynamic-inputs-list">
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} className="dynamic-input-row">
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => handleImageChange(idx, e.target.value)}
                        placeholder="https://example.com/image.png"
                        className="form-input-text"
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => removeImage(idx)}
                          title="Xóa dòng"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="edit-bottom-bar">
                <button
                  type="button"
                  className="btn-cancel-edit"
                  onClick={() => navigate('/seller/products')}
                >
                  Hủy bỏ
                </button>

                <button type="submit" className="btn-submit-edit" disabled={saving}>
                  <Save size={15} />
                  <span>{saving ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}</span>
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
