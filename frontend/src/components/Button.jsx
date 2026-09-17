import React from 'react';
import './Button.css';

/**
 * Reusable Button component adhering to the AgriMart agricultural design system.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button label / content
 * @param {'primary'|'secondary'|'outline'|'danger'|'ghost'} [props.variant='primary'] - Visual style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Size of the button
 * @param {boolean} [props.fullWidth=false] - Whether button stretches 100% width
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @param {'left'|'right'} [props.iconPosition='left'] - Icon alignment
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button HTML type
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional class names
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const buttonClass = [
    'agri-btn',
    `agri-btn--${variant}`,
    `agri-btn--${size}`,
    fullWidth ? 'agri-btn--full' : '',
    disabled ? 'agri-btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="agri-btn__icon agri-btn__icon--left">{icon}</span>
      )}
      <span className="agri-btn__content">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="agri-btn__icon agri-btn__icon--right">{icon}</span>
      )}
    </button>
  );
};

export default Button;
