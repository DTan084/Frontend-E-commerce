// Mock data for user's purchased products
export const mockPurchasedProducts = [
  {
    id: 1,
    userId: 2, // Nguyễn Văn A
    productId: 1,
    orderId: 'ORD001', // Reference to mockOrders
    sellerId: 4, // Demo Seller
    name: 'Mã Nguồn Website Thương Mại Điện Tử - React + PHP',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    purchaseDate: '2025-10-20',
    price: 1500000,
    downloadUrl: '/downloads/ecommerce-template.zip',
    licenseKey: 'EC-2025-XXXX-XXXX',
    downloaded: true,
    downloadCount: 3,
    maxDownloads: 5
  },
  {
    id: 2,
    userId: 3, // Trần Thị B
    productId: 6,
    orderId: 'ORD002', // Reference to mockOrders
    sellerId: 4, // Demo Seller
    name: 'Landing Page Template - SaaS Modern',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
    purchaseDate: '2025-10-25',
    price: 500000,
    downloadUrl: '/downloads/landing-page-saas.zip',
    licenseKey: 'LP-2025-XXXX-XXXX',
    downloaded: true,
    downloadCount: 1,
    maxDownloads: 5
  },
  {
    id: 3,
    userId: 3, // Trần Thị B
    productId: 10,
    orderId: 'ORD002', // Reference to mockOrders (same order, item 2)
    sellerId: 4, // Demo Seller
    name: 'Plugin Thanh Toán VNPay + MoMo - WordPress',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    purchaseDate: '2025-10-25',
    price: 600000,
    downloadUrl: '/downloads/payment-plugin.zip',
    licenseKey: 'PP-2025-XXXX-XXXX',
    downloaded: true,
    downloadCount: 2,
    maxDownloads: 5
  },
  {
    id: 4,
    userId: 2, // Nguyễn Văn A
    productId: 8,
    orderId: 'ORD003', // Reference to mockOrders
    sellerId: 4, // Demo Seller
    name: 'Dịch Vụ Thiết Kế Website Trọn Gói - Gói Basic',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=300&fit=crop',
    purchaseDate: '2025-10-28',
    price: 5000000,
    downloadUrl: null, // Service, not downloadable
    licenseKey: 'SV-2025-XXXX-XXXX',
    downloaded: false,
    downloadCount: 0,
    maxDownloads: 0
  }
];

export const getPurchasedProductById = (id) => {
  return mockPurchasedProducts.find(product => product.id === id);
};

export const getPurchasedProductsByDate = (startDate, endDate) => {
  return mockPurchasedProducts.filter(product => {
    const purchaseDate = new Date(product.purchaseDate);
    return purchaseDate >= new Date(startDate) && purchaseDate <= new Date(endDate);
  });
};

export default mockPurchasedProducts;
