import React, { useState, useMemo } from 'react';
import { Calendar, Phone, CheckCircle, Info, Calculator, MessageSquare } from 'lucide-react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import './RentalRequestModal.css';

/**
 * Reusable Rental Request Modal Component for Equipment Booking Previews.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state
 * @param {Function} props.onClose - Close handler
 * @param {Object} props.equipment - Equipment object
 */
export const RentalRequestModal = ({ isOpen, onClose, equipment }) => {
  // Default dates: Start tomorrow, End 3 days later
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const threeDaysLaterStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  }, []);

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(threeDaysLaterStr);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate rental duration in days
  const numberOfDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  // Daily rate and total calculation
  const dailyRate = equipment?.pricePerDay || 1000;
  const estimatedTotal = dailyRate * numberOfDays;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!equipment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? "Rental Request Sent (Demo)" : "Request Equipment Rental"}
      size="md"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="rental-modal__form">
          {/* Item Summary Header */}
          <div className="rental-modal__summary-box">
            <div className="rental-modal__summary-info">
              <h4 className="rental-modal__equipment-title">{equipment.title}</h4>
              <p className="rental-modal__owner-line">
                Owner: <strong>{equipment.ownerName}</strong> ({equipment.location})
              </p>
            </div>
            <Badge variant="available">₹{equipment.pricePerDay} / Day</Badge>
          </div>

          {/* Date Range Selection */}
          <div className="rental-modal__date-grid">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              min={tomorrowStr}
              onChange={(e) => setStartDate(e.target.value)}
              required
              leadingIcon={<Calendar size={18} />}
            />

            <Input
              label="End Date"
              type="date"
              value={endDate}
              min={startDate || tomorrowStr}
              onChange={(e) => setEndDate(e.target.value)}
              required
              leadingIcon={<Calendar size={18} />}
            />
          </div>

          {/* Price Calculation Box */}
          <div className="rental-modal__calc-card">
            <div className="rental-modal__calc-row">
              <span>Rental Duration</span>
              <strong>{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}</strong>
            </div>

            <div className="rental-modal__calc-row">
              <span>Daily Rate</span>
              <span>₹{dailyRate.toLocaleString('en-IN')} / Day</span>
            </div>

            {equipment.rentalInformation?.securityDeposit && (
              <div className="rental-modal__calc-row">
                <span>Security Deposit</span>
                <span>{equipment.rentalInformation.securityDeposit}</span>
              </div>
            )}

            <div className="rental-modal__calc-divider" />

            <div className="rental-modal__calc-row rental-modal__calc-row--total">
              <div>
                <span className="rental-modal__total-label">Estimated Total Price</span>
                <span className="rental-modal__demo-badge">(Frontend Preview)</span>
              </div>
              <span className="rental-modal__total-amount">
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Optional Message to Owner */}
          <div className="rental-modal__message-group">
            <label htmlFor="owner-msg" className="agri-input__label">
              <MessageSquare size={16} /> Message to Owner (Optional)
            </label>
            <textarea
              id="owner-msg"
              className="rental-modal__textarea"
              placeholder="e.g. Please confirm if operator is available for 3 days near village Gill."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Demo Notice Alert */}
          <div className="rental-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              <strong>Demo Notice:</strong> No charges will be processed. This frontend preview calculates estimated pricing dynamically before backend integration.
            </p>
          </div>

          {/* Modal Form Actions */}
          <div className="rental-modal__actions">
            <Button variant="outline" type="button" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={<Calculator size={18} />}>
              Submit Request (₹{estimatedTotal.toLocaleString('en-IN')})
            </Button>
          </div>
        </form>
      ) : (
        /* Demo Confirmation Screen */
        <div className="rental-modal__success-state">
          <div className="rental-modal__success-icon">
            <CheckCircle size={48} />
          </div>
          <h3 className="rental-modal__success-title">Rental Request Received!</h3>
          <p className="rental-modal__success-desc">
            Your demo request for <strong>{equipment.title}</strong> from <strong>{startDate}</strong> to <strong>{endDate}</strong> ({numberOfDays} Days) has been calculated.
          </p>

          <div className="rental-modal__success-details">
            <div className="success-row">
              <span>Owner:</span> <strong>{equipment.ownerName}</strong>
            </div>
            <div className="success-row">
              <span>Estimated Price:</span> <strong>₹{estimatedTotal.toLocaleString('en-IN')}</strong>
            </div>
            <div className="success-row">
              <span>Status:</span> <Badge variant="pending">Demo Preview Mode</Badge>
            </div>
          </div>

          <div className="rental-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              Once Phase 5 backend API services are connected, owner {equipment.ownerName} will receive your request directly via SMS and WhatsApp.
            </p>
          </div>

          <Button variant="primary" fullWidth onClick={handleResetAndClose}>
            Back to Equipment Listings
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default RentalRequestModal;
