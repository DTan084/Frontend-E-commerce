// Data Validation Utilities
// Validates foreign key relationships between data files

import { mockUsers } from './mockUsers';
import { getAllProducts } from './mockProducts';
import { mockOrders } from './mockOrders';
import { mockCartItems } from './mockCart';
import { mockReviews } from './mockReviews';
import { mockPurchasedProducts } from './mockPurchasedProducts';

const isDev = process.env.NODE_ENV === 'development';
const devLog = (...args) => {
  if (isDev) console.log(...args);
};
const devError = (...args) => {
  if (isDev) console.error(...args);
};

/**
 * Validate that a foreign key exists in the parent table
 */
const validateFK = (childValue, parentArray, parentKey, childName, parentName) => {
  const exists = parentArray.some((item) => item[parentKey] === childValue);
  if (!exists) {
    devError(
      `❌ INVALID FK: ${childName} references ${parentName}.${parentKey}=${childValue} but it doesn't exist!`
    );
    return false;
  }
  return true;
};

export const validateProductSellers = () => {
  devLog('\n🔍 Validating Products.sellerId → Users.id');
  const products = getAllProducts();
  let allValid = true;

  products.forEach((product) => {
    if (!product.sellerId) {
      devError(`❌ Product ${product.id} (${product.name}) missing sellerId!`);
      allValid = false;
    } else {
      const valid = validateFK(product.sellerId, mockUsers, 'id', `Product ${product.id}`, 'Users');
      if (!valid) allValid = false;
    }
  });

  if (allValid) devLog('✅ All products have valid sellerId');
  return allValid;
};

export const validateCartItems = () => {
  devLog('\n🔍 Validating Cart foreign keys');
  let allValid = true;

  mockCartItems.forEach((item) => {
    if (!validateFK(item.userId, mockUsers, 'id', `Cart item ${item.id}`, 'Users'))
      allValid = false;
    if (!validateFK(item.productId, getAllProducts(), 'id', `Cart item ${item.id}`, 'Products'))
      allValid = false;
    if (!validateFK(item.sellerId, mockUsers, 'id', `Cart item ${item.id} sellerId`, 'Users'))
      allValid = false;
  });

  if (allValid) devLog('✅ All cart items have valid foreign keys');
  return allValid;
};

export const validateReviews = () => {
  devLog('\n🔍 Validating Reviews foreign keys');
  let allValid = true;

  mockReviews.forEach((review) => {
    if (!review.userId) {
      devError(`❌ Review ${review.id} missing userId!`);
      allValid = false;
    } else {
      if (!validateFK(review.userId, mockUsers, 'id', `Review ${review.id}`, 'Users'))
        allValid = false;
    }
    if (!validateFK(review.productId, getAllProducts(), 'id', `Review ${review.id}`, 'Products'))
      allValid = false;
  });

  if (allValid) devLog('✅ All reviews have valid foreign keys');
  return allValid;
};

export const validateOrders = () => {
  devLog('\n🔍 Validating Orders foreign keys');
  let allValid = true;

  mockOrders.forEach((order) => {
    if (!validateFK(order.userId, mockUsers, 'id', `Order ${order.id}`, 'Users')) allValid = false;
    order.items.forEach((item) => {
      if (
        !validateFK(
          item.productId,
          getAllProducts(),
          'id',
          `Order ${order.id} item ${item.id}`,
          'Products'
        )
      )
        allValid = false;
      if (!item.sellerId) {
        devError(`❌ Order ${order.id} item ${item.id} missing sellerId!`);
        allValid = false;
      } else {
        if (
          !validateFK(
            item.sellerId,
            mockUsers,
            'id',
            `Order ${order.id} item ${item.id} sellerId`,
            'Users'
          )
        )
          allValid = false;
      }
    });
  });

  if (allValid) devLog('✅ All orders have valid foreign keys');
  return allValid;
};

export const validatePurchasedProducts = () => {
  devLog('\n🔍 Validating Purchased Products foreign keys');
  let allValid = true;

  mockPurchasedProducts.forEach((item) => {
    if (!validateFK(item.userId, mockUsers, 'id', `Purchased ${item.id}`, 'Users'))
      allValid = false;
    if (!validateFK(item.productId, getAllProducts(), 'id', `Purchased ${item.id}`, 'Products'))
      allValid = false;
    if (!item.orderId) {
      devError(`❌ Purchased product ${item.id} missing orderId!`);
      allValid = false;
    } else {
      if (!validateFK(item.orderId, mockOrders, 'id', `Purchased ${item.id}`, 'Orders'))
        allValid = false;
    }
    if (!validateFK(item.sellerId, mockUsers, 'id', `Purchased ${item.id} sellerId`, 'Users'))
      allValid = false;
  });

  if (allValid) devLog('✅ All purchased products have valid foreign keys');
  return allValid;
};

export const validateAllData = () => {
  devLog('\n' + '='.repeat(60));
  devLog('🚀 STARTING DATA VALIDATION');
  devLog('='.repeat(60));

  const results = {
    products: validateProductSellers(),
    cart: validateCartItems(),
    reviews: validateReviews(),
    orders: validateOrders(),
    purchased: validatePurchasedProducts(),
  };

  devLog('\n' + '='.repeat(60));
  devLog('📊 VALIDATION SUMMARY');
  devLog('='.repeat(60));
  Object.entries(results).forEach(([key, valid]) => {
    devLog(`${valid ? '✅' : '❌'} ${key.toUpperCase()}: ${valid ? 'VALID' : 'INVALID'}`);
  });

  const allValid = Object.values(results).every((v) => v);
  devLog('\n' + '='.repeat(60));
  if (allValid) {
    devLog('🎉 ALL DATA RELATIONSHIPS ARE VALID!');
    devLog('✅ Ready for production deployment');
  } else {
    devLog('❌ SOME DATA RELATIONSHIPS ARE INVALID!');
    devLog('⚠️  Please fix the issues above');
  }
  devLog('='.repeat(60) + '\n');

  return allValid;
};

/**
 * Get statistics about data
 */
export const getDataStats = () => {
  const products = getAllProducts();

  return {
    users: {
      total: mockUsers.length,
      buyers: mockUsers.filter((u) => u.role === 'buyer' || u.role === 'user').length,
      sellers: mockUsers.filter((u) => u.role === 'seller').length,
      admins: mockUsers.filter((u) => u.role === 'admin').length,
    },
    products: {
      total: products.length,
      byCategory: products.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {}),
      bySeller: products.reduce((acc, p) => {
        acc[p.sellerId] = (acc[p.sellerId] || 0) + 1;
        return acc;
      }, {}),
    },
    orders: {
      total: mockOrders.length,
      totalItems: mockOrders.reduce((sum, o) => sum + o.items.length, 0),
      byUser: mockOrders.reduce((acc, o) => {
        acc[o.userId] = (acc[o.userId] || 0) + 1;
        return acc;
      }, {}),
    },
    cart: {
      total: mockCartItems.length,
      byUser: mockCartItems.reduce((acc, c) => {
        acc[c.userId] = (acc[c.userId] || 0) + 1;
        return acc;
      }, {}),
    },
    reviews: {
      total: mockReviews.length,
      byProduct: mockReviews.reduce((acc, r) => {
        acc[r.productId] = (acc[r.productId] || 0) + 1;
        return acc;
      }, {}),
      byUser: mockReviews.reduce((acc, r) => {
        acc[r.userId] = (acc[r.userId] || 0) + 1;
        return acc;
      }, {}),
    },
    purchased: {
      total: mockPurchasedProducts.length,
      byUser: mockPurchasedProducts.reduce((acc, p) => {
        acc[p.userId] = (acc[p.userId] || 0) + 1;
        return acc;
      }, {}),
    },
  };
};

/**
 * Print data statistics
 */
export const printDataStats = () => {
  const stats = getDataStats();

  console.log('\n' + '='.repeat(60));
  console.log('📊 DATA STATISTICS');
  console.log('='.repeat(60));

  console.log('\n👥 USERS:');
  console.log(`  Total: ${stats.users.total}`);
  console.log(`  - Buyers/Users: ${stats.users.buyers}`);
  console.log(`  - Sellers: ${stats.users.sellers}`);
  console.log(`  - Admins: ${stats.users.admins}`);

  console.log('\n📦 PRODUCTS:');
  console.log(`  Total: ${stats.products.total}`);
  console.log('  By Category:');
  Object.entries(stats.products.byCategory).forEach(([cat, count]) => {
    console.log(`    - ${cat}: ${count}`);
  });
  console.log('  By Seller:');
  Object.entries(stats.products.bySeller).forEach(([seller, count]) => {
    console.log(`    - Seller ${seller}: ${count} products`);
  });

  console.log('\n🛒 CART:');
  console.log(`  Total items: ${stats.cart.total}`);
  console.log('  By User:');
  Object.entries(stats.cart.byUser).forEach(([user, count]) => {
    console.log(`    - User ${user}: ${count} items`);
  });

  console.log('\n📝 ORDERS:');
  console.log(`  Total orders: ${stats.orders.total}`);
  console.log(`  Total items: ${stats.orders.totalItems}`);
  console.log('  By User:');
  Object.entries(stats.orders.byUser).forEach(([user, count]) => {
    console.log(`    - User ${user}: ${count} orders`);
  });

  console.log('\n⭐ REVIEWS:');
  console.log(`  Total: ${stats.reviews.total}`);
  console.log('  By Product:');
  Object.entries(stats.reviews.byProduct).forEach(([prod, count]) => {
    console.log(`    - Product ${prod}: ${count} reviews`);
  });
  console.log('  By User:');
  Object.entries(stats.reviews.byUser).forEach(([user, count]) => {
    console.log(`    - User ${user}: ${count} reviews`);
  });

  console.log('\n💾 PURCHASED PRODUCTS:');
  console.log(`  Total: ${stats.purchased.total}`);
  console.log('  By User:');
  Object.entries(stats.purchased.byUser).forEach(([user, count]) => {
    console.log(`    - User ${user}: ${count} purchases`);
  });

  console.log('\n' + '='.repeat(60) + '\n');
};

// Export default function to run all checks
export default validateAllData;
