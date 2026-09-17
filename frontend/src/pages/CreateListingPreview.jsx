import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, Info, Sprout, Tractor, Wheat } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import './CreateListingPreview.css';

export const CreateListingPreview = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="create-listing-preview">
        <button
          type="button"
          className="create-listing-preview__back"
          onClick={() => navigate('/buy-sell')}
        >
          <ArrowLeft size={18} /> Back to Marketplace
        </button>

        <div className="create-listing-preview__card">
          <div className="create-listing-preview__icon">
            <PlusCircle size={48} />
          </div>

          <Badge variant="info">Phase 7 Feature Preview</Badge>

          <h1 className="create-listing-preview__title">Post a New AgriMart Listing</h1>

          <p className="create-listing-preview__desc">
            The multi-step listing creation workflow for equipment rentals, crops, and farm supplies will be fully interactive in **Phase 7**.
          </p>

          <div className="create-listing-preview__types">
            <div className="type-box">
              <Tractor size={24} />
              <strong>List Machinery for Rent</strong>
              <span>Monetize idle tractors & sprayers</span>
            </div>
            <div className="type-box">
              <Wheat size={24} />
              <strong>Sell Harvest Crops</strong>
              <span>Connect directly with bulk buyers</span>
            </div>
            <div className="type-box">
              <Sprout size={24} />
              <strong>Sell Seeds & Supplies</strong>
              <span>List agri inputs & tools</span>
            </div>
          </div>

          <div className="create-listing-preview__notice">
            <Info size={18} className="notice-icon" />
            <p>
              Currently, you can browse, search, filter, and preview rental/purchase workflows across all active marketplace listings.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/buy-sell')}
          >
            Explore Buy & Sell Marketplace
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateListingPreview;
