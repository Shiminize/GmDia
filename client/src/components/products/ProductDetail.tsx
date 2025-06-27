import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../common/Button';
import RelatedProducts from './RelatedProducts';
import { useCart } from '../../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const { addToCart } = useCart();

  // Placeholder product data - will be fetched from API later
  const product = {
    id: id || '1',
    name: `Product ${id} Name`,
    price: 1500,
    imageUrl: `https://via.placeholder.com/500x400?text=Product+${id}`,
    metal: 'Yellow Gold',
    shape: 'Round',
    description: 'This is a detailed description of the product. It highlights the craftsmanship, materials, ethical sourcing, and customization options available for this exquisite piece of jewelry.',
    features: [
      'Ethically Sourced Lab Diamond',
      '14K Gold Setting',
      'Lifetime Warranty',
      'Free Shipping & Returns',
      'Made to Order',
    ],
    reviews: [
      { id: 'r1', author: 'Jane Doe', rating: 5, comment: 'Absolutely stunning! The quality is exceptional and it looks even better in person.' },
      { id: 'r2', author: 'John Smith', rating: 4, comment: 'Very happy with my purchase. The customization process was easy and the delivery was fast.' },
    ],
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim() && reviewRating > 0) {
      console.log('New Review:', { text: reviewText, rating: reviewRating });
      alert('Review submitted! (Check console)');
      setReviewText('');
      setReviewRating(0);
    } else {
      alert('Please enter a review and select a rating.');
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-content">
        <div className="product-image-gallery">
          <img src={product.imageUrl} alt={product.name} />
          {/* Add more images/gallery here */}
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toLocaleString()}</p>
          <p>{product.description}</p>
          <ul className="product-features">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="product-actions">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button className="customize-btn">Customize This</Button>
          </div>
        </div>
      </div>

      <div className="product-reviews-section">
        <h2>Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="reviews-list">
            {product.reviews.map(review => (
              <div key={review.id} className="review-item">
                <p className="review-rating">Rating: {review.rating} / 5</p>
                <p className="review-comment">"{review.comment}"</p>
                <p className="review-author">- {review.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this product!</p>
        )}

        <div className="review-form-container">
          <h3>Write a Review</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="review-rating">Rating:</label>
              <select id="review-rating" value={reviewRating} onChange={(e) => setReviewRating(parseInt(e.target.value))}>
                <option value="0">Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="review-text">Your Review:</label>
              <textarea
                id="review-text"
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts on this product..."
              ></textarea>
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      </div>

      <RelatedProducts currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;