import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
  metalFilter: string;
  shapeFilter: string;
  sortBy: string;
}

const ProductList: React.FC<ProductListProps> = ({ metalFilter, shapeFilter, sortBy }) => {
  // Placeholder for product data - will eventually come from API
  const allProducts = [
    { id: '1', name: 'Classic Solitaire Ring', price: 1200, imageUrl: 'https://via.placeholder.com/300x200?text=Ring1', metal: 'Yellow Gold', shape: 'Round' },
    { id: '2', name: 'Diamond Tennis Bracelet', price: 2500, imageUrl: 'https://via.placeholder.com/300x200?text=Bracelet1', metal: 'White Gold', shape: 'Round' },
    { id: '3', name: 'Emerald Cut Necklace', price: 1800, imageUrl: 'https://via.placeholder.com/300x200?text=Necklace1', metal: 'Rose Gold', shape: 'Emerald' },
    { id: '4', name: 'Princess Cut Ring', price: 1500, imageUrl: 'https://via.placeholder.com/300x200?text=Ring2', metal: 'Platinum', shape: 'Princess' },
    { id: '5', name: 'Oval Diamond Pendant', price: 900, imageUrl: 'https://via.placeholder.com/300x200?text=Pendant1', metal: 'Yellow Gold', shape: 'Oval' },
  ];

  let filteredProducts = allProducts;

  // Apply filters
  if (metalFilter !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.metal === metalFilter);
  }
  if (shapeFilter !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.shape === shapeFilter);
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;