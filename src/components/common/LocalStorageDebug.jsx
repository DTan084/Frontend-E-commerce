import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../../constants/storageKeys';

const LocalStorageDebug = () => {
  const [orders, setOrders] = useState([]);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    if (process.env.NODE_ENV === 'development') {
      // Load orders from localStorage
      const loadOrders = () => {
        try {
          const ordersData = localStorage.getItem(STORAGE_KEYS.ORDERS);
          if (ordersData) {
            setOrders(JSON.parse(ordersData));
          }
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      };

      loadOrders();

      // Reload every 2 seconds
      const interval = setInterval(loadOrders, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
      }}
    >
      <button
        onClick={() => setShowDebug(!showDebug)}
        style={{
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '20px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
        title="Debug LocalStorage"
      >
        🐛
      </button>

      {showDebug && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '0',
            background: 'white',
            border: '2px solid #667eea',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '300px',
            maxWidth: '400px',
            maxHeight: '400px',
            overflowY: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', color: '#667eea' }}>📦 Orders in LocalStorage</h3>

          <div style={{ fontSize: '12px', marginBottom: '8px' }}>
            <strong>Total Orders:</strong> {orders.length}
          </div>

          {orders.length === 0 ? (
            <p style={{ color: '#999', fontSize: '13px' }}>
              No orders found. Try making a purchase!
            </p>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {orders.map((order, index) => (
                <div
                  key={order.id || index}
                  style={{
                    padding: '8px',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                >
                  <div>
                    <strong>ID:</strong> {order.id}
                  </div>
                  <div>
                    <strong>Status:</strong> {order.status}
                  </div>
                  <div>
                    <strong>Items:</strong> {order.items?.length || 0}
                  </div>
                  <div>
                    <strong>Total:</strong> {order.total?.toLocaleString('vi-VN')}đ
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              localStorage.removeItem(STORAGE_KEYS.ORDERS);
              setOrders([]);
            }}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '8px',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            🗑️ Clear All Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalStorageDebug;
