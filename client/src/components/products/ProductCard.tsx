import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    metal: string;
    shape: string;
    description?: string; // Added optional description
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString()}</p>
      <button onClick={handleQuickViewClick}>Quick View</button>
      <Link to={`/products/${product.id}`}><button>View Details</button></Link>

      {isModalOpen && <QuickViewModal product={product} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductCard;