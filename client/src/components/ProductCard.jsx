import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

/**
 * ProductCard component for high-converting e-commerce category pages
 * @param {Object} props
 * @param {Object} props.product - Product data
 */
export default function ProductCard({ product }) {
  const videoRef = useRef(null);

  // Prevent navigation when clicking wishlist
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement wishlist logic (API call, toast, etc)
  };

  // Handle hover to play/pause video
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="block group rounded-xl overflow-hidden shadow-luxury bg-champagne hover:shadow-xl transition-all duration-300 relative product-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.videoUrl && (
          <video
            ref={videoRef}
            src={product.videoUrl}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        {product.isBestseller && (
          <span className="absolute top-3 left-3 bg-champagne text-graphite text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wide font-secondary">
            Bestseller
          </span>
        )}
        <button
          className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-champagne transition-colors z-10 btn-icon"
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <Heart size={20} className="text-champagne" fill="none" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-secondary font-semibold mb-1 line-clamp-2 text-graphite">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center font-secondary text-champagne font-bold">
            {product.rating}
            <Star className="ml-1 text-champagne" size={16} fill="currentColor" />
          </span>
          <span className="text-muted-foreground text-sm font-primary">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-graphite font-secondary">${product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <del className="text-gray-400 text-base font-primary">${product.oldPrice.toLocaleString()}</del>
          )}
        </div>
      </div>
    </Link>
  );
} 