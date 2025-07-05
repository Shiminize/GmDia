import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

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
      className="block group rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 relative"
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
          <span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">
            Bestseller
          </span>
        )}
        <button
          className="absolute top-3 right-3 bg-white/80 rounded-full p-2 hover:bg-pink-100 transition-colors z-10"
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 21s-6-4.35-9-8.5C-1.5 7.5 3.5 3 7.5 6.5c2.5 2.25 4.5 2.25 7 0C20.5 3 25.5 7.5 21 12.5 18 16.65 12 21 12 21z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500 font-bold flex items-center">
            {product.rating}
            <svg className="ml-1" width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          </span>
          <span className="text-gray-500 text-sm">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-pink-600">${product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <del className="text-gray-400 text-base">${product.oldPrice.toLocaleString()}</del>
          )}
        </div>
      </div>
    </Link>
  );
} 