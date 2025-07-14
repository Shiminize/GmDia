import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Search, User, ShoppingCart, Menu, X, LogOut, LogIn, UserPlus, MessageCircle, Mail } from 'lucide-react';

declare global {
  interface Window {
    Tawk_API?: {
      toggle: () => void;
    };
  }
}

const mockSuggestions = [
  'Diamond Ring',
  'Gold Necklace',
  'Tennis Bracelet',
  'Emerald Cut',
  'Princess Cut',
];

const Header: React.FC = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleSearchSubmit = (e?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    setShowSuggestions(false);
    setIsSearchOverlayOpen(false);
  };

  useEffect(() => {
    if (isSearchOverlayOpen && searchQuery) {
      setFilteredSuggestions(
        mockSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, isSearchOverlayOpen]);

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

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 bg-white border-b border-gray-200 safe-top
          ${isScrolled ? '' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Desktop Left Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <Link to="/" className="flex items-center">
                {/* Logo image or text label should be here if needed */}
              </Link>
              {/* Desktop Only: Email Icon */}
              <a
                href="mailto:hello@facetandco.com"
                className="hidden md:inline-flex items-center justify-center p-1 text-gray-700 hover:text-black transition-colors duration-200"
                aria-label="Email customer service"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail size={18} />
              </a>
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
                    Shop
                  </button>
                  <div className="absolute left-0 top-full mt-1 w-[400px] bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-sm mb-2">SHOP BY SHAPE</h3>
                        <ul>
                          <li className="flex items-center mb-2">
                            <img src="/Diamond Shapes/shop-by-round.jpg" alt="Round" className="w-6 h-6 mr-2"/>
                            <Link to="/products?shape=round" className="flex items-center text-sm text-gray-700 hover:bg-gray-50 py-2">Round</Link>
                          </li>
                          <li className="flex items-center mb-2">
                            <img src="/Diamond Shapes/shop-by-cushion.png" alt="Cushion" className="w-6 h-6 mr-2"/>
                            <Link to="/products?shape=cushion" className="block text-sm text-gray-700 hover:bg-gray-50">Cushion</Link>
                          </li>
                          <li className="flex items-center mb-2">
                            <img src="/Diamond Shapes/shop-by-emerald.jpg" alt="Emerald" className="w-6 h-6 mr-2"/>
                            <Link to="/products?shape=emerald" className="block text-sm text-gray-700 hover:bg-gray-50">Emerald</Link>
                          </li>
                          <li className="flex items-center mb-2">
                            <img src="/Diamond Shapes/shop-by-oval.jpg" alt="Oval" className="w-6 h-6 mr-2"/>
                            <Link to="/products?shape=oval" className="block text-sm text-gray-700 hover:bg-gray-50">Oval</Link>
                          </li>
                          <li className="flex items-center mb-2">
                            <img src="/Diamond Shapes/shop-by-princess.jpg" alt="Princess" className="w-6 h-6 mr-2"/>
                            <Link to="/products?shape=princess" className="block text-sm text-gray-700 hover:bg-gray-50">Princess</Link>
                          </li>
                          <li className="flex items-center mb-2">
                            <Link to="/products/shapes" className="block text-sm text-gray-700 hover:bg-gray-50">All Shapes</Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-2">SHOP BY COLOR</h3>
                        <ul>
                          <li className="mb-2"><Link to="/products?color=white" className="block text-sm text-gray-700 hover:bg-gray-50 py-2">White</Link></li>
                          <li className="mb-2"><Link to="/products?color=blue" className="block text-sm text-gray-700 hover:bg-gray-50">Blue</Link></li>
                          <li className="mb-2"><Link to="/products?color=grey" className="block text-sm text-gray-700 hover:bg-gray-50">Grey</Link></li>
                          <li className="mb-2"><Link to="/products?color=pink" className="block text-sm text-gray-700 hover:bg-gray-50">Pink</Link></li>
                          <li className="mb-2"><Link to="/products?color=red" className="block text-sm text-gray-700 hover:bg-gray-50">Red</Link></li>
                          <li className="mb-2"><Link to="/products?color=yellow" className="block text-sm text-gray-700 hover:bg-gray-50">Yellow</Link></li>
                          <li className="mb-2"><Link to="/products?color=green" className="block text-sm text-gray-700 hover:bg-gray-50">Green</Link></li>
                          <li className="mb-2"><Link to="/products?color=purple" className="block text-sm text-gray-700 hover:bg-gray-50">Purple</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
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

              {/* Desktop Search Overlay (unchanged) */}
              <div className="relative hidden md:block" ref={searchRef}>
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

              {/* Profile/Account - now a direct link to sign in */}
              <Link
                to="/login"
                className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                aria-label="Sign in"
              >
                <User size={18} />
              </Link>

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

            {/* Mobile Header Layout: Logo (left), Icons (right) */}
            <div className="flex md:hidden items-center justify-between w-full h-16 px-4">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div
                  className="bg-no-repeat bg-center bg-contain"
                  style={{
                    backgroundImage: 'url(/Logo.png)',
                    width: '100px',
                    height: '50px',
                  }}
                  aria-label="Facet & Co."
                />
              </Link>

              {/* Right-side icons */}
              <div className="flex items-center space-x-4">
                {/* Search Icon */}
                <button
                  onClick={toggleSearchOverlay}
                  className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>

                {/* Cart Icon */}
                <button
                  onClick={toggleCartSlider}
                  className="relative p-1 text-gray-700 hover:text-black transition-colors duration-200"
                  aria-label="Cart"
                >
                  <ShoppingCart size={22} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                {/* Hamburger Menu Icon */}
                <button
                  onClick={toggleMobileMenu}
                  className="p-1 text-gray-700 hover:text-black transition-colors duration-200"
                  aria-label="Menu"
                >
                  <Menu size={24} />
                </button>
              </div>
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
                  className="h-10 w-auto object-contain"
                  style={{ minHeight: '40px', maxHeight: '48px' }}
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
            <div className="p-4 space-y-4">
              {!isShopOpen ? (
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
                  <button
                    onClick={toggleShop}
                    className="flex items-center justify-between w-full py-3 text-sm font-normal tracking-wide text-gray-700"
                  >
                    <span>Shop</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
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
                    Customize
                  </Link>
                </nav>
              ) : (
                <div>
                  <button
                    onClick={toggleShop}
                    className="flex items-center justify-between w-full py-3 text-sm font-normal tracking-wide text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Back to Main Menu</span>
                  </button>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="flex flex-col items-start">
                      <h3 className="font-bold text-sm mb-2">SHOP BY SHAPE</h3>
                      <ul className="space-y-1 pl-0">
                        <li className="flex items-center mb-2">
                          <img src="/Diamond Shapes/shop-by-round.jpg" alt="Round" className="w-6 h-6 mr-2"/>
                          <Link to="/products?shape=round" className="flex items-center text-sm text-gray-700 hover:bg-gray-50 py-2">Round</Link>
                        </li>
                        <li className="flex items-center mb-2">
                          <img src="/Diamond Shapes/shop-by-cushion.png" alt="Cushion" className="w-6 h-6 mr-2"/>
                          <Link to="/products?shape=cushion" className="block text-sm text-gray-700 hover:bg-gray-50">Cushion</Link>
                        </li>
                        <li className="flex items-center mb-2">
                          <img src="/Diamond Shapes/shop-by-emerald.jpg" alt="Emerald" className="w-6 h-6 mr-2"/>
                          <Link to="/products?shape=emerald" className="block text-sm text-gray-700 hover:bg-gray-50">Emerald</Link>
                        </li>
                        <li className="flex items-center mb-2">
                          <img src="/Diamond Shapes/shop-by-oval.jpg" alt="Oval" className="w-6 h-6 mr-2"/>
                          <Link to="/products?shape=oval" className="block text-sm text-gray-700 hover:bg-gray-50">Oval</Link>
                        </li>
                        <li className="flex items-center mb-2">
                          <img src="/Diamond Shapes/shop-by-princess.jpg" alt="Princess" className="w-6 h-6 mr-2"/>
                          <Link to="/products?shape=princess" className="block text-sm text-gray-700 hover:bg-gray-50">Princess</Link>
                        </li>
                        <li className="flex items-center mb-2">
                          <Link to="/products/shapes" className="block text-sm text-gray-700 hover:bg-gray-50">All Shapes</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="font-bold text-sm mb-2">SHOP BY COLOR</h3>
                      <ul className="space-y-1 pl-0">
                        <li><Link to="/products?color=white" className="block text-sm text-gray-700 hover:bg-gray-50 py-2">White</Link></li>
                        <li><Link to="/products?color=blue" className="block text-sm text-gray-700 hover:bg-gray-50">Blue</Link></li>
                        <li><Link to="/products?color=grey" className="block text-sm text-gray-700 hover:bg-gray-50">Grey</Link></li>
                        <li><Link to="/products?color=pink" className="block text-sm text-gray-700 hover:bg-gray-50">Pink</Link></li>
                        <li><Link to="/products?color=red" className="block text-sm text-gray-700 hover:bg-gray-50">Red</Link></li>
                        <li><Link to="/products?color=yellow" className="block text-sm text-gray-700 hover:bg-gray-50">Yellow</Link></li>
                        <li><Link to="/products?color=green" className="block text-sm text-gray-700 hover:bg-gray-50">Green</Link></li>
                        <li><Link to="/products?color=purple" className="block text-sm text-gray-700 hover:bg-gray-50">Purple</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Section */}
              <div className="border-t border-gray-200 pt-4 p-0">
                <a
                  href="mailto:hello@facetandco.com"
                  className="block py-3 text-sm font-normal tracking-wide text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  aria-label="Email"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
