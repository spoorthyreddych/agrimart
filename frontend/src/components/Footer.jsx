import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, Heart } from 'lucide-react';
import './Footer.css';

/**
 * Reusable Footer component for AgriMart platform.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="agri-footer">
      <div className="container agri-footer__content">
        {/* Brand Column */}
        <div className="agri-footer__col agri-footer__brand-col">
          <div className="agri-footer__brand">
            <div className="agri-footer__logo">
              <Sprout size={24} />
            </div>
            <span className="agri-footer__brand-name">AgriMart</span>
          </div>
          <p className="agri-footer__tagline">
            Empowering agricultural communities with direct equipment rentals, used machinery sales, quality inputs, and crop trading.
          </p>
          <div className="agri-footer__contact-info">
            <span className="agri-footer__contact-item">
              <Phone size={16} /> Toll-Free Helpline: 1800-123-4567
            </span>
            <span className="agri-footer__contact-item">
              <Mail size={16} /> support@agrimart.com
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="agri-footer__col">
          <h4 className="agri-footer__heading">AgriMart Marketplace</h4>
          <ul className="agri-footer__links">
            <li><Link to="/rentals">Rent Equipment</Link></li>
            <li><Link to="/marketplace">Buy & Sell Machinery</Link></li>
            <li><Link to="/crops">Crop Marketplace</Link></li>
            <li><Link to="/products">Agri Inputs & Seeds</Link></li>
          </ul>
        </div>

        {/* Company Links Column */}
        <div className="agri-footer__col">
          <h4 className="agri-footer__heading">Platform Info</h4>
          <ul className="agri-footer__links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/help">Help & FAQs</Link></li>
          </ul>
        </div>

        {/* Legal Links Column */}
        <div className="agri-footer__col">
          <h4 className="agri-footer__heading">Legal & Safety</h4>
          <ul className="agri-footer__links">
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/rental-terms">Rental Safety Guide</Link></li>
            <li><Link to="/dispute-resolution">Dispute Resolution</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="agri-footer__bottom">
        <div className="container agri-footer__bottom-content">
          <p>© {currentYear} AgriMart Platform. Built for Farmers with <Heart size={14} className="agri-footer__heart" />.</p>
          <p className="agri-footer__lang">Language: English (Regional options coming soon)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
