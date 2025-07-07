import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hand,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Star,
  Heart
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const diamondRef = useRef<HTMLDivElement>(null);
  const featuredProductsRef = useRef<HTMLDivElement>(null);
  const [featuredProductsVisible, setFeaturedProductsVisible] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for Diamond Animation
  useEffect(() => {
    const localDiamondRef = diamondRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // setIsDiamondVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '50px' // Start animation 50px before entering viewport
      }
    );

    if (localDiamondRef) {
      observer.observe(localDiamondRef);
    }

    return () => {
      if (localDiamondRef) {
        observer.unobserve(localDiamondRef);
      }
    };
  }, []);

  // Intersection Observer for Featured Products Animation
  useEffect(() => {
    const localFeaturedProductsRef = featuredProductsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFeaturedProductsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '50px' // Start animation 50px before entering viewport
      }
    );

    if (localFeaturedProductsRef) {
      observer.observe(localFeaturedProductsRef);
    }

    return () => {
      if (localFeaturedProductsRef) {
        observer.unobserve(localFeaturedProductsRef);
      }
    };
  }, []);

  const handleQuizStart = () => {
    window.location.href = '/quiz';
  };

  const handleChatExpert = () => {
    console.log('Opening expert chat...');
  };

  const handleVideoLoaded = useCallback(() => {
    console.log('✅ Video loaded successfully');
    setVideoLoaded(true);
    setIsLoading(false);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Failed to play video:', error);
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
  }, [retryCount, maxRetries]);

  const handleVideoError = useCallback((error: any) => {
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
  }, [retryCount, maxRetries]);

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
  }, [key, retryCount, handleVideoError, handleVideoLoaded]);

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
  }, [isLoading, retryCount, handleVideoError, handleVideoLoaded]);

  return (
    <div className="min-h-screen flex flex-col bg-champagne">
      {/* Hero Section - Cinematic with Video */}
      <section className="hero-section-isolated relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <div className="video-container-isolated absolute inset-0 w-full h-full">
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
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    <p className="text-body-sm text-charcoal">Loading video...</p>
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

        {/* Centered Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-ivory/95 p-6 sm:p-8 rounded-lg shadow-2xl border border-border animate-fadeIn text-left max-w-md w-[90vw] pointer-events-auto">
            <h1 className="font-primary text-graphite text-5xl md:text-6xl font-bold text-left leading-tight tracking-tight mb-4">
              Ethical Brilliance,<br />
              Timeless Design
            </h1>
            <p className="font-secondary text-graphite/80 text-lg md:text-xl mt-editorial-md text-left leading-relaxed mb-6">
              Discover our collection of lab-grown diamonds, crafted with precision and care for
              the modern conscious consumer.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleQuizStart}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold 
                  uppercase tracking-wider rounded-full shadow-md hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg 
                  transition-all duration-300 w-full"
              >
                Find Your Perfect Ring
                <ChevronRight className="ml-2" size={16} />
              </button>
              <button 
                onClick={handleChatExpert}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-graphite text-sm font-semibold 
                  uppercase tracking-wider rounded-full border border-blush/30 hover:bg-accent/10 hover:text-accent 
                  hover:border-accent transition-all duration-300 w-full"
              >
                <MessageCircle className="mr-2" size={16} />
                Design Your Own
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
      <section className="py-12 sm:py-16 lg:py-24 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Content Side - Mobile First */}
            <div className="flex-1 max-w-2xl text-center lg:text-left order-2 lg:order-1">
              <h2 className="text-h1 font-bold text-graphite mb-4 sm:mb-6 lg:mb-8 font-primary leading-tight">
                Find Your Dream Ring in Minutes
              </h2>
              <p className="text-body-lg text-graphite/70 mb-6 sm:mb-8 lg:mb-10 leading-relaxed font-secondary">
                Take our personalized quiz to discover ring styles that match your unique preferences, 
                lifestyle, and budget. Get expert recommendations in just 2 minutes.
              </p>
              
              {/* Mobile-optimized CTA */}
              <button
                onClick={handleQuizStart}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 lg:py-5 
                  bg-secondary text-secondary-foreground text-sm sm:text-base font-semibold uppercase tracking-wider 
                  rounded-full shadow-lg hover:bg-secondary/90 hover:-translate-y-1 hover:shadow-xl 
                  transition-all duration-300 min-w-[200px]"
              >
                Start Ring Finder Quiz
                <ArrowRight className="ml-2 sm:ml-3" size={16} />
              </button>
              
              {/* Trust indicators - Mobile optimized */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 mt-6 sm:mt-8">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="text-secondary fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-graphite/70 font-medium">5.0 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="text-secondary" size={16} />
                  <span className="text-sm text-graphite/70 font-medium">10,000+ Happy Couples</span>
                </div>
              </div>
            </div>
            
            {/* Image Side - Mobile First */}
            <div className="flex-1 relative w-full max-w-lg sm:max-w-xl lg:max-w-none order-1 lg:order-2">
              <div className="relative">
                {/* Main luxurious image */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img
                    src="/Luxurious.png"
                    alt="Elegant woman wearing luxurious diamond jewelry"
                    className="w-full h-auto object-cover aspect-square sm:aspect-square"
                  />
                  {/* Subtle overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating quiz preview card - Enhanced for mobile */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 
                  bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 
                  shadow-xl border border-champagne/20 max-w-[200px] sm:max-w-none">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Sparkles className="text-secondary" size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-graphite">Personalized Match</span>
                  </div>
                  <p className="text-xs sm:text-sm text-graphite/70">Based on your unique style</p>
                </div>
                
                {/* Success stats card - Enhanced for mobile */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 
                  bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 
                  shadow-xl border border-champagne/20">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Star className="text-secondary" size={12} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-graphite">96% Match Rate</span>
                  </div>
                  <p className="text-xs sm:text-sm text-graphite/70 whitespace-nowrap">Perfect ring found</p>
                </div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute top-1/4 -right-2 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 
                  bg-gradient-to-br from-secondary/20 to-blush/20 rounded-full blur-sm animate-pulse"></div>
                <div className="absolute bottom-1/3 -left-2 sm:-left-4 w-6 h-6 sm:w-10 sm:h-10 
                  bg-gradient-to-br from-blush/20 to-champagne/20 rounded-full blur-sm animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
          
          {/* Additional mobile-optimized content */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                { icon: MessageCircle, title: "2-Minute Quiz", description: "Quick & personalized" },
                { icon: Heart, title: "Perfect Match", description: "Tailored to your style" },
                { icon: Sparkles, title: "Expert Guidance", description: "Professional recommendations" }
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="text-secondary" size={20} />
                  </div>
                  <h3 className="text-h6 font-semibold text-graphite mb-2 font-primary">{feature.title}</h3>
                  <p className="text-body-sm text-graphite/70 font-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-champagne">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-h1 font-bold text-graphite text-center mb-8 sm:mb-10 lg:mb-12 font-primary">
              Featured Designs
            </h2>
            <p className="text-body-lg text-graphite/70">Discover our most loved and newest creations</p>
          </div>

          <div 
            ref={featuredProductsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transform transition-all duration-700 ease-out ${
                  featuredProductsVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 sm:translate-y-12 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms` // Staggered animation
                }}
              >
                <ProductCard product={product} />
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
                <img
                  src="/lab-diamond.jpg"
                  alt="Lab-grown diamond"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <h2 className="text-h1 font-bold text-graphite mb-6 font-primary">
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
                    icon: CheckCircle,
                    title: "Eco-Friendly Choice",
                    text: "Sustainable production with minimal environmental impact."
                  },
                  {
                    icon: CheckCircle,
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
              <div className="relative aspect-square w-full">
                <img
                  src="/expert.png"
                  alt="Jewelry expert"
                  className="rounded-lg shadow-xl w-full h-full object-cover aspect-square"
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
              <h2 className="text-h1 font-bold text-graphite mb-6 font-primary">
                Expert Guidance, Always Available
              </h2>
              <p className="text-body-lg text-graphite/80 mb-6 sm:mb-8 leading-relaxed font-secondary">
                Connect with our certified gemologists and jewelry experts for personalized advice. 
                From diamond education to custom design consultations, we're here to guide your journey.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: MessageCircle, text: "24/7 Live Chat" },
                  { icon: Hand, text: "Custom Design Help" },
                  { icon: CheckCircle, text: "Quality Assurance" }
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
            <h2 className="text-h2 font-bold text-graphite mb-3 sm:mb-4 font-primary">
              Stay Updated with GmDia
            </h2>
            <p className="text-body-lg text-graphite/70 mb-6 sm:mb-8 font-secondary">
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
                { icon: CheckCircle, text: "No Spam" },
                { icon: CheckCircle, text: "Exclusive Benefits" }
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

