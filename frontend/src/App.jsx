import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RentListings from './pages/RentListings';
import RentDetail from './pages/RentDetail';
import BuySellMarketplace from './pages/BuySellMarketplace';
import ProductDetail from './pages/ProductDetail';
import CropsMarketplace from './pages/CropsMarketplace';
import CropDetail from './pages/CropDetail';
import AgriProductsMarketplace from './pages/AgriProductsMarketplace';
import AgriProductDetail from './pages/AgriProductDetail';
import CreateListingPreview from './pages/CreateListingPreview';
import ComponentShowcase from './pages/ComponentShowcase';
import './styles/global.css';

/**
 * Root Application Router Configuration for AgriMart (Phase 7).
 */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<RentListings />} />
        <Route path="/rent/:id" element={<RentDetail />} />
        <Route path="/buy-sell" element={<BuySellMarketplace />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/crops" element={<CropsMarketplace />} />
        <Route path="/crops/:id" element={<CropDetail />} />
        <Route path="/products" element={<AgriProductsMarketplace />} />
        <Route path="/products/:id" element={<AgriProductDetail />} />
        <Route path="/create-listing" element={<CreateListingPreview />} />
        <Route path="/login" element={<Home />} />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="*" element={<AgriProductsMarketplace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
