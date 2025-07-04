import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../common/Button';
import RelatedProducts from './RelatedProducts';
import { useCart } from '../../contexts/CartContext';
import api from '../../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  metalOptions: string[];
  diamondShapeOptions: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock additional images for gallery
  const additionalImages = [
    '/Ring-1.png',
    '/Ring-2.png',
    '/Ring-3.png',
    '/Ring-4.png',
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const products = await api.get('/products');
        const foundProduct = products.find((p: Product) => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedMetal(foundProduct.metalOptions[0] || 'yellow-gold');
          setSelectedShape(foundProduct.diamondShapeOptions[0] || 'round');
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product._id,
        name: `${product.name} (${selectedMetal.replace('-', ' ')}, ${selectedShape})`,
        price: product.price,
        image: additionalImages[selectedImageIndex]
      };
      
      for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
      }
      
      // Create elegant notification
      const notification = document.createElement('div');
      notification.textContent = `${quantity} × ${product.name} added to cart`;
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
      
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideInFade 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
      }, 2500);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatOptionName = (option: string) => {
    return option.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-lavender/30 border-t-lavender rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-graphite font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-blush/20 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blush" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-graphite mb-4">Product Not Found</h2>
          <p className="text-graphite/70 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-graphite text-white px-6 py-3 rounded-xl font-medium hover:bg-graphite/90 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-champagne/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4">
          <nav className="flex items-center gap-2 text-sm text-graphite/60">
            <Link to="/" className="hover:text-graphite transition-colors duration-200">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/products" className="hover:text-graphite transition-colors duration-200">Products</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-graphite font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-champagne/30 shadow-sm">
              <img 
                src={additionalImages[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {additionalImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-blush shadow-md' 
                      : 'border-champagne/30 hover:border-champagne'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="text-xs text-graphite/60 font-medium uppercase tracking-wider">
                Facet & Co.
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl text-graphite font-medium leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="font-serif text-3xl text-graphite font-semibold">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-2 text-sm text-sage">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>In Stock</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-graphite max-w-none">
              <p className="text-graphite/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Metal Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-graphite">
                  Metal Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedMetal === metal
                          ? 'border-blush bg-blush/10 text-graphite'
                          : 'border-champagne/30 bg-white hover:border-champagne text-graphite/70 hover:text-graphite'
                      }`}
                    >
                      <div className="font-medium">{formatOptionName(metal)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Diamond Shape Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-graphite">
                  Diamond Shape
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.diamondShapeOptions.map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setSelectedShape(shape)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedShape === shape
                          ? 'border-blush bg-blush/10 text-graphite'
                          : 'border-champagne/30 bg-white hover:border-champagne text-graphite/70 hover:text-graphite'
                      }`}
                    >
                      <div className="font-medium">{formatOptionName(shape)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-graphite">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-champagne/30 bg-white hover:bg-champagne/10 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-champagne/30 bg-white hover:bg-champagne/10 transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-graphite text-white py-4 px-6 rounded-xl font-medium hover:bg-graphite/90 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8.5" />
                  </svg>
                  Add to Cart • {formatPrice(product.price * quantity)}
                </button>
                <button className="px-6 py-4 rounded-xl border border-champagne text-graphite hover:bg-champagne/10 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <Link
                to="/configurator"
                className="block w-full bg-white border border-champagne text-graphite py-4 px-6 rounded-xl font-medium hover:bg-champagne/10 transition-all duration-200 text-center"
              >
                Customize This Design
              </Link>
            </div>

            {/* Product Features */}
            <div className="space-y-4 pt-8 border-t border-champagne/30">
              <h3 className="font-medium text-graphite">Product Features</h3>
              <ul className="space-y-3 text-sm text-graphite/70">
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Lab-grown diamonds with certified quality
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Ethically sourced materials
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Lifetime warranty and free resizing
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-sage" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Free shipping and 30-day returns
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product._id} />
    </div>
  );
};

export default ProductDetail;