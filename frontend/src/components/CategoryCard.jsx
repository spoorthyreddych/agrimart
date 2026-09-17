import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CategoryCard.css';

/**
 * Reusable CategoryCard component for displaying AgriMart market segments.
 * 
 * @param {Object} props
 * @param {string} props.title - Category title (e.g. "Tractors & Tillers")
 * @param {string} props.description - Short summary of items in category
 * @param {React.ReactNode} [props.icon] - Visual icon element
 * @param {string|number} [props.count] - Listing count tag (e.g., "140+ Items")
 * @param {Function} [props.onClick] - Click callback
 * @param {string} [props.className] - Additional class names
 */
export const CategoryCard = ({
  title,
  description,
  icon,
  count,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`agri-category-card ${className}`.trim()}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClick) onClick();
        }
      }}
    >
      <div className="agri-category-card__header">
        {icon && <div className="agri-category-card__icon-box">{icon}</div>}
        {count && <span className="agri-category-card__count">{count}</span>}
      </div>

      <div className="agri-category-card__content">
        <h3 className="agri-category-card__title">{title}</h3>
        {description && <p className="agri-category-card__desc">{description}</p>}
      </div>

      <div className="agri-category-card__footer">
        <span className="agri-category-card__action">
          Browse Category <ArrowRight size={16} className="agri-category-card__arrow" />
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
