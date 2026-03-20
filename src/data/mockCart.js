// Mock Cart Data for Testing Checkout Flow

export const mockCartItems = [
  {
    id: 1,
    userId: 2, // Nguyễn Văn A
    productId: 1, // Changed from 101 to real product id
    sellerId: 4, // Demo Seller
    title: "Mã Nguồn Website Thương Mại Điện Tử - React + PHP",
    name: "Mã Nguồn Website Thương Mại Điện Tử - React + PHP",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    price: 2000000,
    discount_price: 1500000,
    category: "source-code",
    technology: "React, PHP, MySQL",
    seller: "Demo Seller",
    description: "Mã nguồn website thương mại điện tử hoàn chỉnh với React frontend và PHP backend",
    type: "digital"
  },
  {
    id: 2,
    userId: 2, // Nguyễn Văn A
    productId: 2, // Changed from 102 to real product id
    sellerId: 4, // Demo Seller
    title: "Mã Nguồn Website Tin Tức - Laravel + Vue.js",
    name: "Mã Nguồn Website Tin Tức - Laravel + Vue.js",
    image_url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    price: 1500000,
    discount_price: 1200000,
    category: "source-code",
    technology: "Vue.js, Laravel, MySQL",
    seller: "Demo Seller",
    description: "Website tin tức chuyên nghiệp với Laravel backend mạnh mẽ",
    type: "digital"
  },
  {
    id: 3,
    userId: 2, // Nguyễn Văn A
    productId: 7, // Changed from 103 to real product id (Admin Dashboard)
    sellerId: 4, // Demo Seller
    title: "Admin Dashboard - React Material UI",
    name: "Admin Dashboard - React Material UI",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    price: 1200000,
    discount_price: 900000,
    category: "theme-template",
    technology: "React, Material UI, Chart.js",
    seller: "Demo Seller",
    description: "Admin dashboard chuyên nghiệp với Material UI",
    type: "digital"
  }
];

export const mockCartSummary = {
  itemCount: 3, // Just count items, no quantity
  subtotal: 3600000, // Updated: 1500000 + 1200000 + 900000
  discount: 0,
  tax: 360000, // 10% VAT
  total: 3960000 // No shipping for digital products
};

// Mock user for cart context
export const mockCartUser = {
  id: 2, // Changed to match mockUsers id
  name: "Nguyễn Văn A",
  email: "user@test.com", // Changed to match mockUsers email
  isAuthenticated: true
};

// Calculate cart totals (Digital products - no quantity, no shipping)
export const calculateCartTotals = (items) => {
  const itemCount = items.length; // Just count items
  
  const subtotal = items.reduce((sum, item) => {
    const price = item.discount_price || item.price || 0;
    return sum + price; // No quantity multiplication
  }, 0);
  
  return {
    itemCount,
    subtotal,
    beforeDiscount: items.reduce((sum, item) => {
      return sum + item.price;
    }, 0)
  };
};

// Mock coupon validation (No shipping coupons for digital products)
export const validateCoupon = (code) => {
  const coupons = {
    'SAVE10': { 
      discount: 10, 
      type: 'percentage', 
      description: 'Giảm 10%',
      minOrder: 0
    },
    'SAVE20': { 
      discount: 20, 
      type: 'percentage', 
      description: 'Giảm 20%',
      minOrder: 1000000
    },
    'WELCOME': { 
      discount: 50000, 
      type: 'fixed', 
      description: 'Giảm 50,000₫',
      minOrder: 500000
    },
    'NEWUSER': { 
      discount: 100000, 
      type: 'fixed', 
      description: 'Giảm 100,000₫',
      minOrder: 0
    }
  };

  const coupon = coupons[code.toUpperCase()];
  return coupon || null;
};

// Mock payment methods
export const mockPaymentMethods = [
  {
    id: 'visa',
    name: 'Visa',
    icon: 'VISA',
    enabled: true
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    icon: 'MASTER',
    enabled: true
  },
  {
    id: 'momo',
    name: 'MoMo',
    icon: 'MOMO',
    enabled: true
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    icon: 'ZaloPay',
    enabled: true
  }
];

// Mock checkout data
export const mockCheckoutData = {
  shippingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0901234567",
    email: "user@example.com",
    address: "123 Đường ABC",
    ward: "Phường 1",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    postalCode: "700000"
  },
  billingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0901234567",
    email: "user@example.com",
    address: "123 Đường ABC",
    ward: "Phường 1",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    postalCode: "700000"
  },
  paymentMethod: 'visa',
  notes: ''
};

const mockCartExports = {
  mockCartItems,
  mockCartSummary,
  mockCartUser,
  calculateCartTotals,
  validateCoupon,
  mockPaymentMethods,
  mockCheckoutData
};
export default mockCartExports;
