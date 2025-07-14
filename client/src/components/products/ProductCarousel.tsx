import React from 'react';
import ProductCard from '../ProductCard';

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
  images?: string[]; // Added images property
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  return (
    <section className="py-8 sm:py-16 bg-ivory">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-2xl font-primary text-charcoal">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product={{
                ...product,
                images: product.images || [product.imageUrl] // Ensure images array is present
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel; 