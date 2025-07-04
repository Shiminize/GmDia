import React, { useState, useEffect, useRef } from 'react';
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
    console.log('🚀 NUCLEAR MENU TOGGLE:', { 
      from: isMobileMenuOpen, 
      to: newState,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 50)
    });
    setIsMobileMenuOpen(newState);
    
    // Lock/unlock body scroll
    if (newState) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
      console.log('🔒 Body scroll locked, menu should be visible with z-index 9999999');
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      console.log('🔓 Body scroll unlocked, menu closed');
    }
  };

  const closeMobileMenu = () => {
    console.log('❌ NUCLEAR MENU CLOSE triggered');
    setIsMobileMenuOpen(false);
    // Unlock body scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
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

  // Cleanup effect for body scroll lock
  useEffect(() => {
    return () => {
      // Cleanup body scroll lock on unmount
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-champagne/30 safe-top
          ${isScrolled ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group touch-target">
                <img 
                  src="/Logo.png" 
                  alt="Facet & Co. Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-graphite font-primary">
                  Facet & Co.
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-auto">
              <div className="flex items-center space-x-12">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`header-nav-link text-lg ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-graphite hover:text-blush transition-colors duration-300">
                    <User size={20} />
                    <span className="font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible
                    group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-graphite hover:text-blush transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-colors duration-300"
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button
                  onClick={toggleSearchOverlay}
                  className="p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg transition-all duration-300"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
                
                {isSearchOverlayOpen && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-luxury border border-champagne/30 p-4 z-50">
                    <input
                      type="text"
                      placeholder="Search jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-blush/20 focus:border-blush"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg transition-all duration-300"
                  aria-label="Profile"
                >
                  <User size={20} />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-luxury border border-champagne/30 py-2 z-50">
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors duration-300"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors duration-300"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors duration-300"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-graphite hover:bg-blush/5 hover:text-blush transition-colors duration-300"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCartSlider}
                className="relative p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg 
                  transition-all duration-300 touch-target"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-semibold 
                    w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={toggleCartSlider}
                className="relative p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg 
                  transition-all duration-300 touch-target"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-semibold 
                    w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg 
                  transition-all duration-300 touch-target relative"
                aria-label="Toggle mobile menu"
              >
                <div className="relative">
                  <Menu 
                    size={24} 
                    className={`transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
                  />
                  <X 
                    size={24} 
                    className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`mobile-menu-nuclear-overlay transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={closeMobileMenu}
        >
          {/* Mobile Menu Panel */}
          <div
            className={`mobile-menu-nuclear-panel ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-champagne/20 
              bg-white/95 backdrop-blur-sm">
              <Link 
                to="/" 
                className="flex items-center space-x-3 touch-target" 
                onClick={closeMobileMenu}
              >
                <img 
                  src="/Logo.png" 
                  alt="Facet & Co. Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-bold text-graphite font-primary">Facet & Co.</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-graphite hover:text-blush rounded-lg touch-target transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="px-6 py-8">
              {/* Main Navigation */}
              <nav className="space-y-1 mb-8">
                <h3 className="text-xs font-semibold text-graphite/60 uppercase tracking-wider mb-4">
                  Navigation
                </h3>
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`block py-3 px-4 text-lg font-medium rounded-lg transition-all duration-200
                      ${isActivePath(item.path) 
                        ? 'bg-secondary/10 text-secondary border-l-4 border-secondary' 
                        : 'text-graphite hover:bg-champagne/50 hover:text-blush'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-semibold text-graphite/60 uppercase tracking-wider mb-4">
                  Quick Actions
                </h3>
                <Link
                  to="/quiz"
                  onClick={closeMobileMenu}
                  className="block w-full bg-gradient-to-r from-secondary to-accent text-white text-center 
                    py-4 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg 
                    active:transform active:scale-95"
                >
                  Take Ring Quiz
                </Link>
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="block w-full border-2 border-secondary text-secondary text-center 
                    py-4 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-secondary 
                    hover:text-white active:transform active:scale-95"
                >
                  Contact Expert
                </Link>
              </div>

              {/* Account Section */}
              <div className="space-y-3 border-t border-champagne/30 pt-8">
                <h3 className="text-xs font-semibold text-graphite/60 uppercase tracking-wider mb-4">
                  Account
                </h3>
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 p-4 bg-champagne/30 rounded-lg mb-4">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-graphite">{user.name}</p>
                        <p className="text-sm text-graphite/60">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 py-3 px-4 text-graphite hover:bg-champagne/50 
                        rounded-lg transition-colors duration-200"
                    >
                      <User size={20} className="text-blush" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full py-3 px-4 text-graphite hover:bg-champagne/50 
                        rounded-lg transition-colors duration-200 text-left"
                    >
                      <LogOut size={20} className="text-blush" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 py-3 px-4 text-graphite hover:bg-champagne/50 
                        rounded-lg transition-colors duration-200"
                    >
                      <LogIn size={20} className="text-blush" />
                      <span className="font-medium">Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 py-3 px-4 text-graphite hover:bg-champagne/50 
                        rounded-lg transition-colors duration-200"
                    >
                      <UserPlus size={20} className="text-blush" />
                      <span className="font-medium">Create Account</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Support Section */}
              <div className="mt-8 p-4 bg-gradient-to-br from-champagne/20 to-blush/10 rounded-lg">
                <h4 className="font-medium text-graphite mb-2">Need Help?</h4>
                <p className="text-sm text-graphite/70 mb-3">
                  Chat with our jewelry experts for personalized assistance.
                </p>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    // Add chat functionality here
                  }}
                  className="flex items-center justify-center space-x-2 w-full bg-primary text-white 
                    py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-primary/90 
                    active:transform active:scale-95"
                >
                  <MessageCircle size={18} />
                  <span>Start Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
