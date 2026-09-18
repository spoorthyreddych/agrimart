import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, User, ShieldCheck, Tag, Phone, ShoppingCart, Send,
  ChevronRight, Star, Info, Package, CheckCircle2
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import ProductInquiryModal from '../components/ProductInquiryModal';
import { AGRI_PRODUCTS_DATA } from '../data/agriProductsData';
import './AgriProductDetail.css';

export const AgriProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('purchase'); // 'purchase' | 'contact'

  // Lookup product listing by ID
  const product = AGRI_PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return (
      <MainLayout>
        <div className="agri-product-detail-page">
          <EmptyState
            title="Product Not Found"
            description="The requested agricultural product or farm input listing does not exist."
            actionLabel="Back to Products Marketplace"
            onAction={() => navigate('/products')}
          />
        </div>
      </MainLayout>
    );
  }

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="agri-product-detail-page">
        {/* Breadcrumbs */}
        <div className="agri-product-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="breadcrumb-link">Agricultural Products</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{product.title}</span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="agri-product-detail__back-btn"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft size={18} /> Back to Products Marketplace
        </button>

        {/* Main 2-Column Product Layout */}
        <div className="agri-product-detail__grid">
          {/* Left Column: Gallery, Description & Specs */}
          <div className="agri-product-detail__main-col">
            {/* Gallery Display */}
            <div className="agri-product-detail__gallery">
              <div className="agri-product-detail__main-img-box">
                <img
                  src={product.images[activeImgIndex] || product.images[0]}
                  alt={product.title}
                  className="agri-product-detail__main-img"
                />
                <div className="agri-product-detail__badge-overlay">
                  <Badge variant="available" icon={<CheckCircle2 size={14} />}>
                    {product.availability}
                  </Badge>
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="agri-product-detail__thumbnails">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumbnail-btn ${activeImgIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="agri-product-detail__card">
              <h3 className="agri-product-detail__card-title">Product Description</h3>
              <p className="agri-product-detail__description">{product.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="agri-product-detail__card">
              <h3 className="agri-product-detail__card-title">Product Specifications</h3>
              <div className="agri-product-specs-grid">
                {Object.entries(product.specifications).map(([key, val]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());

                  return (
                    <div key={key} className="agri-product-spec-item">
                      <span className="spec-key">{formattedKey}</span>
                      <strong className="spec-val">{val}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Action Card */}
          <aside className="agri-product-detail__side-col">
            <div className="product-side-card">
              <div className="product-side-card__category">
                <Tag size={14} /> {product.category} • Brand: <strong>{product.brand}</strong>
              </div>

              <h1 className="product-side-card__title">{product.title}</h1>

              <div className="product-side-card__location">
                <MapPin size={16} className="loc-icon" />
                <span>{product.location}</span>
              </div>

              {/* Price Banner */}
              <div className="product-side-card__price-banner">
                <div className="price-main">
                  <span className="price-label">Product Price</span>
                  <div className="price-value-box">
                    <span className="price-amount">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="price-unit">/ {product.priceUnit}</span>
                  </div>
                </div>

                <div className="price-meta-row">
                  <span className="meta-pill"><Package size={14} /> Pack Size: <strong>{product.unitQuantity}</strong></span>
                  <span className="meta-pill"><ShieldCheck size={14} /> Condition: <strong>{product.condition}</strong></span>
                </div>
              </div>

              {/* Vendor Seller Box */}
              <div className="product-side-card__seller-box">
                <div className="seller-avatar">
                  <User size={22} />
                </div>
                <div className="seller-info">
                  <span className="seller-role">{product.seller.role}</span>
                  <strong className="seller-name">{product.seller.name}</strong>
                  <div className="seller-rating">
                    <Star size={14} className="star-icon" /> {product.seller.rating} • Verified Dealer
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-side-card__actions">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ShoppingCart size={20} />}
                  onClick={() => handleOpenModal('purchase')}
                >
                  Send Purchase Request
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  icon={<Phone size={18} />}
                  onClick={() => handleOpenModal('contact')}
                >
                  Contact Seller
                </Button>
              </div>

              <p className="product-side-card__disclaimer">
                No direct online payment required. Connect with the authorized vendor to confirm bulk pricing and delivery.
              </p>
            </div>
          </aside>
        </div>

        {/* Purchase & Contact Modal */}
        <ProductInquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          product={product}
          mode={modalMode}
        />
      </div>
    </MainLayout>
  );
};

export default AgriProductDetail;
