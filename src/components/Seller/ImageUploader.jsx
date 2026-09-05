import React, { useState, useRef } from 'react';
import { Image, UploadCloud, ChevronLeft, ChevronRight, Trash2, Star } from 'lucide-react';
import './ImageUploader.css';

const ImageUploader = ({ images, setImages, maxImages = 5 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleChange = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    if (images.length + imageFiles.length > maxImages) {
      alert(`Bạn chỉ có thể tải lên tối đa ${maxImages} hình ảnh`);
      return;
    }

    const newImages = imageFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    const newIndex = direction === 'left' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= images.length) return;

    [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
    setImages(newImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="image-uploader-container-modern">
      <div className="uploader-header-modern">
        <div className="uploader-title-pair">
          <Image size={16} className="text-primary" />
          <span className="uploader-title-text">
            Ảnh minh họa sản phẩm <span className="required-star">*</span>
          </span>
        </div>
        <span className="image-count-badge">
          {images.length} / {maxImages} ảnh
        </span>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="image-previews-grid">
          {images.map((image, index) => (
            <div key={image.id} className="image-preview-item-card">
              {index === 0 && (
                <div className="primary-cover-chip">
                  <Star size={10} fill="#ffffff" color="#ffffff" />
                  <span>Ảnh bìa chính</span>
                </div>
              )}

              <img src={image.preview} alt={image.name} className="preview-img-tag" />

              <div className="preview-hover-overlay">
                <div className="preview-file-meta">
                  <span className="preview-file-title">{image.name}</span>
                  <span className="preview-file-bytes">{formatFileSize(image.size)}</span>
                </div>

                <div className="preview-btn-actions">
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn-preview-ctrl"
                      onClick={() => moveImage(index, 'left')}
                      title="Chuyển sang trái"
                    >
                      <ChevronLeft size={14} />
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      className="btn-preview-ctrl"
                      onClick={() => moveImage(index, 'right')}
                      title="Chuyển sang phải"
                    >
                      <ChevronRight size={14} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-preview-ctrl delete"
                    onClick={() => removeImage(image.id)}
                    title="Xóa ảnh này"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Drop Area */}
      {images.length < maxImages && (
        <div
          className={`dropzone-upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <div className="dropzone-icon-box">
            <UploadCloud size={24} className="text-primary" />
          </div>

          <div className="dropzone-labels">
            <p className="dropzone-primary-txt">
              <strong>Nhấn để chọn ảnh</strong> hoặc kéo thả vào đây
            </p>
            <p className="dropzone-hint-txt">
              PNG, JPG, WEBP chất lượng cao (Tối đa 5MB/ảnh). Ảnh đầu tiên sẽ được làm ảnh bìa
              chính.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
