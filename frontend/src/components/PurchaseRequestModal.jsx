import React, { useState } from 'react';
import { Phone, CheckCircle, Info, Send, MessageSquare, ShoppingCart } from 'lucide-react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import './PurchaseRequestModal.css';

/**
 * Reusable Purchase Inquiry / Contact Seller Modal for Buy & Sell Marketplace.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close callback
 * @param {Object} props.item - Marketplace listing object
 * @param {'inquiry'|'contact'} [props.mode='inquiry'] - Modal mode
 */
export const PurchaseRequestModal = ({ isOpen, onClose, item, mode = 'inquiry' }) => {
  const [requestedQuantity, setRequestedQuantity] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!item) return null;

  const isContactMode = mode === 'contact';
  const modalTitle = isContactMode
    ? `Contact Seller: ${item.seller?.name}`
    : `Send Purchase Request`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const formattedPrice = typeof item.price === 'number'
    ? `₹${item.price.toLocaleString('en-IN')}`
    : item.price;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={isSubmitted ? "Demo Action Submitted" : modalTitle}
      size="md"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="purchase-modal__form">
          {/* Item Summary Header */}
          <div className="purchase-modal__summary">
            <img src={item.image} alt={item.title} className="purchase-modal__thumb" />
            <div className="purchase-modal__info">
              <h4 className="purchase-modal__title">{item.title}</h4>
              <p className="purchase-modal__location">
                📍 {item.location} • Seller: <strong>{item.seller?.name}</strong>
              </p>
              <div className="purchase-modal__price-row">
                <span className="purchase-modal__price">{formattedPrice}</span>
                <span className="purchase-modal__unit">/{item.priceUnit}</span>
                {item.quantity && (
                  <span className="purchase-modal__qty">({item.quantity} Available)</span>
                )}
              </div>
            </div>
          </div>

          {!isContactMode ? (
            /* Purchase Request Mode Controls */
            <div className="purchase-modal__fields">
              <Input
                label="Requested Quantity"
                placeholder={item.quantity ? `e.g. 100 ${item.priceUnit}` : "e.g. 1 Unit"}
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                required
                helperText="Specify how much volume/units you wish to buy."
              />

              <Input
                label="Target Offer Price (₹)"
                type="number"
                placeholder={`Default: ₹${item.price}`}
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                helperText="Optional: Leave blank to accept listed price."
              />

              <div className="agri-input-group">
                <label htmlFor="buy-msg" className="agri-input__label">
                  <MessageSquare size={16} /> Note to Seller (Optional)
                </label>
                <textarea
                  id="buy-msg"
                  className="purchase-modal__textarea"
                  placeholder="e.g. I am interested in buying 5 quintals. Can you deliver near Nalgonda mandi?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ) : (
            /* Direct Contact Seller Mode Controls */
            <div className="purchase-modal__contact-box">
              <div className="seller-contact-card">
                <div className="seller-contact-icon"><Phone size={24} /></div>
                <div className="seller-contact-details">
                  <span className="seller-contact-role">Verified Seller Contact</span>
                  <strong className="seller-contact-phone">{item.seller?.phone}</strong>
                  <span className="seller-contact-note">Call or WhatsApp seller directly</span>
                </div>
              </div>

              <div className="agri-input-group">
                <label htmlFor="contact-msg" className="agri-input__label">
                  Send Direct Inquiry Message
                </label>
                <textarea
                  id="contact-msg"
                  className="purchase-modal__textarea"
                  placeholder="e.g. Hello Ramesh, I saw your crop listing on AgriMart. Is it still available?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          )}

          {/* Demo Notice Alert */}
          <div className="purchase-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              <strong>Demo Notice:</strong> No live message or payment is transmitted. This is a frontend preview illustrating buyer-seller interaction.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="purchase-modal__actions">
            <Button variant="outline" type="button" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon={isContactMode ? <Send size={18} /> : <ShoppingCart size={18} />}
            >
              {isContactMode ? "Send Demo Message" : "Submit Buy Request"}
            </Button>
          </div>
        </form>
      ) : (
        /* Confirmation State Screen */
        <div className="purchase-modal__success-state">
          <div className="purchase-modal__success-icon">
            <CheckCircle size={48} />
          </div>
          <h3 className="purchase-modal__success-title">Demo Action Received!</h3>
          <p className="purchase-modal__success-desc">
            Your demo inquiry for <strong>{item.title}</strong> has been processed in preview mode.
          </p>

          <div className="purchase-modal__success-details">
            <div className="success-row">
              <span>Target Seller:</span> <strong>{item.seller?.name} ({item.seller?.phone})</strong>
            </div>
            <div className="success-row">
              <span>Listing Price:</span> <strong>{formattedPrice} /{item.priceUnit}</strong>
            </div>
            <div className="success-row">
              <span>Status:</span> <Badge variant="pending">Frontend Preview</Badge>
            </div>
          </div>

          <div className="purchase-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              Once Phase 6 backend API integration is finished, seller {item.seller?.name} will receive real-time notifications via SMS and WhatsApp.
            </p>
          </div>

          <Button variant="primary" fullWidth onClick={handleResetAndClose}>
            Back to Marketplace
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default PurchaseRequestModal;
