import React, { useState, useRef } from 'react';
import { FileArchive, UploadCloud, Trash2, ShieldCheck, FileCode2 } from 'lucide-react';
import './FileUploader.css';

const FileUploader = ({ file, setFile, maxSize = 200 * 1024 * 1024 }) => {
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
    if (!selectedFile.name.endsWith('.zip') && !selectedFile.name.endsWith('.rar')) {
      alert('Vui lòng tải lên tệp nén định dạng .ZIP hoặc .RAR');
      return;
    }

    if (selectedFile.size > maxSize) {
      alert(`Kích thước file không được vượt quá ${formatFileSize(maxSize)}`);
      return;
    }

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setFile(selectedFile);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="file-uploader-container-modern">
      <div className="file-uploader-header">
        <div className="file-title-pair">
          <FileArchive size={16} className="text-primary" />
          <span className="file-title-text">
            Tệp mã nguồn nén (.ZIP) <span className="required-star">*</span>
          </span>
        </div>
        <span className="file-limit-pill">Tối đa 200MB</span>
      </div>

      {!file && !uploading && (
        <div
          className={`file-dropzone-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,.rar"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <div className="file-dropzone-icon">
            <UploadCloud size={24} className="text-primary" />
          </div>

          <div className="file-dropzone-copy">
            <p className="file-drop-main">
              <strong>Nhấn để tải lên file .ZIP</strong> hoặc kéo thả vào khung này
            </p>
            <p className="file-drop-sub">
              Bao gồm toàn bộ source code sạch, file cấu hình và tài liệu hướng dẫn (README.md).
            </p>
          </div>
        </div>
      )}

      {uploading && (
        <div className="file-uploading-progress-box">
          <div className="progress-info-row">
            <div className="progress-file-name">
              <FileCode2 size={16} className="text-primary" />
              <span>Đang tải lên và quét bảo mật...</span>
            </div>
            <span className="progress-percent-val">{progress}%</span>
          </div>
          <div className="progress-track-bar">
            <div className="progress-fill-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      {file && !uploading && (
        <div className="file-uploaded-success-card">
          <div className="uploaded-file-details">
            <div className="uploaded-icon-wrap">
              <FileArchive size={20} className="text-primary" />
            </div>
            <div className="uploaded-text-meta">
              <span className="uploaded-file-name">{file.name}</span>
              <span className="uploaded-file-size">{formatFileSize(file.size)}</span>
            </div>
          </div>

          <div className="uploaded-actions-right">
            <span className="scan-clean-badge">
              <ShieldCheck size={13} className="text-emerald" />
              <span>Đã quét mã độc</span>
            </span>

            <button
              type="button"
              className="btn-remove-zip"
              onClick={removeFile}
              title="Xóa và chọn file khác"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
