import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';

import {
  AdminDashboard,
  AdminUsers,
  AdminProducts,
  PendingProductsPage,
  AdminOrders,
  AdminCategories,
  SellersManagementPage,
} from '../pages/Admin';
import { ROUTE_PATHS } from './paths';

const AdminRoutes = () => (
  <Route
    path={ROUTE_PATHS.ADMIN.ROOT}
    element={
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<AdminDashboard />} />
    <Route path={ROUTE_PATHS.ADMIN.USERS} element={<AdminUsers />} />
    <Route path={ROUTE_PATHS.ADMIN.PRODUCTS} element={<AdminProducts />} />
    <Route path={ROUTE_PATHS.ADMIN.PENDING_PRODUCTS} element={<PendingProductsPage />} />
    <Route path="pending-products" element={<PendingProductsPage />} />
    <Route path={ROUTE_PATHS.ADMIN.ORDERS} element={<AdminOrders />} />
    <Route path={ROUTE_PATHS.ADMIN.CATEGORIES} element={<AdminCategories />} />
    <Route path={ROUTE_PATHS.ADMIN.SELLERS} element={<SellersManagementPage />} />
  </Route>
);

export default AdminRoutes;
