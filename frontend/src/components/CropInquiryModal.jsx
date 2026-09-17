import React, { useState, useMemo } from 'react';
import { Phone, CheckCircle, Info, Send, ShoppingCart, MessageSquare, Calculator } from 'lucide-react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import './CropInquiryModal.css';

/**
 * Reusable Contact Seller & Purchase Request Modal for Crop Marketplace (Phase 6).
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close callback
 * @param {Object} props.crop - Crop listing object
 * @param {'contact'|'purchase'} props.mode - Modal view mode
 */
export const CropInquiryModal = ({ isOpen, onClose, crop, mode = 'purchase' }) => {
  const [quantityReq, setQuantityReq] = useState('');
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!crop) return null;

  const isContactMode = mode === 'contact';
  const modalTitle = isContactMode
    ? `Contact Seller: ${crop.seller?.name}`
    : `Send Crop Purchase Request`;

  // Calculated estimated total for purchase mode
  const numericQty = parseFloat(quantityReq) || 0;
  const unitPrice = parseFloat(offeredPrice) || crop.price;
  const estimatedTotal = useMemo(() => {
    return numericQty * unitPrice;
  }, [numericQty, unitPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? "Demo Action Completed" : modalTitle}
      size="md"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="crop-modal__form">
          {/* Crop Summary */}
          <div className="crop-modal__summary-box">
            <img src={crop.images[0]} alt={crop.title} className="crop-modal__thumb" />
            <div className="crop-modal__summary-text">
              <div className="crop-modal__title-row">
                <h4 className="crop-modal__title">{crop.title}</h4>
                <Badge variant="success">Grade {crop.grade}</Badge>
              </div>
              <p className="crop-modal__subinfo">
                Variety: <strong>{crop.variety}</strong> • Location: 📍 {crop.location}
              </p>
              <div className="crop-modal__price-info">
                <span className="crop-modal__price">₹{crop.price.toLocaleString('en-IN')}</span>
                <span className="crop-modal__unit">/{crop.priceUnit}</span>
                <span className="crop-modal__avail">({crop.quantityDisplay} Available)</span>
              </div>
            </div>
          </div>

          {isContactMode ? (
            /* Contact Seller Mode Controls */
            <div className="crop-modal__contact-body">
              <div className="crop-seller-card">
                <div className="seller-icon"><Phone size={24} /></div>
                <div className="seller-details">
                  <span className="seller-role">Crop Producer / Seller</span>
                  <strong className="seller-name">{crop.seller?.name}</strong>
                  <span className="seller-phone">{crop.seller?.phone}</span>
                </div>
              </div>

              <div className="agri-input-group">
                <label htmlFor="contact-text" className="agri-input__label">
                  <MessageSquare size={16} /> Direct Message to Farmer
                </label>
                <textarea
                  id="contact-text"
                  className="crop-modal__textarea"
                  placeholder={`Hello ${crop.seller?.name}, I am interested in buying your ${crop.variety} ${crop.name} harvest. Is it available for inspection?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          ) : (
            /* Purchase Request Mode Controls */
            <div className="crop-modal__purchase-body">
              <div className="crop-modal__fields-grid">
                <Input
                  label={`Quantity Required (${crop.priceUnit}s)`}
                  type="number"
                  placeholder={`Available: ${crop.quantity}`}
                  value={quantityReq}
                  onChange={(e) => setQuantityReq(e.target.value)}
                  required
                  helperText={`Specify number of ${crop.priceUnit}s you wish to purchase.`}
                />

                <Input
                  label={`Offered Price (₹/${crop.priceUnit})`}
                  type="number"
                  placeholder={`Listed Price: ₹${crop.price}`}
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  helperText="Leave blank to accept listed price."
                />
              </div>

              {numericQty > 0 && (
                <div className="crop-modal__calc-box">
                  <div className="calc-row">
                    <span>Requested Quantity</span>
                    <strong>{numericQty} {crop.priceUnit}s</strong>
                  </div>
                  <div className="calc-row">
                    <span>Offer Price</span>
                    <span>₹{unitPrice.toLocaleString('en-IN')} / {crop.priceUnit}</span>
                  </div>
                  <div className="calc-divider" />
                  <div className="calc-row calc-row--total">
                    <div>
                      <span>Estimated Total</span>
                      <span className="demo-tag"> (Demo Preview)</span>
                    </div>
                    <span className="total-amount">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <div className="agri-input-group">
                <label htmlFor="purchase-msg" className="agri-input__label">
                  <MessageSquare size={16} /> Note to Farmer (Optional)
                </label>
                <textarea
                  id="purchase-msg"
                  className="crop-modal__textarea"
                  placeholder="e.g. Need delivery to Nalgonda mandi by next Tuesday."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Demo Alert */}
          <div className="crop-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              <strong>Demo Notice:</strong> No live booking or payment takes place. This frontend preview calculates totals and prepares trade inquiry messages.
            </p>
          </div>

          {/* Actions */}
          <div className="crop-modal__actions">
            <Button variant="outline" type="button" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon={isContactMode ? <Send size={18} /> : <ShoppingCart size={18} />}
            >
              {isContactMode ? "Send Demo Message" : "Submit Purchase Request"}
            </Button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="crop-modal__success-state">
          <div className="crop-modal__success-icon">
            <CheckCircle size={48} />
          </div>
          <h3 className="crop-modal__success-title">
            {isContactMode ? "Demo Message Sent!" : "Demo Purchase Request Submitted!"}
          </h3>
          <p className="crop-modal__success-desc">
            {isContactMode
              ? `Demo message sent. Messaging will be connected to the backend later.`
              : `Demo purchase request submitted. This will be connected to the backend later.`}
          </p>

          <div className="crop-modal__success-details">
            <div className="success-row">
              <span>Farmer:</span> <strong>{crop.seller?.name} ({crop.seller?.phone})</strong>
            </div>
            <div className="success-row">
              <span>Crop:</span> <strong>{crop.title} (Grade {crop.grade})</strong>
            </div>
            {!isContactMode && numericQty > 0 && (
              <div className="success-row">
                <span>Estimated Price:</span> <strong>₹{estimatedTotal.toLocaleString('en-IN')}</strong>
              </div>
            )}
            <div className="success-row">
              <span>Status:</span> <Badge variant="pending">Frontend Preview</Badge>
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={handleResetAndClose}>
            Back to Crop Marketplace
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default CropInquiryModal;
