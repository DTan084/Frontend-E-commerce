import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditProductPage.css';

const CATEGORIES = [
  { id: 'source-code', name: 'Mã nguồn Website' },
  { id: 'theme-template', name: 'Theme & Template' },
  { id: 'plugin', name: 'Plugin & Extension' },
  { id: 'design-service', name: 'Dịch vụ thiết kế' },
  { id: 'mobile-app', name: 'Mobile Apps' },
];

const TECHNOLOGIES = [
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'PHP',
  'Laravel',
  'WordPress',
  'Python',
  'Java',
  'MySQL',
  'MongoDB',
  'PostgreSQL',
];

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    technology: [],
    version: '',
    features: [''],
    images: [''],
    stock: 999,
    support: '6 tháng',
  });

  useEffect(() => {
    // Simulate loading product data
    setTimeout(() => {
      if (id === '1') {
        setFormData({
          name: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
          slug: 'ma-nguon-website-tmdt-react-php',
          description:
            'Mã nguồn website thương mại điện tử hoàn chỉnh với React frontend và PHP backend.',
          price: '1500000',
          originalPrice: '2000000',
          category: 'source-code',
          technology: ['React', 'PHP', 'MySQL'],
          version: '2.0.1',
          features: [
            'Quản lý sản phẩm đa dạng',
            'Giỏ hàng và thanh toán online',
            'Dashboard admin',
            'Responsive 100%',
          ],
          images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
            'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
          ],
          stock: 999,
          support: '6 tháng',
        });
      }
      setLoading(false);
    }, 500);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate async mock save
    setTimeout(() => {
      setSaving(false);
      alert('Cập nhật sản phẩm thành công!');
      navigate('/seller/products');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="edit-product-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Trang chủ</Link>
            <span>/</span>
            <Link to="/seller/dashboard">Seller Dashboard</Link>
            <span>/</span>
            <Link to="/seller/products">Sản phẩm</Link>
            <span>/</span>
            <span>Chỉnh sửa</span>
          </div>
          <h1>✏️ Chỉnh sửa sản phẩm</h1>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <form onSubmit={handleSubmit} className="edit-form">
            {/* Basic Info */}
            <div className="form-section">
              <h2>Thông tin cơ bản</h2>

              <div className="form-group">
                <label>Tên sản phẩm *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug (URL)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Mô tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá bán *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Giá gốc</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Danh mục *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn danh mục</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Version</label>
                  <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Hỗ trợ</label>
                  <select name="support" value={formData.support} onChange={handleChange}>
                    <option value="3 tháng">3 tháng</option>
                    <option value="6 tháng">6 tháng</option>
                    <option value="12 tháng">12 tháng</option>
                    <option value="Trọn đời">Trọn đời</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="form-section">
              <h2>Công nghệ</h2>
              <div className="tech-grid">
                {TECHNOLOGIES.map((tech) => (
                  <label key={tech} className="tech-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.technology.includes(tech)}
                      onChange={() => handleTechnologyToggle(tech)}
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="form-section">
              <h2>Tính năng</h2>
              {formData.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Nhập tính năng..."
                  />
                  <button type="button" onClick={() => removeFeature(index)} className="btn-remove">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={addFeature} className="btn-add">
                + Thêm tính năng
              </button>
            </div>

            {/* Images */}
            <div className="form-section">
              <h2>Hình ảnh</h2>
              {formData.images.map((image, index) => (
                <div key={index} className="image-item">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="URL hình ảnh..."
                  />
                  {image && (
                    <div className="image-preview">
                      <img src={image} alt={`Preview ${index + 1}`} />
                    </div>
                  )}
                  <button type="button" onClick={() => removeImage(index)} className="btn-remove">
                    ✕
                  </button>
                </div>
              ))}
              <button type="button" onClick={addImage} className="btn-add">
                + Thêm hình ảnh
              </button>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/seller/products')}
                className="btn-cancel"
              >
                Hủy
              </button>
              <button type="submit" className="btn-save" disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;
