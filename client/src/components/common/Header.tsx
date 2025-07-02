import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Diamond, Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);

  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openSearchOverlay = () => {
    setIsSearchOverlayOpen(true);
  };

  const closeSearchOverlay = () => {
    setIsSearchOverlayOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      closeSearchOverlay();
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const openCartSlider = () => {
    setIsCartSliderOpen(true);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen, isSearchOverlayOpen]);

  const cartItemCount = cartItems.reduce((total: number, item: any) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo with Diamond Icon */}
        <Link to="/" className="header-logo">
          <Diamond className="logo-icon" size={24} />
          <span className="logo-text">GmDia</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link
            to="/products"
            className={`nav-link ${isActivePath('/products') ? 'active' : ''}`}
          >
            Rings
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActivePath('/products') ? 'active' : ''}`}
          >
            Necklaces
          </Link>
          <Link
            to="/products"
            className={`nav-link ${isActivePath('/products') ? 'active' : ''}`}
          >
            Tennis Bands
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActivePath('/about') ? 'active' : ''}`}
          >
            Our Story
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Desktop CTA Button */}
          <Link to="/customize" className="header-cta-btn">
            How It Works
          </Link>

          {/* Mobile/Additional Actions */}
          <div className="header-icons">
            {/* Search */}
            <button
              onClick={openSearchOverlay}
              className="header-action-btn"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>

            {/* Profile */}
            <div className="profile-container">
              <button
                onClick={toggleProfileDropdown}
                className="header-action-btn"
                aria-label="Toggle profile menu"
              >
                <User size={20} />
              </button>

              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  {user ? (
                    <>
                      <div className="profile-info">
                        <span className="profile-name">{user.name}</span>
                        <span className="profile-email">{user.email}</span>
                      </div>
                      <Link to="/dashboard" className="profile-link" onClick={() => setIsProfileDropdownOpen(false)}>
                        Dashboard
                      </Link>
                      <Link to="/account-settings" className="profile-link" onClick={() => setIsProfileDropdownOpen(false)}>
                        Account Settings
                      </Link>
                      <Link to="/order-history" className="profile-link" onClick={() => setIsProfileDropdownOpen(false)}>
                        Order History
                      </Link>
                      <div className="profile-divider"></div>
                      <button onClick={handleLogout} className="profile-logout">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="profile-link" onClick={() => setIsProfileDropdownOpen(false)}>
                        Sign In
                      </Link>
                      <Link to="/register" className="profile-link" onClick={() => setIsProfileDropdownOpen(false)}>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={openCartSlider}
              className="header-action-btn"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-in Navigation */}
      <div
        className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
      />
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          {user && (
            <div className="mobile-profile-info">
              <span className="mobile-profile-name">{user.name}</span>
              <span className="mobile-profile-email">{user.email}</span>
            </div>
          )}

          <Link
            to="/"
            className={`mobile-nav-link ${isActivePath('/') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`mobile-nav-link ${isActivePath('/products') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/customize"
            className={`mobile-nav-link ${isActivePath('/customize') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            Customize
          </Link>
          <Link
            to="/about"
            className={`mobile-nav-link ${isActivePath('/about') ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            About Us
          </Link>

          {user ? (
            <>
              <div className="mobile-nav-divider"></div>
              <Link
                to="/dashboard"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/account-settings"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Account Settings
              </Link>
              <Link
                to="/order-history"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Order History
              </Link>
              <button onClick={handleLogout} className="mobile-logout-btn">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <div className="mobile-nav-divider"></div>
              <Link
                to="/login"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="mobile-nav-link"
                onClick={toggleMobileMenu}
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchOverlayOpen ? 'open' : ''}`}>
        <div className="search-overlay-header">
          <button onClick={closeSearchOverlay} className="search-overlay-close-btn" aria-label="Close search">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSearchSubmit} className="search-overlay-form">
          <input
            type="text"
            placeholder="Search jewelry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-overlay-input"
          />
          <button type="submit" className="search-overlay-submit-btn" aria-label="Submit search">
            <Search size={24} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
