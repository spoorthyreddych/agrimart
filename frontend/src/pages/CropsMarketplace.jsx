import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, SlidersHorizontal, RotateCcw, PlusCircle, Wheat, Search, MapPin, Tag
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  CROP_MARKETPLACE_DATA,
  CROP_TYPES,
  CROP_LOCATIONS,
  CROP_GRADES
} from '../data/cropMarketplaceData';
import './CropsMarketplace.css';

export const CropsMarketplace = () => {
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropType, setSelectedCropType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minQuantity, setMinQuantity] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and Sort Logic (Pure Frontend)
  const filteredCrops = useMemo(() => {
    return CROP_MARKETPLACE_DATA.filter((item) => {
      // 1. Search Query Filter (Crop Name, Variety, Location, Seller Name)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.variety.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.seller?.name.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Crop Type / Category Filter
      if (selectedCropType !== 'All' && item.category !== selectedCropType && item.name !== selectedCropType) {
        return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'All Locations' && !item.location.includes(selectedLocation)) {
        return false;
      }

      // 4. Grade Filter
      if (selectedGrade !== 'All' && item.grade !== selectedGrade) {
        return false;
      }

      // 5. Price Range Filter (price <= maxPrice)
      if (item.price > maxPrice) {
        return false;
      }

      // 6. Quantity Filter (available quantity >= minQuantity)
      if (item.quantity < minQuantity) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return 0; // Default Recommended
    });
  }, [searchQuery, selectedCropType, selectedLocation, selectedGrade, maxPrice, minQuantity, sortBy]);

  // Check for active filters
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCropType !== 'All' ||
    selectedLocation !== 'All Locations' ||
    selectedGrade !== 'All' ||
    maxPrice < 15000 ||
    minQuantity > 0 ||
    sortBy !== 'recommended';

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCropType('All');
    setSelectedLocation('All Locations');
    setSelectedGrade('All');
    setMaxPrice(15000);
    setMinQuantity(0);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <div className="crops-page">
        {/* Page Header */}
        <div className="crops-header">
          <div className="crops-header__text">
            <Badge variant="available" icon={<Wheat size={14} />}>
              Direct Farm Produce Trading
            </Badge>
            <h1 className="crops-header__title">Crop Marketplace</h1>
            <p className="crops-header__subtext">
              Buy and sell fresh crops directly with farmers near you.
            </p>
          </div>

          {/* Sell Your Crop CTA */}
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => navigate('/create-listing')}
            className="crops-header__sell-btn"
          >
            Sell Your Crop
          </Button>
        </div>

        {/* Search Bar */}
        <div className="crops-search-wrapper">
          <SearchBar
            placeholder="Search paddy, cotton, maize, chillies..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {}}
          />
        </div>

        {/* Quick Crop Type Filter Bar */}
        <div className="crops-type-pills" role="tablist">
          {CROP_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`crop-pill ${selectedCropType === type ? 'active' : ''}`}
              onClick={() => setSelectedCropType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Mobile Toolbar */}
        <div className="crops-toolbar-mobile">
          <Button
            variant="outline"
            size="md"
            icon={<SlidersHorizontal size={18} />}
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="crops-toolbar__filter-btn"
          >
            Filters {hasActiveFilters && <span className="crops-filter-dot" />}
          </Button>

          <select
            className="crops-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort crop listings"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Layout Shell: Sidebar + Content */}
        <div className="crops-layout">
          {/* Sidebar Filters */}
          <aside
            className={`crops-sidebar ${mobileFilterOpen ? 'crops-sidebar--open' : ''}`}
          >
            <div className="crops-sidebar__header">
              <h3 className="crops-sidebar__title">
                <Filter size={18} /> Filter Crops
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="crops-sidebar__clear-btn"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Crop Type Filter */}
            <div className="crops-filter-group">
              <label htmlFor="crop-type-select" className="crops-filter-label">Crop Category</label>
              <select
                id="crop-type-select"
                className="crops-filter-select"
                value={selectedCropType}
                onChange={(e) => setSelectedCropType(e.target.value)}
              >
                {CROP_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="crops-filter-group">
              <label htmlFor="crop-loc-select" className="crops-filter-label">Location / District</label>
              <select
                id="crop-loc-select"
                className="crops-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {CROP_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div className="crops-filter-group">
              <label htmlFor="crop-grade-select" className="crops-filter-label">Quality Grade</label>
              <select
                id="crop-grade-select"
                className="crops-filter-select"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                {CROP_GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g === 'All' ? 'All Quality Grades' : `Grade ${g}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="crops-filter-group">
              <div className="crops-filter-label-row">
                <span className="crops-filter-label">Max Price (₹/Unit)</span>
                <span className="crops-price-value">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="15000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="crops-range-slider"
              />
              <div className="crops-range-labels">
                <span>₹20</span>
                <span>₹15,000</span>
              </div>
            </div>

            {/* Minimum Quantity Filter */}
            <div className="crops-filter-group">
              <div className="crops-filter-label-row">
                <span className="crops-filter-label">Min Quantity</span>
                <span className="crops-price-value">{minQuantity > 0 ? `${minQuantity} units` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minQuantity}
                onChange={(e) => setMinQuantity(Number(e.target.value))}
                className="crops-range-slider"
              />
            </div>

            {mobileFilterOpen && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
                className="crops-sidebar__apply-btn"
              >
                Apply Filters ({filteredCrops.length} Crops)
              </Button>
            )}
          </aside>

          {/* Listings Content */}
          <main className="crops-content">
            {/* Desktop Top Toolbar */}
            <div className="crops-toolbar-desktop">
              <span className="crops-results-count">
                Showing <strong>{filteredCrops.length}</strong> crop listings
              </span>

              <div className="crops-desktop-sort">
                <label htmlFor="desk-sort-crops">Sort by:</label>
                <select
                  id="desk-sort-crops"
                  className="crops-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Crop Cards Grid */}
            {filteredCrops.length > 0 ? (
              <div className="crops-grid">
                {filteredCrops.map((item) => (
                  <ListingCard
                    key={item.id}
                    title={`${item.name} (${item.variety})`}
                    image={item.images[0]}
                    category={`Grade ${item.grade} • ${item.category}`}
                    location={item.location}
                    price={item.price}
                    priceUnit={`${item.priceUnit} (${item.quantityDisplay})`}
                    condition={`Harvest: ${item.harvestDate}`}
                    availability="available"
                    type="crop"
                    ctaText="View Details"
                    onCtaClick={() => navigate(`/crops/${item.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No crops found"
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

export default CropsMarketplace;
