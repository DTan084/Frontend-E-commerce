import React, { useState } from 'react';
import './AdminCategories.css';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '📦',
  });

  // Mock categories data
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      slug: 'electronics',
      description: 'Gadgets, devices, and electronic accessories',
      icon: '💻',
      products: 156,
      status: 'active',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      name: 'Fashion',
      slug: 'fashion',
      description: 'Clothing, shoes, and fashion accessories',
      icon: '👗',
      products: 234,
      status: 'active',
      createdAt: '2025-01-20',
    },
    {
      id: 3,
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Furniture, decor, and garden supplies',
      icon: '🏡',
      products: 89,
      status: 'active',
      createdAt: '2025-02-05',
    },
    {
      id: 4,
      name: 'Sports & Fitness',
      slug: 'sports-fitness',
      description: 'Sports equipment and fitness accessories',
      icon: '⚽',
      products: 67,
      status: 'active',
      createdAt: '2025-02-15',
    },
    {
      id: 5,
      name: 'Books & Media',
      slug: 'books-media',
      description: 'Books, ebooks, music, and movies',
      icon: '📚',
      products: 145,
      status: 'active',
      createdAt: '2025-03-01',
    },
    {
      id: 6,
      name: 'Beauty & Health',
      slug: 'beauty-health',
      description: 'Cosmetics, skincare, and health products',
      icon: '💄',
      products: 98,
      status: 'inactive',
      createdAt: '2025-03-10',
    },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const iconOptions = ['📦', '💻', '👗', '🏡', '⚽', '📚', '💄', '🎮', '🎨', '🚗', '🍔', '✈️'];

  const handleAddCategory = () => {
    setShowAddModal(true);
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', icon: '📦' });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
    });
    setShowAddModal(true);
  };

  const handleSaveCategory = () => {
    console.log('Save category:', formData);
    setShowAddModal(false);
    setFormData({ name: '', slug: '', description: '', icon: '📦' });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      console.log('Delete category:', categoryId);
    }
  };

  const handleToggleStatus = (categoryId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    console.log(`Toggle category ${categoryId} status to ${newStatus}`);
  };

  return (
    <div className="admin-categories-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">📁</span>
            Categories Management
          </h1>
          <p className="page-subtitle">Organize and manage product categories</p>
        </div>
        <button className="add-category-btn" onClick={handleAddCategory}>
          <span className="btn-icon">➕</span>
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="categories-stats">
        <div className="stat-card">
          <span className="stat-icon">📁</span>
          <div className="stat-content">
            <span className="stat-value">{categories.length}</span>
            <span className="stat-label">Total Categories</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-content">
            <span className="stat-value">{categories.filter(c => c.status === 'active').length}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-content">
            <span className="stat-value">{categories.reduce((sum, c) => sum + c.products, 0)}</span>
            <span className="stat-label">Total Products</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {filteredCategories.map((category, index) => (
          <div 
            key={category.id} 
            className="category-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="category-header">
              <div className="category-icon">{category.icon}</div>
              <span className={`status-badge ${category.status}`}>
                {category.status}
              </span>
            </div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-slug">/{category.slug}</p>
            <p className="category-description">{category.description}</p>
            <div className="category-meta">
              <div className="meta-item">
                <span className="meta-icon">📦</span>
                <span className="meta-text">{category.products} products</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">{category.createdAt}</span>
              </div>
            </div>
            <div className="category-actions">
              <button
                className="action-btn edit"
                onClick={() => handleEditCategory(category)}
              >
                ✏️ Edit
              </button>
              <button
                className="action-btn toggle"
                onClick={() => handleToggleStatus(category.id, category.status)}
              >
                {category.status === 'active' ? '🔒' : '🔓'}
              </button>
              <button
                className="action-btn delete"
                onClick={() => handleDeleteCategory(category.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <p>No categories found</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Category Name *</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Slug *</label>
                <input
                  type="text"
                  placeholder="category-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Enter category description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <div className="icon-selector">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      className={`icon-option ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData({ ...formData, icon })}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveCategory}>
                {editingCategory ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
