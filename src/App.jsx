import React from 'react';
import DevTools from './components/common/DevTools';
import ScrollToTop from './components/common/ScrollToTop';
import LocalStorageDebug from './components/common/LocalStorageDebug';
import AppRoutes from './routes/AppRoutes';
import { initAppServices } from './bootstrap/initAppServices';
import './styles/App.css';

initAppServices();

const isDebugEnabled =
  process.env.NODE_ENV === 'development' && process.env.REACT_APP_DEBUG_MODE === 'true';

function App() {
  return (
    <div className="App">
      {/* Developer Tools - Only in Development and when debug mode is enabled */}
      {isDebugEnabled && <DevTools />}

      {/* LocalStorage Debug Tool - Only in Development and when debug mode is enabled */}
      {isDebugEnabled && <LocalStorageDebug />}

      {/* Scroll to top on route change */}
      <ScrollToTop />

      <AppRoutes />
    </div>
  );
}

export default App;
