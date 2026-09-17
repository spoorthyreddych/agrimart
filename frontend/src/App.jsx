import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentShowcase from './pages/ComponentShowcase';
import './styles/global.css';

/**
 * Root Application Router Configuration for AgriMart (Phase 2).
 */
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentShowcase />} />
        <Route path="/rentals" element={<ComponentShowcase />} />
        <Route path="/marketplace" element={<ComponentShowcase />} />
        <Route path="/crops" element={<ComponentShowcase />} />
        <Route path="/products" element={<ComponentShowcase />} />
        <Route path="/login" element={<ComponentShowcase />} />
        <Route path="/post-listing" element={<ComponentShowcase />} />
        <Route path="/dashboard" element={<ComponentShowcase />} />
        <Route path="*" element={<ComponentShowcase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
