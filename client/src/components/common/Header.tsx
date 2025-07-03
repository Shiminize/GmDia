import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Diamond, Search, User, ShoppingCart, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartSliderOpen, setIsCartSliderOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearchOverlay = () => setIsSearchOverlayOpen(!isSearchOverlayOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const toggleCartSlider = () => setIsCartSliderOpen(!isCartSliderOpen);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-champagne/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <Diamond className="w-8 h-8 text-blush group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-2xl font-bold tracking-tight text-graphite font-primary">
                  GmDia
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
            <div className="hidden lg:flex items-center space-x-4">
              
              {/* CTA Button */}
              <Link
                to="/customize"
                className="bg-blush text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider
                  transition-all duration-300 shadow-md hover:bg-blush/90 hover:-translate-y-0.5 hover:shadow-lg"
              >
                How It Works
              </Link>

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
                className="relative p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg transition-all duration-300"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blush text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-graphite hover:text-blush hover:bg-blush/10 rounded-lg transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-graphite/50 backdrop-blur-sm transition-opacity duration-300 z-40
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white transform transition-transform duration-300 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-champagne/30">
              <Link to="/" className="flex items-center space-x-3">
                <Diamond className="w-6 h-6 text-blush" />
                <span className="text-xl font-bold text-graphite font-primary">GmDia</span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-graphite hover:text-blush rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="p-6 space-y-6">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                {[
                  { name: 'Rings', path: '/products' },
                  { name: 'Necklaces', path: '/products' },
                  { name: 'Tennis Bands', path: '/products' },
                  { name: 'Our Story', path: '/about' }
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`block py-3 text-lg font-medium text-graphite transition-colors duration-300 hover:text-blush
                      ${isActivePath(item.path) ? 'text-blush' : ''}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile CTA */}
              <Link
                to="/customize"
                className="block w-full bg-blush text-white text-center py-4 rounded-full font-semibold uppercase tracking-wider
                  transition-all duration-300 hover:bg-blush/90"
              >
                How It Works
              </Link>

              {/* Mobile Account Links */}
              <div className="space-y-3 pt-6 border-t border-champagne/30">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block py-2 text-graphite hover:text-blush transition-colors duration-300"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-graphite hover:text-blush transition-colors duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 text-graphite hover:text-blush transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 text-graphite hover:text-blush transition-colors duration-300"
                    >
                      Register
                    </Link>
                  </>
                )}
                
                {/* Mobile Cart */}
                <button
                  onClick={toggleCartSlider}
                  className="flex items-center justify-between w-full py-2 text-graphite hover:text-blush transition-colors duration-300"
                >
                  <span>Cart</span>
                  {cartItems.length > 0 && (
                    <span className="bg-blush text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Slider - Only render if cart should be open */}
      {isCartSliderOpen && (
        <div
          className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-50"
          onClick={() => setIsCartSliderOpen(false)}
        >
          <div
            className="fixed top-0 right-0 w-96 h-full bg-white transform transition-transform duration-300 ease-in-out translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-champagne/30">
              <h2 className="text-xl font-bold text-graphite">Shopping Cart</h2>
              <button
                onClick={() => setIsCartSliderOpen(false)}
                className="p-2 text-graphite hover:text-blush rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-champagne/20 rounded-lg">
                      <div className="w-16 h-16 bg-champagne rounded-lg flex items-center justify-center">
                        <Diamond className="w-8 h-8 text-blush" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-graphite">{item.name}</h3>
                        <p className="text-sm text-warm-gray">${item.price}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Link
                    to="/checkout"
                    className="block w-full bg-blush text-white text-center py-3 rounded-lg font-medium hover:bg-blush/90 transition-colors duration-200"
                    onClick={() => setIsCartSliderOpen(false)}
                  >
                    Checkout
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-champagne mx-auto mb-4" />
                  <p className="text-warm-gray">Your cart is empty</p>
                  <Link
                    to="/products"
                    className="inline-block mt-4 bg-blush text-white px-6 py-2 rounded-lg font-medium hover:bg-blush/90 transition-colors duration-200"
                    onClick={() => setIsCartSliderOpen(false)}
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
