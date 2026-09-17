import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import './Modal.css';

/**
 * Reusable Accessible Modal Component for AgriMart confirmations & detail views.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Close handler callback
 * @param {string} props.title - Modal header title
 * @param {React.ReactNode} props.children - Modal body content
 * @param {React.ReactNode} [props.footer] - Custom footer actions
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Modal width size
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const generatedId = useId();
  const titleId = `agri-modal-title-${generatedId}`;

  // Handle Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="agri-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className={`agri-modal agri-modal--${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="agri-modal__header">
          <h2 id={titleId} className="agri-modal__title">
            {title}
          </h2>
          <button
            type="button"
            className="agri-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="agri-modal__body">{children}</div>

        {/* Modal Footer */}
        {footer && <div className="agri-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
