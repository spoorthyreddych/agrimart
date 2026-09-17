import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sprout, Search, Menu, X, User, LayoutDashboard, PlusCircle } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

/**
 * Reusable Responsive Navigation Header for AgriMart.
 * 
 * @param {Object} props
 * @param {boolean} [props.isLoggedIn=false] - Mock user authentication state
 * @param {Object} [props.user] - Mock user profile
 */
export const Navbar = ({ isLoggedIn = false, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rent Equipment', path: '/rent' },
    { label: 'Buy & Sell', path: '/buy-sell' },
    { label: 'Crops', path: '/crops' },
  ];

  return (
    <header className="agri-navbar-header">
      {/* Top Banner Accent */}
      <div className="agri-navbar__top-bar">
        <div className="container agri-navbar__top-content">
          <span>🌾 Direct Farmer Marketplace & Equipment Rental</span>
          <div className="agri-navbar__top-links">
            <span className="agri-navbar__location-pill">📍 Ludhiana, Punjab</span>
            <a href="tel:18001234567" className="agri-navbar__helpline">
              Helpline: 1800-123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="container agri-navbar__main">
        {/* Brand Logo */}
        <Link to="/" className="agri-navbar__brand" onClick={closeMobileMenu}>
          <div className="agri-navbar__logo-icon">
            <Sprout size={24} />
          </div>
          <div className="agri-navbar__brand-text">
            <span className="agri-navbar__brand-name">AgriMart</span>
            <span className="agri-navbar__brand-tagline">Kisan Bazaar</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="agri-navbar__nav-desktop" aria-label="Main Navigation">
          <ul className="agri-navbar__nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="agri-navbar__nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `agri-navbar__nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Desktop Actions */}
        <div className="agri-navbar__actions-desktop">
          <Button
            variant="ghost"
            size="sm"
            icon={<Search size={18} />}
            onClick={() => navigate('/rentals')}
            aria-label="Open search"
          >
            Search
          </Button>

          {isLoggedIn ? (
            <div className="agri-navbar__user-actions">
              <Button
                variant="outline"
                size="sm"
                icon={<LayoutDashboard size={18} />}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <div className="agri-navbar__avatar" title={user?.name || 'Farmer Account'}>
                <User size={20} />
              </div>
            </div>
          ) : (
            <div className="agri-navbar__auth-btns">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle size={16} />}
                onClick={() => navigate('/post-listing')}
              >
                Post Listing
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="agri-navbar__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="agri-navbar__mobile-drawer" role="dialog" aria-modal="true">
          <div className="agri-navbar__mobile-content">
            <ul className="agri-navbar__mobile-list">
              {navItems.map((item) => (
                <li key={item.path} className="agri-navbar__mobile-item">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `agri-navbar__mobile-link ${isActive ? 'active' : ''}`
                    }
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="agri-navbar__mobile-actions">
              {isLoggedIn ? (
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<LayoutDashboard size={18} />}
                  onClick={() => {
                    closeMobileMenu();
                    navigate('/dashboard');
                  }}
                >
                  My Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    icon={<PlusCircle size={18} />}
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/post-listing');
                    }}
                  >
                    + Post Free Listing
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/login');
                    }}
                  >
                    Sign In / Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
