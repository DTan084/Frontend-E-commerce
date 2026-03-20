import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getProductById } from '../../data/mockProducts';
import { getCategoryName } from '../../data/categories';
import { extractIdFromSlug } from '../../utils/slugHelper';
import {
  mockReviews,
  mockRatingStats,
  mockCurrentUser,
  mockSellerUser,
} from '../../data/mockReviews';
import Breadcrumb from '../../components/Product/Breadcrumb';
import ImageGallery from '../../components/Product/ImageGallery';
import ProductInfo from '../../components/Product/ProductInfo';
import TabSection from '../../components/Product/TabSection';
import SellerCard from '../../components/Product/SellerCard';
import ReviewsSection from '../../components/Product/ReviewsSection';
import RelatedProducts from '../../components/Product/RelatedProducts';
import Toast from '../../components/common/Toast';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Extract product ID from slug
  const productId = extractIdFromSlug(slug);

  // Determine current user type for reviews
  const getCurrentUserForReviews = () => {
    if (!user) return null;
    // Check if user is seller (you can customize this logic)
    if (user.role === 'seller' || user.isSeller) {
      return mockSellerUser;
    }
    return mockCurrentUser;
  };

  // Handle review submission
  const handleSubmitReview = (reviewData) => {
    console.log('New review submitted:', reviewData);
    // TODO: Persist review into mock store/localStorage
    setToast({
      show: true,
      message: 'Cảm ơn bạn đã đánh giá sản phẩm!',
      type: 'success',
    });
  };

  // Handle Add to Cart
  const handleAddToCart = (productWithQuantity) => {
    addToCart(productWithQuantity, productWithQuantity.quantity || 1);

    // Show success toast
    setToast({
      show: true,
      message: `Đã thêm "${productWithQuantity.name}" vào giỏ hàng!`,
      type: 'success',
    });
  };

  useEffect(() => {
    // Simulate async fetch from mock data source
    const fetchProduct = async () => {
      setLoading(true);

      // Get product from mockProducts
      const productData = getProductById(productId);

      if (productData) {
        // Add default seller if not present
        if (!productData.seller) {
          productData.seller = {
            id: 1,
            name: 'WebSource Marketplace',
            avatar:
              'https://ui-avatars.com/api/?name=WebSource&background=667eea&color=fff&size=120',
            memberSince: 'January 2020',
            rating: 4.9,
            totalSales: 1234,
            positiveRatings: 98,
          };
        }
      }

      // Simulate network delay
      setTimeout(() => {
        setProduct(productData || null);
        setLoading(false);
      }, 300);
    };

    fetchProduct();
  }, [productId, slug]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Sản phẩm', path: '/products' },
          {
            label: getCategoryName(product.category, 'vi'),
            path: `/products?category=${product.category}`,
          },
          { label: product.name || product.title, path: null },
        ]}
      />

      {/* Main Product Section - 2 Column Layout */}
      <div className="product-main-section">
        <div className="product-main-grid">
          {/* Left Column - Image Gallery */}
          <div className="product-gallery-column">
            <ImageGallery images={product.images} productTitle={product.name || product.title} />
          </div>

          {/* Right Column - Product Info */}
          <div className="product-info-column">
            <ProductInfo product={product} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <TabSection product={product} />

      {/* Seller Information & Reviews Section */}
      <div className="seller-reviews-grid">
        <div className="seller-column">
          <SellerCard seller={product.seller} />
        </div>
        <div className="reviews-column">
          <ReviewsSection
            productId={product.id}
            reviews={mockReviews}
            averageRating={parseFloat(mockRatingStats.averageRating)}
            totalReviews={mockRatingStats.totalReviews}
            userHasPurchased={user ? true : false}
            currentUser={getCurrentUserForReviews()}
            onSubmitReview={handleSubmitReview}
          />
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} category={product.category} />
    </div>
  );
};

export default ProductDetailPage;
