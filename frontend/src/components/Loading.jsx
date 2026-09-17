import React from 'react';
import { Loader2 } from 'lucide-react';
import './Loading.css';

/**
 * Reusable Loading Spinner / Skeleton Component for AgriMart.
 * 
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - Text to display below spinner
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Spinner size
 * @param {boolean} [props.fullPage=false] - Center in full page viewport
 * @param {string} [props.className] - Additional wrapper class
 */
export const Loading = ({
  message = 'Loading AgriMart content...',
  size = 'md',
  fullPage = false,
  className = '',
}) => {
  const iconSize = (() => {
    switch (size) {
      case 'sm': return 20;
      case 'lg': return 48;
      default: return 32;
    }
  })();

  const wrapperClass = [
    'agri-loading',
    `agri-loading--${size}`,
    fullPage ? 'agri-loading--full-page' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <Loader2 size={iconSize} className="agri-loading__spinner" aria-hidden="true" />
      {message && <p className="agri-loading__text">{message}</p>}
    </div>
  );
};

export default Loading;
