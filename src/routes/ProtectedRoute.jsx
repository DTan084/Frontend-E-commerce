import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTE_PATHS } from './paths';

const ProtectedRoute = ({ children, adminOnly = false, sellerOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          gap: '20px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            border: '6px solid rgba(255,255,255,0.3)',
            borderTop: '6px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
        <div style={{ fontSize: '20px', fontWeight: '600' }}>Loading...</div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`${ROUTE_PATHS.AUTH.ROOT}/${ROUTE_PATHS.AUTH.LOGIN}`} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to={ROUTE_PATHS.ROOT} replace />;
  }

  if (sellerOnly && user?.role !== 'seller' && user?.role !== 'admin') {
    return <Navigate to={ROUTE_PATHS.ROOT} replace />;
  }

  return children;
};

export default ProtectedRoute;
