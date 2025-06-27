import React from 'react';
import Button from '../common/Button';

interface QuickViewModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    metal: string;
    shape: string;
    description?: string;
  };
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <img src={product.imageUrl} alt={product.name} className="modal-product-image" />
          <div className="modal-product-details">
            <h2>{product.name}</h2>
            <p className="modal-product-price">${product.price.toLocaleString()}</p>
            <p><strong>Metal:</strong> {product.metal}</p>
            <p><strong>Diamond Shape:</strong> {product.shape}</p>
            {product.description && <p>{product.description}</p>}
            <Button onClick={() => alert('View Details clicked for ' + product.name)} className="modal-view-details-btn">View Full Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
