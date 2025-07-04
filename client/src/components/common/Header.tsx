import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Diamond, Search, User, ShoppingCart, Menu, X, LogOut, LogIn, UserPlus, MessageCircle } from 'lucide-react';

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
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const toggleSearchOverlay = () => setIsSearchOverlayOpen(!isSearchOverlayOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
                {[
                  { name: 'Rings', path: '/rings' },
                  { name: 'Necklaces', path: '/necklaces' },
                  { name: 'Tennis Bands', path: '/tennis-bands' },
                  { name: 'Our Story', path: '/about' }
                ].map((item) => (
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
                  transition-all duration-300 touch-target"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-graphite/50 backdrop-blur-sm transition-opacity duration-300 z-40
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={toggleMobileMenu}
        >
          <div
            className={`fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-white transform transition-transform 
              duration-300 ease-in-out overflow-y-auto safe-bottom ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-champagne/30 
              bg-white/95 backdrop-blur-sm safe-top">
              <Link 
                to="/" 
                className="flex items-center space-x-2 touch-target" 
                onClick={toggleMobileMenu}
              >
                <img 
                  src="/Logo.png" 
                  alt="Facet & Co. Logo" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="text-lg font-bold text-graphite font-primary">Facet & Co.</span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-graphite hover:text-blush rounded-lg touch-target"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-4 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {[
                  { name: 'Rings', path: '/rings' },
                  { name: 'Necklaces', path: '/necklaces' },
                  { name: 'Tennis Bands', path: '/tennis-bands' },
                  { name: 'Our Story', path: '/about' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className={`mobile-menu-link ${isActivePath(item.path) ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="h-px bg-champagne/30 my-4"></div>

              {/* Mobile CTA */}
              <Link
                to="/customize"
                onClick={toggleMobileMenu}
                className="block w-full bg-secondary text-secondary-foreground text-center py-3 px-6 rounded-lg font-medium
                  transition-all duration-300 hover:bg-secondary/90 active:transform active:scale-95 touch-target"
              >
                How It Works
              </Link>

              <div className="h-px bg-champagne/30 my-4"></div>

              {/* Mobile Account Links */}
              <div className="space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={toggleMobileMenu}
                      className="mobile-menu-link"
                    >
                      <div className="flex items-center space-x-2">
                        <User size={18} className="text-blush" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mobile-menu-link w-full text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut size={18} className="text-blush" />
                        <span>Sign Out</span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={toggleMobileMenu}
                      className="mobile-menu-link"
                    >
                      <div className="flex items-center space-x-2">
                        <LogIn size={18} className="text-blush" />
                        <span>Sign In</span>
                      </div>
                    </Link>
                    <Link
                      to="/register"
                      onClick={toggleMobileMenu}
                      className="mobile-menu-link"
                    >
                      <div className="flex items-center space-x-2">
                        <UserPlus size={18} className="text-blush" />
                        <span>Create Account</span>
                      </div>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Chat Button */}
              <button
                onClick={() => {
                  toggleMobileMenu();
                  // Add your chat functionality here
                }}
                className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground py-3 px-6 rounded-lg 
                  font-medium transition-all duration-300 hover:bg-primary/90 flex items-center justify-center 
                  space-x-2 touch-target safe-bottom"
              >
                <MessageCircle size={20} />
                <span>Chat with Expert</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
