import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard';
import api from '../../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  metalOptions: string[];
  diamondShapeOptions: string[];
}

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const products = await api.get('/products');
        
        // Filter out the current product and take the first 3 related products
        const filtered = products
          .filter((p: Product) => p._id !== currentProductId)
          .slice(0, 3);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="bg-white border-t border-champagne/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-16">
          <h2 className="font-serif text-2xl lg:text-3xl text-graphite font-medium mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-champagne/20 rounded-2xl mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-champagne/20 rounded w-3/4"></div>
                  <div className="h-4 bg-champagne/20 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null; // Don't render if no related products
  }

  return (
    <div className="bg-white border-t border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl lg:text-3xl text-graphite font-medium mb-4">
            You Might Also Like
          </h2>
          <p className="text-graphite/60 max-w-2xl mx-auto">
            Discover more exquisite pieces from our curated collection of lab-grown diamond jewelry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                metal: product.metalOptions[0] || 'yellow-gold',
                shape: product.diamondShapeOptions[0] || 'round',
                description: product.description,
                brand: 'Facet & Co.',
                inStock: true,
                stockCount: 5
              }} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-graphite text-white px-8 py-4 rounded-xl font-medium hover:bg-graphite/90 transition-all duration-200"
          >
            View All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
