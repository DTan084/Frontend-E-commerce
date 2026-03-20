import React, { useState, useRef } from 'react';
import './FileUploader.css';

const FileUploader = ({ file, setFile, maxSize = 100 * 1024 * 1024 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    // Validate file type
    if (!selectedFile.name.endsWith('.zip')) {
      alert('Please upload a ZIP file');
      return;
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      alert(`File size must be less than ${formatFileSize(maxSize)}`);
      return;
    }

    // Simulate upload with progress
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setFile({
      file: selectedFile,
      name: selectedFile.name,
      size: selectedFile.size,
      uploadedAt: new Date().toISOString(),
    });
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="file-uploader-container">
      <div className="uploader-header">
        <h4 className="uploader-title">
          📦 Source Code File
          <span className="required">*</span>
        </h4>
        <span className="file-hint">Max {formatFileSize(maxSize)}</span>
      </div>

      {file ? (
        /* File Preview */
        <div className="file-preview-card">
          <div className="file-preview-icon">
            <div className="zip-icon">📦</div>
          </div>

          <div className="file-preview-details">
            <div className="file-info">
              <h4 className="file-name">{file.name}</h4>
              <p className="file-size">{formatFileSize(file.size)}</p>
            </div>

            {uploading ? (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{progress}%</span>
              </div>
            ) : (
              <div className="file-status">
                <span className="status-badge success">
                  <span className="status-icon">✓</span>
                  Uploaded
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="file-remove-btn"
            onClick={removeFile}
            disabled={uploading}
          >
            🗑️
          </button>
        </div>
      ) : (
        /* Upload Area */
        <div
          className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <div className="upload-icon-wrapper">
            <div className="upload-icon-bg"></div>
            <div className="upload-icon">📦</div>
          </div>

          <h4 className="upload-title">Upload ZIP File</h4>
          <p className="upload-subtitle">
            Drag & drop your source code file here
          </p>
          <p className="upload-hint">
            or click to browse from your computer
          </p>

          <div className="upload-specs">
            <div className="spec-item">
              <span className="spec-icon">📄</span>
              <span className="spec-text">ZIP format only</span>
            </div>
            <div className="spec-item">
              <span className="spec-icon">⚖️</span>
              <span className="spec-text">Max {formatFileSize(maxSize)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Additional Options */}
      <div className="file-options">
        <label className="option-checkbox">
          <input type="checkbox" defaultChecked />
          <span className="checkbox-mark"></span>
          <span className="checkbox-label">
            <strong>Include documentation in ZIP</strong>
            <small>Add README, API docs, or guides</small>
          </span>
        </label>

        <label className="option-checkbox">
          <input type="checkbox" defaultChecked />
          <span className="checkbox-mark"></span>
          <span className="checkbox-label">
            <strong>Free updates for buyers</strong>
            <small>Buyers will receive future updates</small>
          </span>
        </label>
      </div>

      {/* Security Tips */}
      <div className="file-security-tips">
        <div className="security-header">
          <span className="security-icon">🔒</span>
          <strong>Security Tips</strong>
        </div>
        <ul className="security-list">
          <li>Remove all sensitive data (API keys, passwords, database credentials)</li>
          <li>Clean up development dependencies and cache files</li>
          <li>Include a clear README with installation instructions</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;
