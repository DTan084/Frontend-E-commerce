// Mock data cho users
// Test accounts:
// Admin: admin@test.com / admin123
// User: user@test.com / user123
// Demo: demo@test.com / demo123

export const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'admin123', // Plain text for demo only
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=667eea&color=fff',
    createdAt: '2025-01-15',
    isActive: true,
    bio: 'Administrator của WebSource Marketplace'
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'user@test.com',
    password: 'user123',
    phone: '0912345678',
    address: '456 Đường XYZ, Quận 3, TP.HCM',
    role: 'buyer',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=764ba2&color=fff',
    createdAt: '2025-02-20',
    isActive: true,
    bio: 'Developer đam mê công nghệ',
    totalOrders: 12,
    totalPurchases: 8,
    isPremium: false
  },
  {
    id: 3,
    name: 'Trần Thị B',
    email: 'tranthib@gmail.com',
    password: 'user123',
    phone: '0923456789',
    address: '789 Đường DEF, Quận 7, TP.HCM',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=f093fb&color=fff',
    createdAt: '2025-03-10',
    isActive: true,
    bio: 'UI/UX Designer'
  },
  {
    id: 4,
    name: 'Demo Seller',
    email: 'demo@test.com',
    password: 'demo123',
    phone: '0934567890',
    address: '321 Đường GHI, Quận 5, TP.HCM',
    role: 'seller',
    avatar: 'https://ui-avatars.com/api/?name=Demo+Seller&background=4caf50&color=fff',
    createdAt: '2025-04-01',
    isActive: true,
    bio: 'Professional seller on WebSource Marketplace',
    totalOrders: 25,
    totalPurchases: 15,
    isPremium: true,
    // Seller-specific data
    totalProducts: 25,
    totalSales: 561,
    averageRating: 4.8
  },
  {
    id: 5,
    name: 'Lê Văn C',
    email: 'levanc@gmail.com',
    password: 'user123',
    phone: '0945678901',
    address: '654 Đường JKL, Quận 2, TP.HCM',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=ff9800&color=fff',
    createdAt: '2025-05-12',
    isActive: true,
    bio: 'Full-stack Developer'
  }
];

// Helper functions
export const findUserByEmail = (email) => {
  return mockUsers.find(u => u.email === email);
};

export const authenticateUser = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      token: `mock_token_${user.id}_${Date.now()}`
    };
  }
  return {
    success: false,
    message: 'Email hoặc mật khẩu không đúng'
  };
};

export const registerUser = (userData) => {
  // Check if email exists
  if (findUserByEmail(userData.email)) {
    return {
      success: false,
      message: 'Email đã được sử dụng'
    };
  }

  const newUser = {
    id: mockUsers.length + 1,
    ...userData,
    role: 'user',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
    createdAt: new Date().toISOString().split('T')[0],
    isActive: true
  };

  mockUsers.push(newUser);

  const { password, ...userWithoutPassword } = newUser;
  return {
    success: true,
    user: userWithoutPassword,
    token: `mock_token_${newUser.id}_${Date.now()}`
  };
};

export const updateUserProfile = (userId, updates) => {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updates
    };
    const { password, ...userWithoutPassword } = mockUsers[userIndex];
    return {
      success: true,
      user: userWithoutPassword
    };
  }
  return {
    success: false,
    message: 'Không tìm thấy user'
  };
};
