// Mock data for search suggestions and autocomplete
import { advancedSearch, normalizeQuery, removeVietnameseTones, getSimilarityScore } from '../utils/searchUtils';
import { getAllProducts } from './mockProducts';
import { getAllCategories } from './categories';

export const mockSearchData = {
  popularSearches: [
    { id: 1, text: 'website bán hàng', count: 1250, trending: true },
    { id: 2, text: 'quản lý nhân sự', count: 890, trending: true },
    { id: 3, text: 'website tin tức', count: 756, trending: false },
    { id: 4, text: 'khóa học online', count: 645, trending: true },
    { id: 5, text: 'quản lý học sinh', count: 534, trending: false },
    { id: 6, text: 'đặt phòng khách sạn', count: 489, trending: false },
    { id: 7, text: 'quản lý bất động sản', count: 423, trending: true },
    { id: 8, text: 'forum thảo luận', count: 367, trending: false }
  ],

  // Products are now dynamically loaded from mockProducts.js
  get products() {
    return getAllProducts().slice(0, 10).map(p => ({
      id: p.id,
      title: p.name,
      slug: p.slug,
      thumbnail: p.image,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount || 0,
      rating: p.rating,
      reviewCount: p.reviews || 0,
      category: p.categoryName,
      tags: p.technology || [],
      seller: p.seller || { name: 'TopCode', verified: true }
    }));
  },

  // Categories are now dynamically loaded from categories.js
  get categories() {
    const allProducts = getAllProducts();
    return getAllCategories().map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      productCount: allProducts.filter(p => p.category === cat.id).length,
      icon: cat.icon,
      description: cat.description
    }));
  },

  // Tags are dynamically generated from all product technologies
  get tags() {
    const allProducts = getAllProducts();
    const techCounts = {};
    const techColors = {
      'React': '#61dafb',
      'NodeJS': '#68a063',
      'PHP': '#777bb3',
      'MySQL': '#4479a1',
      'PostgreSQL': '#336791',
      'MongoDB': '#47a248',
      'JavaScript': '#f7df1e',
      'HTML': '#e34f26',
      'CSS': '#1572b6',
      'Bootstrap': '#7952b3',
      'Laravel': '#ff2d20',
      'Vue': '#42b883',
      'Angular': '#dd0031',
      'Python': '#3776ab',
      'Django': '#092e20',
      'Express': '#000000',
      'TypeScript': '#3178c6',
      'ASP.NET': '#512bd4',
      'C#': '#239120'
    };
    
    allProducts.forEach(p => {
      if (p.technology && Array.isArray(p.technology)) {
        p.technology.forEach(tech => {
          techCounts[tech] = (techCounts[tech] || 0) + 1;
        });
      }
    });
    
    return Object.entries(techCounts)
      .map(([name, count], idx) => ({
        id: idx + 1,
        name,
        count,
        color: techColors[name] || '#667eea'
      }))
      .sort((a, b) => b.count - a.count);
  },

  // Features are dynamically generated from all products
  get features() {
    const allProducts = getAllProducts();
    const featureCounts = {};
    
    allProducts.forEach(p => {
      if (p.features && Array.isArray(p.features)) {
        p.features.forEach(feature => {
          featureCounts[feature] = (featureCounts[feature] || 0) + 1;
        });
      }
    });
    
    return Object.entries(featureCounts)
      .map(([name, count], idx) => ({
        id: idx + 1,
        name,
        count
      }))
      .sort((a, b) => b.count - a.count);
  },

  searchHistory: [
    'website bán hàng',
    'quản lý nhân sự',
    'website tin tức',
    'khóa học online',
    'quản lý học sinh'
  ],

  suggestedKeywords: [
    'React',
    'PHP',
    'Laravel',
    'Bán hàng',
    'Quản lý',
    'Tin tức',
    'Giáo dục',
    'NodeJS',
    'MySQL',
    'Bootstrap'
  ]
};

// Helper function to search products with advanced fuzzy matching
export const searchProducts = (query, filter = 'all', limit = 4) => {
  if (!query || query.length < 2) return [];
  
  let filtered = getAllProducts();

  // Filter by category first
  if (filter !== 'all') {
    filtered = filtered.filter(p => p.category === filter);
  }

  // Transform to search format
  const searchableProducts = filtered.map(p => ({
    id: p.id,
    title: p.name,
    name: p.name,
    slug: p.slug,
    thumbnail: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.discount || 0,
    rating: p.rating,
    reviewCount: p.reviews || 0,
    category: p.categoryName,
    tags: p.technology || [],
    description: p.description || '',
    features: p.features || [],
    seller: p.seller || { name: 'TopCode', verified: true }
  }));

  // Use advanced search for intelligent matching
  const searchResult = advancedSearch(searchableProducts, query, {
    minRelevanceScore: 5,
    limit: limit,
    sortBy: 'relevance'
  });

  return searchResult.results;
};

// Helper function to search categories with fuzzy matching
export const searchCategories = (query, limit = 3) => {
  if (!query || query.length < 2) return [];
  
  const normalized = normalizeQuery(query);
  const noTone = removeVietnameseTones(normalized);
  
  // Score each category
  const scored = mockSearchData.categories.map(c => {
    const nameScore = getSimilarityScore(noTone, removeVietnameseTones(c.name.toLowerCase()));
    const descScore = getSimilarityScore(noTone, removeVietnameseTones(c.description.toLowerCase()));
    const maxScore = Math.max(nameScore, descScore);
    
    return {
      ...c,
      _score: maxScore
    };
  });
  
  return scored
    .filter(c => c._score > 0.3) // Minimum similarity threshold
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
};

// Helper function to search tags with fuzzy matching
export const searchTags = (query, limit = 3) => {
  if (!query || query.length < 2) return [];
  
  const normalized = normalizeQuery(query);
  const noTone = removeVietnameseTones(normalized);
  
  // Score each tag
  const scored = mockSearchData.tags.map(t => {
    const score = getSimilarityScore(noTone, removeVietnameseTones(t.name.toLowerCase()));
    return {
      ...t,
      _score: score
    };
  });
  
  return scored
    .filter(t => t._score > 0.4) // Minimum similarity threshold
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
};

// Helper function to search features with fuzzy matching
export const searchFeatures = (query, limit = 3) => {
  if (!query || query.length < 2) return [];
  
  const normalized = normalizeQuery(query);
  const noTone = removeVietnameseTones(normalized);
  
  // Score each feature
  const scored = mockSearchData.features.map(f => {
    const score = getSimilarityScore(noTone, removeVietnameseTones(f.name.toLowerCase()));
    return {
      ...f,
      _score: score
    };
  });
  
  return scored
    .filter(f => f._score > 0.3) // Minimum similarity threshold
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
};

// Helper function to get popular searches with fuzzy matching
export const getPopularSearches = (query = '', limit = 3) => {
  if (!query) {
    return mockSearchData.popularSearches.slice(0, limit);
  }
  
  const normalized = normalizeQuery(query);
  const noTone = removeVietnameseTones(normalized);
  
  // Score each popular search
  const scored = mockSearchData.popularSearches.map(p => {
    const score = getSimilarityScore(noTone, removeVietnameseTones(p.text.toLowerCase()));
    return {
      ...p,
      _score: score
    };
  });
  
  return scored
    .filter(p => p._score > 0.3)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);
};

// Helper function to get search suggestions
export const getSearchSuggestions = (query, filter = 'all') => {
  if (!query || query.length < 2) {
    return {
      popular: [],
      products: [],
      categories: [],
      tags: [],
      features: []
    };
  }

  return {
    popular: getPopularSearches(query, 3),
    products: searchProducts(query, filter, 4),
    categories: searchCategories(query, 3),
    tags: searchTags(query, 3),
    features: searchFeatures(query, 3)
  };
};

// Helper function to get full search results with filters
export const getSearchResults = (filters = {}) => {
  const {
    query = '',
    categories = [],
    priceRange = { min: 0, max: 5000000 },
    languages = [],
    features = [],
    rating = 'all',
    tags = [],
    sortBy = 'best-match'
  } = filters;

  let results = getAllProducts().map(p => ({
    ...p,
    title: p.name,
    tags: p.technology || []
  }));

  // Filter by query
  if (query) {
    const q = normalizeQuery(query);
    const noTone = removeVietnameseTones(q);
    results = results.filter(p => {
      const nameNoTone = removeVietnameseTones(p.name.toLowerCase());
      const descNoTone = removeVietnameseTones((p.description || '').toLowerCase());
      const featuresText = (p.features || []).join(' ').toLowerCase();
      const featuresNoTone = removeVietnameseTones(featuresText);
      
      return nameNoTone.includes(noTone) || 
             descNoTone.includes(noTone) ||
             featuresNoTone.includes(noTone) ||
             p.tags.some(tag => removeVietnameseTones(tag.toLowerCase()).includes(noTone));
    });
  }

  // Filter by categories
  if (categories.length > 0) {
    results = results.filter(p => categories.includes(p.category));
  }

  // Filter by price range
  results = results.filter(p =>
    p.price >= priceRange.min && p.price <= priceRange.max
  );

  // Filter by languages (check if product tags include language/technology)
  if (languages.length > 0) {
    results = results.filter(p =>
      languages.some(lang => 
        p.tags.some(tag => tag.toLowerCase() === lang.toLowerCase())
      )
    );
  }

  // Filter by features
  if (features.length > 0) {
    results = results.filter(p => {
      const productFeatures = p.features || [];
      const productFeaturesText = productFeatures.join(' ').toLowerCase();
      return features.some(feature => {
        const featureNoTone = removeVietnameseTones(feature.toLowerCase());
        const productFeaturesNoTone = removeVietnameseTones(productFeaturesText);
        return productFeaturesNoTone.includes(featureNoTone);
      });
    });
  }

  // Filter by rating
  if (rating !== 'all') {
    const minRating = rating === '5' ? 5 : parseInt(rating);
    results = results.filter(p => p.rating >= minRating);
  }

  // Filter by tags
  if (tags.length > 0) {
    results = results.filter(p =>
      tags.some(tag => p.tags.includes(tag))
    );
  }

  // Sort results
  switch (sortBy) {
    case 'most-popular':
      results.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case 'highest-rated':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
      break;
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'best-match':
    default:
      // Keep current order (relevance based on filtering)
      break;
  }

  return results;
};

export default mockSearchData;
