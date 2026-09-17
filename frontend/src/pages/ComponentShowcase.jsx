import React, { useState } from 'react';
import {
  Tractor, Wheat, Wrench, Sprout, Search, CheckCircle, AlertCircle, Info, Filter, Plus
} from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import CategoryCard from '../components/CategoryCard';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import SectionHeader from '../components/SectionHeader';
import MainLayout from '../layouts/MainLayout';
import './ComponentShowcase.css';

export const ComponentShowcase = () => {
  // Component State for Testing Interactive Elements
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('Ludhiana, Punjab');
  const [searchCategory, setSearchCategory] = useState('');

  // Sample Categories
  const categories = [
    {
      id: 1,
      title: 'Tractors & Machinery',
      desc: 'Rent heavy tractors, tillers, and harvesters per day or hour.',
      icon: <Tractor size={28} />,
      count: '120+ Rentals',
    },
    {
      id: 2,
      title: 'Crop Marketplace',
      desc: 'Sell and buy grains, cotton, wheat, and produce directly.',
      icon: <Wheat size={28} />,
      count: '350+ Crops',
    },
    {
      id: 3,
      title: 'Pre-Owned Equipment',
      desc: 'Buy and sell inspected used farm tools and implements.',
      icon: <Wrench size={28} />,
      count: '80+ Used',
    },
    {
      id: 4,
      title: 'Seeds & Fertilizers',
      desc: 'Quality certified agri-inputs, fertilizers, and crop seeds.',
      icon: <Sprout size={28} />,
      count: '210+ Products',
    },
  ];

  // Sample Listings (All 4 Types)
  const sampleListings = [
    {
      id: 'list-1',
      title: 'Mahindra 575 DI Tractor 45HP with Operator',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=600&q=80',
      category: 'Tractors & Rentals',
      location: 'Ludhiana, Punjab',
      price: 1200,
      priceUnit: 'day',
      condition: 'Good',
      availability: 'available',
      type: 'rental',
    },
    {
      id: 'list-2',
      title: 'Sharbati Organic Wheat (Bulk Harvest 50 Quintals)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      category: 'Grains & Pulses',
      location: 'Karnal, Haryana',
      price: 2250,
      priceUnit: 'quintal',
      availability: 'available',
      type: 'crop',
    },
    {
      id: 'list-3',
      title: 'Pre-Owned Swaraj 744 FE 48HP Tractor (2021 Model)',
      image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80',
      category: 'Used Equipment',
      location: 'Bathinda, Punjab',
      price: '₹4,80,000',
      priceUnit: 'total',
      condition: 'Like New (850 hrs)',
      availability: 'pending',
      type: 'used_equipment',
    },
    {
      id: 'list-4',
      title: 'Organic NPK Bio-Fertilizer (50kg Bag)',
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80',
      category: 'Agri Inputs',
      location: 'Amritsar, Punjab',
      price: 850,
      priceUnit: 'item',
      availability: 'available',
      type: 'product',
    },
  ];

  return (
    <MainLayout>
      <div className="showcase-page">
        {/* Banner Section */}
        <div className="showcase-hero">
          <Badge variant="available" icon={<CheckCircle size={14} />}>
            Phase 2 UI Component Library
          </Badge>
          <h1 className="showcase-hero__title">AgriMart Design System & Reusable UI Components</h1>
          <p className="showcase-hero__desc">
            A comprehensive, mobile-first, rural-accessible component showcase built strictly according to AgriMart Design System guidelines.
          </p>
        </div>

        {/* 1. Section Header Component */}
        <section className="showcase-section">
          <SectionHeader
            title="1. Section Header Component"
            subtitle="Reusable heading layout with optional badges and action CTA triggers."
            badge={<Badge variant="info">Component #14</Badge>}
            actionText="View All Examples"
            action={() => alert('SectionHeader action clicked!')}
          />
        </section>

        {/* 2. Buttons Showcase */}
        <section className="showcase-section">
          <SectionHeader
            title="2. Button Variants & Sizes"
            subtitle="Touch-friendly button components with 48px minimum touch height on mobile."
            badge={<Badge variant="neutral">Component #3</Badge>}
          />
          <div className="showcase-card">
            <h4 className="showcase-subheading">Style Variants</h4>
            <div className="showcase-grid showcase-grid--flex">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>

            <h4 className="showcase-subheading">Sizes & Icons</h4>
            <div className="showcase-grid showcase-grid--flex">
              <Button size="sm" icon={<Plus size={16} />}>Small Button</Button>
              <Button size="md" icon={<Plus size={18} />}>Medium Button</Button>
              <Button size="lg" icon={<Plus size={20} />}>Large Button</Button>
            </div>

            <h4 className="showcase-subheading">Full Width Mobile CTA</h4>
            <Button variant="primary" fullWidth icon={<Tractor size={20} />}>
              Rent Equipment Now (Full Width CTA)
            </Button>
          </div>
        </section>

        {/* 3. Inputs & Selects Showcase */}
        <section className="showcase-section">
          <SectionHeader
            title="3. Inputs, Selects & Form Controls"
            subtitle="Accessible form components with validation states, icons, and focus rings."
            badge={<Badge variant="neutral">Components #4 & #5</Badge>}
          />
          <div className="showcase-card">
            <div className="showcase-grid showcase-grid--2col">
              <Input
                label="Equipment Title / Name"
                placeholder="e.g. Mahindra 575 DI Tractor"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                leadingIcon={<Tractor size={18} />}
                required
                helperText="Enter the full model or title of your machinery."
              />

              <Input
                label="Price per Day (₹)"
                type="number"
                placeholder="1200"
                error={inputError}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val < 0) setInputError('Price must be greater than zero.');
                  else setInputError('');
                }}
                helperText="Standard daily rental rate."
              />

              <Select
                label="Select Machinery Category"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: 'tractors', label: 'Tractors & Heavy Power' },
                  { value: 'harvesters', label: 'Combine Harvesters' },
                  { value: 'tillers', label: 'Rotavators & Tillers' },
                  { value: 'sprayers', label: 'Booms & Crop Sprayers' },
                ]}
                required
                helperText="Select the category best matching your item."
              />

              <Select
                label="Location State"
                options={[
                  { value: 'punjab', label: 'Punjab' },
                  { value: 'haryana', label: 'Haryana' },
                  { value: 'up', label: 'Uttar Pradesh' },
                  { value: 'mp', label: 'Madhya Pradesh' },
                ]}
                placeholder="Select your state"
              />
            </div>
          </div>
        </section>

        {/* 4. SearchBar Component */}
        <section className="showcase-section">
          <SectionHeader
            title="4. Search & Filter Bar"
            subtitle="Unified search component with keyword, location pill, and category selector."
            badge={<Badge variant="neutral">Component #6</Badge>}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            locationValue={searchLocation}
            onLocationChange={setSearchLocation}
            categoryValue={searchCategory}
            onCategoryChange={setSearchCategory}
            categories={[
              { value: 'equipment', label: 'Equipment Rental' },
              { value: 'crops', label: 'Crops' },
              { value: 'products', label: 'Agri Inputs' },
            ]}
            onSearch={(filters) =>
              alert(`Searching with filters:\n${JSON.stringify(filters, null, 2)}`)
            }
          />
        </section>

        {/* 5. Category Cards Grid */}
        <section className="showcase-section">
          <SectionHeader
            title="5. Category Card Component"
            subtitle="Visual navigation tiles for marketplace domain segments."
            badge={<Badge variant="neutral">Component #8</Badge>}
          />
          <div className="showcase-grid showcase-grid--4col">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.title}
                description={cat.desc}
                icon={cat.icon}
                count={cat.count}
                onClick={() => alert(`Navigating to ${cat.title}`)}
              />
            ))}
          </div>
        </section>

        {/* 6. Listing Cards Grid */}
        <section className="showcase-section">
          <SectionHeader
            title="6. Reusable Listing Cards"
            subtitle="Supports equipment rentals, crop sales, used machinery, and agri products."
            badge={<Badge variant="neutral">Component #7</Badge>}
          />
          <div className="showcase-grid showcase-grid--4col">
            {sampleListings.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                image={listing.image}
                category={listing.category}
                location={listing.location}
                price={listing.price}
                priceUnit={listing.priceUnit}
                condition={listing.condition}
                availability={listing.availability}
                type={listing.type}
                onCtaClick={() => alert(`CTA clicked for ${listing.title}`)}
              />
            ))}
          </div>
        </section>

        {/* 7. Status Badges */}
        <section className="showcase-section">
          <SectionHeader
            title="7. Status Badges"
            subtitle="Standardized badge indicators for availability, rentals, and transactions."
            badge={<Badge variant="neutral">Component #9</Badge>}
          />
          <div className="showcase-card showcase-grid--flex">
            <Badge variant="available">Available</Badge>
            <Badge variant="pending">Pending Request</Badge>
            <Badge variant="rented">Rented Out</Badge>
            <Badge variant="sold">Sold</Badge>
            <Badge variant="info">Verified Farmer</Badge>
            <Badge variant="neutral">Standard Listing</Badge>
          </div>
        </section>

        {/* 8. Interactive Modal */}
        <section className="showcase-section">
          <SectionHeader
            title="8. Modal Component"
            subtitle="Accessible modal dialog with overlay backdrop and keyboard Escape listener."
            badge={<Badge variant="neutral">Component #10</Badge>}
          />
          <div className="showcase-card">
            <Button
              variant="secondary"
              icon={<Info size={18} />}
              onClick={() => setModalOpen(true)}
            >
              Open Equipment Booking Modal Test
            </Button>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Request Rental Booking"
              size="md"
              footer={
                <>
                  <Button variant="outline" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      alert('Rental Booking Submitted!');
                      setModalOpen(false);
                    }}
                  >
                    Confirm Booking Request
                  </Button>
                </>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  You are submitting a rental booking request for <strong>Mahindra 575 DI Tractor 45HP</strong>.
                </p>
                <Input
                  label="Start Date"
                  type="date"
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  required
                />
                <Input
                  label="Delivery Address / Village"
                  placeholder="Enter your village or farm location"
                  required
                />
              </div>
            </Modal>
          </div>
        </section>

        {/* 9. Application Feedback States */}
        <section className="showcase-section">
          <SectionHeader
            title="9. Loading, Empty & Error Feedback States"
            subtitle="Consistent visual feedback during asynchronous data fetching and error states."
            badge={<Badge variant="neutral">Components #11, #12, #13</Badge>}
          />
          <div className="showcase-grid showcase-grid--3col">
            <div className="showcase-card">
              <h4 className="showcase-subheading">Loading State</h4>
              <Loading message="Fetching nearby tractors..." size="md" />
            </div>

            <div className="showcase-card">
              <h4 className="showcase-subheading">Empty State</h4>
              <EmptyState
                title="No Crops Available"
                description="There are currently no crops listed in this district."
                actionLabel="Reset Filters"
                onAction={() => alert('Reset filters')}
              />
            </div>

            <div className="showcase-card">
              <h4 className="showcase-subheading">Error State</h4>
              <ErrorState
                title="Network Error"
                message="Could not load listing details. Please verify your mobile signal."
                onRetry={() => alert('Retrying fetch...')}
              />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ComponentShowcase;
