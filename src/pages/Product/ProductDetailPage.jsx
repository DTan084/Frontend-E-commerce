import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, PackageX, ArrowLeft } from 'lucide-react';
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
    if (user.role === 'seller' || user.isSeller) {
      return mockSellerUser;
    }
    return mockCurrentUser;
  };

  // Handle review submission
  const handleSubmitReview = (reviewData) => {
    console.log('New review submitted:', reviewData);
    setToast({
      show: true,
      message: 'Cảm ơn bạn đã đánh giá sản phẩm!',
      type: 'success',
    });
  };

  // Handle Add to Cart
  const handleAddToCart = (productWithQuantity) => {
    addToCart(productWithQuantity, productWithQuantity.quantity || 1);

    setToast({
      show: true,
      message: `Đã thêm "${productWithQuantity.name}" vào giỏ hàng!`,
      type: 'success',
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      const productData = getProductById(productId);

      if (productData) {
        if (!productData.seller) {
          productData.seller = {
            id: 1,
            name: 'CodeMart Verified Author',
            avatar:
              'https://ui-avatars.com/api/?name=CodeMart&background=4f46e5&color=fff&size=120',
            memberSince: '01/2023',
            rating: 4.9,
            totalSales: 1240,
            positiveRatings: 99,
          };
        }
      }

      setTimeout(() => {
        setProduct(productData || null);
        setLoading(false);
      }, 250);
    };

    fetchProduct();
  }, [productId, slug]);

  if (loading) {
    return (
      <div className="product-detail-page-modern">
        <div className="product-loading-box">
          <Loader2 size={36} className="spinner-rotate" />
          <p>Đang tải thông tin mã nguồn chi tiết...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page-modern">
        <div className="product-notfound-card">
          <div className="notfound-icon-wrap">
            <PackageX size={44} />
          </div>
          <h2>Không tìm thấy mã nguồn</h2>
          <p>Sản phẩm này hiện không tồn tại hoặc đã được gỡ khỏi hệ thống.</p>
          <Link to="/products" className="btn-back-to-products">
            <ArrowLeft size={16} />
            <span>Quay lại danh sách sản phẩm</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page-modern">
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
