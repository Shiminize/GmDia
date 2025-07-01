import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

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
      background: var(--digital-lavender);
      color: var(--graphite-black);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-medium);
      font-family: var(--font-secondary);
      font-size: 0.9rem;
      font-weight: 500;
      z-index: 10000;
      box-shadow: var(--shadow-medium);
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

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image"
          style={{ 
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}
        />
        
        {/* Stock Status Badge */}
        <div className={`stock-status ${stockInfo.status}`}>
          {stockInfo.text}
        </div>
      </div>

      <div className="product-info">
        {product.brand && (
          <div className="product-brand">{product.brand}</div>
        )}
        
        <h3 className="product-name">{product.name}</h3>
        
        <div className={`product-price ${isOnSale ? 'sale' : ''}`}>
          <span className="current-price">
            ${product.price.toLocaleString()}
          </span>
          {isOnSale && (
            <span className="original-price">
              ${product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>
        
        <p className="product-details">
          {product.metal} • {product.shape} Diamond
        </p>

        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn view-details-btn">
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className="btn add-to-cart-btn"
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