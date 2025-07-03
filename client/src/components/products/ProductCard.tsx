import React, { useState } from 'react';
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
      imageUrl: product.imageUrl
    });
    
    // Create a subtle notification instead of alert
    const notification = document.createElement('div');
    notification.textContent = `${product.name} added to cart!`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #CDB4DB;
      color: #1A1A1A;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-family: 'Playfair Display', serif;
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const getStockStatus = () => {
    if (product.inStock === false) return { status: 'out-of-stock', text: 'Sold Out' };
    if (product.stockCount && product.stockCount <= 3) return { status: 'low-stock', text: 'Few Left' };
    return { status: 'in-stock', text: 'In Stock' };
  };

  const stockInfo = getStockStatus();
  const isOnSale = product.originalPrice && product.originalPrice > product.price;

  const getStockBadgeClasses = () => {
    switch (stockInfo.status) {
      case 'out-of-stock':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-sage/20 text-sage border-sage/30';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-champagne overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Stock Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium border ${getStockBadgeClasses()}`}>
          {stockInfo.text}
        </div>

        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 right-3 bg-blush text-graphite px-2 py-1 rounded-md text-xs font-bold">
            SALE
          </div>
        )}
      </div>

      <div className="p-6">
        {product.brand && (
          <div className="text-sm text-graphite/60 font-medium mb-1 uppercase tracking-wide">{product.brand}</div>
        )}
        
        <h3 className="text-lg font-medium text-graphite mb-2 font-primary line-clamp-2">{product.name}</h3>
        
        <div className="mb-2">
          <span className="text-xl font-semibold text-lavender">
            ${product.price.toLocaleString()}
          </span>
          {isOnSale && (
            <span className="ml-2 text-sm text-graphite/50 line-through">
              ${product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
        
        <p className="text-sm text-graphite/70 mb-4">
          {product.metal} • {product.shape} Diamond
        </p>

        <div className="flex gap-2">
          <Link 
            to={`/products/${product.id}`} 
            className="flex-1 text-center bg-white border border-champagne text-graphite py-2 px-4 rounded-lg text-sm font-medium hover:bg-champagne/10 transition-colors duration-200"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
              product.inStock === false 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-lavender text-white hover:bg-lavender/90'
            }`}
            disabled={product.inStock === false}
          >
            {product.inStock === false ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;