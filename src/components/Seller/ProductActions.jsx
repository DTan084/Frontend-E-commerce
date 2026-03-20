import React, { useState } from 'react';
import './ProductActions.css';

const ProductActions = ({ product, onEdit, onView, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(product.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="product-actions">
      {!showDeleteConfirm ? (
        <div className="action-buttons">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(product.id)}
            title="Edit Product"
          >
            <span className="btn-icon">✏️</span>
            <span className="btn-text">Edit</span>
          </button>
          
          <button
            className="action-btn view-btn"
            onClick={() => onView(product.id)}
            title="View Product"
          >
            <span className="btn-icon">👁️</span>
            <span className="btn-text">View</span>
          </button>
          
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            title="Delete Product"
          >
            <span className="btn-icon">🗑️</span>
            <span className="btn-text">Delete</span>
          </button>
        </div>
      ) : (
        <div className="delete-confirmation">
          <div className="confirm-message">
            <span className="confirm-icon">⚠️</span>
            <span className="confirm-text">Delete?</span>
          </div>
          <div className="confirm-actions">
            <button
              className="confirm-btn yes-btn"
              onClick={confirmDelete}
            >
              ✓ Yes
            </button>
            <button
              className="confirm-btn no-btn"
              onClick={cancelDelete}
            >
              ✕ No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
