// Mock data for user dashboard statistics
export const mockDashboardStats = {
  totalPurchases: 12,
  totalSpent: 15400000,
  activeProducts: 8,
  wishlistCount: 5,
  recentActivity: [
    {
      id: 1,
      type: 'purchase',
      title: 'Purchased "E-commerce Website Template"',
      date: '2025-11-18',
      amount: 1500000
    },
    {
      id: 2,
      type: 'download',
      title: 'Downloaded "Admin Dashboard Pro"',
      date: '2025-11-17',
      amount: 0
    },
    {
      id: 3,
      type: 'wishlist',
      title: 'Added "React Native App" to wishlist',
      date: '2025-11-16',
      amount: 0
    }
  ]
};

export const mockUserStats = {
  joinDate: '2024-03-15',
  lastLogin: '2025-11-20',
  membershipLevel: 'Gold',
  totalDownloads: 45,
  supportTickets: 2
};

const mockDashboardExports = {
  mockDashboardStats,
  mockUserStats
};
export default mockDashboardExports;
