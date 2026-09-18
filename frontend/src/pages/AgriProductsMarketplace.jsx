import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Filter, SlidersHorizontal, RotateCcw, PlusCircle, Sprout, Search, Tag, Package
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import {
  AGRI_PRODUCTS_DATA,
  PRODUCT_CATEGORIES,
  PRODUCT_LOCATIONS,
  PRODUCT_CONDITIONS,
  PRODUCT_AVAILABILITY
} from '../data/agriProductsData';
import './AgriProductsMarketplace.css';

export const AgriProductsMarketplace = () => {
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState('recommended');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pure Frontend Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return AGRI_PRODUCTS_DATA.filter((item) => {
      // 1. Search Query Filter (Name, Category, Brand, Location, Seller)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          item.seller?.name.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
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

      // 6. Max Price Filter
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return 0; // Default Recommended
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedCondition, selectedAvailability, maxPrice, sortBy]);

  // Active filter status check
  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedLocation !== 'All Locations' ||
    selectedCondition !== 'All' ||
    selectedAvailability !== 'All' ||
    maxPrice < 3000 ||
    sortBy !== 'recommended';

  // Reset filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All Locations');
    setSelectedCondition('All');
    setSelectedAvailability('All');
    setMaxPrice(3000);
    setSortBy('recommended');
  };

  return (
    <MainLayout>
      <div className="agri-products-page">
        {/* Page Header */}
        <div className="agri-products-header">
          <div className="agri-products-header__text">
            <Badge variant="info" icon={<Sprout size={14} />}>
              Farm Inputs & Supplies
            </Badge>
            <h1 className="agri-products-header__title">Agricultural Products</h1>
            <p className="agri-products-header__subtext">
              Find seeds, fertilizers, tools and other products you need for farming.
            </p>
          </div>

          {/* Sell a Product CTA */}
          <Button
            variant="primary"
            size="md"
            icon={<PlusCircle size={18} />}
            onClick={() => navigate('/create-listing')}
            className="agri-products-header__sell-btn"
          >
            Sell a Product
          </Button>
        </div>

        {/* Search Bar */}
        <div className="agri-products-search-wrapper">
          <SearchBar
            placeholder="Search seeds, fertilizers, tools..."
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => {}}
          />
        </div>

        {/* Category Pills Bar */}
        <div className="agri-products-pills" role="tablist">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`product-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Toolbar */}
        <div className="agri-products-toolbar-mobile">
          <Button
            variant="outline"
            size="md"
            icon={<SlidersHorizontal size={18} />}
            onClick={() => setMobileFilterOpen((prev) => !prev)}
            className="agri-products-toolbar__filter-btn"
          >
            Filters {hasActiveFilters && <span className="agri-products-filter-dot" />}
          </Button>

          <select
            className="agri-products-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort agricultural products"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Layout Shell */}
        <div className="agri-products-layout">
          {/* Sidebar Filters */}
          <aside
            className={`agri-products-sidebar ${mobileFilterOpen ? 'agri-products-sidebar--open' : ''}`}
          >
            <div className="agri-products-sidebar__header">
              <h3 className="agri-products-sidebar__title">
                <Filter size={18} /> Filter Products
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="agri-products-sidebar__clear-btn"
                  onClick={handleClearFilters}
                >
                  <RotateCcw size={14} /> Clear Filters
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="agri-products-filter-group">
              <label htmlFor="cat-select" className="agri-products-filter-label">Category</label>
              <select
                id="cat-select"
                className="agri-products-filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="agri-products-filter-group">
              <label htmlFor="loc-select" className="agri-products-filter-label">Location / District</label>
              <select
                id="loc-select"
                className="agri-products-filter-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {PRODUCT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div className="agri-products-filter-group">
              <label htmlFor="cond-select" className="agri-products-filter-label">Condition</label>
              <select
                id="cond-select"
                className="agri-products-filter-select"
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                {PRODUCT_CONDITIONS.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="agri-products-filter-group">
              <label htmlFor="avail-select" className="agri-products-filter-label">Availability</label>
              <select
                id="avail-select"
                className="agri-products-filter-select"
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
              >
                {PRODUCT_AVAILABILITY.map((avail) => (
                  <option key={avail} value={avail}>
                    {avail}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="agri-products-filter-group">
              <div className="agri-products-filter-label-row">
                <span className="agri-products-filter-label">Max Price (₹)</span>
                <span className="agri-products-price-value">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="agri-products-range-slider"
              />
              <div className="agri-products-range-labels">
                <span>₹100</span>
                <span>₹3,000</span>
              </div>
            </div>

            {mobileFilterOpen && (
              <Button
                variant="primary"
                fullWidth
                onClick={() => setMobileFilterOpen(false)}
                className="agri-products-sidebar__apply-btn"
              >
                Apply Filters ({filteredProducts.length} Products)
              </Button>
            )}
          </aside>

          {/* Main Product Grid */}
          <main className="agri-products-content">
            {/* Desktop Top Toolbar */}
            <div className="agri-products-toolbar-desktop">
              <span className="agri-products-results-count">
                Showing <strong>{filteredProducts.length}</strong> agricultural products
              </span>

              <div className="agri-products-desktop-sort">
                <label htmlFor="desk-sort-prod">Sort by:</label>
                <select
                  id="desk-sort-prod"
                  className="agri-products-sort-select"
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

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="agri-products-grid">
                {filteredProducts.map((item) => (
                  <ListingCard
                    key={item.id}
                    title={item.title}
                    image={item.images[0]}
                    category={`${item.category} • Brand: ${item.brand}`}
                    location={item.location}
                    price={item.price}
                    priceUnit={`${item.priceUnit}`}
                    condition={item.condition}
                    availability="available"
                    type="product"
                    ctaText="View Details"
                    onCtaClick={() => navigate(`/products/${item.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No products found"
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

export default AgriProductsMarketplace;
