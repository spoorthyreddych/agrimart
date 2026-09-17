import React from 'react';
import { MapPin, Tag, Calendar, ShieldCheck } from 'lucide-react';
import Badge from './Badge';
import Button from './Button';
import './ListingCard.css';

/**
 * Reusable ListingCard for Equipment Rental, Used Equipment, Crops, and Agri Products.
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the listing
 * @param {string} props.image - Image URL
 * @param {string} props.category - Category display name
 * @param {string} props.location - City/District location
 * @param {number|string} props.price - Price amount
 * @param {string} [props.priceUnit='per day'] - Unit of pricing (e.g. /day, /quintal, /item)
 * @param {string} [props.condition] - Machine condition for used equipment
 * @param {'available'|'rented'|'sold'|'pending'} [props.availability='available'] - Availability status
 * @param {'rental'|'crop'|'product'|'used_equipment'} [props.type='rental'] - Listing domain type
 * @param {string} [props.ctaText] - Primary CTA button label
 * @param {Function} [props.onCtaClick] - CTA click callback
 * @param {string} [props.className] - Extra container styling
 */
export const ListingCard = ({
  title,
  image,
  category,
  location,
  price,
  priceUnit = 'per day',
  condition,
  availability = 'available',
  type = 'rental',
  ctaText,
  onCtaClick,
  className = '',
}) => {
  // Determine default CTA label based on listing type
  const defaultCtaLabel = (() => {
    switch (type) {
      case 'rental': return 'Rent Equipment';
      case 'crop': return 'Request Crop';
      case 'product': return 'View Product';
      case 'used_equipment': return 'Inquire Machine';
      default: return 'View Details';
    }
  })();

  // Format currency display safely
  const formattedPrice = typeof price === 'number' 
    ? `₹${price.toLocaleString('en-IN')}`
    : price;

  return (
    <article className={`agri-card ${className}`.trim()}>
      {/* Image & Badge Overlay Header */}
      <div className="agri-card__media">
        <img
          src={image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'}
          alt={title}
          className="agri-card__img"
          loading="lazy"
        />
        <div className="agri-card__badges">
          <Badge variant={availability}>
            {availability}
          </Badge>
          <span className={`agri-card__type-tag agri-card__type-tag--${type}`}>
            {type.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="agri-card__body">
        {category && (
          <span className="agri-card__category">
            <Tag size={14} /> {category}
          </span>
        )}

        <h3 className="agri-card__title" title={title}>
          {title}
        </h3>

        {/* Key Info Metadata Pills */}
        <div className="agri-card__meta">
          {location && (
            <span className="agri-card__meta-item">
              <MapPin size={15} className="agri-card__meta-icon" />
              {location}
            </span>
          )}

          {condition && (
            <span className="agri-card__meta-item">
              <ShieldCheck size={15} className="agri-card__meta-icon" />
              Condition: {condition}
            </span>
          )}
        </div>

        {/* Pricing & CTA Footer */}
        <div className="agri-card__footer">
          <div className="agri-card__price-box">
            <span className="agri-card__price">{formattedPrice}</span>
            <span className="agri-card__price-unit">/{priceUnit.replace('/', '')}</span>
          </div>

          <Button
            variant={availability === 'available' ? 'primary' : 'outline'}
            size="sm"
            onClick={onCtaClick}
            disabled={availability === 'sold'}
            className="agri-card__cta"
          >
            {ctaText || defaultCtaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ListingCard;
