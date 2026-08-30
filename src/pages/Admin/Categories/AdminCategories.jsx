import React, { useState } from 'react';
import {
  Layers,
  Search,
  PlusCircle,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  Globe,
  LayoutDashboard,
  Sparkles,
  Smartphone,
  Cpu,
  Bot,
  Package,
} from 'lucide-react';
import './AdminCategories.css';

const initialCategories = [
  {
    id: 1,
    name: 'Website TMĐT & Bán Hàng',
    slug: 'ecommerce',
    description: 'Mã nguồn website bán hàng, sàn TMĐT, cổng thanh toán trực tuyến',
    iconName: 'Globe',
    icon: Globe,
    productsCount: 45,
    status: 'active',
    createdAt: '15/01/2025',
  },
  {
    id: 2,
    name: 'Giao Diện Admin Dashboard & CMS',
    slug: 'admin-template',
    description: 'Theme và mẫu dashboard quản trị React, Vue, Tailwind CSS chuyên nghiệp',
    iconName: 'LayoutDashboard',
    icon: LayoutDashboard,
    productsCount: 38,
    status: 'active',
    createdAt: '20/01/2025',
  },
  {
    id: 3,
    name: 'Fullstack SaaS & Web App',
    slug: 'fullstack-saas',
    description: 'Hệ thống SaaS hoàn chỉnh tích hợp Auth, Stripe, VNPay và database',
    iconName: 'Sparkles',
    icon: Sparkles,
    productsCount: 52,
    status: 'active',
    createdAt: '05/02/2025',
  },
  {
    id: 4,
    name: 'Ứng Dụng Di Động (Mobile App)',
    slug: 'mobile-app',
    description: 'Source code app iOS & Android viết bằng Flutter và React Native',
    iconName: 'Smartphone',
    icon: Smartphone,
    productsCount: 29,
    status: 'active',
    createdAt: '15/02/2025',
  },
  {
    id: 5,
    name: 'Backend API & Microservices',
    slug: 'backend-api',
    description: 'RESTful API, GraphQL microservices xây dựng bằng Spring Boot, Node.js, Laravel',
    iconName: 'Cpu',
    icon: Cpu,
    productsCount: 34,
    status: 'active',
    createdAt: '01/03/2025',
  },
  {
    id: 6,
    name: 'AI, Chatbot & Automation',
    slug: 'ai-automation',
    description: 'Scripts tự động hóa, tích hợp OpenAI / Gemini API và mô hình AI',
    iconName: 'Bot',
    icon: Bot,
    productsCount: 18,
    status: 'active',
    createdAt: '10/03/2025',
  },
];

const AdminCategories = () => {
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    iconName: 'Package',
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', iconName: 'Package' });
    setShowAddModal(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      iconName: category.iconName || 'Package',
    });
    setShowAddModal(true);
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: !editingCategory ? autoSlug : prev.slug,
    }));
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      setCategoriesList((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name: formData.name, slug: formData.slug, description: formData.description }
            : c
        )
      );
      alert('Đã cập nhật danh mục thành công!');
    } else {
      const newCat = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        iconName: formData.iconName,
        icon: Package,
        productsCount: 0,
        status: 'active',
        createdAt: new Date().toLocaleDateString('vi-VN'),
      };
      setCategoriesList([...categoriesList, newCat]);
      alert('Đã thêm danh mục mới thành công!');
    }

    setShowAddModal(false);
  };

  const handleDeleteCategory = (catId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategoriesList((prev) => prev.filter((c) => c.id !== catId));
    }
  };

  const filteredCategories = categoriesList.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page-container admin-categories-page-modern">
      {/* Header Banner */}
      <div className="admin-page-header-banner">
        <div className="header-banner-copy">
          <div className="header-tag-pill">
            <Layers size={13} />
            <span>Phân Loại & Điều Hướng Sản Phẩm</span>
          </div>
          <h1 className="admin-page-main-title">Quản lý Danh mục Công nghệ</h1>
          <p className="admin-page-main-desc">
            Cấu hình các nhóm mã nguồn công nghệ, quản lý slug thân thiện SEO và liên kết sản phẩm
          </p>
        </div>

        <button type="button" className="btn-add-category-cta" onClick={handleOpenAdd}>
          <PlusCircle size={15} />
          <span>Thêm danh mục mới</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-table-toolbar-box">
        <div className="toolbar-search-wrap">
          <Search size={15} className="toolbar-search-icon" />
          <input
            type="text"
            className="toolbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên danh mục, mã slug..."
          />
        </div>

        <span className="categories-counter-txt">
          {categoriesList.length} danh mục đang kích hoạt
        </span>
      </div>

      {/* Categories Table */}
      <div className="admin-data-table-card">
        <div className="table-responsive-wrapper">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Mã Slug</th>
                <th>Mô tả chuyên mục</th>
                <th>Số mã nguồn</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => {
                const Icon = cat.icon || Package;
                return (
                  <tr key={cat.id} className="admin-table-row">
                    <td className="td-cat-name-cell">
                      <div className="cat-cell-flex">
                        <div className="cat-icon-avatar">
                          <Icon size={16} />
                        </div>
                        <strong className="cat-title-txt">{cat.name}</strong>
                      </div>
                    </td>

                    <td className="td-cat-slug">
                      <code>/{cat.slug}</code>
                    </td>

                    <td className="td-cat-desc">
                      <span className="cat-desc-txt">{cat.description}</span>
                    </td>

                    <td className="td-cat-count">
                      <span className="count-tag-pill">{cat.productsCount} sản phẩm</span>
                    </td>

                    <td className="td-cat-status">
                      <span className="status-badge-pill emerald">
                        <CheckCircle2 size={11} />
                        <span>Kích hoạt</span>
                      </span>
                    </td>

                    <td className="td-actions-cell">
                      <div className="actions-btn-strip">
                        <button
                          type="button"
                          className="btn-tbl-action"
                          onClick={() => handleOpenEdit(cat)}
                          title="Chỉnh sửa"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn-tbl-action delete"
                          onClick={() => handleDeleteCategory(cat.id)}
                          title="Xóa danh mục"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {showAddModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-cat-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-user-head">
              <h3>{editingCategory ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục Mới'}</h3>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="modal-cat-form">
              <div className="form-field-group">
                <label className="form-field-label">
                  Tên danh mục <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input-text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Ví dụ: Fullstack SaaS & Web App"
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Đường dẫn Slug (SEO)</label>
                <input
                  type="text"
                  className="form-input-text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="fullstack-saas"
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Mô tả ngắn</label>
                <textarea
                  className="form-textarea-box"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả nhóm mã nguồn công nghệ này..."
                />
              </div>

              <div className="modal-user-footer">
                <button
                  type="button"
                  className="btn-modal-close-action"
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-modal-confirm">
                  {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
