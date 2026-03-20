/**
 * Utility functions for creating SEO-friendly slugs
 */

/**
 * Convert a string to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
export const createSlug = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove accents/diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters
    .replace(/[^\w-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/--+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Create product slug from product data
 * @param {Object} product - Product object
 * @returns {string} Product slug in format: product-name-id
 */
export const createProductSlug = (product) => {
  if (!product) return '';
  
  const id = product.product_id || product.id;
  const title = product.title || product.name || 'product';
  const slug = createSlug(title);
  
  return `${slug}-${id}`;
};

/**
 * Extract product ID from slug
 * @param {string} slug - Product slug (e.g., "premium-website-template-123")
 * @returns {number|string} Product ID
 */
export const extractIdFromSlug = (slug) => {
  if (!slug) return null;
  
  // Extract the last segment after the final hyphen (assuming it's the ID)
  const segments = slug.split('-');
  const lastSegment = segments[segments.length - 1];
  
  // Check if it's a valid number
  const id = parseInt(lastSegment, 10);
  return isNaN(id) ? slug : id;
};

/**
 * Create category slug
 * @param {string} categoryName - Category name
 * @returns {string} Category slug
 */
export const createCategorySlug = (categoryName) => {
  return createSlug(categoryName);
};
