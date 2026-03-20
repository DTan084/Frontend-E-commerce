// Centralized export for all mock data

export * from './mockProducts';
export * from './mockUsers';
export * from './mockOrders';
export * from './mockReviews';
export * from './mockCart';
export * from './mockSearch';

// Re-export commonly used functions with shorter names
export { 
  mockProducts as products,
  mockCategories as categories,
  mockTechnologies as technologies,
  mockProductImages,
  mockSimilarProducts,
  filterProducts,
  getProductById as getProduct,
  getFeaturedProducts as getFeatured
} from './mockProducts';

export {
  mockUsers as users,
  authenticateUser as login,
  registerUser as register
} from './mockUsers';

export {
  mockOrders as orders,
  getOrdersByUserId as getUserOrders,
  createOrder
} from './mockOrders';

export {
  mockReviews as reviews,
  mockRatingStats as ratingStats,
  mockCurrentUser as currentUser,
  mockSellerUser as sellerUser,
  calculateRatingStats
} from './mockReviews';

export {
  mockCartItems as cartItems,
  mockCartSummary as cartSummary,
  mockCartUser as cartUser,
  calculateCartTotals,
  validateCoupon,
  mockPaymentMethods as paymentMethods,
  mockCheckoutData as checkoutData
} from './mockCart';

export {
  mockSearchData as searchData,
  searchProducts,
  searchCategories,
  searchTags,
  getPopularSearches,
  getSearchSuggestions,
  getSearchResults
} from './mockSearch';
