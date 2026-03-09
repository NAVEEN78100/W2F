import React, { useState } from 'react';

const FileUploadSection = ({ onFileSelect, selectedFile }) => {
  const [dragActive, setDragActive] = useState(false);

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div id="fileUploadSection" className="file-upload-section">
      <div
        className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="fileInput" className="file-upload-label">
          <div className="file-upload-icon">📎</div>
          <p>Drag and drop your file here or click to browse</p>
          <small>JPG/JPEG only, max 2MB</small>
        </label>
      </div>

      {selectedFile && (
        <div className="file-selected">
          <p>✓ Selected: {selectedFile.name}</p>
          <small>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</small>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;