import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, SlidersHorizontal, RotateCcw, PlusCircle, Wrench, Search, MapPin
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  USED_EQUIPMENT_DATA,
  USED_EQUIPMENT_CATEGORIES,
  USED_EQUIPMENT_LOCATIONS,
  USED_EQUIPMENT_CONDITIONS,
  USED_EQUIPMENT_AVAILABILITY
} from '../data/usedEquipmentData';
import './UsedEquipmentMarketplace.css';

export const UsedEquipmentMarketplace = () => {
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [minYear, setMinYear] = useState(2018);
  const [maxPrice, setMaxPrice] = useState(700000);
  const [sortBy, setSortBy] = useState('recommended');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pure Frontend Filtering & Sorting Logic
  const filteredEquipment = useMemo(() => {
    return USED_EQUIPMENT_DATA.filter((item) => {
      // 1. Search Query Filter (Name, Title, Type, Brand, Model, Location, Seller)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.seller?.name.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && item.type !== selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'All Locations' && !item.location.includes(selectedLocation)) {
        return false;
      }

      // 4. Condition Filter
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) {
        return false;
      }

      // 5. Availability Filter
      if (selectedAvailability !== 'All' && item.availability !== selectedAvailability) {
        return false;
      }

      // 6. Year Filter
      if (item.year < minYear) {
        return false;
      }

      // 7. Max Price Filter
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return 0; // Default Recommended
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedCondition, selectedAvailability, minYear, maxPrice, sortBy]);

  // Check for active filters
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedLocation !== 'All Locations' ||
    selectedCondition !== 'All' ||
    selectedAvailability !== 'All' ||
    minYear > 2018 ||
    maxPrice < 700000 ||
    sortBy !== 'recommended';

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
    setSelectedCondition('All');
    setSelectedAvailability('All');
    setMinYear(2018);
    setMaxPrice(700000);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <div className="used-page">
        {/* Page Header */}
        <div className="used-header">
          <div className="used-header__text">
            <Badge variant="info" icon={<Wrench size={14} />}>
              Pre-Owned Farm Machinery
            </Badge>
            <h1 className="used-header__title">Used Agricultural Equipment</h1>
            <p className="used-header__subtext">
              Find reliable used farm equipment from sellers near you.
            </p>
          </div>

          {/* Sell Used Equipment CTA */}
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => navigate('/create-listing')}
            className="used-header__sell-btn"
          >
            Sell Used Equipment
          </Button>
        </div>

        {/* Search Bar */}
        <div className="used-search-wrapper">
          <SearchBar
            placeholder="Search tractors, rotavators, pumps..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {}}
          />
        </div>

        {/* Quick Category Pills */}
        <div className="used-pills-bar" role="tablist">
          {USED_EQUIPMENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`used-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Toolbar */}
        <div className="used-toolbar-mobile">
          <Button
            variant="outline"
            size="md"
            icon={<SlidersHorizontal size={18} />}
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="used-toolbar__filter-btn"
          >
            Filters {hasActiveFilters && <span className="used-filter-dot" />}
          </Button>

          <select
            className="used-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort used equipment"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="year-desc">Year: Newest First</option>
            <option value="newest">Newest Listed</option>
          </select>
        </div>

        {/* Layout Shell */}
        <div className="used-layout">
          {/* Sidebar Filters */}
          <aside
            className={`used-sidebar ${mobileFilterOpen ? 'used-sidebar--open' : ''}`}
          >
            <div className="used-sidebar__header">
              <h3 className="used-sidebar__title">
                <Filter size={18} /> Filter Machinery
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="used-sidebar__clear-btn"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="used-filter-group">
              <label htmlFor="used-cat-select" className="used-filter-label">Equipment Category</label>
              <select
                id="used-cat-select"
                className="used-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {USED_EQUIPMENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="used-filter-group">
              <label htmlFor="used-loc-select" className="used-filter-label">Location / District</label>
              <select
                id="used-loc-select"
                className="used-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {USED_EQUIPMENT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="used-filter-group">
              <label htmlFor="used-cond-select" className="used-filter-label">Condition</label>
              <select
                id="used-cond-select"
                className="used-filter-select"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                {USED_EQUIPMENT_CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="used-filter-group">
              <label htmlFor="used-avail-select" className="used-filter-label">Availability</label>
              <select
                id="used-avail-select"
                className="used-filter-select"
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
              >
                {USED_EQUIPMENT_AVAILABILITY.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Manufacturing Year Slider */}
            <div className="used-filter-group">
              <div className="used-filter-label-row">
                <span className="used-filter-label">Min Model Year</span>
                <span className="used-price-value">{minYear}</span>
              </div>
              <input
                type="range"
                min="2018"
                max="2024"
                step="1"
                value={minYear}
                onChange={(e) => setMinYear(Number(e.target.value))}
                className="used-range-slider"
              />
              <div className="used-range-labels">
                <span>2018</span>
                <span>2024</span>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="used-filter-group">
              <div className="used-filter-label-row">
                <span className="used-filter-label">Max Price (₹)</span>
                <span className="used-price-value">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="700000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="used-range-slider"
              />
              <div className="used-range-labels">
                <span>₹10,000</span>
                <span>₹7,00,000</span>
              </div>
            </div>

            {mobileFilterOpen && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
                className="used-sidebar__apply-btn"
              >
                Apply Filters ({filteredEquipment.length} Items)
              </Button>
            )}
          </aside>

          {/* Main Grid */}
          <main className="used-content">
            {/* Desktop Toolbar */}
            <div className="used-toolbar-desktop">
              <span className="used-results-count">
                Showing <strong>{filteredEquipment.length}</strong> used equipment listings
              </span>

              <div className="used-desktop-sort">
                <label htmlFor="desk-sort-used">Sort by:</label>
                <select
                  id="desk-sort-used"
                  className="used-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="newest">Newest Listed</option>
                </select>
              </div>
            </div>

            {/* Grid or Empty State */}
            {filteredEquipment.length > 0 ? (
              <div className="used-grid">
                {filteredEquipment.map((item) => (
                  <ListingCard
                    key={item.id}
                    title={item.title}
                    image={item.images[0]}
                    category={`${item.type} • ${item.year} Model`}
                    location={item.location}
                    price={item.price}
                    priceUnit={`total (${item.hoursDisplay})`}
                    condition={`${item.condition} Condition`}
                    availability={item.availability === 'Sold' ? 'sold' : 'available'}
                    type="used_equipment"
                    ctaText="View Details"
                    onCtaClick={() => navigate(`/used-equipment/${item.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No used equipment found"
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

export default UsedEquipmentMarketplace;
