// Categories configuration - 11 main categories for website source code

export const CATEGORIES = {
  'ban-hang-tmdt': {
    id: 'ban-hang-tmdt',
    slug: 'ban-hang-tmdt',
    name: 'Bán hàng - TMĐT',
    nameEn: 'E-commerce',
    icon: '🛒',
    description: 'Mã nguồn website bán hàng, thương mại điện tử',
    color: '#667eea'
  },
  'gioi-thieu-dich-vu': {
    id: 'gioi-thieu-dich-vu',
    slug: 'gioi-thieu-dich-vu',
    name: 'Giới thiệu - Dịch vụ',
    nameEn: 'Services',
    icon: '🏢',
    description: 'Website giới thiệu công ty, dịch vụ',
    color: '#764ba2'
  },
  'tin-tuc': {
    id: 'tin-tuc',
    slug: 'tin-tuc',
    name: 'Tin tức',
    nameEn: 'News',
    icon: '📰',
    description: 'Website tin tức, blog, báo điện tử',
    color: '#f093fb'
  },
  'quan-ly': {
    id: 'quan-ly',
    slug: 'quan-ly',
    name: 'Quản lý',
    nameEn: 'Management',
    icon: '📊',
    description: 'Hệ thống quản lý, CRM, ERP',
    color: '#4facfe'
  },
  'giai-tri': {
    id: 'giai-tri',
    slug: 'giai-tri',
    name: 'Giải trí',
    nameEn: 'Entertainment',
    icon: '🎭',
    description: 'Website giải trí, phim, nhạc, game',
    color: '#43e97b'
  },
  'dien-dan': {
    id: 'dien-dan',
    slug: 'dien-dan',
    name: 'Diễn đàn',
    nameEn: 'Forum',
    icon: '💬',
    description: 'Diễn đàn thảo luận, cộng đồng',
    color: '#fa709a'
  },
  'bat-dong-san': {
    id: 'bat-dong-san',
    slug: 'bat-dong-san',
    name: 'Bất động sản',
    nameEn: 'Real Estate',
    icon: '🏠',
    description: 'Website bất động sản, nhà đất',
    color: '#fee140'
  },
  'du-lich-khach-san': {
    id: 'du-lich-khach-san',
    slug: 'du-lich-khach-san',
    name: 'Du lịch - Khách sạn',
    nameEn: 'Travel & Hotel',
    icon: '✈️',
    description: 'Website du lịch, đặt tour, khách sạn',
    color: '#30cfd0'
  },
  'giao-duc-y-te': {
    id: 'giao-duc-y-te',
    slug: 'giao-duc-y-te',
    name: 'Giáo dục - Y tế',
    nameEn: 'Education & Health',
    icon: '🎓',
    description: 'Website giáo dục, y tế, học online',
    color: '#a8edea'
  },
  'may-tinh-dich-vu': {
    id: 'may-tinh-dich-vu',
    slug: 'may-tinh-dich-vu',
    name: 'Máy tính - Dịch vụ',
    nameEn: 'Computer Services',
    icon: '💻',
    description: 'Website máy tính, laptop, dịch vụ IT',
    color: '#fed6e3'
  },
  'khac': {
    id: 'khac',
    slug: 'khac',
    name: 'Khác...',
    nameEn: 'Others',
    icon: '📦',
    description: 'Các loại website khác',
    color: '#c471f5'
  }
};

// Helper functions
export const getAllCategories = () => Object.values(CATEGORIES);

export const getCategoryById = (id) => CATEGORIES[id] || null;

export const getCategoryName = (id, lang = 'vi') => {
  const category = CATEGORIES[id];
  if (!category) return id;
  return lang === 'en' ? category.nameEn : category.name;
};

export const getCategoryIcon = (id) => {
  const category = CATEGORIES[id];
  return category ? category.icon : '📦';
};

export const getCategoryColor = (id) => {
  const category = CATEGORIES[id];
  return category ? category.color : '#667eea';
};

export default CATEGORIES;
