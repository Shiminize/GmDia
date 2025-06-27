import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <header className="app-header">
      <nav>
        <div className="logo">[Your Chosen Brand Name Here]</div>
        <ul className="nav-links">
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
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
