import React, { useState } from 'react';
import { Edit, Eye, Trash2, Check, X, AlertTriangle } from 'lucide-react';
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
    <div className="product-actions-modern">
      {!showDeleteConfirm ? (
        <div className="action-buttons-strip">
          <button
            type="button"
            className="btn-action-icon edit"
            onClick={() => onEdit(product.id)}
            title="Chỉnh sửa mã nguồn"
          >
            <Edit size={14} />
          </button>

          <button
            type="button"
            className="btn-action-icon view"
            onClick={() => onView(product.id)}
            title="Xem chi tiết trên sàn"
          >
            <Eye size={14} />
          </button>

          <button
            type="button"
            className="btn-action-icon delete"
            onClick={handleDelete}
            title="Xóa mã nguồn"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ) : (
        <div className="delete-confirm-box-inline">
          <div className="confirm-prompt-text">
            <AlertTriangle size={13} className="text-danger" />
            <span>Xác nhận xóa?</span>
          </div>
          <div className="confirm-btn-pair">
            <button
              type="button"
              className="btn-confirm-yes"
              onClick={confirmDelete}
              title="Đồng ý xóa"
            >
              <Check size={12} />
              <span>Xóa</span>
            </button>
            <button type="button" className="btn-confirm-no" onClick={cancelDelete} title="Hủy bỏ">
              <X size={12} />
              <span>Hủy</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
