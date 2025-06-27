import React from 'react';
import { useCart } from '../../contexts/CartContext';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toLocaleString()}</p>
              <div className="quantity-controls">
                <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
              </div>
              <Button onClick={() => removeFromCart(item.id)} className="remove-item-btn">Remove</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Total: ${cartTotal.toLocaleString()}</h2>
        <Button onClick={clearCart} className="clear-cart-btn">Clear Cart</Button>
        <Link to="/checkout"><Button className="checkout-btn">Proceed to Checkout</Button></Link>
      </div>
    </div>
  );
};

export default Cart;