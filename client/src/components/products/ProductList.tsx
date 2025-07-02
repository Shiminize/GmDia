import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
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
        const data = await api.get('/products');
        console.log('Products fetched successfully:', data);
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
      let imageUrl = product.imageUrl;
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
        brand: 'GemDia',
        inStock: true,
        stockCount: Math.floor(Math.random() * 10) + 1, // Simulate stock count
      };
    });

    // Apply sorting to the processed products
    mappedProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          // Simulate newest products (in real app, would sort by creation date)
          return Math.random() - 0.5;
        case 'featured':
        default:
          // Simulate featured products (in real app, would sort by featured flag)
          return Math.random() - 0.5;
      }
    });

    return mappedProducts;
  }, [products, metalFilter, shapeFilter, sortBy]);

  // Update product count
  useEffect(() => {
    if (onProductCountChange) {
      onProductCountChange(processedProducts.length);
    }
  }, [processedProducts.length, onProductCountChange]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading our beautiful collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>We're sorry, but we couldn't load our products at the moment.</p>
        <p>Please try refreshing the page or contact us for assistance.</p>
      </div>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <div className="no-products">
        <p>No products found matching your criteria.</p>
        <p>Try adjusting your filters or browse our full collection.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {processedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;