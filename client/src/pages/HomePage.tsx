import React, { useState, useEffect } from 'react';
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
  Eye
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
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuizStart = () => {
    window.location.href = '/quiz';
  };

  const handleChatExpert = () => {
    console.log('Opening expert chat...');
  };

  const handleVideoLoaded = () => {
    console.log('✅ Video loaded successfully in HomePage');
    setVideoLoaded(true);
  };

  const handleVideoError = (e: any) => {
    console.error('❌ Video error in HomePage:', e);
    setVideoError(true);
  };

  const handleVideoCanPlay = () => {
    console.log('🎬 Video can play in HomePage');
  };

  return (
    <div className="min-h-screen flex flex-col bg-champagne">
      {/* Hero Section - Cinematic with Video */}
      <section className="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden">
        <div className="relative w-full h-full">
          {/* Background image that shows immediately */}
          <img 
            src="/hero-ring-hand.jpg" 
            alt="Lab-grown diamond engagement ring on elegant hand"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Video overlay that only shows when loaded and not errored */}
          {!videoError && (
            <video 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Luxury diamond ad video"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              onCanPlay={handleVideoCanPlay}
            >
              <source src="/hero-video/video_creation_luxury_diamond_ad.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* Debug indicators */}
          <div className="absolute top-4 left-4 space-y-1">
            {!videoLoaded && !videoError && (
              <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded">
                Loading video...
              </div>
            )}
            {videoLoaded && (
              <div className="bg-green-500 text-white text-xs px-3 py-1 rounded">
                Video loaded ✅
              </div>
            )}
            {videoError && (
              <div className="bg-red-500 text-white text-xs px-3 py-1 rounded">
                Video failed ❌
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-graphite/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="max-w-xl bg-ivory/90 backdrop-blur-sm p-10 rounded-lg animate-fadeIn">
            <h1 className="text-5xl font-bold text-graphite leading-tight tracking-tight mb-6">
              Ethical Brilliance,<br />
              Timeless Design
            </h1>
            <p className="text-lg text-graphite/80 leading-relaxed mb-8">
              Discover our collection of lab-grown diamonds, crafted with precision and care for the modern conscious consumer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleQuizStart}
                className="inline-flex items-center justify-center px-8 py-4 bg-graphite text-white text-sm font-semibold 
                  uppercase tracking-wider rounded-full shadow-md hover:bg-blush hover:-translate-y-0.5 hover:shadow-lg 
                  transition-all duration-300"
              >
                Find Your Perfect Ring
                <ChevronRight className="ml-2" size={16} />
              </button>
              <button 
                onClick={handleChatExpert}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-graphite text-sm font-semibold 
                  uppercase tracking-wider rounded-full border border-blush/30 hover:bg-lavender/10 hover:text-lavender 
                  hover:border-lavender transition-all duration-300"
              >
                Chat with Expert
                <MessageCircle className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="w-0.5 h-16 bg-white/30 rounded-full">
            <div className="w-full h-1/2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quiz Preview Section */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl font-bold text-graphite mb-6">
                Find Your Dream Ring in Minutes
              </h2>
              <p className="text-lg text-graphite/70 mb-8">
                Answer a few simple questions and let our intelligent ring finder guide you to your perfect match.
              </p>
              <div className="flex flex-wrap gap-8 mb-12">
                {[
                  { icon: Diamond, text: "Choose Style" },
                  { icon: Settings, text: "Customize Design" },
                  { icon: Heart, text: "Find Perfect Match" }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center mb-4
                      transform hover:rotate-12 transition-transform duration-300">
                      <item.icon size={32} className="text-blush" />
                    </div>
                    <span className="text-sm font-medium text-graphite">{item.text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleQuizStart}
                className="inline-flex items-center justify-center px-8 py-4 bg-blush text-white text-sm font-semibold 
                  uppercase tracking-wider rounded-full shadow-md hover:bg-blush/90 hover:-translate-y-0.5 
                  hover:shadow-lg transition-all duration-300"
              >
                Start Ring Finder Quiz
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
            <div className="flex-1 relative">
              <img
                src="/quiz-preview.jpg"
                alt="Ring customization interface"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="text-blush" size={20} />
                  <span className="text-sm font-semibold text-graphite">96% Match Rate</span>
                </div>
                <p className="text-xs text-graphite/60">Based on 10,000+ successful matches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <section className="py-20 bg-champagne">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-graphite mb-4">Featured Designs</h2>
            <p className="text-lg text-graphite/70">Discover our most loved and newest creations</p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            {['All', 'Bestsellers', 'New Arrivals', 'Solitaire', 'Halo'].map((filter, index) => (
              <button
                key={index}
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  index === 0 ? 'bg-blush text-white' : 'bg-white/80 text-graphite hover:bg-blush/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-lg
                hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-lavender text-white text-xs font-semibold px-3 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isBestseller && (
                  <span className="absolute top-4 right-4 bg-blush text-white text-xs font-semibold px-3 py-1 rounded-full">
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
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center
                        hover:bg-blush hover:text-white transition-colors duration-300">
                        <Heart size={20} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center
                        hover:bg-blush hover:text-white transition-colors duration-300">
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-graphite mb-2">{product.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-graphite/70 mb-4">
                    <span>{product.metal}</span>
                    <span>•</span>
                    <span>{product.shape}</span>
                    <span>•</span>
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
                    <button className="px-4 py-2 bg-graphite text-white text-sm font-medium rounded-full
                      hover:bg-blush transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 border border-graphite text-graphite
                text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-graphite hover:text-white
                transition-all duration-300"
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
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 animate-spin-slow">
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
                className="inline-flex items-center justify-center px-8 py-4 bg-graphite text-white
                  text-sm font-semibold uppercase tracking-wider rounded-full shadow-md
                  hover:bg-blush hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Chat with Expert Now
                <MessageCircle className="ml-2" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-champagne">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-graphite mb-4">
              Stay Updated with GmDia
            </h2>
            <p className="text-lg text-graphite/70 mb-8">
              Subscribe to receive exclusive offers, new design launches, and expert jewelry tips.
            </p>
            <form className="flex gap-4 mb-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-blush/30 focus:outline-none
                  focus:ring-2 focus:ring-blush focus:border-transparent"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-graphite text-white text-sm font-semibold uppercase
                  tracking-wider rounded-full hover:bg-blush transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <div className="flex flex-wrap justify-center gap-8">
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

