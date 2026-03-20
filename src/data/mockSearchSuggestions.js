// Mock data for search suggestions and trending searches
export const mockSearchSuggestions = [
  'e-commerce website',
  'admin dashboard',
  'react template',
  'wordpress theme',
  'mobile app',
  'landing page',
  'website tin tức',
  'website bất động sản',
  'cms system',
  'shopping cart',
];

export const mockTrendingSearches = [
  { keyword: 'e-commerce', count: 1245, trend: 'up' },
  { keyword: 'admin dashboard', count: 989, trend: 'up' },
  { keyword: 'react template', count: 756, trend: 'stable' },
  { keyword: 'wordpress', count: 623, trend: 'down' },
  { keyword: 'mobile app', count: 567, trend: 'up' },
  { keyword: 'landing page', count: 445, trend: 'stable' },
  { keyword: 'website tin tức', count: 398, trend: 'up' },
  { keyword: 'crm system', count: 345, trend: 'up' },
  { keyword: 'portfolio', count: 289, trend: 'stable' },
  { keyword: 'blog template', count: 234, trend: 'down' },
];

export const mockRecentSearches = [
  'e-commerce react',
  'admin template',
  'website bán hàng',
  'react dashboard',
  'bootstrap template',
];

export const mockPopularCategories = [
  { id: 'source-code', name: 'Source Code', count: 145 },
  { id: 'theme-template', name: 'Theme & Template', count: 98 },
  { id: 'plugin', name: 'Plugin & Extension', count: 67 },
  { id: 'script', name: 'PHP Script', count: 54 },
  { id: 'app', name: 'Mobile App', count: 43 },
];

export const getSearchSuggestions = (query) => {
  if (!query) return mockSearchSuggestions.slice(0, 5);

  const lowerQuery = query.toLowerCase();
  return mockSearchSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(lowerQuery))
    .slice(0, 5);
};

const searchSuggestionsData = {
  mockSearchSuggestions,
  mockTrendingSearches,
  mockRecentSearches,
  mockPopularCategories,
  getSearchSuggestions,
};

export default searchSuggestionsData;
