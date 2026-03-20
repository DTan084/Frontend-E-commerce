import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import SellerRoutes from './SellerRoutes';
import AdminRoutes from './AdminRoutes';
import { ROUTE_PATHS } from './paths';

import NotFoundPage from '../pages/Error/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {AuthRoutes()}
      {SellerRoutes()}
      {AdminRoutes()}
      <Route path={ROUTE_PATHS.SYSTEM.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
