/**
 * Utility functions for formatting prices in Vietnamese
 */

/**
 * Format price in Vietnamese Dong (VND)
 * @param {number} price - Price in VND
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price || price === 0) return '0₫';
  
  // Convert to number if string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // Format with thousand separators
  return `${numPrice.toLocaleString('vi-VN')}₫`;
};

/**
 * Format price with compact notation (K, M, B)
 * @param {number} price - Price in VND
 * @returns {string} Formatted compact price string
 */
export const formatPriceCompact = (price) => {
  if (!price || price === 0) return '0₫';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (numPrice >= 1000000000) {
    return `${(numPrice / 1000000000).toFixed(1)}B₫`;
  } else if (numPrice >= 1000000) {
    return `${(numPrice / 1000000).toFixed(1)}M₫`;
  } else if (numPrice >= 1000) {
    return `${(numPrice / 1000).toFixed(0)}K₫`;
  }
  
  return `${numPrice.toLocaleString('vi-VN')}₫`;
};

/**
 * Format price for display in cards (shortened)
 * @param {number} price - Price in VND
 * @returns {string} Formatted price string
 */
export const formatPriceCard = (price) => {
  if (!price || price === 0) return '0₫';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  // For prices over 1 million, show in millions
  if (numPrice >= 1000000) {
    const millions = numPrice / 1000000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}tr`;
  }
  
  // For prices over 1000, show in thousands
  if (numPrice >= 1000) {
    return `${(numPrice / 1000).toFixed(0)}k`;
  }
  
  return `${numPrice.toLocaleString('vi-VN')}₫`;
};

/**
 * Parse price string to number
 * @param {string} priceString - Price string (e.g., "1.000.000₫")
 * @returns {number} Price as number
 */
export const parsePrice = (priceString) => {
  if (!priceString) return 0;
  
  // Remove currency symbol and dots
  const cleaned = priceString.replace(/[₫.,\s]/g, '');
  return parseFloat(cleaned) || 0;
};

export default formatPrice;
