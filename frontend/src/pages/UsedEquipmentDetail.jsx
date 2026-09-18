import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, User, ShieldCheck, Tag, Phone, ShoppingCart, Send,
  ChevronRight, Star, Info, Clock, Calendar, Wrench, CheckCircle2, AlertCircle
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import UsedEquipmentInquiryModal from '../components/UsedEquipmentInquiryModal';
import { USED_EQUIPMENT_DATA } from '../data/usedEquipmentData';
import './UsedEquipmentDetail.css';

export const UsedEquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('purchase'); // 'purchase' | 'contact'

  // Lookup equipment by ID
  const item = USED_EQUIPMENT_DATA.find((e) => e.id === id);

  if (!item) {
    return (
      <MainLayout>
        <div className="used-detail-page">
          <EmptyState
            title="Machinery Listing Not Found"
            description="The requested used agricultural equipment listing does not exist."
            actionLabel="Back to Used Equipment"
            onAction={() => navigate('/used-equipment')}
          />
        </div>
      </MainLayout>
    );
  }

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const isSold = item.availability === 'Sold';

  return (
    <MainLayout>
      <div className="used-detail-page">
        {/* Breadcrumbs */}
        <div className="used-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} />
          <Link to="/used-equipment" className="breadcrumb-link">Used Equipment</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{item.title}</span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="used-detail__back-btn"
          onClick={() => navigate('/used-equipment')}
        >
          <ArrowLeft size={18} /> Back to Used Equipment
        </button>

        {/* Main 2-Column Layout */}
        <div className="used-detail__grid">
          {/* Left Column: Gallery, Specs & Description */}
          <div className="used-detail__main-col">
            {/* Gallery Display */}
            <div className="used-detail__gallery">
              <div className="used-detail__main-img-box">
                <img
                  src={item.images[activeImgIndex] || item.images[0]}
                  alt={item.title}
                  className="used-detail__main-img"
                />
                <div className="used-detail__badge-overlay">
                  <Badge variant={isSold ? 'sold' : 'available'}>
                    {item.availability}
                  </Badge>
                </div>
              </div>

              {item.images.length > 1 && (
                <div className="used-detail__thumbnails">
                  {item.images.map((imgUrl, idx) => (
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
            <div className="used-detail__card">
              <h3 className="used-detail__card-title">Machinery Overview & Description</h3>
              <p className="used-detail__description">{item.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="used-detail__card">
              <h3 className="used-detail__card-title">Technical Specifications</h3>
              <div className="used-specs-grid">
                {Object.entries(item.specifications).map(([key, val]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());

                  return (
                    <div key={key} className="used-spec-item">
                      <span className="spec-key">{formattedKey}</span>
                      <strong className="spec-val">{val}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Seller Contact Card */}
          <aside className="used-detail__side-col">
            <div className="used-buy-card">
              <div className="used-buy-card__category">
                <Tag size={14} /> {item.type} • {item.brand} ({item.model})
              </div>

              <h1 className="used-buy-card__title">{item.title}</h1>

              <div className="used-buy-card__location">
                <MapPin size={16} className="loc-icon" />
                <span>{item.location}</span>
              </div>

              {/* Price & Hours Banner */}
              <div className="used-buy-card__price-banner">
                <div className="price-main">
                  <span className="price-label">Selling Price</span>
                  <div className="price-value-box">
                    <span className="price-amount">₹{item.price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="price-meta-row">
                  <span className="meta-pill"><Calendar size={14} /> Year: <strong>{item.year}</strong></span>
                  <span className="meta-pill"><Clock size={14} /> Meter: <strong>{item.hoursDisplay}</strong></span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="used-buy-card__meta-bar">
                <div className="meta-item">
                  <span>Condition:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{item.condition}</strong>
                </div>
                <div className="meta-item">
                  <span>Listing Status:</span>
                  <Badge variant={isSold ? 'sold' : 'available'}>{item.availability}</Badge>
                </div>
              </div>

              {/* Seller Profile Box */}
              <div className="used-buy-card__seller-box">
                <div className="seller-avatar">
                  <User size={22} />
                </div>
                <div className="seller-info">
                  <span className="seller-role">{item.seller?.role}</span>
                  <strong className="seller-name">{item.seller?.name}</strong>
                  <div className="seller-rating">
                    <Star size={14} className="star-icon" /> {item.seller?.rating} • Verified Machinery Seller
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="used-buy-card__actions">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSold}
                  icon={<ShoppingCart size={20} />}
                  onClick={() => handleOpenModal('purchase')}
                >
                  {isSold ? 'Equipment Sold' : 'Send Purchase Request'}
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

              {isSold && (
                <div className="used-buy-card__sold-notice">
                  <AlertCircle size={16} />
                  <span>This equipment has been sold. Purchase requests are disabled.</span>
                </div>
              )}

              <p className="used-buy-card__disclaimer">
                Direct seller transaction. Inspect equipment condition at farm site before finalizing purchase.
              </p>
            </div>
          </aside>
        </div>

        {/* Inquiry / Contact Modal */}
        <UsedEquipmentInquiryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          equipment={item}
          mode={modalMode}
        />
      </div>
    </MainLayout>
  );
};

export default UsedEquipmentDetail;
