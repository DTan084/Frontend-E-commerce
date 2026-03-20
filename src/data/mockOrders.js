// Mock data cho orders

export const mockOrders = [
  {
    id: 'ORD001',
    userId: 2,
    userName: 'Nguyễn Văn A',
    userEmail: 'user@test.com',
    items: [
      {
        id: 1,
        productId: 1,
        sellerId: 4, // Demo Seller
        productName: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
        productImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=150&fit=crop',
        price: 1500000,
        quantity: 1
      }
    ],
    subtotal: 1500000,
    shipping: 0, // Digital product - no shipping
    tax: 0,
    total: 1500000,
    status: 'completed',
    paymentMethod: 'vnpay',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '456 Đường XYZ, Quận 3, TP.HCM'
    },
    note: 'Gửi link download qua email',
    orderDate: '2025-10-20T10:30:00',
    paidDate: '2025-10-20T10:32:00',
    downloadLinks: [
      {
        productId: 1,
        link: 'https://download.websource.vn/tmdt-react-php.zip',
        expiresAt: '2025-11-20'
      }
    ]
  },
  {
    id: 'ORD002',
    userId: 3,
    userName: 'Trần Thị B',
    userEmail: 'tranthib@gmail.com',
    items: [
      {
        id: 2,
        productId: 6,
        sellerId: 4, // Demo Seller
        productName: 'Landing Page Template - SaaS Modern',
        productImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&h=150&fit=crop',
        price: 500000,
        quantity: 1
      },
      {
        id: 3,
        productId: 10,
        sellerId: 4, // Demo Seller
        productName: 'Plugin Thanh Toán VNPay + MoMo - WordPress',
        productImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=150&fit=crop',
        price: 600000,
        quantity: 1
      }
    ],
    subtotal: 1100000,
    shipping: 0,
    tax: 0,
    total: 1100000,
    status: 'processing',
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'Trần Thị B',
      phone: '0923456789',
      address: '789 Đường DEF, Quận 7, TP.HCM'
    },
    note: '',
    orderDate: '2025-10-25T14:20:00',
    paidDate: '2025-10-25T14:22:00'
  },
  {
    id: 'ORD003',
    userId: 2,
    userName: 'Nguyễn Văn A',
    userEmail: 'user@test.com',
    items: [
      {
        id: 4,
        productId: 8,
        sellerId: 4, // Demo Seller
        productName: 'Dịch Vụ Thiết Kế Website Trọn Gói - Gói Basic',
        productImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&h=150&fit=crop',
        price: 5000000,
        quantity: 1
      }
    ],
    subtotal: 5000000,
    shipping: 0,
    tax: 0,
    total: 5000000,
    status: 'pending',
    paymentMethod: 'bank_transfer',
    paymentStatus: 'pending',
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '456 Đường XYZ, Quận 3, TP.HCM'
    },
    note: 'Cần tư vấn thêm về gói dịch vụ',
    orderDate: '2025-10-28T09:15:00'
  }
];

// Order status
export const ORDER_STATUS = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
};

export const PAYMENT_STATUS = {
  pending: 'Chờ thanh toán',
  paid: 'Đã thanh toán',
  refunded: 'Đã hoàn tiền'
};

export const PAYMENT_METHODS = {
  vnpay: 'VNPay',
  momo: 'MoMo',
  bank_transfer: 'Chuyển khoản ngân hàng',
  cod: 'Thanh toán khi nhận hàng'
};

// Helper functions
export const getOrdersByUserId = (userId) => {
  return mockOrders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId) => {
  return mockOrders.find(order => order.id === orderId);
};

export const createOrder = (orderData) => {
  const newOrder = {
    id: `ORD${String(mockOrders.length + 1).padStart(3, '0')}`,
    ...orderData,
    orderDate: new Date().toISOString(),
    status: 'pending',
    paymentStatus: orderData.paymentMethod === 'bank_transfer' ? 'pending' : 'paid'
  };

  mockOrders.push(newOrder);
  return {
    success: true,
    order: newOrder
  };
};

export const updateOrderStatus = (orderId, status) => {
  const orderIndex = mockOrders.findIndex(o => o.id === orderId);
  if (orderIndex !== -1) {
    mockOrders[orderIndex].status = status;
    return {
      success: true,
      order: mockOrders[orderIndex]
    };
  }
  return {
    success: false,
    message: 'Không tìm thấy đơn hàng'
  };
};

// Statistics for admin
export const getOrderStats = () => {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);
  
  const statusCount = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return {
    totalOrders,
    totalRevenue,
    statusCount,
    pendingOrders: statusCount.pending || 0,
    completedOrders: statusCount.completed || 0
  };
};
