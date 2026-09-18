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
import UsedEquipmentMarketplace from './pages/UsedEquipmentMarketplace';
import UsedEquipmentDetail from './pages/UsedEquipmentDetail';
import CreateListingPreview from './pages/CreateListingPreview';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import MessagesPlaceholder from './pages/MessagesPlaceholder';
import ComponentShowcase from './pages/ComponentShowcase';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

/**
 * Root Application Router Configuration for AgriMart (Phase 11).
 */
export function App() {
  return (
    <AuthProvider>
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
          <Route path="/used-equipment" element={<UsedEquipmentMarketplace />} />
          <Route path="/used-equipment/:id" element={<UsedEquipmentDetail />} />
          <Route path="/create-listing" element={<CreateListingPreview />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<MessagesPlaceholder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/showcase" element={<ComponentShowcase />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
