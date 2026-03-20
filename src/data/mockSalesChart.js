// Mock data for seller sales chart
export const mockSalesData = {
  daily: [
    { date: '2025-11-14', sales: 2400000, orders: 3 },
    { date: '2025-11-15', sales: 3200000, orders: 4 },
    { date: '2025-11-16', sales: 1800000, orders: 2 },
    { date: '2025-11-17', sales: 4500000, orders: 6 },
    { date: '2025-11-18', sales: 3800000, orders: 5 },
    { date: '2025-11-19', sales: 5200000, orders: 7 },
    { date: '2025-11-20', sales: 4100000, orders: 5 }
  ],
  weekly: [
    { week: 'Week 1', sales: 15000000, orders: 18 },
    { week: 'Week 2', sales: 18500000, orders: 22 },
    { week: 'Week 3', sales: 22000000, orders: 28 },
    { week: 'Week 4', sales: 19500000, orders: 24 }
  ],
  monthly: [
    { month: 'Jul', sales: 45000000, orders: 56 },
    { month: 'Aug', sales: 52000000, orders: 68 },
    { month: 'Sep', sales: 58000000, orders: 72 },
    { month: 'Oct', sales: 63000000, orders: 78 },
    { month: 'Nov', sales: 75000000, orders: 92 }
  ],
  yearly: [
    { year: '2022', sales: 320000000, orders: 450 },
    { year: '2023', sales: 480000000, orders: 620 },
    { year: '2024', sales: 650000000, orders: 850 },
    { year: '2025', sales: 725000000, orders: 920 }
  ]
};

export const mockRevenueStats = {
  totalRevenue: 75000000,
  totalOrders: 92,
  avgOrderValue: 815217,
  growth: 15.8,
  topProducts: [
    { id: 1, name: 'E-commerce Website', sales: 15000000, orders: 20 },
    { id: 2, name: 'Admin Dashboard Pro', sales: 12000000, orders: 18 },
    { id: 3, name: 'React Native App', sales: 10000000, orders: 15 }
  ]
};

export const getSalesDataByPeriod = (period = 'daily') => {
  return mockSalesData[period] || mockSalesData.daily;
};

const mockSalesChartExports = {
  mockSalesData,
  mockRevenueStats,
  getSalesDataByPeriod
};
export default mockSalesChartExports;
