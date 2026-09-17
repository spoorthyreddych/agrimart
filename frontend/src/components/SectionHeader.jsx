import React from 'react';
import { ArrowRight } from 'lucide-react';
import './SectionHeader.css';

/**
 * Reusable SectionHeader for landing sections and marketplace grids.
 * 
 * @param {Object} props
 * @param {string} props.title - Main section heading
 * @param {string} [props.subtitle] - Section description subtitle
 * @param {string} [props.actionText] - Action link label (e.g. "View All")
 * @param {Function|string} [props.action] - Action callback or link route
 * @param {React.ReactNode} [props.badge] - Optional badge element
 * @param {string} [props.className] - Additional CSS class
 */
export const SectionHeader = ({
  title,
  subtitle,
  actionText,
  action,
  badge,
  className = '',
}) => {
  const handleActionClick = () => {
    if (typeof action === 'function') {
      action();
    }
  };

  return (
    <div className={`agri-section-header ${className}`.trim()}>
      <div className="agri-section-header__main">
        {badge && <div className="agri-section-header__badge-wrapper">{badge}</div>}
        <h2 className="agri-section-header__title">{title}</h2>
        {subtitle && <p className="agri-section-header__subtitle">{subtitle}</p>}
      </div>

      {actionText && (
        <div className="agri-section-header__action-wrapper">
          <button
            type="button"
            className="agri-section-header__action"
            onClick={handleActionClick}
          >
            {actionText} <ArrowRight size={16} className="agri-section-header__arrow" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
