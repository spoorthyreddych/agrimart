import React from 'react';
import './DashboardSummaryCard.css';

export const DashboardSummaryCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  onClick,
}) => {
  return (
    <div
      className={`agri-summary-card agri-summary-card--${variant} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="agri-summary-card__body">
        <span className="agri-summary-card__title">{title}</span>
        <div className="agri-summary-card__val-row">
          <span className="agri-summary-card__value">{value}</span>
        </div>
        {subtitle && <span className="agri-summary-card__subtitle">{subtitle}</span>}
      </div>

      {Icon && (
        <div className="agri-summary-card__icon">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default DashboardSummaryCard;
