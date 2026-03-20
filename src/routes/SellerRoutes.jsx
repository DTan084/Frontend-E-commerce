import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import {
  SellerDashboard,
  MyProductsPage,
  EditProductPage,
  UploadProductPage,
  SalesPage,
  WithdrawalsPage,
} from '../pages/Seller';
import { ROUTE_PATHS } from './paths';

const SellerRoutes = () => (
  <>
    <Route
      path={ROUTE_PATHS.SELLER.DASHBOARD}
      element={
        <ProtectedRoute sellerOnly>
          <SellerDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.SELLER.PRODUCTS}
      element={
        <ProtectedRoute sellerOnly>
          <MyProductsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.SELLER.EDIT_PRODUCT}
      element={
        <ProtectedRoute sellerOnly>
          <EditProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.SELLER.UPLOAD}
      element={
        <ProtectedRoute sellerOnly>
          <UploadProductPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.SELLER.SALES}
      element={
        <ProtectedRoute sellerOnly>
          <SalesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.SELLER.WITHDRAWALS}
      element={
        <ProtectedRoute sellerOnly>
          <WithdrawalsPage />
        </ProtectedRoute>
      }
    />
  </>
);

export default SellerRoutes;
