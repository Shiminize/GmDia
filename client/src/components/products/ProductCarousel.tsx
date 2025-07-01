import React from 'react';
import ProductCard from './ProductCard';
import './ProductCarousel.css';

interface Product {
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
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-list">
        {products.map(product => (
          <div className="carousel-item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel; 