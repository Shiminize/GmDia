import React, { useState, useEffect } from 'react';
import './HomePage.css';
import ProductCarousel from '../components/products/ProductCarousel';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  Sparkles, 
  Leaf, 
  Gem, 
  Hand, 
  Settings, 
  MessageCircle,
  ArrowRight,
  Star,
  Shield,
  Heart,
  CheckCircle,
  ChevronRight,
  Play
} from 'lucide-react';

// Sample product data for featured designs
const featuredProducts = [
  {
    id: 'f1',
    name: 'Classic Solitaire',
    price: 2400,
    originalPrice: 3200,
    imageUrl: '/Ring-1.png',
    metal: 'Platinum',
    shape: 'Round',
    carat: '1.5ct',
    brand: 'GemDia',
    inStock: true,
    stockCount: 3,
    isNew: false,
    isBestseller: true
  },
  {
    id: 'f2',
    name: 'Vintage Halo',
    price: 3200,
    originalPrice: 4000,
    imageUrl: '/Ring-2.png',
    metal: 'Rose Gold',
    shape: 'Oval',
    carat: '2.0ct',
    brand: 'GemDia',
    inStock: true,
    stockCount: 2,
    isNew: true,
    isBestseller: false
  },
  {
    id: 'f3',
    name: 'Three Stone Elegance',
    price: 4500,
    originalPrice: 5500,
    imageUrl: '/Ring-3.png',
    metal: 'White Gold',
    shape: 'Princess',
    carat: '2.5ct',
    brand: 'GemDia',
    inStock: true,
    stockCount: 1,
    isNew: false,
    isBestseller: true
  },
  {
    id: 'f4',
    name: 'Modern Minimalist',
    price: 1800,
    originalPrice: 2400,
    imageUrl: '/Ring-4.png',
    metal: 'Yellow Gold',
    shape: 'Emerald',
    carat: '1.2ct',
    brand: 'GemDia',
    inStock: true,
    stockCount: 5,
    isNew: true,
    isBestseller: false
  },
  {
    id: 'f5',
    name: 'Art Deco Inspired',
    price: 3800,
    originalPrice: 4600,
    imageUrl: '/Ring-5.png',
    metal: 'Platinum',
    shape: 'Cushion',
    carat: '1.8ct',
    brand: 'GemDia',
    inStock: true,
    stockCount: 2,
    isNew: false,
    isBestseller: true
  }
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "New York",
    rating: 5,
    text: "The most beautiful ring I've ever seen. The lab-grown diamond sparkles just as brilliantly as any mined diamond, and I love knowing it's ethically sourced.",
    image: "/testimonial-1.jpg"
  },
  {
    id: 2,
    name: "Michael R.",
    location: "California",
    rating: 5,
    text: "Exceptional quality and service. The customization process was seamless, and the final result exceeded all expectations.",
    image: "/testimonial-2.jpg"
  },
  {
    id: 3,
    name: "Emma L.",
    location: "London",
    rating: 5,
    text: "I couldn't be happier with my engagement ring. The expert guidance made all the difference in finding the perfect design.",
    image: "/testimonial-3.jpg"
  }
];

const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuizStart = () => {
    // Navigate to ring finder quiz
    window.location.href = '/quiz';
  };

  const handleChatExpert = () => {
    // Open live chat or expert consultation
    console.log('Opening expert chat...');
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="home-page luxury-experience">
      {/* 1. Hero Section - Cinematic with Video */}
      <section className="hero-section cinematic">
        <div className="hero-media">
          {!isVideoPlaying ? (
            <>
              <div className="hero-image-container">
                <img 
                  src="/hero-ring-hand.jpg" 
                  alt="Lab-grown diamond engagement ring on elegant hand"
                  className="hero-image"
                />
                <div className="hero-overlay"></div>
              </div>
              <button 
                className="video-play-button"
                onClick={handleVideoPlay}
                aria-label="Play hero video"
              >
                <Play size={32} />
              </button>
            </>
          ) : (
            <video 
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        
        <div className="hero-content">
          <div className="container">
            <div className="hero-text-container">
              <h1 className="hero-headline">
                Ethical Brilliance,<br />
                Timeless Design
              </h1>
              <p className="hero-subtext">
                Explore lab-grown diamond engagement rings with expert guidance
              </p>
              
              <div className="hero-cta-group">
                <Link to="/quiz" className="cta-button primary large">
                  Find Your Ring
                  <ArrowRight size={20} />
                </Link>
                <button 
                  className="cta-button secondary large"
                  onClick={handleChatExpert}
                >
                  <MessageCircle size={20} />
                  Chat with a Diamond Expert
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Discover More</span>
        </div>
      </section>

      {/* 2. Quiz Preview Section */}
      <section className="quiz-preview-section">
        <div className="container">
          <div className="quiz-content">
            <div className="quiz-graphics">
              <div className="quiz-step-icons">
                <div className="quiz-icon">
                  <Heart size={32} />
                  <span>Style</span>
                </div>
                <div className="quiz-icon">
                  <Diamond size={32} />
                  <span>Diamond</span>
                </div>
                <div className="quiz-icon">
                  <Settings size={32} />
                  <span>Setting</span>
                </div>
              </div>
            </div>
            
            <div className="quiz-text">
              <h2 className="section-headline">Not sure where to start?</h2>
              <p className="section-description">
                Our personalized quiz helps you discover the perfect ring style based on your preferences and lifestyle.
              </p>
              
              <button 
                className="quiz-cta-button"
                onClick={handleQuizStart}
              >
                Take the 2-Minute Ring Finder Quiz
                <ChevronRight size={20} />
              </button>
              
              <div className="quiz-stats">
                <span>Over 10,000 couples found their perfect ring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Best Sellers / Featured Designs */}
      <section className="featured-designs-section">
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-headline">Best Sellers / Featured Designs</h2>
            <p className="section-description">
              Discover our most beloved designs, each crafted with exceptional attention to detail
            </p>
          </div>
          
          <div className="design-filters">
            <button className="filter-button active">All Styles</button>
            <button className="filter-button">Solitaire</button>
            <button className="filter-button">Halo</button>
            <button className="filter-button">Three Stone</button>
            <button className="filter-button">Vintage</button>
          </div>
          
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-product-card">
                {product.isBestseller && (
                  <div className="product-badge bestseller">Bestseller</div>
                )}
                {product.isNew && (
                  <div className="product-badge new">New</div>
                )}
                
                <div className="product-image-container">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-hover-overlay">
                    <img 
                      src={product.imageUrl.replace('.png', '-hand.png')} 
                      alt={`${product.name} on hand`}
                      className="product-hover-image"
                    />
                  </div>
                  
                  <div className="product-quick-actions">
                    <button className="quick-action-btn">Quick View</button>
                    <button className="quick-action-btn">Try On (AR)</button>
                  </div>
                </div>
                
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-specs">
                    <span>{product.carat} {product.shape}</span>
                    <span>{product.metal}</span>
                  </div>
                  <div className="product-pricing">
                    <span className="current-price">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  
                  <Link to={`/products/${product.id}`} className="product-cta">
                    View Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-footer">
            <Link to="/products" className="view-all-button">
              View All Designs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. About Lab Diamonds */}
      <section className="lab-diamonds-section">
        <div className="container">
          <div className="lab-diamonds-content">
            <div className="lab-diamonds-visual">
              <div className="diamond-animation">
                <Diamond size={120} className="rotating-diamond" />
              </div>
            </div>
            
            <div className="lab-diamonds-text">
              <h2 className="section-headline">Why Lab-Grown?</h2>
              
              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Leaf size={24} />
                  </div>
                  <div className="benefit-content">
                    <h4>Eco-friendly</h4>
                    <p>Sustainable choice with minimal environmental impact</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Shield size={24} />
                  </div>
                  <div className="benefit-content">
                    <h4>Conflict-free</h4>
                    <p>Ethically created without human rights concerns</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <Sparkles size={24} />
                  </div>
                  <div className="benefit-content">
                    <h4>Identical Brilliance</h4>
                    <p>Same chemical, physical, and optical properties as mined diamonds</p>
                  </div>
                </div>
              </div>
              
              <Link to="/lab-diamonds" className="learn-more-button">
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials / Social Proof */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header centered">
            <h2 className="section-headline">What Our Customers Say</h2>
            <div className="rating-summary">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="rating-text">4.9/5 based on 2,847 reviews</span>
            </div>
          </div>
          
          <div className="testimonials-carousel">
            <div className="testimonial-container">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        <img src={testimonial.image} alt={testimonial.name} />
                      </div>
                      <div className="author-info">
                        <span className="author-name">{testimonial.name}</span>
                        <span className="author-location">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="social-proof-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.2%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Support CTA */}
      <section className="live-support-section">
        <div className="container">
          <div className="support-content">
            <div className="expert-portrait">
              <img 
                src="/diamond-expert.jpg" 
                alt="Diamond Expert"
                className="expert-image"
              />
              <div className="expert-status">
                <div className="status-indicator online"></div>
                <span>Online Now</span>
              </div>
            </div>
            
            <div className="support-text">
              <h2 className="section-headline">Need Help Choosing?</h2>
              <p className="section-description">
                Our certified diamond experts are here to guide you through every step of finding your perfect ring.
              </p>
              
              <div className="support-features">
                <div className="feature-item">
                  <CheckCircle size={20} />
                  <span>Free 30-minute consultation</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={20} />
                  <span>GIA certified experts</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={20} />
                  <span>Virtual or in-person appointments</span>
                </div>
              </div>
              
              <div className="support-actions">
                <button 
                  className="cta-button primary"
                  onClick={handleChatExpert}
                >
                  <MessageCircle size={20} />
                  Talk to an Expert Now
                </button>
                <Link to="/appointment" className="cta-button secondary">
                  Schedule Virtual Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter & Trust Signals */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Join for Early Access + Exclusive Drops</h3>
              <p>Be the first to discover new collections and receive expert jewelry insights</p>
            </div>
            
            <form className="newsletter-form">
              <div className="email-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="email-input"
                  required
                />
                <button type="submit" className="subscribe-button">
                  Subscribe
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            
            <div className="trust-signals">
              <div className="trust-item">
                <Shield size={24} />
                <span>SSL Secured</span>
              </div>
              <div className="trust-item">
                <CheckCircle size={24} />
                <span>GIA Certified</span>
              </div>
              <div className="trust-item">
                <Diamond size={24} />
                <span>Lifetime Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

