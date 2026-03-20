// Mock data cho sản phẩm chờ duyệt
export const mockPendingProducts = [
  {
    id: 101,
    name: 'Mã Nguồn CMS Laravel - Full Features',
    seller: 'Nguyễn Văn A',
    sellerId: 1,
    category: 'Mã nguồn Website',
    price: 2500000,
    submitDate: '2025-11-18',
    description: 'Hệ thống CMS hoàn chỉnh với Laravel, quản lý nội dung đa dạng...',
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop'],
    technology: ['Laravel', 'Vue.js', 'MySQL'],
    status: 'pending',
    reason: null
  },
  {
    id: 102,
    name: 'Landing Page Premium - React + Tailwind',
    seller: 'Trần Thị B',
    sellerId: 2,
    category: 'Theme & Template',
    price: 800000,
    submitDate: '2025-11-17',
    description: 'Landing page cao cấp với React và TailwindCSS, animation mượt mà...',
    images: ['https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop'],
    technology: ['React', 'TailwindCSS'],
    status: 'pending',
    reason: null
  },
  {
    id: 103,
    name: 'Plugin WordPress Security Pro',
    seller: 'Lê Văn C',
    sellerId: 3,
    category: 'Plugin & Extension',
    price: 1200000,
    submitDate: '2025-11-16',
    description: 'Plugin bảo mật WordPress với firewall, malware scan, 2FA...',
    images: ['https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'],
    technology: ['WordPress', 'PHP'],
    status: 'pending',
    reason: null
  }
];

export const getPendingProducts = () => {
  // Merge initial mock data + sản phẩm mới upload từ sellers (localStorage)
  const stored = JSON.parse(localStorage.getItem('tmdt_pending_products') || '[]');
  return [...mockPendingProducts, ...stored];
};

export default mockPendingProducts;
