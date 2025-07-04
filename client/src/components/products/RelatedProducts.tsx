import React from 'react';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  // Placeholder for related product data - will be fetched from API later
  const allProducts = [
    { id: '1', name: 'Classic Solitaire Ring', price: 1200, imageUrl: 'https://via.placeholder.com/300x200?text=Ring1', metal: 'Yellow Gold', shape: 'Round' },
    { id: '2', name: 'Diamond Tennis Bracelet', price: 2500, imageUrl: 'https://via.placeholder.com/300x200?text=Bracelet1', metal: 'White Gold', shape: 'Round' },
    { id: '3', name: 'Emerald Cut Necklace', price: 1800, imageUrl: 'https://via.placeholder.com/300x200?text=Necklace1', metal: 'Rose Gold', shape: 'Emerald' },
    { id: '4', name: 'Princess Cut Ring', price: 1500, imageUrl: 'https://via.placeholder.com/300x200?text=Ring2', metal: 'Platinum', shape: 'Princess' },
    { id: '5', name: 'Oval Diamond Pendant', price: 900, imageUrl: 'https://via.placeholder.com/300x200?text=Pendant1', metal: 'Yellow Gold', shape: 'Oval' },
  ];

  // Filter out the current product and take the first 3 related products
  const relatedProducts = allProducts.filter(p => p.id !== currentProductId).slice(0, 3);

  if (relatedProducts.length === 0) {
    return null; // Don't render if no related products
  }

  return (
    <div className="related-products-section px-6 md:px-16 py-section bg-ivory">
      <h2 className="font-primary text-graphite text-lg md:text-xl font-semibold text-left mb-editorial-sm">You Might Also Like</h2>
      <div className="related-products-list">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
