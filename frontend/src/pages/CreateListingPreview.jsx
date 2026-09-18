import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tractor, Wrench, Sprout, ShoppingBag, ArrowLeft, ArrowRight,
  Upload, X, CheckCircle2, AlertCircle, MapPin, Info, Edit3, Image as ImageIcon
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import './CreateListingPreview.css';

// Indian States list for dropdown
const INDIAN_STATES = [
  { label: 'Select State', value: '' },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  { label: 'Bihar', value: 'Bihar' },
  { label: 'Gujarat', value: 'Gujarat' },
  { label: 'Haryana', value: 'Haryana' },
  { label: 'Karnataka', value: 'Karnataka' },
  { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Punjab', value: 'Punjab' },
  { label: 'Rajasthan', value: 'Rajasthan' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Telangana', value: 'Telangana' },
  { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
  { label: 'West Bengal', value: 'West Bengal' },
  { label: 'Other', value: 'Other' },
];

// Equipment Types Options
const EQUIPMENT_TYPES = [
  { label: 'Select Equipment Type', value: '' },
  { label: 'Tractor', value: 'Tractor' },
  { label: 'Rotavator', value: 'Rotavator' },
  { label: 'Cultivator', value: 'Cultivator' },
  { label: 'Harvester', value: 'Harvester' },
  { label: 'Sprayer', value: 'Sprayer' },
  { label: 'Water Pump', value: 'Water Pump' },
  { label: 'Tiller', value: 'Tiller' },
  { label: 'Plough', value: 'Plough' },
  { label: 'Seed Drill', value: 'Seed Drill' },
  { label: 'Irrigation Equipment', value: 'Irrigation Equipment' },
  { label: 'Other', value: 'Other' },
];

// Condition Options for Equipment
const EQUIPMENT_CONDITIONS = [
  { label: 'Excellent', value: 'Excellent' },
  { label: 'Good', value: 'Good' },
  { label: 'Fair', value: 'Fair' },
  { label: 'Needs Repair', value: 'Needs Repair' },
];

// Crop Options
const CROP_NAMES = [
  { label: 'Select Crop', value: '' },
  { label: 'Paddy', value: 'Paddy' },
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Maize', value: 'Maize' },
  { label: 'Chillies', value: 'Chillies' },
  { label: 'Turmeric', value: 'Turmeric' },
  { label: 'Pulses', value: 'Pulses' },
  { label: 'Vegetables', value: 'Vegetables' },
  { label: 'Fruits', value: 'Fruits' },
  { label: 'Groundnut', value: 'Groundnut' },
  { label: 'Other', value: 'Other' },
];

// Crop Grade Options
const CROP_GRADES = [
  { label: 'Grade A (Premium)', value: 'A' },
  { label: 'Grade B (Standard)', value: 'B' },
  { label: 'Grade C (Fair)', value: 'C' },
  { label: 'Standard', value: 'Standard' },
  { label: 'Not Specified', value: 'Not Specified' },
];

// Quantity Units Options
const QUANTITY_UNITS = [
  { label: 'Quintal', value: 'quintal' },
  { label: 'Kg', value: 'kg' },
  { label: 'Ton', value: 'ton' },
  { label: 'Bag', value: 'bag' },
  { label: 'Crate', value: 'crate' },
  { label: 'Packet', value: 'packet' },
  { label: 'Piece', value: 'piece' },
  { label: 'Other', value: 'other' },
];

// Agricultural Product Categories
const PRODUCT_CATEGORIES = [
  { label: 'Select Category', value: '' },
  { label: 'Seeds', value: 'Seeds' },
  { label: 'Fertilizers', value: 'Fertilizers' },
  { label: 'Organic Manure', value: 'Organic Manure' },
  { label: 'Animal Feed', value: 'Animal Feed' },
  { label: 'Irrigation', value: 'Irrigation' },
  { label: 'Farming Tools', value: 'Farming Tools' },
  { label: 'Sprayers', value: 'Sprayers' },
  { label: 'Packaging', value: 'Packaging' },
  { label: 'Other', value: 'Other' },
];

// Product Condition Options
const PRODUCT_CONDITIONS = [
  { label: 'New', value: 'New' },
  { label: 'Good', value: 'Good' },
  { label: 'Used', value: 'Used' },
  { label: 'Not Specified', value: 'Not Specified' },
];

export const CreateListingPreview = () => {
  const navigate = useNavigate();

  // Step Control: 1 (Type), 2 (Details), 3 (Location), 4 (Review), 5 (Success)
  const [currentStep, setCurrentStep] = useState(1);
  const [listingType, setListingType] = useState('rent'); // 'rent' | 'used' | 'crop' | 'product'

  // Form Fields State
  const [formData, setFormData] = useState({
    // Common
    title: '',
    description: '',
    village: '',
    mandal: '',
    district: '',
    state: '',
    pincode: '',
    images: [], // array of { file, url, name }

    // Equipment Rental
    equipmentType: '',
    equipmentName: '',
    brand: '',
    model: '',
    manufacturingYear: new Date().getFullYear().toString(),
    condition: 'Excellent',
    rentalPriceHour: '',
    rentalPriceDay: '',
    availabilityRental: 'Available',

    // Used Equipment
    hoursUsed: '',
    sellingPriceEquipment: '',
    availabilityUsed: 'Available',

    // Crop
    cropName: '',
    variety: '',
    quantityCrop: '',
    unitCrop: 'quintal',
    expectedPriceCrop: '',
    gradeCrop: 'Standard',
    harvestDate: '',
    availabilityCrop: 'Available',

    // Agri Product
    productName: '',
    productCategory: '',
    brandProduct: '',
    quantityProduct: '',
    unitProduct: 'bag',
    priceProduct: '',
    conditionProduct: 'New',
    availabilityProduct: 'Available',
  });

  // Validation & Modal State
  const [errors, setErrors] = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validImages = [];
    let errorMsg = null;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        errorMsg = 'Please select valid image files only.';
        return;
      }
      if (formData.images.length + validImages.length >= 5) {
        errorMsg = 'Maximum 5 photos allowed per listing.';
        return;
      }
      validImages.push({
        file,
        name: file.name,
        url: URL.createObjectURL(file),
      });
    });

    if (errorMsg) {
      setErrors((prev) => ({ ...prev, images: errorMsg }));
    } else {
      setErrors((prev) => ({ ...prev, images: null }));
    }

    if (validImages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validImages],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Step 2 & 3 Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 2) {
      // Validate Details based on listingType
      if (!formData.title.trim()) {
        newErrors.title = 'Title / Name is required.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        newErrors.description = 'Please enter a description of at least 10 characters.';
      }

      if (listingType === 'rent') {
        if (!formData.equipmentType) newErrors.equipmentType = 'Equipment Type is required.';
        if (!formData.rentalPriceDay || Number(formData.rentalPriceDay) < 0) {
          newErrors.rentalPriceDay = 'Please enter a valid daily rental price.';
        }
      } else if (listingType === 'used') {
        if (!formData.equipmentType) newErrors.equipmentType = 'Equipment Type is required.';
        if (!formData.sellingPriceEquipment || Number(formData.sellingPriceEquipment) < 0) {
          newErrors.sellingPriceEquipment = 'Please enter a valid selling price.';
        }
      } else if (listingType === 'crop') {
        if (!formData.cropName) newErrors.cropName = 'Crop Name is required.';
        if (!formData.quantityCrop || Number(formData.quantityCrop) <= 0) {
          newErrors.quantityCrop = 'Please enter a valid quantity.';
        }
        if (!formData.expectedPriceCrop || Number(formData.expectedPriceCrop) < 0) {
          newErrors.expectedPriceCrop = 'Please enter a valid expected price.';
        }
      } else if (listingType === 'product') {
        if (!formData.productName.trim()) newErrors.productName = 'Product Name is required.';
        if (!formData.productCategory) newErrors.productCategory = 'Category is required.';
        if (!formData.priceProduct || Number(formData.priceProduct) < 0) {
          newErrors.priceProduct = 'Please enter a valid price.';
        }
      }
    }

    if (step === 3) {
      // Validate Location
      if (!formData.village.trim()) newErrors.village = 'Village / Town is required.';
      if (!formData.mandal.trim()) newErrors.mandal = 'Mandal / Tehsil is required.';
      if (!formData.district.trim()) newErrors.district = 'District is required.';
      if (!formData.state) newErrors.state = 'State is required.';
      const pincodeDigits = formData.pincode.replace(/\D/g, '');
      if (!pincodeDigits || pincodeDigits.length !== 6) {
        newErrors.pincode = 'Please enter a valid 6-digit Pincode.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
      return;
    }
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const handleDemoPublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(5); // Success state
      window.scrollTo(0, 0);
    }, 900);
  };

  // Determine marketplace route for success screen
  const getMarketplaceRoute = () => {
    switch (listingType) {
      case 'rent':
        return '/rent';
      case 'used':
        return '/used-equipment';
      case 'crop':
        return '/crops';
      case 'product':
        return '/products';
      default:
        return '/buy-sell';
    }
  };

  // Cancel Handler with confirmation
  const handleCancelClick = () => {
    const isDirty = formData.title || formData.village || formData.images.length > 0;
    if (isDirty && currentStep < 5) {
      setShowCancelModal(true);
    } else {
      navigate('/buy-sell');
    }
  };

  return (
    <MainLayout>
      <div className="agri-create-listing-page">
        <div className="container agri-create-listing-container">
          {/* Header */}
          <div className="agri-create-listing-header">
            <button
              type="button"
              className="agri-create-listing-back"
              onClick={handleCancelClick}
            >
              <ArrowLeft size={18} /> Cancel & Exit
            </button>
            <h1 className="agri-create-listing-title">Create a Listing</h1>
            <p className="agri-create-listing-subtitle">
              List your agricultural equipment, crops, or farm products on AgriMart.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          {currentStep <= 4 && (
            <div className="agri-stepper">
              <div className={`agri-stepper-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <span className="step-num">1</span>
                <span className="step-label">Listing Type</span>
              </div>
              <div className="agri-stepper-line" />
              <div className={`agri-stepper-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <span className="step-num">2</span>
                <span className="step-label">Details & Photos</span>
              </div>
              <div className="agri-stepper-line" />
              <div className={`agri-stepper-item ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                <span className="step-num">3</span>
                <span className="step-label">Location</span>
              </div>
              <div className="agri-stepper-line" />
              <div className={`agri-stepper-item ${currentStep >= 4 ? 'active' : ''}`}>
                <span className="step-num">4</span>
                <span className="step-label">Review</span>
              </div>
            </div>
          )}

          {/* STEP 1: SELECT LISTING TYPE */}
          {currentStep === 1 && (
            <div className="agri-wizard-card">
              <h2 className="agri-wizard-card-title">What would you like to list today?</h2>
              <p className="agri-wizard-card-desc">Choose the category that best describes your item.</p>

              <div className="agri-listing-types-grid" role="radiogroup" aria-label="Select Listing Category">
                {/* 1. Equipment for Rent */}
                <div
                  className={`agri-type-card ${listingType === 'rent' ? 'selected' : ''}`}
                  onClick={() => setListingType('rent')}
                  tabIndex={0}
                  role="radio"
                  aria-checked={listingType === 'rent'}
                >
                  <div className="agri-type-card__icon">
                    <Tractor size={32} />
                  </div>
                  <div className="agri-type-card__content">
                    <div className="agri-type-card__title-row">
                      <h3>Equipment for Rent</h3>
                      {listingType === 'rent' && <Badge variant="success">Selected</Badge>}
                    </div>
                    <p>Rent out your tractors, rotavators, sprayers, or farm machinery per hour/day.</p>
                  </div>
                </div>

                {/* 2. Used Equipment for Sale */}
                <div
                  className={`agri-type-card ${listingType === 'used' ? 'selected' : ''}`}
                  onClick={() => setListingType('used')}
                  tabIndex={0}
                  role="radio"
                  aria-checked={listingType === 'used'}
                >
                  <div className="agri-type-card__icon">
                    <Wrench size={32} />
                  </div>
                  <div className="agri-type-card__content">
                    <div className="agri-type-card__title-row">
                      <h3>Used Equipment for Sale</h3>
                      {listingType === 'used' && <Badge variant="success">Selected</Badge>}
                    </div>
                    <p>Sell second-hand machinery, implements, or farm equipment directly to other farmers.</p>
                  </div>
                </div>

                {/* 3. Crop for Sale */}
                <div
                  className={`agri-type-card ${listingType === 'crop' ? 'selected' : ''}`}
                  onClick={() => setListingType('crop')}
                  tabIndex={0}
                  role="radio"
                  aria-checked={listingType === 'crop'}
                >
                  <div className="agri-type-card__icon">
                    <Sprout size={32} />
                  </div>
                  <div className="agri-type-card__content">
                    <div className="agri-type-card__title-row">
                      <h3>Crop for Sale</h3>
                      {listingType === 'crop' && <Badge variant="success">Selected</Badge>}
                    </div>
                    <p>Sell harvested paddy, cotton, maize, chillies, fruits, or vegetables to buyers.</p>
                  </div>
                </div>

                {/* 4. Agricultural Product for Sale */}
                <div
                  className={`agri-type-card ${listingType === 'product' ? 'selected' : ''}`}
                  onClick={() => setListingType('product')}
                  tabIndex={0}
                  role="radio"
                  aria-checked={listingType === 'product'}
                >
                  <div className="agri-type-card__icon">
                    <ShoppingBag size={32} />
                  </div>
                  <div className="agri-type-card__content">
                    <div className="agri-type-card__title-row">
                      <h3>Agricultural Product for Sale</h3>
                      {listingType === 'product' && <Badge variant="success">Selected</Badge>}
                    </div>
                    <p>Sell seeds, fertilizers, organic manure, animal feed, tools, sprayers, or supplies.</p>
                  </div>
                </div>
              </div>

              <div className="agri-wizard-actions end">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNextStep}
                  icon={<ArrowRight size={18} />}
                >
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: DETAILS & PHOTOS */}
          {currentStep === 2 && (
            <div className="agri-wizard-card">
              <div className="agri-wizard-card-header">
                <h2>
                  {listingType === 'rent' && 'Equipment Rental Details'}
                  {listingType === 'used' && 'Used Equipment Details'}
                  {listingType === 'crop' && 'Crop Details'}
                  {listingType === 'product' && 'Agricultural Product Details'}
                </h2>
                <Badge variant="info">
                  {listingType === 'rent' ? 'Rental' : listingType === 'used' ? 'Used Machinery' : listingType === 'crop' ? 'Crop Harvest' : 'Farm Product'}
                </Badge>
              </div>

              <div className="agri-form-section">
                {/* 1. EQUIPMENT FOR RENT FORM */}
                {listingType === 'rent' && (
                  <>
                    <div className="agri-form-grid-2">
                      <Select
                        label="Equipment Type"
                        options={EQUIPMENT_TYPES}
                        value={formData.equipmentType}
                        onChange={(e) => handleChange('equipmentType', e.target.value)}
                        error={errors.equipmentType}
                        required
                      />
                      <Input
                        label="Equipment Title / Display Name"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. John Deere 5310 Tractor with Rotavator"
                        error={errors.title}
                        required
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Input
                        label="Brand"
                        value={formData.brand}
                        onChange={(e) => handleChange('brand', e.target.value)}
                        placeholder="e.g. John Deere / Mahindra"
                      />
                      <Input
                        label="Model"
                        value={formData.model}
                        onChange={(e) => handleChange('model', e.target.value)}
                        placeholder="e.g. 5310 4WD"
                      />
                      <Input
                        label="Manufacturing Year"
                        type="number"
                        value={formData.manufacturingYear}
                        onChange={(e) => handleChange('manufacturingYear', e.target.value)}
                        placeholder="e.g. 2022"
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Select
                        label="Condition"
                        options={EQUIPMENT_CONDITIONS}
                        value={formData.condition}
                        onChange={(e) => handleChange('condition', e.target.value)}
                      />
                      <Input
                        label="Rental Price per Hour (₹)"
                        type="number"
                        value={formData.rentalPriceHour}
                        onChange={(e) => handleChange('rentalPriceHour', e.target.value)}
                        placeholder="e.g. 600"
                      />
                      <Input
                        label="Rental Price per Day (₹)"
                        type="number"
                        value={formData.rentalPriceDay}
                        onChange={(e) => handleChange('rentalPriceDay', e.target.value)}
                        placeholder="e.g. 3500"
                        error={errors.rentalPriceDay}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 2. USED EQUIPMENT FOR SALE FORM */}
                {listingType === 'used' && (
                  <>
                    <div className="agri-form-grid-2">
                      <Select
                        label="Equipment Type"
                        options={EQUIPMENT_TYPES}
                        value={formData.equipmentType}
                        onChange={(e) => handleChange('equipmentType', e.target.value)}
                        error={errors.equipmentType}
                        required
                      />
                      <Input
                        label="Listing Title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Used Mahindra 575 DI Tractor in Top Condition"
                        error={errors.title}
                        required
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Input
                        label="Brand"
                        value={formData.brand}
                        onChange={(e) => handleChange('brand', e.target.value)}
                        placeholder="e.g. Mahindra"
                      />
                      <Input
                        label="Model"
                        value={formData.model}
                        onChange={(e) => handleChange('model', e.target.value)}
                        placeholder="e.g. 575 DI"
                      />
                      <Input
                        label="Manufacturing Year"
                        type="number"
                        value={formData.manufacturingYear}
                        onChange={(e) => handleChange('manufacturingYear', e.target.value)}
                        placeholder="e.g. 2020"
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Select
                        label="Condition"
                        options={EQUIPMENT_CONDITIONS}
                        value={formData.condition}
                        onChange={(e) => handleChange('condition', e.target.value)}
                      />
                      <Input
                        label="Hours Used"
                        type="number"
                        value={formData.hoursUsed}
                        onChange={(e) => handleChange('hoursUsed', e.target.value)}
                        placeholder="e.g. 1200"
                      />
                      <Input
                        label="Selling Price (₹)"
                        type="number"
                        value={formData.sellingPriceEquipment}
                        onChange={(e) => handleChange('sellingPriceEquipment', e.target.value)}
                        placeholder="e.g. 450000"
                        error={errors.sellingPriceEquipment}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 3. CROP FOR SALE FORM */}
                {listingType === 'crop' && (
                  <>
                    <div className="agri-form-grid-2">
                      <Select
                        label="Crop Name"
                        options={CROP_NAMES}
                        value={formData.cropName}
                        onChange={(e) => handleChange('cropName', e.target.value)}
                        error={errors.cropName}
                        required
                      />
                      <Input
                        label="Listing Title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Fresh Sona Masoori Paddy Harvest"
                        error={errors.title}
                        required
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Input
                        label="Variety / Seed Name"
                        value={formData.variety}
                        onChange={(e) => handleChange('variety', e.target.value)}
                        placeholder="e.g. Sona Masoori / Bt Cotton"
                      />
                      <Input
                        label="Quantity"
                        type="number"
                        value={formData.quantityCrop}
                        onChange={(e) => handleChange('quantityCrop', e.target.value)}
                        placeholder="e.g. 150"
                        error={errors.quantityCrop}
                        required
                      />
                      <Select
                        label="Unit"
                        options={QUANTITY_UNITS}
                        value={formData.unitCrop}
                        onChange={(e) => handleChange('unitCrop', e.target.value)}
                      />
                    </div>

                    <div className="agri-form-grid-3">
                      <Input
                        label="Expected Price (₹ per unit)"
                        type="number"
                        value={formData.expectedPriceCrop}
                        onChange={(e) => handleChange('expectedPriceCrop', e.target.value)}
                        placeholder="e.g. 2400"
                        error={errors.expectedPriceCrop}
                        required
                      />
                      <Select
                        label="Quality Grade"
                        options={CROP_GRADES}
                        value={formData.gradeCrop}
                        onChange={(e) => handleChange('gradeCrop', e.target.value)}
                      />
                      <Input
                        label="Harvest Month / Date"
                        value={formData.harvestDate}
                        onChange={(e) => handleChange('harvestDate', e.target.value)}
                        placeholder="e.g. Sept 2026"
                      />
                    </div>
                  </>
                )}

                {/* 4. AGRICULTURAL PRODUCT FORM */}
                {listingType === 'product' && (
                  <>
                    <div className="agri-form-grid-2">
                      <Select
                        label="Product Category"
                        options={PRODUCT_CATEGORIES}
                        value={formData.productCategory}
                        onChange={(e) => handleChange('productCategory', e.target.value)}
                        error={errors.productCategory}
                        required
                      />
                      <Input
                        label="Product Name"
                        value={formData.productName}
                        onChange={(e) => handleChange('productName', e.target.value)}
                        placeholder="e.g. Organic Neem Fertilizer 50kg Bag"
                        error={errors.productName}
                        required
                      />
                    </div>

                    {/* Auto-sync Title */}
                    {(() => {
                      if (!formData.title && formData.productName) {
                        setFormData((prev) => ({ ...prev, title: prev.productName }));
                      }
                      return null;
                    })()}

                    <div className="agri-form-grid-3">
                      <Input
                        label="Brand / Manufacturer"
                        value={formData.brandProduct}
                        onChange={(e) => handleChange('brandProduct', e.target.value)}
                        placeholder="e.g. IFFCO / Kribhco"
                      />
                      <Input
                        label="Quantity"
                        type="number"
                        value={formData.quantityProduct}
                        onChange={(e) => handleChange('quantityProduct', e.target.value)}
                        placeholder="e.g. 20"
                      />
                      <Select
                        label="Unit"
                        options={QUANTITY_UNITS}
                        value={formData.unitProduct}
                        onChange={(e) => handleChange('unitProduct', e.target.value)}
                      />
                    </div>

                    <div className="agri-form-grid-2">
                      <Input
                        label="Selling Price (₹ per unit)"
                        type="number"
                        value={formData.priceProduct}
                        onChange={(e) => handleChange('priceProduct', e.target.value)}
                        placeholder="e.g. 850"
                        error={errors.priceProduct}
                        required
                      />
                      <Select
                        label="Condition"
                        options={PRODUCT_CONDITIONS}
                        value={formData.conditionProduct}
                        onChange={(e) => handleChange('conditionProduct', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Description Field (Common) */}
                <div className="agri-textarea-group">
                  <label htmlFor="listing-desc" className="agri-input__label">
                    Description <span className="agri-input__required">*</span>
                  </label>
                  <textarea
                    id="listing-desc"
                    rows={4}
                    className={`agri-textarea ${errors.description ? 'agri-textarea--error' : ''}`}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Provide details about condition, usage history, specifications, or pickup arrangements..."
                  />
                  {errors.description && (
                    <p className="agri-input__error" role="alert">{errors.description}</p>
                  )}
                </div>

                {/* Photo Upload Section */}
                <div className="agri-photo-upload-section">
                  <label className="agri-input__label">
                    Add Photos <span className="agri-input__helper-text">(Up to 5 images)</span>
                  </label>

                  <div className="agri-photo-uploader">
                    <label className="agri-upload-dropzone">
                      <Upload size={28} className="upload-icon" />
                      <span>Click to select photos from device</span>
                      <small>PNG, JPG, WEBP up to 10MB</small>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>

                    {/* Previews Grid */}
                    {formData.images.length > 0 && (
                      <div className="agri-photo-previews-grid">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="agri-photo-preview-item">
                            <img src={img.url} alt={`Upload preview ${idx + 1}`} />
                            <button
                              type="button"
                              className="remove-img-btn"
                              onClick={() => handleRemoveImage(idx)}
                              aria-label="Remove image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.images && <p className="agri-input__error" role="alert">{errors.images}</p>}
                </div>
              </div>

              <div className="agri-wizard-actions space-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevStep}
                  icon={<ArrowLeft size={18} />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNextStep}
                  icon={<ArrowRight size={18} />}
                >
                  Continue to Location
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {currentStep === 3 && (
            <div className="agri-wizard-card">
              <div className="agri-wizard-card-header">
                <h2>Listing Location</h2>
                <Badge variant="info">Step 3 of 4</Badge>
              </div>

              <p className="agri-wizard-card-desc">
                Provide the local village and district where buyers can inspect or pick up this item.
              </p>

              <div className="agri-form-section">
                <div className="agri-form-grid-2">
                  <Input
                    label="Village / Town"
                    value={formData.village}
                    onChange={(e) => handleChange('village', e.target.value)}
                    placeholder="e.g. Rampur"
                    leadingIcon={<MapPin size={18} />}
                    error={errors.village}
                    required
                  />
                  <Input
                    label="Mandal / Tehsil"
                    value={formData.mandal}
                    onChange={(e) => handleChange('mandal', e.target.value)}
                    placeholder="e.g. Karimnagar"
                    error={errors.mandal}
                    required
                  />
                </div>

                <div className="agri-form-grid-3">
                  <Input
                    label="District"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    placeholder="e.g. Karimnagar"
                    error={errors.district}
                    required
                  />
                  <Select
                    label="State"
                    options={INDIAN_STATES}
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    error={errors.state}
                    required
                  />
                  <Input
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    placeholder="6-digit pincode"
                    error={errors.pincode}
                    required
                  />
                </div>
              </div>

              <div className="agri-wizard-actions space-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevStep}
                  icon={<ArrowLeft size={18} />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleNextStep}
                  icon={<ArrowRight size={18} />}
                >
                  Review Listing
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & PUBLISH */}
          {currentStep === 4 && (
            <div className="agri-wizard-card">
              <div className="agri-wizard-card-header">
                <h2>Review Your Listing</h2>
                <Badge variant="warning">Ready for Demo Publish</Badge>
              </div>

              <div className="agri-review-summary-card">
                <div className="agri-review-top-bar">
                  <div className="review-title-area">
                    <span className="type-tag">
                      {listingType === 'rent' ? 'Equipment for Rent' : listingType === 'used' ? 'Used Equipment for Sale' : listingType === 'crop' ? 'Crop for Sale' : 'Agricultural Product'}
                    </span>
                    <h3>{formData.title || 'Untitled Listing'}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Edit3 size={16} />}
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </Button>
                </div>

                <div className="agri-review-details-grid">
                  {listingType === 'rent' && (
                    <>
                      <div className="review-item"><strong>Equipment Type:</strong> <span>{formData.equipmentType}</span></div>
                      <div className="review-item"><strong>Brand & Model:</strong> <span>{formData.brand} {formData.model}</span></div>
                      <div className="review-item"><strong>Year:</strong> <span>{formData.manufacturingYear}</span></div>
                      <div className="review-item"><strong>Daily Rate:</strong> <span>₹{formData.rentalPriceDay} / day</span></div>
                      {formData.rentalPriceHour && <div className="review-item"><strong>Hourly Rate:</strong> <span>₹{formData.rentalPriceHour} / hr</span></div>}
                    </>
                  )}

                  {listingType === 'used' && (
                    <>
                      <div className="review-item"><strong>Equipment Type:</strong> <span>{formData.equipmentType}</span></div>
                      <div className="review-item"><strong>Brand & Model:</strong> <span>{formData.brand} {formData.model}</span></div>
                      <div className="review-item"><strong>Selling Price:</strong> <span>₹{Number(formData.sellingPriceEquipment).toLocaleString()}</span></div>
                      <div className="review-item"><strong>Condition:</strong> <span>{formData.condition}</span></div>
                    </>
                  )}

                  {listingType === 'crop' && (
                    <>
                      <div className="review-item"><strong>Crop Name:</strong> <span>{formData.cropName}</span></div>
                      <div className="review-item"><strong>Quantity:</strong> <span>{formData.quantityCrop} {formData.unitCrop}</span></div>
                      <div className="review-item"><strong>Expected Price:</strong> <span>₹{formData.expectedPriceCrop} / {formData.unitCrop}</span></div>
                      <div className="review-item"><strong>Grade:</strong> <span>{formData.gradeCrop}</span></div>
                    </>
                  )}

                  {listingType === 'product' && (
                    <>
                      <div className="review-item"><strong>Product Category:</strong> <span>{formData.productCategory}</span></div>
                      <div className="review-item"><strong>Selling Price:</strong> <span>₹{formData.priceProduct} per {formData.unitProduct}</span></div>
                      <div className="review-item"><strong>Condition:</strong> <span>{formData.conditionProduct}</span></div>
                    </>
                  )}

                  <div className="review-item full">
                    <strong>Location:</strong> <span>{formData.village}, {formData.mandal}, {formData.district}, {formData.state} - {formData.pincode}</span>
                  </div>

                  <div className="review-item full">
                    <strong>Description:</strong> <p>{formData.description}</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="review-item full">
                      <strong>Attached Photos ({formData.images.length}):</strong>
                      <div className="agri-review-images-row">
                        {formData.images.map((img, i) => (
                          <img key={i} src={img.url} alt={`Preview ${i + 1}`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Demo Notice */}
              <div className="agri-create-listing-notice">
                <Info size={20} className="notice-icon" />
                <div>
                  <strong>Demo Mode Notice</strong>
                  <p>Clicking "Publish Listing" will simulate listing creation. No real database record will be stored during this phase.</p>
                </div>
              </div>

              <div className="agri-wizard-actions space-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevStep}
                  icon={<ArrowLeft size={18} />}
                >
                  Back to Location
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={handleDemoPublish}
                  icon={<CheckCircle2 size={18} />}
                >
                  Publish Listing (Demo)
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {currentStep === 5 && (
            <div className="agri-wizard-card success-card">
              <div className="agri-success-badge-icon">
                <CheckCircle2 size={64} />
              </div>

              <h2 className="agri-success-title">Your listing is ready!</h2>
              <p className="agri-success-desc">
                This is currently a frontend demo. Your listing will be saved to the AgriMart database after backend integration.
              </p>

              <div className="agri-auth-notice agri-auth-notice--success">
                <Info size={20} />
                <p>
                  Demo listing created successfully. Backend integration will save this listing in a future phase.
                </p>
              </div>

              <div className="agri-success-actions">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(getMarketplaceRoute())}
                >
                  View Marketplace
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* CANCEL CONFIRMATION MODAL */}
        <Modal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          title="Discard Listing Draft?"
          size="sm"
          footer={
            <div className="agri-modal-footer-btns">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowCancelModal(false)}
              >
                Keep Editing
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={() => {
                  setShowCancelModal(false);
                  navigate('/buy-sell');
                }}
              >
                Discard & Exit
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to exit? Any listing details you have entered will be discarded.</p>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CreateListingPreview;
