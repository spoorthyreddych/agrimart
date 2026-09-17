import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RentListings from './pages/RentListings';
import RentDetail from './pages/RentDetail';
import ComponentShowcase from './pages/ComponentShowcase';
import './styles/global.css';

/**
 * Root Application Router Configuration for AgriMart (Phase 4).
 */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<RentListings />} />
        <Route path="/rent/:id" element={<RentDetail />} />
        <Route path="/buy-sell" element={<Home />} />
        <Route path="/crops" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/post-listing" element={<Home />} />
        <Route path="/showcase" element={<ComponentShowcase />} />
        <Route path="*" element={<RentListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
