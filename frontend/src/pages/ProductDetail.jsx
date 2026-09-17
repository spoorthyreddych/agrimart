import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, User, ShieldCheck, Tag, Phone, ShoppingCart, Send,
  ChevronRight, Calendar, Star, Info, Package
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import PurchaseRequestModal from '../components/PurchaseRequestModal';
import { MARKETPLACE_LISTINGS_DATA } from '../data/marketplaceListings';
import './ProductDetail.css';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('inquiry'); // 'inquiry' | 'contact'

  // Lookup listing by ID from isolated dataset
  const item = MARKETPLACE_LISTINGS_DATA.find((l) => l.id === id);

  if (!item) {
    return (
      <MainLayout>
        <div className="product-detail-page">
          <EmptyState
            title="Listing Not Found"
            description="The requested marketplace product or crop listing does not exist."
            actionLabel="Back to Marketplace"
            onAction={() => navigate('/buy-sell')}
          />
        </div>
      </MainLayout>
    );
  }

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const formattedPrice = typeof item.price === 'number'
    ? `₹${item.price.toLocaleString('en-IN')}`
    : item.price;

  return (
    <MainLayout>
      <div className="product-detail-page">
        {/* Breadcrumb Navigation */}
        <div className="product-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} />
          <Link to="/buy-sell" className="breadcrumb-link">Buy & Sell</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{item.title}</span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="product-detail__back-btn"
          onClick={() => navigate('/buy-sell')}
        >
          <ArrowLeft size={18} /> Back to Marketplace
        </button>

        {/* Main 2-Column Product Layout */}
        <div className="product-detail__grid">
          {/* Left Column: Gallery & Description & Specifications */}
          <div className="product-detail__main-col">
            {/* Gallery Image Display */}
            <div className="product-detail__gallery">
              <div className="product-detail__main-img-box">
                <img
                  src={item.images[activeImgIndex] || item.image}
                  alt={item.title}
                  className="product-detail__main-img"
                />
                <div className="product-detail__type-tag">
                  {item.type.replace('_', ' ')}
                </div>
              </div>

              {item.images.length > 1 && (
                <div className="product-detail__thumbnails">
                  {item.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumbnail-btn ${activeImgIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                    >
                      <img src={imgUrl} alt={`Thumb ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="product-detail__card">
              <h3 className="product-detail__card-title">Listing Description</h3>
              <p className="product-detail__description">{item.description}</p>
            </div>

            {/* Specifications & Attributes */}
            {item.specifications && (
              <div className="product-detail__card">
                <h3 className="product-detail__card-title">Item Specifications</h3>
                <div className="product-specs-grid">
                  {Object.entries(item.specifications).map(([key, val]) => {
                    const formattedKey = key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase());

                    return (
                      <div key={key} className="product-spec-item">
                        <span className="spec-key">{formattedKey}</span>
                        <strong className="spec-val">{val}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Seller Contact Card */}
          <aside className="product-detail__side-col">
            <div className="product-buy-card">
              <div className="product-buy-card__category">
                <Tag size={14} /> {item.category}
              </div>

              <h1 className="product-buy-card__title">{item.title}</h1>

              <div className="product-buy-card__location">
                <MapPin size={16} className="loc-icon" />
                <span>{item.location}</span>
              </div>

              {/* Price & Quantity Banner */}
              <div className="product-buy-card__price-banner">
                <div className="price-main">
                  <span className="price-label">Price</span>
                  <div className="price-value-box">
                    <span className="price-amount">{formattedPrice}</span>
                    <span className="price-unit">/{item.priceUnit}</span>
                  </div>
                </div>

                {item.quantity && (
                  <div className="price-qty-box">
                    <Package size={16} />
                    <span>Available Volume: <strong>{item.quantity}</strong></span>
                  </div>
                )}
              </div>

              {/* Condition & Date info */}
              <div className="product-buy-card__meta-bar">
                <div className="meta-item">
                  <span>Condition:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{item.condition}</strong>
                </div>
                <div className="meta-item">
                  <span>Listed:</span>
                  <strong>{item.createdDate}</strong>
                </div>
              </div>

              {/* Seller Profile Box */}
              <div className="product-buy-card__seller-box">
                <div className="seller-avatar">
                  <User size={22} />
                </div>
                <div className="seller-info">
                  <span className="seller-role">{item.seller?.role || 'Seller'}</span>
                  <strong className="seller-name">{item.seller?.name}</strong>
                  <div className="seller-rating">
                    <Star size={14} className="star-icon" /> {item.seller?.rating || '4.9'} • Verified Member
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-buy-card__actions">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<ShoppingCart size={20} />}
                  onClick={() => handleOpenModal('inquiry')}
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

              <p className="product-buy-card__disclaimer">
                No direct online payment required. Connect with the farmer/seller directly to finalize trade terms.
              </p>
            </div>
          </aside>
        </div>

        {/* Purchase Inquiry / Contact Modal */}
        <PurchaseRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={item}
          mode={modalMode}
        />
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
