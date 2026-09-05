import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../pages/Auth';
import { ROUTE_PATHS } from './paths';

const AuthRoutes = () => (
  <Route path={ROUTE_PATHS.AUTH.ROOT} element={<AuthLayout />}>
    <Route path={ROUTE_PATHS.AUTH.LOGIN} element={<LoginPage />} />
    <Route path={ROUTE_PATHS.AUTH.REGISTER} element={<RegisterPage />} />
    <Route path={ROUTE_PATHS.AUTH.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
  </Route>
);

export default AuthRoutes;
