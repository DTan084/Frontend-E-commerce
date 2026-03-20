import React, { useState, useRef } from 'react';
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
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + imageFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    const newImages = imageFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }));

    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
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
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="image-uploader-container">
      <div className="uploader-header">
        <h4 className="uploader-title">
          🖼️ Product Images
          <span className="required">*</span>
        </h4>
        <span className="image-count">
          {images.length} / {maxImages} images
        </span>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="image-previews">
          {images.map((image, index) => (
            <div key={image.id} className="image-preview-card">
              {index === 0 && (
                <div className="primary-badge">Primary</div>
              )}
              
              <img src={image.preview} alt={image.name} className="preview-image" />
              
              <div className="preview-overlay">
                <div className="preview-info">
                  <p className="preview-name">{image.name}</p>
                  <p className="preview-size">{formatFileSize(image.size)}</p>
                </div>
                
                <div className="preview-actions">
                  {index > 0 && (
                    <button
                      type="button"
                      className="preview-btn move-btn"
                      onClick={() => moveImage(index, 'left')}
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      className="preview-btn move-btn"
                      onClick={() => moveImage(index, 'right')}
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                  <button
                    type="button"
                    className="preview-btn delete-btn"
                    onClick={() => removeImage(image.id)}
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
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
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          
          <div className="upload-icon">📸</div>
          <h4 className="upload-title">
            {images.length === 0 ? 'Add Product Images' : 'Add More Images'}
          </h4>
          <p className="upload-subtitle">
            Drag & drop or click to browse
          </p>
          <p className="upload-hint">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>
      )}

      <div className="uploader-tips">
        <div className="tip-item">
          <span className="tip-icon">💡</span>
          <span className="tip-text">First image will be used as primary thumbnail</span>
        </div>
        <div className="tip-item">
          <span className="tip-icon">📐</span>
          <span className="tip-text">Recommended size: 1200x800px</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
