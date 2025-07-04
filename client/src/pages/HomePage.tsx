import React, { useState, useEffect, useRef } from 'react';
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
  Play,
  Eye,
  ChevronDown
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
    brand: 'Facet & Co.',
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
    brand: 'Facet & Co.',
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
    brand: 'Facet & Co.',
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
    brand: 'Facet & Co.',
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
    brand: 'Facet & Co.',
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const [isDiamondVisible, setIsDiamondVisible] = useState(false);
  const diamondRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for Diamond Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsDiamondVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '50px' // Start animation 50px before entering viewport
      }
    );

    if (diamondRef.current) {
      observer.observe(diamondRef.current);
    }

    return () => {
      if (diamondRef.current) {
        observer.unobserve(diamondRef.current);
      }
    };
  }, []);

  // Force video remount if not loaded after timeout
  useEffect(() => {
    if (isLoading && retryCount < maxRetries) {
      const timeout = setTimeout(() => {
        console.log(`🔄 Forcing video remount (attempt ${retryCount + 1} of ${maxRetries})...`);
        setKey(prev => prev + 1);
        setRetryCount(prev => prev + 1);
      }, 5000);
      return () => clearTimeout(timeout);
    } else if (retryCount >= maxRetries) {
      console.log('❌ Max retry attempts reached, falling back to static image');
      setVideoError(true);
      setIsLoading(false);
    }
  }, [isLoading, retryCount]);

  const handleQuizStart = () => {
    window.location.href = '/quiz';
  };

  const handleChatExpert = () => {
    console.log('Opening expert chat...');
  };

  const handleVideoLoaded = () => {
    console.log('✅ Video loaded successfully');
    setVideoLoaded(true);
    setIsLoading(false);
    
    // Try to play the video
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Failed to play video:', error);
          // Only retry if it's an autoplay error
          if (error.name === 'NotAllowedError' && retryCount < maxRetries) {
            console.log(`🔄 Retrying video play with muted state (attempt ${retryCount + 1} of ${maxRetries})...`);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(e => {
                console.error('Failed to play muted video:', e);
                setVideoError(true);
              });
            }
          } else {
            setVideoError(true);
          }
        });
      }
    }
  };

  const handleVideoError = (error: any) => {
    console.error('❌ Video error:', error);
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying video load (attempt ${retryCount + 1} of ${maxRetries})...`);
      setKey(prev => prev + 1);
      setRetryCount(prev => prev + 1);
    } else {
      console.log('❌ Max retry attempts reached, falling back to static image');
      setVideoError(true);
      setIsLoading(false);
    }
  };

  // Debug video loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const debugVideoState = () => {
        console.log('Video state:', {
          readyState: videoElement.readyState,
          networkState: videoElement.networkState,
          error: videoElement.error,
          currentSrc: videoElement.currentSrc,
          paused: videoElement.paused,
          currentTime: videoElement.currentTime,
          duration: videoElement.duration,
          ended: videoElement.ended,
          muted: videoElement.muted,
          volume: videoElement.volume,
        });
      };

      // Add event listeners
      const eventHandlers = {
        loadstart: () => {
          console.log('🔄 Video load started');
          setIsLoading(true);
        },
        loadedmetadata: () => console.log('📋 Video metadata loaded'),
        loadeddata: () => handleVideoLoaded(),
        canplay: () => console.log('▶️ Video can play'),
        playing: () => console.log('🎬 Video started playing'),
        pause: () => console.log('⏸️ Video paused'),
        error: (e: Event) => {
          const error = (e.target as HTMLVideoElement).error;
          handleVideoError(error);
        },
        stalled: () => console.log('⚠️ Video stalled'),
        waiting: () => console.log('⏳ Video buffering'),
      };

      // Add all event listeners
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        videoElement.addEventListener(event, handler);
      });

      // Initial debug log
      debugVideoState();

      // Clean up event listeners
      return () => {
        Object.entries(eventHandlers).forEach(([event, handler]) => {
          videoElement.removeEventListener(event, handler);
        });
      };
    }
  }, [key, retryCount]);

  return (
    <div className="min-h-screen flex flex-col bg-champagne">
      {/* Hero Section - Cinematic with Video */}
      <section className="relative h-[100vh] w-full flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* Background image that shows immediately - lowest layer */}
          <img 
            src="/hero-ring-hand.jpg" 
            alt="Lab-grown diamond engagement ring on elegant hand"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          {/* Video overlay */}
          {!videoError && (
            <>
              {/* Loading spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    <p className="text-primary-foreground text-sm font-medium">Loading video...</p>
                  </div>
                </div>
              )}
              
              {/* Video element */}
              <video 
                ref={videoRef}
                key={`hero-video-${key}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/hero-ring-hand.jpg"
                aria-label="Luxury diamond ad video"
              >
                <source src="/hero-video/video_creation_luxury_diamond_ad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 z-20"></div>
        </div>

        {/* Content overlay */}
        <div className="relative container mx-auto px-4 z-30">
          <div className="max-w-xl bg-ivory/90 backdrop-blur-sm p-6 sm:p-10 rounded-lg animate-fadeIn">
            <h1 className="text-3xl sm:text-5xl font-bold text-graphite leading-tight tracking-tight mb-4 sm:mb-6">
              Ethical Brilliance,<br />
              Timeless Design
            </h1>
            <p className="text-base sm:text-lg text-graphite/80 leading-relaxed mb-6 sm:mb-8">
              Discover our collection of lab-grown diamonds, crafted with precision and care for the modern conscious consumer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={handleQuizStart}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground text-sm font-semibold 
                  uppercase tracking-wider rounded-full shadow-md hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg 
                  transition-all duration-300 w-full sm:w-auto"
              >
                Find Your Perfect Ring
                <ChevronRight className="ml-2" size={16} />
              </button>
              <button 
                onClick={handleChatExpert}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-graphite text-sm font-semibold 
                  uppercase tracking-wider rounded-full border border-blush/30 hover:bg-lavender/10 hover:text-lavender 
                  hover:border-lavender transition-all duration-300 w-full sm:w-auto"
              >
                Chat with Expert
                <MessageCircle className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <ChevronDown className="text-primary-foreground w-6 h-6" />
          </div>
        </div>
      </section>

      {/* Quiz Preview Section */}
      <section className="py-12 sm:py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="flex-1 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-graphite mb-4 sm:mb-6">
                Find Your Dream Ring in Minutes
              </h2>
              <p className="text-base sm:text-lg text-graphite/70 mb-6 sm:mb-8">
                Take a moment to reflect on what truly speaks to you. Our thoughtful quiz guides you through discovering your perfect ring, just like you.
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-12 justify-center sm:justify-start">
                {[
                  { icon: Diamond, text: "Choose Style" },
                  { icon: Settings, text: "Customize Design" },
                  { icon: Heart, text: "Find Perfect Match" }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mb-3 sm:mb-4
                      transform hover:rotate-12 transition-transform duration-300">
                      <item.icon size={28} className="text-secondary" />
                    </div>
                    <span className="text-sm font-medium text-graphite">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleQuizStart}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-secondary-foreground 
                  text-sm font-semibold uppercase tracking-wider rounded-full shadow-md hover:bg-secondary/90 hover:-translate-y-0.5 
                  hover:shadow-lg transition-all duration-300"
              >
                Start Ring Finder Quiz
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
            <div className="flex-1 relative w-full max-w-md lg:max-w-none">
              {/* Main contemplative image */}
              <div className="relative">
                <img
                  src="/Quiz_photo.png"
                  alt="Thoughtful woman contemplating her perfect ring choice"
                  className="w-full rounded-2xl shadow-2xl"
                />
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                
                {/* Floating quiz preview card */}
                <div className="absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-secondary" size={16} />
                    <span className="text-sm font-semibold text-foreground">Personalized Match</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on your unique style</p>
                </div>
                
                {/* Success stats card */}
                <div className="absolute -top-4 -right-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="text-secondary" size={16} />
                    <span className="text-sm font-semibold text-foreground">96% Match Rate</span>
                  </div>
                  <p className="text-xs text-muted-foreground">10,000+ happy couples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <section className="py-12 sm:py-20 bg-champagne">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-graphite mb-3 sm:mb-4">Featured Designs</h2>
            <p className="text-base sm:text-lg text-graphite/70">Discover our most loved and newest creations</p>
          </div>

          <div className="flex justify-start sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-4 sm:pb-0 
            scrollbar-thin scrollbar-thumb-blush/20 scrollbar-track-transparent">
            {['All', 'Bestsellers', 'New Arrivals', 'Solitaire', 'Halo'].map((filter, index) => (
              <button
                key={index}
                className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                  index === 0 ? 'bg-secondary text-secondary-foreground' : 'bg-white/80 text-foreground hover:bg-secondary/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-lg
                hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Bestseller
                  </span>
                )}
                <div className="relative aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-graphite/40 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center
                        hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
                        <Heart size={20} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center
                        hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-graphite mb-2">{product.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-graphite/70 mb-4">
                    <span>{product.metal}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{product.shape}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{product.carat}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-graphite">${product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm line-through text-graphite/50">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full
                      hover:bg-secondary transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-primary text-foreground
                text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-primary hover:text-primary-foreground
                transition-all duration-300 w-full sm:w-auto"
            >
              View All Designs
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lab Diamonds Section */}
      <section className="py-20 bg-ivory overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div ref={diamondRef} className="relative w-full aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-3/4 h-3/4 transition-all duration-500 ${
                    isDiamondVisible 
                      ? 'motion-safe:animate-spin-elegant motion-reduce:animate-pulse opacity-100' 
                      : 'opacity-0'
                  }`}>
                    <Diamond size={64} className="text-blush absolute" />
                  </div>
                </div>
                <img
                  src="/lab-diamond.jpg"
                  alt="Lab-grown diamond"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl font-bold text-graphite mb-6">
                The Future of Fine Jewelry
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Identical Brilliance",
                    text: "Lab-grown diamonds possess the same physical and optical properties as mined diamonds."
                  },
                  {
                    icon: Leaf,
                    title: "Eco-Friendly Choice",
                    text: "Sustainable production with minimal environmental impact."
                  },
                  {
                    icon: Shield,
                    title: "Ethical Sourcing",
                    text: "100% conflict-free with transparent origin and manufacturing process."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                      <benefit.icon size={24} className="text-blush" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-graphite mb-2">{benefit.title}</h4>
                      <p className="text-graphite/70">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/education"
                className="inline-flex items-center mt-8 text-blush hover:text-lavender transition-colors duration-300"
              >
                Learn more about lab-grown diamonds
                <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-champagne">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={24} className="text-blush fill-current" />
              ))}
            </div>
            <p className="text-xl font-semibold text-graphite">
              Trusted by 10,000+ happy customers
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={16} className="text-blush fill-current" />
                        ))}
                      </div>
                      <p className="text-lg text-graphite/80 mb-6">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-graphite">{testimonial.name}</p>
                          <p className="text-sm text-graphite/60">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                    ${index === currentTestimonial ? 'w-8 bg-blush' : 'bg-blush/30'}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "100%", label: "Satisfaction Rate" },
              { number: "30+", label: "Design Options" },
              { number: "24/7", label: "Expert Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-graphite mb-2">{stat.number}</p>
                <p className="text-sm text-graphite/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Support Section */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="relative">
                <img
                  src="/expert-support.jpg"
                  alt="Jewelry expert"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-graphite">Online Now</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl font-bold text-graphite mb-6">
                Expert Guidance at Your Fingertips
              </h2>
              <p className="text-lg text-graphite/70 mb-8">
                Our jewelry specialists are here to help you make the perfect choice.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: MessageCircle, text: "24/7 Live Chat" },
                  { icon: Diamond, text: "Diamond Expertise" },
                  { icon: Hand, text: "Custom Design Help" },
                  { icon: Gem, text: "Quality Assurance" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon size={20} className="text-blush" />
                    <span className="text-sm font-medium text-graphite">{feature.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleChatExpert}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground
                  text-sm font-semibold uppercase tracking-wider rounded-full shadow-md
                  hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Chat with Expert Now
                <MessageCircle className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-20 bg-champagne">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-graphite mb-3 sm:mb-4">
              Stay Updated with GmDia
            </h2>
            <p className="text-base sm:text-lg text-graphite/70 mb-6 sm:mb-8">
              Subscribe to receive exclusive offers, new design launches, and expert jewelry tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-blush/30 focus:outline-none
                  focus:ring-2 focus:ring-blush focus:border-transparent text-base"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground text-sm font-semibold uppercase
                  tracking-wider rounded-full hover:bg-secondary transition-colors duration-300 w-full sm:w-auto"
              >
                Subscribe
              </button>
            </form>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {[
                { icon: Shield, text: "Privacy Protected" },
                { icon: CheckCircle, text: "No Spam" },
                { icon: Heart, text: "Exclusive Benefits" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-graphite/60">
                  <item.icon size={16} />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

