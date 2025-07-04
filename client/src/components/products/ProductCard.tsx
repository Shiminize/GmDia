import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    metal: string;
    shape: string;
    description?: string;
    brand?: string;
    originalPrice?: number;
    inStock?: boolean;
    stockCount?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl
    });
    
    // Create elegant notification
    const notification = document.createElement('div');
    notification.textContent = `${product.name} added to cart`;
    notification.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      color: #1A1A1A;
      padding: 16px 24px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(205, 180, 219, 0.2);
      animation: slideInFade 0.4s ease-out;
      max-width: 300px;
    `;
    
    // Add CSS animation
    if (!document.querySelector('#notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        @keyframes slideInFade {
          0% { opacity: 0; transform: translateX(100%) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideInFade 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  };

  const getStockStatus = () => {
    if (product.inStock === false) return { status: 'out-of-stock', text: 'Sold Out' };
    if (product.stockCount && product.stockCount <= 3) return { status: 'low-stock', text: 'Few Left' };
    return { status: 'in-stock', text: 'In Stock' };
  };

  const stockInfo = getStockStatus();
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStockBadgeClasses = () => {
    switch (stockInfo.status) {
      case 'out-of-stock':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'low-stock':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-sage/10 text-sage border border-sage/20';
    }
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-champagne/30 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory/30">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Stock Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${getStockBadgeClasses()}`}>
          {stockInfo.text}
        </div>

        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-4 right-4 bg-blush text-graphite px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm border border-white/20">
            SALE
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex gap-2">
            <Link 
              to={`/products/${product.id}`} 
              className="flex-1 bg-white/90 backdrop-blur-sm border border-white/20 text-graphite py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-white transition-all duration-200 text-center"
            >
              View Details
            </Link>
            <button 
              onClick={handleAddToCart} 
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                product.inStock === false 
                  ? 'bg-gray-100/90 text-gray-400 cursor-not-allowed border border-gray-200/20' 
                  : 'bg-graphite/90 text-white hover:bg-graphite border border-graphite/20'
              }`}
              disabled={product.inStock === false}
            >
              {product.inStock === false ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Brand */}
        {product.brand && (
          <div className="text-xs text-graphite/60 font-medium mb-2 uppercase tracking-wider">
            {product.brand}
          </div>
        )}
        
        {/* Product Name */}
        <h3 className="font-serif text-lg text-graphite font-medium mb-3 leading-tight line-clamp-2 group-hover:text-blush transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Product Details */}
        <div className="flex items-center gap-2 text-sm text-graphite/70 mb-4">
          <span className="capitalize">{product.metal.replace('-', ' ')}</span>
          <span className="w-1 h-1 bg-graphite/30 rounded-full"></span>
          <span className="capitalize">{product.shape} Diamond</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-serif text-xl text-graphite font-semibold">
            {formatPrice(product.price)}
          </span>
          {isOnSale && product.originalPrice && (
            <span className="text-sm text-graphite/50 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Desktop Actions (hidden on mobile, shown on hover) */}
        <div className="hidden md:flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link 
            to={`/products/${product.id}`} 
            className="flex-1 text-center bg-ivory border border-champagne text-graphite py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-champagne/20 transition-all duration-200"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
              product.inStock === false 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-graphite text-white hover:bg-graphite/90'
            }`}
            disabled={product.inStock === false}
          >
            {product.inStock === false ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>

        {/* Mobile Actions (always visible on mobile) */}
        <div className="flex md:hidden gap-3">
          <Link 
            to={`/products/${product.id}`} 
            className="flex-1 text-center bg-ivory border border-champagne text-graphite py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-champagne/20 transition-all duration-200"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
              product.inStock === false 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-graphite text-white hover:bg-graphite/90'
            }`}
            disabled={product.inStock === false}
          >
            {product.inStock === false ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;