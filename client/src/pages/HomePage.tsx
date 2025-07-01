import React from 'react';
import './HomePage.css';
import ProductCarousel from '../components/products/ProductCarousel';
import { Link } from 'react-router-dom';

const trendingProducts = [
  {
    id: 't1',
    name: 'Classic Solitaire Ring',
    price: 1200,
    imageUrl: '/Ring-1.png',
    metal: 'Yellow Gold',
    shape: 'Round',
    brand: 'GemDia',
    inStock: true,
    stockCount: 5,
  },
  {
    id: 't2',
    name: 'Diamond Tennis Bracelet',
    price: 2500,
    imageUrl: '/Ring-2.png',
    metal: 'White Gold',
    shape: 'Round',
    brand: 'GemDia',
    inStock: true,
    stockCount: 2,
  },
  {
    id: 't3',
    name: 'Emerald Cut Necklace',
    price: 1800,
    imageUrl: '/Ring-3.png',
    metal: 'Rose Gold',
    shape: 'Emerald',
    brand: 'GemDia',
    inStock: true,
    stockCount: 7,
  },
  {
    id: 't4',
    name: 'Princess Cut Ring',
    price: 1500,
    imageUrl: '/Ring-4.png',
    metal: 'Platinum',
    shape: 'Princess',
    brand: 'GemDia',
    inStock: true,
    stockCount: 3,
  },
];

const newInProducts = [
  {
    id: 'n1',
    name: 'Oval Diamond Pendant',
    price: 900,
    imageUrl: '/Ring-5.png',
    metal: 'Yellow Gold',
    shape: 'Oval',
    brand: 'GemDia',
    inStock: true,
    stockCount: 8,
  },
  {
    id: 'n2',
    name: 'Blue Sapphire Ring',
    price: 2100,
    imageUrl: '/Ring-6.png',
    metal: 'White Gold',
    shape: 'Round',
    brand: 'GemDia',
    inStock: true,
    stockCount: 4,
  },
  {
    id: 'n3',
    name: 'Vintage Halo Earrings',
    price: 1750,
    imageUrl: '/Ring-7.png',
    metal: 'Rose Gold',
    shape: 'Cushion',
    brand: 'GemDia',
    inStock: true,
    stockCount: 6,
  },
  {
    id: 'n4',
    name: 'Marquise Diamond Band',
    price: 1950,
    imageUrl: '/Ring-1.png',
    metal: 'Platinum',
    shape: 'Marquise',
    brand: 'GemDia',
    inStock: true,
    stockCount: 2,
  },
];

const HomePage: React.FC = () => {
  const handleCTAClick = () => {
    // Navigate to customize page
    window.location.href = '/customize';
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-image"></div>
        <div className="hero-text">
          <h1>Your Vision, Our Craftsmanship</h1>
          <p>Create bespoke lab-grown diamond jewelry that reflects your unique story and style.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <button className="cta-button" onClick={handleCTAClick}>
              Design Your Masterpiece
            </button>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button className="cta-button collection-btn">
                Collection
              </button>
            </Link>
          </div>
        </div>
        <div className="scroll-hint" title="Discover more below"></div>
      </section>

      <ProductCarousel title="Trending" products={trendingProducts} />
      <ProductCarousel title="New In" products={newInProducts} />

      {/* Future sections can be added here */}
      <section className="luxury-showcase">
        {/* This section is ready for future content expansion */}
      </section>
    </div>
  );
};

export default HomePage;
