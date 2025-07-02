import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSlider: React.FC<CartSliderProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [notes, setNotes] = useState('');

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="cart-slider-backdrop" onClick={onClose} />
      )}
      
      {/* Cart Slider */}
      <div className={`cart-slider ${isOpen ? 'cart-slider-open' : ''}`}>
        <div className="cart-slider-header">
          <h2>Your Cart</h2>
          <button className="cart-slider-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-slider-empty">
            <p>Your cart is empty</p>
            <button onClick={onClose} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-slider-content">
            {/* Cart Items */}
            <div className="cart-slider-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-slider-item">
                  <div className="cart-item-image-container">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-price">${item.price.toLocaleString()}</div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="cart-slider-footer">
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="cart-actions">
                <Link to="/cart" onClick={onClose} className="view-cart-btn">
                  View Cart
                </Link>
                <Link to="/checkout" onClick={onClose} className="checkout-btn">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [notes, setNotes] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="cart-page luxury-bg">
        <div className="container">
          <div className="cart-header">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page luxury-bg">
      <div className="container">
        <div className="cart-header">
      <h1>Your Cart</h1>
        </div>
        <div className="cart-content">
          {/* Cart Items List */}
          <div className="cart-items-list">
        {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image-container">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-meta">
                    <span className="cart-item-price">${item.price.toLocaleString()}</span>
                  </div>
                  <div className="cart-quantity-controls">
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="cart-notes">
            <label htmlFor="cart-notes">Order Notes or Special Requests</label>
            <textarea
              id="cart-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Let us know if you have any special instructions for your order..."
            />
          </div>

          {/* Cart Summary Section */}
          <section className="cart-summary-section">
            <h2>Order Summary</h2>
            <div className="cart-summary-row">
              <span>Items:</span>
              <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total:</span>
              <span>${cartTotal.toLocaleString()}</span>
          </div>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/checkout">
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </section>
      </div>
      </div>
    </div>
  );
};

export default Cart;