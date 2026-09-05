import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/Home/HomePage';
import AboutPage from '../pages/About/AboutPage';

import ContactPage from '../pages/Support/ContactPage';
import FAQPage from '../pages/Support/FAQPage';
import TermsPage from '../pages/Support/TermsPage';
import PrivacyPage from '../pages/Support/PrivacyPage';
import RefundPage from '../pages/Support/RefundPage';

import { BecomeSellerPage } from '../pages/Seller';

import {
  ProductListPage,
  ProductDetailPage,
  CategoriesPage,
  CategoryDetailPage,
  CollectionPage,
  TrendingPage,
  BestSellersPage,
  NewArrivalsPage,
  OnSalePage,
} from '../pages/Product';

import CartPage from '../pages/Cart/CartPage';
import WishlistPage from '../pages/User/WishlistPage';
import DashboardPage from '../pages/User/DashboardPage';
import OrdersPage from '../pages/User/OrdersPage';
import MyPurchasesPage from '../pages/User/MyPurchasesPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import CheckoutSuccessPage from '../pages/Checkout/CheckoutSuccessPage';
import ProfilePage from '../pages/User/ProfilePage';

import ProtectedRoute from './ProtectedRoute';
import { ROUTE_PATHS } from './paths';

const PublicRoutes = () => (
  <Route path={ROUTE_PATHS.ROOT} element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path={ROUTE_PATHS.PUBLIC.PRODUCTS} element={<ProductListPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.PRODUCT_DETAIL} element={<ProductDetailPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.ABOUT} element={<AboutPage />} />

    <Route path={ROUTE_PATHS.PUBLIC.SEARCH} element={<ProductListPage />} />

    <Route path={ROUTE_PATHS.PUBLIC.CONTACT} element={<ContactPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.FAQ} element={<FAQPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.TERMS} element={<TermsPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.PRIVACY} element={<PrivacyPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.REFUND} element={<RefundPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.CATEGORIES} element={<CategoriesPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.CATEGORY_DETAIL} element={<CategoryDetailPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.BECOME_SELLER} element={<BecomeSellerPage />} />

    <Route path={ROUTE_PATHS.PUBLIC.COLLECTION} element={<CollectionPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.TRENDING} element={<TrendingPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.BEST_SELLERS} element={<BestSellersPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.NEW_ARRIVALS} element={<NewArrivalsPage />} />
    <Route path={ROUTE_PATHS.PUBLIC.ON_SALE} element={<OnSalePage />} />

    <Route
      path={ROUTE_PATHS.PUBLIC.WISHLIST}
      element={
        <ProtectedRoute>
          <WishlistPage />
        </ProtectedRoute>
      }
    />
    <Route path={ROUTE_PATHS.PUBLIC.CART} element={<CartPage />} />

    <Route
      path={ROUTE_PATHS.USER.DASHBOARD}
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.USER.ORDERS}
      element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.USER.PURCHASES}
      element={
        <ProtectedRoute>
          <MyPurchasesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.USER.CHECKOUT}
      element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.USER.CHECKOUT_SUCCESS}
      element={
        <ProtectedRoute>
          <CheckoutSuccessPage />
        </ProtectedRoute>
      }
    />
    <Route
      path={ROUTE_PATHS.USER.PROFILE}
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
  </Route>
);

export default PublicRoutes;
