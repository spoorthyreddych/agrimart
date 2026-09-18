import React, { useState, useMemo } from 'react';
import { Phone, CheckCircle, Info, Send, ShoppingCart, MessageSquare, Package } from 'lucide-react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';
import './ProductInquiryModal.css';

/**
 * Reusable Contact Seller & Purchase Request Modal for Agricultural Products (Phase 7).
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close callback
 * @param {Object} props.product - Agri product listing object
 * @param {'contact'|'purchase'} props.mode - Modal view mode
 */
export const ProductInquiryModal = ({ isOpen, onClose, product, mode = 'purchase' }) => {
  const [requestedPacks, setRequestedPacks] = useState('1');
  const [offeredPrice, setOfferedPrice] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!product) return null;

  const isContactMode = mode === 'contact';
  const modalTitle = isContactMode
    ? `Contact Vendor: ${product.seller?.name}`
    : `Send Product Order Request`;

  const numericQty = parseFloat(requestedPacks) || 0;
  const unitPrice = parseFloat(offeredPrice) || product.price;
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
        <form onSubmit={handleSubmit} className="product-modal__form">
          {/* Summary Box */}
          <div className="product-modal__summary-box">
            <img src={product.images[0]} alt={product.title} className="product-modal__thumb" />
            <div className="product-modal__summary-text">
              <div className="product-modal__title-row">
                <h4 className="product-modal__title">{product.title}</h4>
                <Badge variant="info">Brand: {product.brand}</Badge>
              </div>
              <p className="product-modal__subinfo">
                Category: <strong>{product.category}</strong> • Location: 📍 {product.location}
              </p>
              <div className="product-modal__price-info">
                <span className="product-modal__price">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="product-modal__unit">/ {product.priceUnit}</span>
                <span className="product-modal__avail">({product.availability})</span>
              </div>
            </div>
          </div>

          {isContactMode ? (
            /* Contact Seller Mode Controls */
            <div className="product-modal__contact-body">
              <div className="product-seller-card">
                <div className="seller-icon"><Phone size={24} /></div>
                <div className="seller-details">
                  <span className="seller-role">{product.seller?.role}</span>
                  <strong className="seller-name">{product.seller?.name}</strong>
                  <span className="seller-phone">{product.seller?.phone}</span>
                </div>
              </div>

              <div className="agri-input-group">
                <label htmlFor="contact-text" className="agri-input__label">
                  <MessageSquare size={16} /> Inquiry Message to Vendor
                </label>
                <textarea
                  id="contact-text"
                  className="product-modal__textarea"
                  placeholder={`Hello ${product.seller?.name}, I am interested in purchasing ${product.title}. Do you have bulk stock available?`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          ) : (
            /* Purchase Request Mode Controls */
            <div className="product-modal__purchase-body">
              <div className="product-modal__fields-grid">
                <Input
                  label={`Quantity Required (${product.priceUnit})`}
                  type="number"
                  placeholder="e.g. 5"
                  value={requestedPacks}
                  onChange={(e) => setRequestedPacks(e.target.value)}
                  required
                  helperText={`Enter number of ${product.priceUnit} units.`}
                />

                <Input
                  label={`Target Price (₹/${product.priceUnit})`}
                  type="number"
                  placeholder={`Listed Price: ₹${product.price}`}
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  helperText="Leave blank to accept listed price."
                />
              </div>

              {numericQty > 0 && (
                <div className="product-modal__calc-box">
                  <div className="calc-row">
                    <span>Order Quantity</span>
                    <strong>{numericQty} ({product.priceUnit})</strong>
                  </div>
                  <div className="calc-row">
                    <span>Unit Price</span>
                    <span>₹{unitPrice.toLocaleString('en-IN')} / {product.priceUnit}</span>
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
                  <MessageSquare size={16} /> Delivery Address / Notes
                </label>
                <textarea
                  id="purchase-msg"
                  className="product-modal__textarea"
                  placeholder="e.g. Please confirm delivery to farm outlet near Warangal."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Demo Alert */}
          <div className="product-modal__notice">
            <Info size={18} className="notice-icon" />
            <p>
              <strong>Demo Notice:</strong> No live payment or booking is transmitted. This frontend preview calculates totals and prepares vendor inquiries.
            </p>
          </div>

          {/* Actions */}
          <div className="product-modal__actions">
            <Button variant="outline" type="button" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              icon={isContactMode ? <Send size={18} /> : <ShoppingCart size={18} />}
            >
              {isContactMode ? "Send Demo Message" : "Submit Order Request"}
            </Button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="product-modal__success-state">
          <div className="product-modal__success-icon">
            <CheckCircle size={48} />
          </div>
          <h3 className="product-modal__success-title">
            {isContactMode ? "Demo Message Sent!" : "Demo Purchase Request Submitted!"}
          </h3>
          <p className="product-modal__success-desc">
            {isContactMode
              ? `Demo message sent. Messaging will be connected to the backend later.`
              : `Demo purchase request submitted. This will be connected to the backend later.`}
          </p>

          <div className="product-modal__success-details">
            <div className="success-row">
              <span>Vendor:</span> <strong>{product.seller?.name} ({product.seller?.phone})</strong>
            </div>
            <div className="success-row">
              <span>Product:</span> <strong>{product.title}</strong>
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
            Back to Products Marketplace
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ProductInquiryModal;
