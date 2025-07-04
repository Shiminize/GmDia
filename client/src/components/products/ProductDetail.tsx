import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import RelatedProducts from './RelatedProducts';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  metal: string;
  shape: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');

  useEffect(() => {
    // Placeholder: In a real app, you would fetch the product by ID from your API
    // For now, using hardcoded data
    const mockProduct: Product = {
    id: id || '1',
      name: 'Classic Solitaire Ring',
      price: 1200,
      description: 'A timeless classic featuring a stunning lab-grown diamond in a simple, elegant setting. Perfect for engagements or special occasions.',
      imageUrl: 'https://via.placeholder.com/500x400?text=Ring+Detail',
    metal: 'Yellow Gold',
      shape: 'Round'
    };
    setProduct(mockProduct);
    setSelectedMetal(mockProduct.metal);
    setSelectedShape(mockProduct.shape);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
    addToCart({
      id: product.id,
        name: `${product.name} (${selectedMetal}, ${selectedShape})`,
      price: product.price,
        image: product.imageUrl
    });
    alert(`${product.name} added to cart!`);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page px-6 md:px-16 py-section bg-ivory">
      <div className="product-detail-content">
        <div className="product-image-gallery mb-editorial-md">
          <img src={product.imageUrl} alt={product.name} />
          {/* Add more images/gallery here */}
        </div>
        <div className="product-info">
          <h1 className="font-primary text-graphite text-3xl md:text-4xl font-bold text-left mb-editorial-sm">{product.name}</h1>
          <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">${product.price.toLocaleString()}</p>
          <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">{product.description}</p>
          <ul className="product-features">
            {/* Add product features here */}
          </ul>
          <div className="product-options">
            <div className="option-group">
              <label htmlFor="metal-select">Metal:</label>
              <select 
                id="metal-select" 
                value={selectedMetal} 
                onChange={(e) => setSelectedMetal(e.target.value)}
              >
                <option value="Yellow Gold">Yellow Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>
            
            <div className="option-group">
              <label htmlFor="shape-select">Diamond Shape:</label>
              <select 
                id="shape-select" 
                value={selectedShape} 
                onChange={(e) => setSelectedShape(e.target.value)}
              >
                <option value="Round">Round</option>
                <option value="Oval">Oval</option>
                <option value="Princess">Princess</option>
                <option value="Emerald">Emerald</option>
              </select>
            </div>
          </div>
          <div className="product-actions flex-row gap-x-6 mt-editorial-lg">
            <Button onClick={handleAddToCart} className="add-to-cart-btn">
              Add to Cart - ${product.price.toLocaleString()}
            </Button>
            <Button className="customize-btn">Customize This</Button>
          </div>
        </div>
      </div>

      <div className="product-reviews-section">
        <h2>Customer Reviews</h2>
        {/* Add product reviews here */}
      </div>

      <RelatedProducts currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;