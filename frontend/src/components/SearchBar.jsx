import React, { useState } from 'react';
import { Search, MapPin, X, Filter } from 'lucide-react';
import Button from './Button';
import './SearchBar.css';

/**
 * Reusable SearchBar Component tailored for farmers searching equipment, crops, and products.
 * 
 * @param {Object} props
 * @param {string} [props.placeholder='Search tractors, harvesters, crops...'] - Input placeholder
 * @param {string} [props.value=''] - Current search term
 * @param {Function} [props.onChange] - Keyword change handler
 * @param {Function} [props.onSearch] - Search submit handler
 * @param {string} [props.locationValue=''] - Location filter value
 * @param {Function} [props.onLocationChange] - Location change handler
 * @param {Array<{value: string, label: string}>} [props.categories=[]] - Category filter options
 * @param {string} [props.categoryValue=''] - Selected category
 * @param {Function} [props.onCategoryChange] - Category change handler
 * @param {string} [props.className] - Extra container styling
 */
export const SearchBar = ({
  placeholder = 'Search tractors, harvesters, seeds, crops...',
  value = '',
  onChange,
  onSearch,
  locationValue = '',
  onLocationChange,
  categories = [],
  categoryValue = '',
  onCategoryChange,
  className = '',
}) => {
  const [internalQuery, setInternalQuery] = useState(value);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setInternalQuery(val);
    if (onChange) onChange(val);
  };

  const handleClear = () => {
    setInternalQuery('');
    if (onChange) onChange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        query: internalQuery,
        location: locationValue,
        category: categoryValue,
      });
    }
  };

  return (
    <form className={`agri-searchbar ${className}`.trim()} onSubmit={handleSubmit} role="search">
      <div className="agri-searchbar__field-group">
        {/* Main Search Input */}
        <div className="agri-searchbar__input-wrapper">
          <Search size={20} className="agri-searchbar__icon" aria-hidden="true" />
          <input
            type="text"
            className="agri-searchbar__input"
            placeholder={placeholder}
            value={internalQuery}
            onChange={handleQueryChange}
            aria-label="Search AgriMart marketplace"
          />
          {internalQuery && (
            <button
              type="button"
              className="agri-searchbar__clear"
              onClick={handleClear}
              aria-label="Clear search input"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Dropdown (Optional) */}
        {categories.length > 0 && (
          <div className="agri-searchbar__filter-wrapper">
            <Filter size={18} className="agri-searchbar__icon" aria-hidden="true" />
            <select
              className="agri-searchbar__select"
              value={categoryValue}
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Location Filter Input / Pill */}
        {onLocationChange !== undefined && (
          <div className="agri-searchbar__filter-wrapper">
            <MapPin size={18} className="agri-searchbar__icon" aria-hidden="true" />
            <input
              type="text"
              className="agri-searchbar__input agri-searchbar__input--location"
              placeholder="District / State"
              value={locationValue}
              onChange={(e) => onLocationChange(e.target.value)}
              aria-label="Location filter"
            />
          </div>
        )}
      </div>

      {/* Search CTA */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        icon={<Search size={18} />}
        className="agri-searchbar__submit"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
