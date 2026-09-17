import React from 'react';
import { PackageSearch } from 'lucide-react';
import Button from './Button';
import './EmptyState.css';

/**
 * Reusable EmptyState Component for AgriMart empty search & list screens.
 * 
 * @param {Object} props
 * @param {string} [props.title='No items found'] - Main header message
 * @param {string} [props.description='Try adjusting your search keywords or location filters.'] - Subtext
 * @param {React.ReactNode} [props.icon] - Custom icon
 * @param {string} [props.actionLabel] - Button CTA text
 * @param {Function} [props.onAction] - Button CTA click callback
 * @param {string} [props.className] - Extra class name
 */
export const EmptyState = ({
  title = 'No items found',
  description = 'Try adjusting your search criteria or resetting your filters.',
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`agri-empty-state ${className}`.trim()}>
      <div className="agri-empty-state__icon-box">
        {icon || <PackageSearch size={40} />}
      </div>
      <h3 className="agri-empty-state__title">{title}</h3>
      {description && <p className="agri-empty-state__desc">{description}</p>}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="md"
          onClick={onAction}
          className="agri-empty-state__btn"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
