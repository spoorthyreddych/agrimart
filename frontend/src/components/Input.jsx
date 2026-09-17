import React, { useId } from 'react';
import './Input.css';

/**
 * Reusable Accessible Input Component for AgriMart forms.
 * 
 * @param {Object} props
 * @param {string} [props.label] - Input label
 * @param {string} [props.type='text'] - HTML input type
 * @param {string} [props.value] - Controlled input value
 * @param {Function} [props.onChange] - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.error] - Error message string
 * @param {string} [props.helperText] - Helper descriptive text
 * @param {React.ReactNode} [props.leadingIcon] - Icon on left side
 * @param {React.ReactNode} [props.trailingIcon] - Icon on right side
 * @param {boolean} [props.required=false] - Required field indicator
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.id] - Custom ID (generated automatically if omitted)
 * @param {string} [props.className] - Additional wrapper class
 */
export const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  leadingIcon,
  trailingIcon,
  required = false,
  disabled = false,
  id,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || `agri-input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const containerClass = [
    'agri-input-group',
    error ? 'agri-input-group--error' : '',
    disabled ? 'agri-input-group--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass}>
      {label && (
        <label htmlFor={inputId} className="agri-input__label">
          {label}
          {required && <span className="agri-input__required">*</span>}
        </label>
      )}

      <div className="agri-input__wrapper">
        {leadingIcon && (
          <span className="agri-input__icon agri-input__icon--leading">
            {leadingIcon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={`agri-input__field ${leadingIcon ? 'has-leading' : ''} ${
            trailingIcon ? 'has-trailing' : ''
          }`}
          {...props}
        />

        {trailingIcon && (
          <span className="agri-input__icon agri-input__icon--trailing">
            {trailingIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} className="agri-input__error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="agri-input__helper">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
