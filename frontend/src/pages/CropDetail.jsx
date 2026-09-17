import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, User, ShieldCheck, Tag, Phone, ShoppingCart, Send,
  ChevronRight, Calendar, Star, Info, Package, Award
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import CropInquiryModal from '../components/CropInquiryModal';
import { CROP_MARKETPLACE_DATA } from '../data/cropMarketplaceData';
import './CropDetail.css';

export const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('purchase'); // 'purchase' | 'contact'

  // Lookup crop listing by ID
  const crop = CROP_MARKETPLACE_DATA.find((c) => c.id === id);

  if (!crop) {
    return (
      <MainLayout>
        <div className="crop-detail-page">
          <EmptyState
            title="Crop Listing Not Found"
            description="The requested crop harvest listing does not exist or has been sold."
            actionLabel="Back to Crop Marketplace"
            onAction={() => navigate('/crops')}
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
      <div className="crop-detail-page">
        {/* Breadcrumbs */}
        <div className="crop-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} />
          <Link to="/crops" className="breadcrumb-link">Crop Marketplace</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{crop.title}</span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="crop-detail__back-btn"
          onClick={() => navigate('/crops')}
        >
          <ArrowLeft size={18} /> Back to Crop Marketplace
        </button>

        {/* Main 2-Column Crop Layout */}
        <div className="crop-detail__grid">
          {/* Left Column: Gallery, Specs & Description */}
          <div className="crop-detail__main-col">
            {/* Gallery Image Display */}
            <div className="crop-detail__gallery">
              <div className="crop-detail__main-img-box">
                <img
                  src={crop.images[activeImgIndex] || crop.images[0]}
                  alt={crop.title}
                  className="crop-detail__main-img"
                />
                <div className="crop-detail__badge-overlay">
                  <Badge variant="success" icon={<Award size={14} />}>
                    Grade {crop.grade} Quality
                  </Badge>
                </div>
              </div>

              {crop.images.length > 1 && (
                <div className="crop-detail__thumbnails">
                  {crop.images.map((imgUrl, idx) => (
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
            <div className="crop-detail__card">
              <h3 className="crop-detail__card-title">Harvest Details & Description</h3>
              <p className="crop-detail__description">{crop.description}</p>
            </div>

            {/* Crop Specifications Table */}
            <div className="crop-detail__card">
              <h3 className="crop-detail__card-title">Crop Quality Specifications</h3>
              <div className="crop-specs-grid">
                {Object.entries(crop.specifications).map(([key, val]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());

                  return (
                    <div key={key} className="crop-spec-item">
                      <span className="spec-key">{formattedKey}</span>
                      <strong className="spec-val">{val}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Action Card */}
          <aside className="crop-detail__side-col">
            <div className="crop-buy-card">
              <div className="crop-buy-card__category">
                <Tag size={14} /> {crop.category} • Variety: {crop.variety}
              </div>

              <h1 className="crop-buy-card__title">{crop.title}</h1>

              <div className="crop-buy-card__location">
                <MapPin size={16} className="loc-icon" />
                <span>{crop.location}</span>
              </div>

              {/* Price & Quantity Banner */}
              <div className="crop-buy-card__price-banner">
                <div className="price-main">
                  <span className="price-label">Expected Price</span>
                  <div className="price-value-box">
                    <span className="price-amount">₹{crop.price.toLocaleString('en-IN')}</span>
                    <span className="price-unit">/{crop.priceUnit}</span>
                  </div>
                </div>

                <div className="price-meta-row">
                  <span className="meta-pill"><Package size={14} /> Available: <strong>{crop.quantityDisplay}</strong></span>
                  <span className="meta-pill"><Calendar size={14} /> Harvested: <strong>{crop.harvestDate}</strong></span>
                </div>
              </div>

              {/* Farmer Seller Card */}
              <div className="crop-buy-card__seller-box">
                <div className="seller-avatar">
                  <User size={22} />
                </div>
                <div className="seller-info">
                  <span className="seller-role">{crop.seller.role}</span>
                  <strong className="seller-name">{crop.seller.name}</strong>
                  <div className="seller-rating">
                    <Star size={14} className="star-icon" /> {crop.seller.rating} • Verified Producer
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="crop-buy-card__actions">
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

              <p className="crop-buy-card__disclaimer">
                Prices shown are direct farmer expectations. No middleman commissions or online fees.
              </p>
            </div>
          </aside>
        </div>

        {/* Purchase & Contact Modal */}
        <CropInquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          crop={crop}
          mode={modalMode}
        />
      </div>
    </MainLayout>
  );
};

export default CropDetail;
