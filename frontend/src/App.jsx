import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RentListings from './pages/RentListings';
import RentDetail from './pages/RentDetail';
import BuySellMarketplace from './pages/BuySellMarketplace';
import ProductDetail from './pages/ProductDetail';
import CreateListingPreview from './pages/CreateListingPreview';
import ComponentShowcase from './pages/ComponentShowcase';
import './styles/global.css';

/**
 * Root Application Router Configuration for AgriMart (Phase 5).
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
        <Route path="/create-listing" element={<CreateListingPreview />} />
        <Route path="/crops" element={<BuySellMarketplace />} />
        <Route path="/products" element={<BuySellMarketplace />} />
        <Route path="/login" element={<Home />} />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="*" element={<BuySellMarketplace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
