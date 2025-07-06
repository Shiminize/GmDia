import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import api from '../../services/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  metalOptions: string[];
  diamondShapeOptions: string[];
}

interface ProductListProps {
  metalFilter: string;
  shapeFilter: string;
  sortBy: string;
  onProductCountChange?: (count: number) => void;
}

const ringImages = [
  '/Ring-1.png',
  '/Ring-2.png',
  '/Ring-3.png',
  '/Ring-4.png',
  '/Ring-5.png',
  '/Ring-6.png',
  '/Ring-7.png',
];

const genericPlaceholderImages = [
  '/Band-1.png',
  '/Ring-1.png',
  '/Ring-2.png',
  '/Ring-3.png',
  '/Ring-4.png',
  '/Ring-5.png',
  '/Ring-6.png',
  '/Ring-7.png',
];

// Loading skeleton component
const ProductSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-champagne/30 animate-pulse">
    <div className="aspect-[4/3] bg-champagne/20"></div>
    <div className="p-6">
      <div className="h-3 bg-champagne/20 rounded mb-2 w-16"></div>
      <div className="h-5 bg-champagne/20 rounded mb-3 w-3/4"></div>
      <div className="h-4 bg-champagne/20 rounded mb-4 w-1/2"></div>
      <div className="h-6 bg-champagne/20 rounded mb-5 w-20"></div>
      <div className="flex gap-3">
        <div className="flex-1 h-10 bg-champagne/20 rounded-xl"></div>
        <div className="flex-1 h-10 bg-champagne/20 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const ProductList: React.FC<ProductListProps> = ({ 
  metalFilter, 
  shapeFilter, 
  sortBy, 
  onProductCountChange 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products...');
      try {
        setLoading(true);
        const data = await api.products.getAll();
        console.log('Products fetched from API:', data);
        setProducts(data);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
        console.log('Loading state set to false.');
      }
    };

    fetchProducts();
  }, []);

  const processedProducts = React.useMemo(() => {
    try {
      // Apply filters to the original products array
      let filteredRawProducts = products;

      if (metalFilter !== 'All') {
        const normalizedMetalFilter = metalFilter.toLowerCase().replace(/ /g, '-');
        filteredRawProducts = filteredRawProducts.filter(product => 
          product.metalOptions.includes(normalizedMetalFilter)
        );
      }

      if (shapeFilter !== 'All') {
        const normalizedShapeFilter = shapeFilter.toLowerCase().replace(/ /g, '-');
        filteredRawProducts = filteredRawProducts.filter(product => 
          product.diamondShapeOptions.includes(normalizedShapeFilter)
        );
      }

      // Convert backend data to match frontend expectations
      let ringImageIdx = 0;
      let genericImageIdx = 0;
      const mappedProducts = filteredRawProducts.map(product => {
        if (!product || !product._id || !product.name) {
          console.error('Invalid product object:', product);
          return null;
        }
        let imageUrl = product.imageUrl || '';
        if (product.category === 'rings') {
          imageUrl = ringImages[ringImageIdx % ringImages.length];
          ringImageIdx++;
        } else if (imageUrl.includes('via.placeholder.com')) {
          imageUrl = genericPlaceholderImages[genericImageIdx % genericPlaceholderImages.length];
          genericImageIdx++;
        }
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          imageUrl,
          description: product.description,
          metal: product.metalOptions[0] || 'Yellow Gold',
          shape: product.diamondShapeOptions[0] || 'Round',
          brand: 'Facet & Co.',
          inStock: true,
          stockCount: Math.floor(Math.random() * 10) + 1, // Simulate stock count
        };
      }).filter((p): p is NonNullable<typeof p> => p !== null);

      // Apply sorting to the processed products
      mappedProducts.sort((a, b) => {
        if (!a || !b) return 0;
        switch (sortBy) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'newest':
            return Math.random() - 0.5;
          case 'featured':
          default:
            return Math.random() - 0.5;
        }
      });

      return mappedProducts;
    } catch (err) {
      console.error('Error processing products:', err);
      setError('Error processing products. See console for details.');
      return [];
    }
  }, [products, metalFilter, shapeFilter, sortBy]);

  // Update product count
  useEffect(() => {
    if (onProductCountChange) {
      onProductCountChange(processedProducts.length);
    }
  }, [processedProducts.length, onProductCountChange]);

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-12 bg-ivory">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-champagne/30">
              <div className="w-5 h-5 border-2 border-lavender/30 border-t-lavender rounded-full animate-spin"></div>
              <span className="text-graphite font-medium">Loading our beautiful collection...</span>
            </div>
          </div>
          
          {/* Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-24 bg-ivory">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-blush/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blush" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-graphite mb-4">Something went wrong</h2>
            <p className="text-graphite/70 mb-6 leading-relaxed">
              We're sorry, but we couldn't load our products at the moment. Please try refreshing the page or contact us for assistance.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-graphite text-white px-6 py-3 rounded-xl font-medium hover:bg-graphite/90 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-24 bg-ivory">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-sage/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-graphite mb-4">No products found</h2>
            <p className="text-graphite/70 mb-6 leading-relaxed">
              We couldn't find any products matching your current filters. Try adjusting your criteria or browse our full collection.
            </p>
            <button 
              onClick={() => {
                // This would trigger filter reset in parent component
                window.location.href = '/products';
              }}
              className="inline-flex items-center gap-2 bg-sage text-white px-6 py-3 rounded-xl font-medium hover:bg-sage/90 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              View All Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 md:px-8 lg:px-16 py-8 lg:py-12 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl text-graphite mb-2">
              Our Collection
            </h1>
            <p className="text-graphite/70">
              {processedProducts.length} {processedProducts.length === 1 ? 'piece' : 'pieces'} found
            </p>
          </div>
          
          {/* Optional: Add view toggle for grid/list */}
          <div className="hidden md:flex items-center gap-2 bg-white rounded-xl p-1 border border-champagne/30">
            <button className="p-2 bg-graphite text-white rounded-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
              </svg>
            </button>
            <button className="p-2 text-graphite/50 hover:text-graphite transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {processedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Section (for future pagination) */}
        {processedProducts.length >= 12 && (
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-2 bg-white border border-champagne text-graphite px-8 py-4 rounded-xl font-medium hover:bg-champagne/10 transition-all duration-200 shadow-sm">
              Load More Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductList;