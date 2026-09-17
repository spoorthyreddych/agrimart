import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';
import './ErrorState.css';

/**
 * Reusable ErrorState Component for handling error screens across AgriMart.
 * 
 * @param {Object} props
 * @param {string} [props.title='Something went wrong'] - Error headline
 * @param {string} [props.message='Unable to connect or load requested information. Please try again.'] - Detail message
 * @param {Function} [props.onRetry] - Retry callback function
 * @param {string} [props.retryLabel='Try Again'] - Retry button label
 * @param {string} [props.className] - Extra class name
 */
export const ErrorState = ({
  title = 'Something went wrong',
  message = 'Unable to connect or load requested information. Please check your internet connection.',
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div className={`agri-error-state ${className}`.trim()} role="alert">
      <div className="agri-error-state__icon-box">
        <AlertTriangle size={36} />
      </div>
      <h3 className="agri-error-state__title">{title}</h3>
      <p className="agri-error-state__message">{message}</p>
      {onRetry && (
        <Button
          variant="danger"
          size="md"
          icon={<RefreshCw size={18} />}
          onClick={onRetry}
          className="agri-error-state__btn"
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
