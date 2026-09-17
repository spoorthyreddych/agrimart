import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MainLayout.css';

/**
 * Main Layout Shell for AgriMart pages.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page view content
 * @param {boolean} [props.isLoggedIn=false] - User auth flag
 * @param {Object} [props.user] - User object
 */
export const MainLayout = ({ children, isLoggedIn = false, user }) => {
  return (
    <div className="agri-layout-shell">
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <main className="agri-layout-main container">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
