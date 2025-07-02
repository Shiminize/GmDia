import React from 'react';
import './HomePage.css';
import ProductCarousel from '../components/products/ProductCarousel';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Diamond, Sparkles, Leaf, Gem, Hand, Settings } from 'lucide-react';

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
    name: 'Halo Engagement Ring',
    price: 3200,
    imageUrl: '/Ring-3.png',
    metal: 'Rose Gold',
    shape: 'Oval',
    brand: 'GemDia',
    inStock: true,
    stockCount: 3,
  },
  {
    id: 't4',
    name: 'Three Stone Ring',
    price: 4500,
    imageUrl: '/Ring-4.png',
    metal: 'Platinum',
    shape: 'Princess',
    brand: 'GemDia',
    inStock: true,
    stockCount: 1,
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
  const { user } = useAuth();
  
  const handleCTAClick = () => {
    // Navigate to customize page
    window.location.href = '/customize';
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-image"></div>
        <div className="container">
          <div className="hero-text">
            <h1>Your Story, Forged in Light</h1>
            <p>
              Design your own unique piece of jewelry with ethically sourced, high-quality lab-grown diamonds.
            </p>
            <div className="hero-buttons">
              <Link to="/customization" className="cta-button primary">
                Create Your Own
              </Link>
              <Link to="/products" className="cta-button secondary">
                Explore Designs
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-hint">Scroll to discover</div>
      </section>

      {/* Featured Categories Section */}
      <section className="featured-categories">
        <div className="container">
          <div className="section-header">
            <h2>Discover Your Style</h2>
            <p>
              From timeless rings to elegant necklaces and brilliant tennis bands, start with a style that speaks to you.
            </p>
          </div>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image">
                <img src="/Ring-1.png" alt="Custom Rings" />
              </div>
              <div className="category-content">
                <h3>Custom Rings</h3>
                <p>
                  Design an engagement ring or personal treasure that's uniquely yours.
                </p>
                <Link to="/customization" className="category-button">
                  Customize a Ring
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/Ring-2.png" alt="Custom Necklaces" />
              </div>
              <div className="category-content">
                <h3>Custom Necklaces</h3>
                <p>
                  Create a pendant or necklace that tells your personal story.
                </p>
                <Link to="/customization" className="category-button">
                  Customize a Necklace
                </Link>
              </div>
            </div>

            <div className="category-card">
              <div className="category-image">
                <img src="/Ring-3.png" alt="Tennis Bands" />
              </div>
              <div className="category-content">
                <h3>Tennis Bands</h3>
                <p>
                  Craft a band of brilliant, seamless light for any occasion.
                </p>
                <Link to="/customization" className="category-button">
                  Customize a Band
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How It Works</div>
            <h2>Create Your Perfect Piece in 3 Steps</h2>
            <p>
              Our intuitive customizer makes it simple to bring your vision to life.
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">
                <Settings />
              </div>
              <h3>1. Choose Your Setting</h3>
              <p>
                Select your base style and preferred metal—from classic 14k gold to modern platinum.
              </p>
            </div>

            <div className="step-item">
              <div className="step-icon">
                <Gem />
              </div>
              <h3>2. Select Your Diamond</h3>
              <p>
                Pick the perfect lab-grown diamond. Choose by shape, carat, and quality.
              </p>
            </div>

            <div className="step-item">
              <div className="step-icon">
                <Hand />
              </div>
              <h3>3. Add a Personal Touch</h3>
              <p>
                Make it truly yours with a custom engraving or other personal details.
              </p>
            </div>
          </div>
          <div className="section-cta">
            <Link to="/customization" className="cta-button primary">
              Start Designing Now
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story" id="our-story">
        <div className="container">
          <div className="section-header">
            <h2>Modern Alchemy, Conscious Choice</h2>
            <p>
              We believe in jewelry that not only looks beautiful but feels right. Our commitment is to exceptional quality, ethical practices, and a transparent process.
            </p>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <Leaf />
              </div>
              <h3>Ethically Sourced</h3>
              <p>
                Our lab-grown diamonds are a sustainable choice, free from the environmental and ethical concerns of mining.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">
                <Sparkles />
              </div>
              <h3>Unmatched Quality</h3>
              <p>
                Each diamond is hand-selected for its brilliance and fire, meeting the highest standards of quality and craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="trending-products">
        <div className="container">
          <div className="section-header">
            <h2>Trending Designs</h2>
            <p>Our most popular pieces, loved for their timeless elegance and exceptional craftsmanship.</p>
          </div>
          <ProductCarousel title="Trending Designs" products={trendingProducts} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

