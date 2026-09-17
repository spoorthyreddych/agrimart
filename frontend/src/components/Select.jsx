import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

/**
 * Reusable Accessible Select Dropdown Component for AgriMart forms.
 * 
 * @param {Object} props
 * @param {string} [props.label] - Select field label
 * @param {string|number} [props.value] - Selected value
 * @param {Function} [props.onChange] - Selection change handler
 * @param {Array<{value: string|number, label: string}>} [props.options] - List of options
 * @param {string} [props.placeholder] - Default option prompt
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper descriptive text
 * @param {boolean} [props.required=false] - Required field
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.id] - Custom ID
 * @param {string} [props.className] - Additional CSS wrapper class
 * @param {React.ReactNode} [props.children] - Child option elements if options array is omitted
 */
export const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  required = false,
  disabled = false,
  id,
  className = '',
  children,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || `agri-select-${generatedId}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const groupClass = [
    'agri-select-group',
    error ? 'agri-select-group--error' : '',
    disabled ? 'agri-select-group--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClass}>
      {label && (
        <label htmlFor={selectId} className="agri-select__label">
          {label}
          {required && <span className="agri-select__required">*</span>}
        </label>
      )}

      <div className="agri-select__wrapper">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [error ? errorId : null, helperText ? helperId : null]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className="agri-select__field"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <span className="agri-select__chevron" aria-hidden="true">
          <ChevronDown size={18} />
        </span>
      </div>

      {error && (
        <p id={errorId} className="agri-select__error" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} className="agri-select__helper">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
