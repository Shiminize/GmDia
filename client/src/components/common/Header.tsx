import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Search, User, ShoppingCart, Menu, X, LogOut, LogIn, UserPlus, MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems, toggleCartSlider } = useCart();

  const isActivePath = (path: string) => location.pathname === path;

  // Navigation items - using actual existing routes
  const navigationItems = [
    { name: 'Products', path: '/products' },
    { name: 'Customize', path: '/customize' },
    { name: 'Education', path: '/education' },
    { name: 'Our Story', path: '/about' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOverlayOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    // Reset body overflow when route changes
    document.body.style.overflow = '';
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    
    // Device detection for debugging
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Menu toggle with device detection
    setIsMobileMenuOpen(newState);
    
    // Lock/unlock body scroll with device-specific handling
    if (newState) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      
      // iOS Safari specific fixes
      if (isIOS) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${window.scrollY}px`;
      }
      

    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      
      // iOS Safari specific cleanup
      if (isIOS) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      

    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    
    // Device detection for close handling
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Unlock body scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // iOS Safari specific cleanup
    if (isIOS) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  };

  const toggleSearchOverlay = () => setIsSearchOverlayOpen(!isSearchOverlayOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = async () => {
    try {
      await logout();
      closeMobileMenu();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // iOS Safari viewport height fix
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Cleanup effect for body scroll lock
  useEffect(() => {
    return () => {
      // Cleanup body scroll lock on unmount
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  // Mobile menu validation function (for testing - can be removed in production)
  const validateMobileMenuFix = useCallback(() => {
    console.log('Mobile Menu Status:', {
      menuOpen: isMobileMenuOpen,
      elementsFound: {
        overlay: !!document.querySelector('.mobile-menu-nuclear-overlay'),
        panel: !!document.querySelector('.mobile-menu-nuclear-panel')
      }
    });
  }, [isMobileMenuOpen]);

  // Expose validation function globally for testing (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (window as any).validateMobileMenuFix = validateMobileMenuFix;
      return () => {
        delete (window as any).validateMobileMenuFix;
      };
    }
  }, [validateMobileMenuFix]);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 safe-top
          ${isScrolled ? '' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo - Left Side */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div
                  className="bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: 'url(/Logo.png)',
                    width: '120px', // Enlarged for desktop
                    height: '64px', // Enlarged for desktop
                  }}
                  aria-label="Facet & Co."
                />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                <Link
                  to="/about"
                  className={`text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/about') ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  About
                </Link>
                <div className="relative group">
                  <button className="text-sm font-normal tracking-wide text-gray-700 hover:text-black transition-colors duration-200">
                    Brands
                  </button>
                  {/* Brands dropdown can be added here if needed */}
                </div>
                <div className="relative group">
                  <button className="text-sm font-normal tracking-wide text-gray-700 hover:text-black transition-colors duration-200">
                    Products
                  </button>
                  {/* Products dropdown */}
                  <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">All</Link>
                    <Link to="/products?category=rings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Rings</Link>
                    <Link to="/products?category=necklaces" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Necklaces</Link>
                    <Link to="/products?category=earrings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Earrings</Link>
                    <Link to="/products?category=bracelets" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bracelets</Link>
                  </div>
                </div>
                <Link
                  to="/education"
                  className={`text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/education') ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  News
                </Link>
                <Link
                  to="/customize"
                  className={`text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/customize') ? 'text-black' : 'text-gray-700 hover:text-black'
                  }`}
                >
                  Customize
                </Link>
              </div>
            </nav>

            {/* Desktop Actions - Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Currency/Language Selector */}
              <div className="relative group">
                <button className="text-sm font-normal text-gray-700 hover:text-black transition-colors duration-200">
                  USD | $
                </button>
              </div>

              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={toggleSearchOverlay}
                  className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
                
                {isSearchOverlayOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 shadow-lg p-4 z-50">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Profile/Account */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                  aria-label="My account"
                >
                  <User size={18} />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg py-1 z-50">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCartSlider}
                className="relative p-1 text-gray-700 hover:text-black transition-colors duration-200"
                aria-label="Cart"
              >
                <ShoppingCart size={18} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-medium 
                    w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={toggleCartSlider}
                className="relative p-1 text-gray-700"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-medium 
                    w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={toggleMobileMenu}
                className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        >
          {/* Mobile Menu Panel */}
          <div
            className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-lg transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to="/" onClick={closeMobileMenu}>
                <img 
                  src="/Logo.png" 
                  alt="Facet & Co." 
                  className="h-6 w-auto object-contain"
                />
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-1 text-gray-700"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-4">
              {/* Main Navigation */}
              <nav className="space-y-1 mb-6">
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className={`block py-3 text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/about') ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  About
                </Link>
                <button className="block py-3 text-sm font-normal tracking-wide text-gray-700 w-full text-left">
                  Brands
                </button>
                <button className="block py-3 text-sm font-normal tracking-wide text-gray-700 w-full text-left">
                  Products
                </button>
                <Link
                  to="/education"
                  onClick={closeMobileMenu}
                  className={`block py-3 text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/education') ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  News
                </Link>
                <Link
                  to="/customize"
                  onClick={closeMobileMenu}
                  className={`block py-3 text-sm font-normal tracking-wide transition-colors duration-200 ${
                    isActivePath('/customize') ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  Journal
                </Link>
              </nav>

              {/* Account Section */}
              <div className="border-t border-gray-200 pt-4">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="block py-3 text-sm text-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-3 text-sm text-gray-700"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block py-3 text-sm text-gray-700"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block py-3 text-sm text-gray-700"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
