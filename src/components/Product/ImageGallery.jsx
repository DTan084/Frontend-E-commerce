// File: src/components/Product/ImageGallery.jsx
// Premium image gallery with lightbox and zoom for PC

import React, { useState, useEffect, useRef } from 'react';
import './ImageGallery.css';

// Icon Components
const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ZoomInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const ImageGallery = ({ images = [], productTitle = 'Product' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const imageRef = useRef(null);

  // If no images provided, use placeholder
  const imageList = images.length > 0 ? images : ['/placeholder-product.jpg'];
  const hasMultipleImages = imageList.length > 1;

  // Navigate to previous image
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? imageList.length - 1 : prev - 1));
    setImageLoaded(false);
  };

  // Navigate to next image
  const handleNext = () => {
    setCurrentIndex(prev => (prev === imageList.length - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setImageLoaded(false);
    }
  };

  // Open lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsZooming(false);
    document.body.style.overflow = 'auto';
  };

  // Handle mouse move for zoom
  const handleMouseMove = (e) => {
    if (!isZooming || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }
    if (touchStart - touchEnd < -50) {
      handlePrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLightboxOpen, currentIndex]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className="image-gallery-modern">
        {/* Main Image Display */}
        <div className="main-image-section">
          <div 
            className="main-image-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onClick={openLightbox}
          >
            {!imageLoaded && (
              <div className="image-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
            )}
            <img
              ref={imageRef}
              src={imageList[currentIndex]}
              alt={`${productTitle} - screenshot ${currentIndex + 1}`}
              className={`main-image ${imageLoaded ? 'loaded' : ''} ${isZooming ? 'zooming' : ''}`}
              style={isZooming ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : {}}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Zoom Indicator */}
            <div className={`zoom-indicator ${isZooming ? 'active' : ''}`}>
              <ZoomInIcon />
              <span>Click to view fullscreen</span>
            </div>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button 
                  className="nav-arrow prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </button>
                <button 
                  className="nav-arrow next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="image-counter">
                <span>{currentIndex + 1}</span>
                <span className="divider">/</span>
                <span>{imageList.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnails Strip */}
        {hasMultipleImages && (
          <div className="thumbnails-section">
            <div className="thumbnails-grid">
              {imageList.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${productTitle} thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="thumbnail-overlay"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Indicators (dots) */}
        {hasMultipleImages && (
          <div className="mobile-indicators">
            {imageList.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="lightbox-overlay"
          onClick={closeLightbox}
        >
          <div className="lightbox-container">
            {/* Close Button */}
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <XIcon />
            </button>

            {/* Lightbox Content */}
            <div 
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={imageList[currentIndex]}
                alt={`${productTitle} ${currentIndex + 1}`}
                className="lightbox-image"
              />
            </div>

            {/* Lightbox Navigation */}
            {hasMultipleImages && (
              <>
                <button 
                  className="lightbox-arrow prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </button>
                <button 
                  className="lightbox-arrow next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            {/* Lightbox Counter */}
            <div className="lightbox-counter">
              <span className="current">{currentIndex + 1}</span>
              <span className="separator"> / </span>
              <span className="total">{imageList.length}</span>
            </div>

            {/* Lightbox Thumbnails */}
            {hasMultipleImages && imageList.length > 1 && (
              <div className="lightbox-thumbnails">
                {imageList.map((image, index) => (
                  <button
                    key={index}
                    className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(index);
                    }}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
