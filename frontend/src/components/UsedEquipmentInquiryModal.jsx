import React, { useState } from 'react';
import { Phone, CheckCircle, Info, Send, ShoppingCart, MessageSquare, Wrench } from 'lucide-react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import './UsedEquipmentInquiryModal.css';

/**
 * Reusable Contact Seller & Purchase Request Modal for Used Equipment (Phase 8).
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close callback
 * @param {Object} props.equipment - Used equipment object
 * @param {'contact'|'purchase'} props.mode - Modal view mode
 */
export const UsedEquipmentInquiryModal = ({ isOpen, onClose, equipment, mode = 'purchase' }) => {
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!equipment) return null;

  const isContactMode = mode === 'contact';
  const modalTitle = isContactMode
    ? `Contact Seller: ${equipment.seller?.name}`
    : `Send Purchase Request for ${equipment.name}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const isSold = equipment.availability === 'Sold';

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? "Demo Action Completed" : modalTitle}
      size="md"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="used-modal__form">
          {/* Equipment Summary */}
          <div className="used-modal__summary-box">
            <img src={equipment.images[0]} alt={equipment.title} className="used-modal__thumb" />
            <div className="used-modal__summary-text">
              <div className="used-modal__title-row">
                <h4 className="used-modal__title">{equipment.title}</h4>
                <Badge variant={isSold ? 'sold' : 'available'}>{equipment.availability}</Badge>
              </div>
              <p className="used-modal__subinfo">
                {equipment.brand} {equipment.model} • {equipment.year} Model • 📍 {equipment.location}
              </p>
              <div className="used-modal__price-info">
                <span className="used-modal__price">₹{equipment.price.toLocaleString('en-IN')}</span>
                <span className="used-modal__hours">({equipment.hoursDisplay} used)</span>
              </div>
            </div>
          </div>

          {isContactMode ? (
            /* Contact Seller Mode Controls */
            <div className="used-modal__contact-body">
              <div className="used-seller-card">
                <div className="seller-icon"><Phone size={24} /></div>
                <div className="seller-details">
                  <span className="seller-role">{equipment.seller?.role}</span>
                  <strong className="seller-name">{equipment.seller?.name}</strong>
                  <span className="seller-phone">{equipment.seller?.phone}</span>
                </div>
              </div>

              <div className="agri-input-group">
                <label htmlFor="contact-text" className="agri-input__label">
                  <MessageSquare size={16} /> Inquiry Message to Seller
                </label>
                <textarea
                  id="contact-text"
                  className="used-modal__textarea"
                  placeholder={`Hello ${equipment.seller?.name}, I am interested in your used ${equipment.title}. Is it available for inspection?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          ) : (
            /* Purchase Request Mode Controls */
            <div className="used-modal__purchase-body">
              {isSold ? (
                <div className="used-modal__sold-alert">
                  <Info size={18} />
                  <span>This equipment is marked as <strong>Sold</strong>. Live purchase requests are disabled, but you can still contact the owner for future availability.</span>
                </div>
              ) : (
                <>
                  <Input
                    label="Target Offered Price (₹)"
                    type="number"
                    placeholder={`Asking Price: ₹${equipment.price.toLocaleString('en-IN')}`}
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    helperText="Leave blank to accept the owner's asking price."
                  />

                  <div className="agri-input-group">
                    <label htmlFor="purchase-msg" className="agri-input__label">
                      <MessageSquare size={16} /> Note / Inspection Request to Seller
                    </label>
                    <textarea
                      id="purchase-msg"
                      className="used-modal__textarea"
                      placeholder="e.g. Would like to inspect the tractor at your farm location in Nalgonda this Saturday."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Demo Alert */}
          <div className="used-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              <strong>Demo Notice:</strong> No live transaction occurs. This frontend preview prepares price offers and message inquiries.
            </p>
          </div>

          {/* Actions */}
          <div className="used-modal__actions">
            <Button variant="outline" type="button" onClick={handleResetAndClose}>
              Cancel
            </Button>
            {(!isSold || isContactMode) && (
              <Button
                variant="primary"
                type="submit"
                icon={isContactMode ? <Send size={18} /> : <ShoppingCart size={18} />}
              >
                {isContactMode ? "Send Message" : "Submit Purchase Request"}
              </Button>
            )}
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="used-modal__success-state">
          <div className="used-modal__success-icon">
            <CheckCircle size={48} />
          </div>
          <h3 className="used-modal__success-title">
            {isContactMode ? "Demo Message Sent!" : "Demo Purchase Request Submitted!"}
          </h3>
          <p className="used-modal__success-desc">
            {isContactMode
              ? `Demo message sent. Messaging will be connected to the backend later.`
              : `Demo purchase request submitted. This will be connected to the backend later.`}
          </p>

          <div className="used-modal__success-details">
            <div className="success-row">
              <span>Owner:</span> <strong>{equipment.seller?.name} ({equipment.seller?.phone})</strong>
            </div>
            <div className="success-row">
              <span>Equipment:</span> <strong>{equipment.title} ({equipment.year})</strong>
            </div>
            {!isContactMode && (
              <div className="success-row">
                <span>Asking Price:</span> <strong>₹{equipment.price.toLocaleString('en-IN')}</strong>
              </div>
            )}
            <div className="success-row">
              <span>Status:</span> <Badge variant="pending">Frontend Preview</Badge>
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={handleResetAndClose}>
            Back to Used Equipment Marketplace
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default UsedEquipmentInquiryModal;
