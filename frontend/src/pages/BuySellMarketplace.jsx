import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, SlidersHorizontal, RotateCcw, PlusCircle, Search, Wheat, Sprout, Wrench, Grid
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  MARKETPLACE_LISTINGS_DATA,
  MARKETPLACE_CATEGORIES,
  MARKETPLACE_LOCATIONS,
  MARKETPLACE_CONDITIONS
} from '../data/marketplaceListings';
import './BuySellMarketplace.css';

export const BuySellMarketplace = () => {
  const navigate = useNavigate();

  // Active Domain Tab ('all' | 'crops' | 'products' | 'used_equipment')
  const [activeTab, setActiveTab] = useState('all');

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [maxPrice, setMaxPrice] = useState(400000);
  const [sortBy, setSortBy] = useState('recommended');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available categories based on selected tab
  const categoryOptions = useMemo(() => {
    return MARKETPLACE_CATEGORIES[activeTab] || MARKETPLACE_CATEGORIES.all;
  }, [activeTab]);

  // When tab changes, reset category filter if not applicable
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('All Categories');
  };

  // Filter and Sort Logic (Pure Frontend)
  const filteredListings = useMemo(() => {
    return MARKETPLACE_LISTINGS_DATA.filter((item) => {
      // 1. Tab Filter
      if (activeTab === 'crops' && item.type !== 'crop') return false;
      if (activeTab === 'products' && item.type !== 'product') return false;
      if (activeTab === 'used_equipment' && item.type !== 'used_equipment') return false;

      // 2. Search Query Filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.seller?.name.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }

      // 4. Location Filter
      if (selectedLocation !== 'All Locations' && item.location !== selectedLocation) {
        return false;
      }

      // 5. Condition Filter
      if (selectedCondition !== 'All Conditions' && item.condition !== selectedCondition) {
        return false;
      }

      // 6. Max Price Filter
      const numericPrice = typeof item.price === 'number' ? item.price : 1000;
      if (numericPrice > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      const priceA = typeof a.price === 'number' ? a.price : 1000;
      const priceB = typeof b.price === 'number' ? b.price : 1000;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return 0; // Default Recommended
    });
  }, [activeTab, searchQuery, selectedCategory, selectedLocation, selectedCondition, maxPrice, sortBy]);

  // Check for active filters
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedLocation !== 'All Locations' ||
    selectedCondition !== 'All Conditions' ||
    maxPrice < 400000 ||
    sortBy !== 'recommended' ||
    activeTab !== 'all';

  // Clear all filters
  const handleClearFilters = () => {
    setActiveTab('all');
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setSelectedCondition('All Conditions');
    setMaxPrice(400000);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <div className="marketplace-page">
        {/* Page Header */}
        <div className="marketplace-header">
          <div className="marketplace-header__text">
            <Badge variant="available">Direct Farmer & Vendor Marketplace</Badge>
            <h1 className="marketplace-header__title">Buy & Sell</h1>
            <p className="marketplace-header__subtext">
              Buy what you need and sell what you have, all in one place.
            </p>
          </div>

          {/* Sell Something CTA */}
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => navigate('/create-listing')}
            className="marketplace-header__sell-btn"
          >
            Sell Something
          </Button>
        </div>

        {/* Global Search Bar */}
        <div className="marketplace-search-wrapper">
          <SearchBar
            placeholder="Search crops, seeds, fertilizers, tractors..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {}}
          />
        </div>

        {/* Domain Category Tabs */}
        <div className="marketplace-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'all'}
            className={`marketplace-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            <Grid size={16} /> All Listings
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'crops'}
            className={`marketplace-tab ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => handleTabChange('crops')}
          >
            <Wheat size={16} /> Crops
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'products'}
            className={`marketplace-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => handleTabChange('products')}
          >
            <Sprout size={16} /> Farm Supplies
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'used_equipment'}
            className={`marketplace-tab ${activeTab === 'used_equipment' ? 'active' : ''}`}
            onClick={() => handleTabChange('used_equipment')}
          >
            <Wrench size={16} /> Used Equipment
          </button>
        </div>

        {/* Mobile Toolbar */}
        <div className="marketplace-toolbar-mobile">
          <Button
            variant="outline"
            size="md"
            icon={<SlidersHorizontal size={18} />}
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="marketplace-toolbar__filter-btn"
          >
            Filters {hasActiveFilters && <span className="marketplace-filter-dot" />}
          </Button>

          <select
            className="marketplace-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort marketplace listings"
          >
            <option value="recommended">Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="marketplace-layout">
          {/* Filter Sidebar / Mobile Collapsible Drawer */}
          <aside
            className={`marketplace-sidebar ${mobileFilterOpen ? 'marketplace-sidebar--open' : ''}`}
          >
            <div className="marketplace-sidebar__header">
              <h3 className="marketplace-sidebar__title">
                <Filter size={18} /> Filter Listings
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="marketplace-sidebar__clear-btn"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Subcategory Filter */}
            <div className="marketplace-filter-group">
              <label htmlFor="cat-filter" className="marketplace-filter-label">Category</label>
              <select
                id="cat-filter"
                className="marketplace-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="marketplace-filter-group">
              <label htmlFor="loc-filter" className="marketplace-filter-label">Location / District</label>
              <select
                id="loc-filter"
                className="marketplace-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {MARKETPLACE_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="marketplace-filter-group">
              <label htmlFor="cond-filter" className="marketplace-filter-label">Condition</label>
              <select
                id="cond-filter"
                className="marketplace-filter-select"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                {MARKETPLACE_CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="marketplace-filter-group">
              <div className="marketplace-filter-label-row">
                <span className="marketplace-filter-label">Max Price</span>
                <span className="marketplace-price-value">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="400000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="marketplace-range-slider"
              />
              <div className="marketplace-range-labels">
                <span>₹10</span>
                <span>₹4,00,000</span>
              </div>
            </div>

            {mobileFilterOpen && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
                className="marketplace-sidebar__apply-btn"
              >
                Apply Filters ({filteredListings.length} Results)
              </Button>
            )}
          </aside>

          {/* Main Listings Content Area */}
          <main className="marketplace-content">
            {/* Desktop Top Toolbar */}
            <div className="marketplace-toolbar-desktop">
              <span className="marketplace-results-count">
                Showing <strong>{filteredListings.length}</strong> marketplace listings
              </span>

              <div className="marketplace-desktop-sort">
                <label htmlFor="desk-sort">Sort by:</label>
                <select
                  id="desk-sort"
                  className="marketplace-sort-select"
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

            {/* Listing Cards Grid or Empty State */}
            {filteredListings.length > 0 ? (
              <div className="marketplace-grid">
                {filteredListings.map((item) => {
                  const formattedUnit = item.quantity
                    ? `${item.priceUnit} (${item.quantity})`
                    : item.priceUnit;

                  return (
                    <ListingCard
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      category={item.category}
                      location={item.location}
                      price={item.price}
                      priceUnit={formattedUnit}
                      condition={item.condition}
                      availability="available"
                      type={item.type}
                      ctaText="View Details"
                      onCtaClick={() => navigate(`/product/${item.id}`)}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyState
                title="No listings found"
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

export default BuySellMarketplace;
