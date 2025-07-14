
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageCircle, Star, User, ShoppingCart } from 'lucide-react';
import ThreeJSViewer from '../components/customization/ThreeJSViewer';
import ProductCard from '../components/ProductCard';
import TestimonialCard, { Testimonial } from '../components/TestimonialCard';
import { useCart } from '../contexts/CartContext';

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
];

const testimonials: Testimonial[] = [
    {
        name: 'Stewart P',
        verified: true,
        text: 'I had a great experience with Friendly Diamonds while shopping for an engagement ring. The prices were very reasonable, and the quality of...',
        source: 'Knot',
        date: 'Jun 8th, 2025',
      },
      {
        name: 'Francis Brenet Nicco',
        verified: true,
        text: 'This is my first lab grown diamond ring, and I was unsure where to purchase it. However, Friendly Diamonds proved to be the perfect...',
        source: 'Weddingwire',
        date: 'May 1st, 2025',
      },
      {
        name: 'Gary',
        verified: true,
        text: 'The staff at Friendly Diamonds was very courteous and helpful in my purchase of my engagement ring. They assisted me through each',
        source: 'Trustpilot',
        date: 'April 28th, 2025',
      },
];


const HomePageVariant: React.FC = () => {
  
  const { toggleCartSlider } = useCart();
  const navigationItems = [

    { name: 'About', path: '/about' },
    { name: 'Shop', path: '/products' },
    { name: 'News', path: '/education' },
    { name: 'Customize', path: '/customize' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary to-secondary">
      {/* Hero Section with Integrated Header */}
      <section className="relative h-screen w-full flex flex-col">
        <header className="absolute top-0 left-0 right-0 z-10 py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              Facet & Co.
            </Link>
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-white"><User size={18} /></Link>
                <button onClick={toggleCartSlider} className="text-white"><ShoppingCart size={18} /></button>
            </div>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </header>

        <div className="flex-grow flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-luxury-hero mb-4 text-white">
                Your Vision, Perfectly Crafted
              </h1>
              <p className="text-body-primary mb-8 text-white">
                Experience the future of jewelry with our fully customizable, lab-grown diamonds. Create a piece that is uniquely yours, from setting to stone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/customize" className="btn-primary">
                  Customize Your Ring <ChevronRight className="ml-2" size={16} />
                </Link>
                <Link to="/products" className="btn-secondary">
                  Explore Collections <MessageCircle className="ml-2" size={16} />
                </Link>
              </div>
            </div>

            {/* Right 3D Model Preview */}
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-full h-[50vh] lg:h-[70vh]">
                <ThreeJSViewer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-luxury-headline text-center mb-12 text-white">Explore Our Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onAddToWishlist={() => {}}
                onQuickView={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-luxury-headline text-center mb-12 text-white">Words of Brilliance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageVariant;
