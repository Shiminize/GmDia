import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import './Header.css';
import * as FaIcons from 'react-icons/fa';

const FaShoppingCart = FaIcons.FaShoppingCart as unknown as React.FC<React.ComponentProps<'svg'>>;
const FaUserAlt = FaIcons.FaUserAlt as unknown as React.FC<React.ComponentProps<'svg'>>;

const Header: React.FC = () => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const { cartItemCount } = useCart();

  const handleProductsHover = () => {
    setIsProductsDropdownOpen(true);
  };

  const handleProductsLeave = () => {
    setIsProductsDropdownOpen(false);
  };

  const handleAboutHover = () => {
    setIsAboutDropdownOpen(true);
  };

  const handleAboutLeave = () => {
    setIsAboutDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
    // In a real application, you would navigate to a search results page
  };

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <header className="app-header">
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
        height: '80px',
        position: 'relative',
      }}>
        <div className="logo" style={{ flex: '0 0 auto' }}>GemDia</div>
        <ul className="nav-links" style={{
          flex: '1 1 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          gap: '2rem',
          minWidth: 0
        }}>
          <li><Link to="/">Home</Link></li>
          <li
            onMouseEnter={handleProductsHover}
            onMouseLeave={handleProductsLeave}
            className="dropdown-container"
          >
            <Link to="/products">Products</Link>
            {isProductsDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/products/rings">Rings</Link></li>
                <li><Link to="/products/bands">Bands</Link></li>
                <li><Link to="/products/necklaces">Necklaces</Link></li>
                <li><Link to="/products/all">View All</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/customize">Customize</Link></li>
          <li
            onMouseEnter={handleAboutHover}
            onMouseLeave={handleAboutLeave}
            className="dropdown-container"
          >
            <Link to="/about">About Us</Link>
            {isAboutDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/education">Lab Diamond Education</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            )}
          </li>
          {user && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><span>Hello, {user.name}!</span></li>
              <li><button onClick={handleLogout} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer'}}>Logout</button></li>
            </>
          )}
        </ul>
        <form onSubmit={handleSearchSubmit} className="search-bar" style={{
          margin: '0 2rem',
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1
        }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          position: 'relative',
          zIndex: 2
        }}>
          <Link to="/cart" className="header-icon-btn" style={{
            background: 'rgba(239,231,221,0.65)',
            border: '1.5px solid var(--champagne-beige)',
            color: 'var(--graphite-black)',
            borderRadius: '50%',
            padding: '10px',
            fontWeight: 600,
            fontFamily: 'var(--font-secondary)',
            fontSize: '1.5rem',
            boxShadow: '0 4px 18px rgba(239,231,221,0.10)',
            backdropFilter: 'blur(10px)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            transition: 'background 0.3s, box-shadow 0.3s',
            opacity: 0.92,
            margin: 0
          }}
            aria-label="Cart"
          >
            <FaShoppingCart className="header-icon-svg" style={{ display: 'block', margin: 0, padding: 0, transition: 'color 0.3s' }} />
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ff4444',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 7px',
                fontSize: '12px',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
          {!user && (
            <Link to="/login" className="header-icon-btn" style={{
              background: 'rgba(239,231,221,0.65)',
              border: '1.5px solid var(--champagne-beige)',
              color: 'var(--graphite-black)',
              borderRadius: '50%',
              padding: '10px',
              fontWeight: 600,
              fontFamily: 'var(--font-secondary)',
              fontSize: '1.5rem',
              boxShadow: '0 4px 18px rgba(239,231,221,0.10)',
              backdropFilter: 'blur(10px)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              transition: 'background 0.3s, box-shadow 0.3s',
              opacity: 0.92,
              margin: 0
            }}
              aria-label="Login"
            >
              <FaUserAlt className="header-icon-svg" style={{ display: 'block', margin: 0, padding: 0, transition: 'color 0.3s' }} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
