/**
 * ====================================================================
 * ADVANCED SEARCH UTILITIES FOR SOURCE CODE MARKETPLACE
 * ====================================================================
 * Xử lý tìm kiếm thông minh cho marketplace bán source code/template
 * Hỗ trợ: Tiếng Việt, fuzzy search, synonym, ranking
 */

// ============================================
// 1. VIETNAMESE TEXT PROCESSING
// ============================================

/**
 * Bỏ dấu tiếng Việt
 */
export const removeVietnameseTones = (str) => {
  if (!str) return '';
  
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  
  return str;
};

/**
 * Chuẩn hóa query string
 */
export const normalizeQuery = (query) => {
  if (!query) return '';
  
  // Trim và lowercase
  let normalized = query.trim().toLowerCase();
  
  // Bỏ ký tự đặc biệt (giữ lại space, dash, underscore)
  normalized = normalized.replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s\-_#]/g, ' ');
  
  // Gộp nhiều space thành 1
  normalized = normalized.replace(/\s+/g, ' ');
  
  return normalized;
};

// ============================================
// 2. SYNONYM MAPPING (Từ đồng nghĩa)
// ============================================

export const SYNONYMS = {
  // E-commerce
  'web bán hàng': ['ecommerce', 'e-commerce', 'shop online', 'cửa hàng trực tuyến'],
  'bán hàng': ['shop', 'ecommerce', 'store'],
  'tmdt': ['thương mại điện tử', 'ecommerce'],
  
  // Mobile App
  'ứng dụng': ['app', 'application'],
  'ứng dụng di động': ['mobile app', 'app di động'],
  'ứng dụng android': ['android app', 'app android'],
  'ứng dụng ios': ['ios app', 'app ios'],
  
  // Source code terms
  'mã nguồn': ['source code', 'source', 'code'],
  'full source': ['full code', 'source code đầy đủ', 'mã nguồn hoàn chỉnh'],
  'template': ['theme', 'giao diện', 'mẫu'],
  
  // Technologies
  'website': ['web', 'trang web'],
  'trang web': ['website', 'web'],
  'game': ['trò chơi', 'game app'],
  
  // Features
  'đăng nhập': ['login', 'authentication', 'auth'],
  'thanh toán': ['payment', 'checkout', 'pay'],
  'chat': ['message', 'messaging', 'tin nhắn'],
  'quản lý': ['management', 'admin', 'quản trị'],
  'dashboard': ['admin panel', 'bảng điều khiển', 'quản trị'],
  
  // Programming concepts
  'api': ['rest api', 'restful', 'web service'],
  'realtime': ['real-time', 'thời gian thực', 'socket'],
  'ai': ['artificial intelligence', 'trí tuệ nhân tạo', 'machine learning'],
};

/**
 * Mở rộng query với từ đồng nghĩa
 */
export const expandQueryWithSynonyms = (query) => {
  const normalized = normalizeQuery(query);
  const expanded = new Set([normalized, removeVietnameseTones(normalized)]);
  
  // Tìm synonym matches
  Object.keys(SYNONYMS).forEach(key => {
    if (normalized.includes(key) || removeVietnameseTones(normalized).includes(removeVietnameseTones(key))) {
      SYNONYMS[key].forEach(synonym => {
        expanded.add(synonym);
        expanded.add(removeVietnameseTones(synonym));
      });
    }
  });
  
  return Array.from(expanded);
};

// ============================================
// 3. FUZZY SEARCH (Tìm gần đúng)
// ============================================

/**
 * Tính khoảng cách Levenshtein (edit distance)
 */
export const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // deletion
          dp[i][j - 1] + 1,      // insertion
          dp[i - 1][j - 1] + 1   // substitution
        );
      }
    }
  }
  
  return dp[m][n];
};

/**
 * Tính similarity score (0-1)
 */
export const getSimilarityScore = (str1, str2) => {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : 1 - (distance / maxLength);
};

/**
 * Tìm từ gần giống nhất
 */
export const findClosestMatch = (query, candidates, threshold = 0.6) => {
  let bestMatch = null;
  let bestScore = 0;
  
  const normalizedQuery = removeVietnameseTones(normalizeQuery(query));
  
  candidates.forEach(candidate => {
    const normalizedCandidate = removeVietnameseTones(normalizeQuery(candidate));
    const score = getSimilarityScore(normalizedQuery, normalizedCandidate);
    
    if (score > threshold && score > bestScore) {
      bestScore = score;
      bestMatch = candidate;
    }
  });
  
  return { match: bestMatch, score: bestScore };
};

// ============================================
// 4. TYPO CORRECTION (Sửa lỗi chính tả)
// ============================================

export const COMMON_TYPOS = {
  // Technology typos
  'larve': 'laravel',
  'laravel': 'laravel',
  'larave': 'laravel',
  'reac': 'react',
  'react': 'react',
  'reactjs': 'react',
  'vuejs': 'vue',
  'vue': 'vue',
  'angular': 'angular',
  'angula': 'angular',
  'node': 'nodejs',
  'nodejs': 'nodejs',
  'nodej': 'nodejs',
  'flutter': 'flutter',
  'fluter': 'flutter',
  'futter': 'flutter',
  'react native': 'react native',
  'react nativ': 'react native',
  'reactnative': 'react native',
  
  // Feature typos
  'ecomerce': 'ecommerce',
  'e-comerce': 'ecommerce',
  'chat': 'chat',
  'chatt': 'chat',
  'login': 'login',
  'loginn': 'login',
  'admin': 'admin',
  'addmin': 'admin',
  'dashboard': 'dashboard',
  'dashbord': 'dashboard',
  
  // Vietnamese typos
  'ung dung': 'ứng dụng',
  'ma nguon': 'mã nguồn',
  'ban hang': 'bán hàng',
  'web site': 'website',
};

/**
 * Auto-correct typos
 */
export const correctTypos = (query) => {
  let corrected = normalizeQuery(query);
  const words = corrected.split(' ');
  
  const correctedWords = words.map(word => {
    // Check exact match
    if (COMMON_TYPOS[word]) {
      return COMMON_TYPOS[word];
    }
    
    // Check without tones
    const wordNoTone = removeVietnameseTones(word);
    if (COMMON_TYPOS[wordNoTone]) {
      return COMMON_TYPOS[wordNoTone];
    }
    
    return word;
  });
  
  return correctedWords.join(' ');
};

/**
 * Suggest corrections
 */
export const suggestCorrections = (query) => {
  const corrected = correctTypos(query);
  
  if (corrected !== normalizeQuery(query)) {
    return corrected;
  }
  
  return null;
};

// ============================================
// 5. SEARCH SCORING & RANKING
// ============================================

/**
 * Tính điểm liên quan của sản phẩm với query
 */
export const calculateRelevanceScore = (product, query, expandedQueries) => {
  let score = 0;
  
  const normalizedQuery = normalizeQuery(query);
  const queryNoTone = removeVietnameseTones(normalizedQuery);
  
  // Helper: check if text contains any query variant
  const containsQuery = (text) => {
    if (!text) return false;
    const textLower = text.toLowerCase();
    const textNoTone = removeVietnameseTones(textLower);
    
    // Exact match in original text
    if (textLower.includes(normalizedQuery)) return 100;
    
    // Exact match without tones
    if (textNoTone.includes(queryNoTone)) return 80;
    
    // Check expanded queries (synonyms)
    for (const expanded of expandedQueries) {
      if (textLower.includes(expanded) || textNoTone.includes(removeVietnameseTones(expanded))) {
        return 60;
      }
    }
    
    // Partial word match
    const queryWords = normalizedQuery.split(' ');
    const matchedWords = queryWords.filter(word => 
      textLower.includes(word) || textNoTone.includes(removeVietnameseTones(word))
    );
    
    if (matchedWords.length > 0) {
      return 40 * (matchedWords.length / queryWords.length);
    }
    
    return 0;
  };
  
  // 1. Title match (highest weight) - 40%
  const titleScore = containsQuery(product.name || product.title);
  score += titleScore * 0.4;
  
  // 2. Category/CategoryName match - 15%
  const categoryScore = containsQuery(product.category || product.categoryName);
  score += categoryScore * 0.15;
  
  // 3. Technology/Tags match - 20%
  if (product.technology && Array.isArray(product.technology)) {
    const techString = product.technology.join(' ');
    const techScore = containsQuery(techString);
    score += techScore * 0.2;
  }
  
  // 4. Description match - 10%
  const descScore = containsQuery(product.description);
  score += descScore * 0.1;
  
  // 5. Tags match - 10%
  if (product.tags && Array.isArray(product.tags)) {
    const tagsString = product.tags.join(' ');
    const tagsScore = containsQuery(tagsString);
    score += tagsScore * 0.1;
  }
  
  // 6. Slug match - 5%
  const slugScore = containsQuery(product.slug);
  score += slugScore * 0.05;
  
  return score;
};

/**
 * Tính điểm quality của sản phẩm
 */
export const calculateQualityScore = (product) => {
  let score = 0;
  
  // Rating (0-5) → 40%
  const rating = product.rating || product.rating_average || 0;
  score += (rating / 5) * 40;
  
  // Reviews/Sales count → 30%
  const reviews = product.reviews || product.review_count || product.sold || 0;
  score += Math.min(reviews / 100, 1) * 30; // Cap at 100 reviews
  
  // isHot/isBestSeller → 15%
  if (product.isHot) score += 7.5;
  if (product.isBestSeller) score += 7.5;
  
  // Recent update → 15%
  if (product.lastUpdate || product.created_at) {
    const updateDate = new Date(product.lastUpdate || product.created_at);
    const daysSinceUpdate = (Date.now() - updateDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceUpdate < 30) score += 15;
    else if (daysSinceUpdate < 90) score += 10;
    else if (daysSinceUpdate < 180) score += 5;
  }
  
  return score;
};

/**
 * Tính final score
 */
export const calculateFinalScore = (product, query, expandedQueries) => {
  const relevanceScore = calculateRelevanceScore(product, query, expandedQueries);
  const qualityScore = calculateQualityScore(product);
  
  // Nếu không có relevance (không match), không tính quality
  // Điều này tránh trường hợp sản phẩm chất lượng cao nhưng không liên quan xuất hiện
  if (relevanceScore === 0) {
    return 0;
  }
  
  // Relevance 80%, Quality 20% (giảm weight của quality)
  return (relevanceScore * 0.8) + (qualityScore * 0.2);
};

// ============================================
// 6. MAIN SEARCH FUNCTION
// ============================================

/**
 * Advanced search với đầy đủ features
 * KHÔNG BAO GIỜ TRẢ VỀ RỖNG - Luôn có fallback results
 */
export const advancedSearch = (products, query, options = {}) => {
  const {
    minRelevanceScore = 5,    // Minimum score to be included
    limit = 50,                // Max results
    sortBy = 'relevance',      // 'relevance', 'popular', 'newest', 'price-asc', 'price-desc'
    enableFallback = true,     // Enable fallback when no results
  } = options;
  
  if (!query || query.trim().length < 2) {
    return {
      results: [],
      suggestion: null,
      hasResults: false,
      totalResults: 0,
      isFallback: false
    };
  }
  
  // Step 1: Normalize & correct query
  const normalizedQuery = normalizeQuery(query);
  const correctedQuery = correctTypos(normalizedQuery);
  const suggestion = correctedQuery !== normalizedQuery ? correctedQuery : null;
  
  // Step 2: Expand with synonyms
  const expandedQueries = expandQueryWithSynonyms(correctedQuery);
  
  // Step 3: Score all products
  const scoredProducts = products.map(product => {
    const relevanceScore = calculateRelevanceScore(product, correctedQuery, expandedQueries);
    const qualityScore = calculateQualityScore(product);
    const finalScore = relevanceScore > 0 
      ? (relevanceScore * 0.8) + (qualityScore * 0.2)
      : 0;
    
    return {
      ...product,
      _searchScore: finalScore,
      _relevanceScore: relevanceScore,
      _qualityScore: qualityScore
    };
  });
  
  // Step 4: Filter by minimum relevance (NOT final score)
  // Điều này đảm bảo chỉ lấy sản phẩm thực sự match với query
  let results = scoredProducts.filter(p => p._relevanceScore >= minRelevanceScore);
  
  // Step 5: FALLBACK LOGIC - Không bao giờ để trống!
  let isFallback = false;
  if (results.length === 0 && enableFallback) {
    // Strategy 1: Lower threshold progressively
    for (let threshold = minRelevanceScore - 1; threshold >= 1; threshold--) {
      results = scoredProducts.filter(p => p._searchScore >= threshold);
      if (results.length > 0) {
        isFallback = true;
        break;
      }
    }
    
    // Strategy 2: If still empty, return best sellers
    if (results.length === 0) {
      results = products
        .filter(p => p.isBestSeller || p.isHot)
        .map(p => ({
          ...p,
          _searchScore: 0,
          _relevanceScore: 0,
          _qualityScore: calculateQualityScore(p)
        }));
      isFallback = true;
    }
    
    // Strategy 3: Last resort - return highest quality products
    if (results.length === 0) {
      results = scoredProducts
        .sort((a, b) => b._qualityScore - a._qualityScore)
        .slice(0, 10);
      isFallback = true;
    }
  }
  
  // Step 6: Sort results
  results.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.sold || b.reviews || 0) - (a.sold || a.reviews || 0);
      case 'newest':
        return new Date(b.lastUpdate || b.created_at || 0) - new Date(a.lastUpdate || a.created_at || 0);
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'relevance':
      default:
        return b._searchScore - a._searchScore;
    }
  });
  
  // Step 7: Limit results
  results = results.slice(0, limit);
  
  return {
    results,
    suggestion,
    hasResults: results.length > 0,
    totalResults: results.length,
    query: correctedQuery,
    originalQuery: query,
    isFallback,
    fallbackMessage: isFallback ? 'Không tìm thấy kết quả chính xác. Dưới đây là các sản phẩm gợi ý:' : null
  };
};

// ============================================
// 7. SEARCH SUGGESTIONS
// ============================================

/**
 * Generate search suggestions as user types
 */
export const generateSearchSuggestions = (query, products, options = {}) => {
  const { limit = 5 } = options;
  
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = normalizeQuery(query);
  const queryNoTone = removeVietnameseTones(normalizedQuery);
  
  const suggestions = new Set();
  
  // Extract suggestions from products
  products.forEach(product => {
    // From title
    const title = (product.name || product.title || '').toLowerCase();
    if (title.includes(normalizedQuery) || removeVietnameseTones(title).includes(queryNoTone)) {
      suggestions.add(product.name || product.title);
    }
    
    // From technologies
    if (product.technology && Array.isArray(product.technology)) {
      product.technology.forEach(tech => {
        const techLower = tech.toLowerCase();
        if (techLower.includes(normalizedQuery) || removeVietnameseTones(techLower).includes(queryNoTone)) {
          suggestions.add(tech);
        }
      });
    }
    
    // From category
    const category = (product.category || product.categoryName || '').toLowerCase();
    if (category.includes(normalizedQuery) || removeVietnameseTones(category).includes(queryNoTone)) {
      suggestions.add(product.category || product.categoryName);
    }
  });
  
  return Array.from(suggestions).slice(0, limit);
};

/**
 * Get smart recommendations when no exact match
 */
export const getSmartRecommendations = (query, products, limit = 8) => {
  const normalized = normalizeQuery(query);
  
  // Strategy 1: Find products with partial word matches
  const queryWords = normalized.split(' ').filter(w => w.length > 2);
  const partialMatches = products.filter(p => {
    const searchText = `${p.name} ${p.description || ''} ${(p.technology || []).join(' ')}`.toLowerCase();
    const searchTextNoTone = removeVietnameseTones(searchText);
    
    return queryWords.some(word => 
      searchText.includes(word) || 
      searchTextNoTone.includes(removeVietnameseTones(word))
    );
  });
  
  if (partialMatches.length > 0) {
    return partialMatches
      .sort((a, b) => calculateQualityScore(b) - calculateQualityScore(a))
      .slice(0, limit);
  }
  
  // Strategy 2: Return best sellers in related categories
  const relatedProducts = products
    .filter(p => p.isBestSeller || p.isHot || (p.rating || 0) >= 4.5)
    .sort((a, b) => {
      const scoreA = (a.sold || 0) + (a.rating || 0) * 10;
      const scoreB = (b.sold || 0) + (b.rating || 0) * 10;
      return scoreB - scoreA;
    })
    .slice(0, limit);
  
  return relatedProducts;
};

/**
 * Get related search suggestions based on query
 */
export const getRelatedSearchSuggestions = (query) => {
  const normalized = normalizeQuery(query);
  const suggestions = [];
  
  // Check for technology mentions
  const technologies = ['react', 'vue', 'angular', 'laravel', 'nodejs', 'flutter', 'wordpress', 'php'];
  const queryLower = normalized.toLowerCase();
  
  technologies.forEach(tech => {
    if (queryLower.includes(tech)) {
      suggestions.push(`${tech} template`);
      suggestions.push(`${tech} admin panel`);
      suggestions.push(`${tech} ecommerce`);
    }
  });
  
  // Check for feature mentions
  if (queryLower.includes('shop') || queryLower.includes('ecommerce') || queryLower.includes('bán hàng')) {
    suggestions.push('Laravel E-commerce');
    suggestions.push('React Shop Template');
    suggestions.push('WordPress WooCommerce');
  }
  
  if (queryLower.includes('admin') || queryLower.includes('dashboard') || queryLower.includes('quản lý')) {
    suggestions.push('Admin Dashboard React');
    suggestions.push('Admin Panel Laravel');
    suggestions.push('Vue Admin Template');
  }
  
  if (queryLower.includes('mobile') || queryLower.includes('app') || queryLower.includes('ứng dụng')) {
    suggestions.push('React Native App');
    suggestions.push('Flutter Mobile App');
    suggestions.push('Android App Template');
  }
  
  // Remove duplicates and return
  return [...new Set(suggestions)].slice(0, 5);
};

const searchUtils = {
  removeVietnameseTones,
  normalizeQuery,
  expandQueryWithSynonyms,
  correctTypos,
  suggestCorrections,
  advancedSearch,
  generateSearchSuggestions,
  calculateFinalScore,
  levenshteinDistance,
  getSimilarityScore,
  findClosestMatch,
  getSmartRecommendations,
  getRelatedSearchSuggestions
};
export default searchUtils;
