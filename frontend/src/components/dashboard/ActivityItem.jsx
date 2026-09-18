import React from 'react';
import { Wheat, ShoppingCart, Tractor, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import './ActivityItem.css';

const ICON_MAP = {
  Wheat,
  ShoppingCart,
  Tractor,
  MessageSquare,
  CheckCircle: CheckCircle2,
};

export const ActivityItem = ({ icon = 'CheckCircle', title, description, timestamp }) => {
  const IconComp = ICON_MAP[icon] || CheckCircle2;

  return (
    <div className="agri-activity-item">
      <div className={`agri-activity-icon agri-activity-icon--${icon.toLowerCase()}`}>
        <IconComp size={18} />
      </div>
      <div className="agri-activity-content">
        <strong className="agri-activity-title">{title}</strong>
        <p className="agri-activity-desc">{description}</p>
        <span className="agri-activity-time">
          <Clock size={12} /> {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ActivityItem;
