import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, MapPin, User, ShieldCheck, Clock, Calendar, CheckCircle2,
  Tag, Info, Truck, Phone, Calculator, ChevronRight
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import RentalRequestModal from '../components/RentalRequestModal';
import { RENTAL_EQUIPMENT_DATA } from '../data/rentalEquipment';
import './RentDetail.css';

export const RentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Lookup equipment by ID from isolated dataset
  const equipment = RENTAL_EQUIPMENT_DATA.find((item) => item.id === id);

  if (!equipment) {
    return (
      <MainLayout>
        <div className="rent-detail-page">
          <EmptyState
            title="Equipment Not Found"
            description="The requested rental machinery listing does not exist or has been removed."
            actionLabel="Back to All Equipment"
            onAction={() => navigate('/rent')}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="rent-detail-page">
        {/* Breadcrumb Bar */}
        <div className="rent-detail__breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} />
          <Link to="/rent" className="breadcrumb-link">Rent Equipment</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{equipment.title}</span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          className="rent-detail__back-btn"
          onClick={() => navigate('/rent')}
        >
          <ArrowLeft size={18} /> Back to Equipment Listings
        </button>

        {/* Main 2-Column Detail Layout */}
        <div className="rent-detail__grid">
          {/* Left Column: Image Gallery & Description & Specs */}
          <div className="rent-detail__main-col">
            {/* Gallery Image Display */}
            <div className="rent-detail__gallery">
              <div className="rent-detail__main-img-box">
                <img
                  src={equipment.images[activeImageIndex] || equipment.images[0]}
                  alt={equipment.title}
                  className="rent-detail__main-img"
                />
                <div className="rent-detail__badge-overlay">
                  <Badge variant={equipment.availability}>
                    {equipment.availability}
                  </Badge>
                </div>
              </div>

              {/* Thumbnails */}
              {equipment.images.length > 1 && (
                <div className="rent-detail__thumbnails">
                  {equipment.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`thumbnail-btn ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Equipment Description */}
            <div className="rent-detail__card">
              <h3 className="rent-detail__card-title">Equipment Description</h3>
              <p className="rent-detail__description">{equipment.description}</p>
            </div>

            {/* Specifications Grid */}
            <div className="rent-detail__card">
              <h3 className="rent-detail__card-title">Technical Specifications</h3>
              <div className="specs-grid">
                {Object.entries(equipment.specifications).map(([key, val]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());

                  return (
                    <div key={key} className="specs-item">
                      <span className="specs-key">{formattedKey}</span>
                      <strong className="specs-value">{val}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rental Information & Rules */}
            <div className="rent-detail__card">
              <h3 className="rent-detail__card-title">Rental Terms & Information</h3>
              <ul className="info-list">
                <li>
                  <Clock size={18} className="info-icon" />
                  <div>
                    <strong>Minimum Booking Period:</strong> {equipment.rentalInformation.minBookingDays} Day(s)
                  </div>
                </li>
                <li>
                  <ShieldCheck size={18} className="info-icon" />
                  <div>
                    <strong>Security Deposit:</strong> {equipment.rentalInformation.securityDeposit}
                  </div>
                </li>
                <li>
                  <Truck size={18} className="info-icon" />
                  <div>
                    <strong>Delivery Option:</strong> {equipment.rentalInformation.deliveryOption}
                  </div>
                </li>
                <li>
                  <Info size={18} className="info-icon" />
                  <div>
                    <strong>Cancellation Policy:</strong> {equipment.rentalInformation.cancellationPolicy}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Action Card */}
          <aside className="rent-detail__side-col">
            <div className="booking-card">
              <div className="booking-card__category">
                <Tag size={14} /> {equipment.category}
              </div>

              <h1 className="booking-card__title">{equipment.title}</h1>

              <div className="booking-card__location">
                <MapPin size={16} className="loc-icon" />
                <span>{equipment.location}</span>
              </div>

              {/* Pricing Display Box */}
              <div className="booking-card__price-box">
                <div className="price-item">
                  <span className="price-label">Daily Rental Rate</span>
                  <span className="price-amount">₹{equipment.pricePerDay.toLocaleString('en-IN')}</span>
                  <span className="price-sub">/ Day</span>
                </div>

                {equipment.pricePerHour && (
                  <div className="price-item price-item--secondary">
                    <span className="price-label">Hourly Rate</span>
                    <span className="price-amount">₹{equipment.pricePerHour}</span>
                    <span className="price-sub">/ Hour</span>
                  </div>
                )}
              </div>

              {/* Owner Info Box */}
              <div className="booking-card__owner-box">
                <div className="owner-avatar">
                  <User size={22} />
                </div>
                <div className="owner-info">
                  <span className="owner-role">Equipment Owner</span>
                  <strong className="owner-name">{equipment.ownerName}</strong>
                  <span className="owner-verified">Verified AgriMart Owner</span>
                </div>
              </div>

              {/* Condition & Status Bar */}
              <div className="booking-card__status-bar">
                <div className="status-item">
                  <span>Condition:</span>
                  <strong style={{ color: 'var(--color-primary)' }}>{equipment.condition}</strong>
                </div>
                <div className="status-item">
                  <span>Status:</span>
                  <Badge variant={equipment.availability}>{equipment.availability}</Badge>
                </div>
              </div>

              {/* Request Rental Primary CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<Calculator size={20} />}
                disabled={equipment.availability !== 'available'}
                onClick={() => setModalOpen(true)}
                className="booking-card__cta"
              >
                {equipment.availability === 'available' ? 'Request Rental' : 'Currently Rented Out'}
              </Button>

              <p className="booking-card__disclaimer">
                No upfront payment required. Submit dates to preview estimated price and message the owner.
              </p>
            </div>
          </aside>
        </div>

        {/* Interactive Booking Modal */}
        <RentalRequestModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          equipment={equipment}
        />
      </div>
    </MainLayout>
  );
};

export default RentDetail;
