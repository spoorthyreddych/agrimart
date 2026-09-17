import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, RotateCcw, Search, ChevronDown, Check } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import Select from '../components/Select';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import { RENTAL_EQUIPMENT_DATA, RENTAL_CATEGORIES, RENTAL_LOCATIONS } from '../data/rentalEquipment';
import './RentListings.css';

export const RentListings = () => {
  const navigate = useNavigate();

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sortBy, setSortBy] = useState('recommended');

  // Mobile Filter Drawer Visibility Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and Sort Logic (Pure Frontend)
  const filteredEquipment = useMemo(() => {
    return RENTAL_EQUIPMENT_DATA.filter((item) => {
      // 1. Search Query Filter (Title, Category, Location, Owner)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.ownerName.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'All Locations' && item.location !== selectedLocation) {
        return false;
      }

      // 4. Availability Filter
      if (selectedAvailability !== 'all' && item.availability !== selectedAvailability) {
        return false;
      }

      // 5. Price Filter (Daily Price <= maxPrice)
      if (item.pricePerDay > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.pricePerDay - b.pricePerDay;
      }
      if (sortBy === 'price-desc') {
        return b.pricePerDay - a.pricePerDay;
      }
      return 0; // Default Recommended (Original dataset order)
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedAvailability, maxPrice, sortBy]);

  // Check if any non-default filters are active
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedAvailability !== 'all' ||
    maxPrice < 4000 ||
    sortBy !== 'recommended';

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedAvailability('all');
    setMaxPrice(4000);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <div className="rent-page">
        {/* Page Header */}
        <div className="rent-header">
          <Badge variant="info">Equipment Rental Marketplace</Badge>
          <h1 className="rent-header__title">Rent Agricultural Equipment</h1>
          <p className="rent-header__subtext">
            Find tractors, rotavators, harvesters and other farming equipment available near you.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="rent-search-wrapper">
          <SearchBar
            placeholder="Search tractors, rotavators, harvesters..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {}}
          />
        </div>

        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="rent-toolbar-mobile">
          <Button
            variant="outline"
            size="md"
            icon={<SlidersHorizontal size={18} />}
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="rent-toolbar__filter-btn"
          >
            Filters {hasActiveFilters && <span className="rent-filter-dot" />}
          </Button>

          <div className="rent-toolbar__sort">
            <label htmlFor="mobile-sort" className="sr-only">Sort By</label>
            <select
              id="mobile-sort"
              className="rent-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Filters + Listings Grid */}
        <div className="rent-layout">
          {/* Desktop Filter Sidebar / Mobile Collapsible Drawer */}
          <aside
            className={`rent-sidebar ${mobileFilterOpen ? 'rent-sidebar--open' : ''}`}
          >
            <div className="rent-sidebar__header">
              <h3 className="rent-sidebar__title">
                <Filter size={18} /> Filter Equipment
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="rent-sidebar__clear-btn"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={14} /> Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="rent-filter-group">
              <label htmlFor="category-select" className="rent-filter-label">Category</label>
              <select
                id="category-select"
                className="rent-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {RENTAL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="rent-filter-group">
              <label htmlFor="location-select" className="rent-filter-label">Location / District</label>
              <select
                id="location-select"
                className="rent-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {RENTAL_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="rent-filter-group">
              <span className="rent-filter-label">Availability</span>
              <div className="rent-radio-group">
                <label className="rent-radio-label">
                  <input
                    type="radio"
                    name="availability"
                    value="all"
                    checked={selectedAvailability === 'all'}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  />
                  <span>All Items</span>
                </label>
                <label className="rent-radio-label">
                  <input
                    type="radio"
                    name="availability"
                    value="available"
                    checked={selectedAvailability === 'available'}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  />
                  <span>Available Now</span>
                </label>
                <label className="rent-radio-label">
                  <input
                    type="radio"
                    name="availability"
                    value="rented"
                    checked={selectedAvailability === 'rented'}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                  />
                  <span>Rented Out</span>
                </label>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="rent-filter-group">
              <div className="rent-filter-label-row">
                <span className="rent-filter-label">Max Daily Price</span>
                <span className="rent-price-value">₹{maxPrice.toLocaleString('en-IN')}/day</span>
              </div>
              <input
                type="range"
                min="300"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="rent-range-slider"
              />
              <div className="rent-range-labels">
                <span>₹300</span>
                <span>₹4,000</span>
              </div>
            </div>

            {mobileFilterOpen && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
                className="rent-sidebar__apply-btn"
              >
                Apply Filters ({filteredEquipment.length} Results)
              </Button>
            )}
          </aside>

          {/* Main Listings Grid Area */}
          <main className="rent-content">
            {/* Top Toolbar (Desktop Only) */}
            <div className="rent-toolbar-desktop">
              <span className="rent-results-count">
                Showing <strong>{filteredEquipment.length}</strong> equipment rentals
              </span>

              <div className="rent-desktop-sort">
                <label htmlFor="desktop-sort">Sort by:</label>
                <select
                  id="desktop-sort"
                  className="rent-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Listings Grid or Empty State */}
            {filteredEquipment.length > 0 ? (
              <div className="rent-grid">
                {filteredEquipment.map((item) => {
                  const priceUnitLabel = item.pricePerHour
                    ? `day (₹${item.pricePerHour}/hr)`
                    : 'day';

                  return (
                    <ListingCard
                      key={item.id}
                      title={item.title}
                      image={item.images[0]}
                      category={item.category}
                      location={item.location}
                      price={item.pricePerDay}
                      priceUnit={priceUnitLabel}
                      condition={item.condition}
                      availability={item.availability}
                      type="rental"
                      ctaText="View Details"
                      onCtaClick={() => navigate(`/rent/${item.id}`)}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No equipment found"
                description="Try changing your search terms or resetting your category/location filters."
                actionLabel="Clear Filters"
                onAction={handleClearFilters}
              />
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default RentListings;
