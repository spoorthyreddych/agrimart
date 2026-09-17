import React from 'react';
import './Badge.css';

/**
 * Reusable Badge component for displaying listing statuses, categories, and tags.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'success'|'warning'|'danger'|'info'|'neutral'|'available'|'rented'|'sold'|'pending'} [props.variant='neutral'] - Badge color theme
 * @param {'sm'|'md'} [props.size='md'] - Badge size
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {string} [props.className] - Extra CSS classes
 */
export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  // Normalize alias variants to primary status colors
  const normalizedVariant = (() => {
    switch (variant) {
      case 'available': return 'success';
      case 'rented': return 'info';
      case 'pending': return 'warning';
      case 'sold': return 'danger';
      default: return variant;
    }
  })();

  const badgeClass = `agri-badge agri-badge--${normalizedVariant} agri-badge--${size} ${className}`.trim();

  return (
    <span className={badgeClass} {...props}>
      {icon && <span className="agri-badge__icon">{icon}</span>}
      <span className="agri-badge__text">{children}</span>
    </span>
  );
};

export default Badge;
