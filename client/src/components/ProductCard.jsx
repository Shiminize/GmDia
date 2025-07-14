import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToWishlist = () => {}, onQuickView = () => {}, className = '' }) => {
  console.log('ProductCard product:', product); // Debug log
  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const formatPrice = (price) => {
    return price ? price.toLocaleString() : '0';
  };

  // Fallback for image source
  const imageSrc = (product.images && product.images[0]) || product.imageUrl;

  return (
    <Link 
      to={`/products/${product.id}`}
      className={`block group ${className}`}
    >
      <div 
        className="block group rounded-xl overflow-hidden shadow-luxury bg-card hover:shadow-xl transition-all duration-300 relative product-card"
      >
        {/* Product Image */}
        <div className="aspect-square bg-secondary/30 relative overflow-hidden">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No Image</span>
            </div>
          )}
          
          {/* Promotion badge */}
          {product.promotion && (
            <span className="absolute top-3 left-3 bg-secondary text-foreground px-3 py-1 rounded-full shadow-sm text-caption font-semibold">
              {product.promotion}
            </span>
          )}
          
          {/* Wishlist button */}
          <button 
            onClick={handleHeartClick}
            className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-secondary transition-colors z-10 btn-icon"
            aria-label="Add to wishlist"
          >
            <Heart size={20} className="text-accent-foreground" fill="none" />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-4 bg-card">
          <h3 className="text-[20px] font-semibold text-gray-900 leading-tight mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <span className="flex items-center text-label font-semibold">
              {product.rating || '5.0'}
              <Star className="ml-1 text-accent-foreground" size={16} fill="currentColor" />
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-price">${formatPrice(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 