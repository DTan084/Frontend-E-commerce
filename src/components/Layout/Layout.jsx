// File: src/components/Layout/Layout.jsx
// Layout wrapper component with enhanced UI/UX for PC screens

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

// Scroll to Top Icon Component
const ArrowUpIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Scroll to Top Button Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon />
    </button>
  );
};

// Route Change Handler - Scroll to top on route change
const RouteChangeHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Smooth scroll to top when route changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // Add page transition class
    document.body.classList.add('page-transitioning');

    const timer = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

// Progress Bar Component
const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollPx / winHeightPx) * 100;

      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
    </div>
  );
};

const Layout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Simulate page loading on route change (for better UX)
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="layout-wrapper">
      {/* Progress Bar */}
      <ProgressBar />

      {/* Route Change Handler */}
      <RouteChangeHandler />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Content Container with fade-in animation */}
        <div className={`content-wrapper ${isLoading ? 'loading' : 'loaded'}`}>
          {isLoading ? <LoadingSpinner /> : <Outlet />}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
