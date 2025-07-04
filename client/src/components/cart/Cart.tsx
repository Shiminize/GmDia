import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSlider: React.FC<CartSliderProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-40 transition-opacity duration-300" 
          onClick={onClose} 
        />
      )}
      
      {/* Cart Slider */}
      <div className={`fixed top-0 right-0 h-full w-96 max-w-full bg-ivory shadow-2xl transform transition-transform duration-300 z-50 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-6 border-b border-champagne bg-ivory">
          <h2 className="text-h2 text-charcoal">Your Cart</h2>
          <button 
            className="w-8 h-8 flex items-center justify-center text-graphite hover:text-lavender transition-colors duration-200 text-2xl" 
            onClick={onClose} 
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-graphite mb-6 font-secondary text-lg">Your cart is empty</p>
            <button 
              onClick={onClose} 
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border border-champagne">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-graphite truncate font-primary">{item.name}</h4>
                    <div className="text-lg font-semibold text-lavender mt-1">${item.price.toLocaleString()}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-champagne rounded-md">
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-graphite hover:bg-champagne disabled:opacity-50 disabled:cursor-not-allowed" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-graphite hover:bg-champagne" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="text-sm text-blush hover:text-blush/80 font-medium transition-colors duration-200" 
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
            <div className="border-t border-champagne p-6 bg-ivory">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-graphite">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-graphite border-t border-champagne pt-2">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link 
                  to="/cart" 
                  onClick={onClose} 
                  className="block w-full text-center bg-white border border-champagne text-graphite py-3 rounded-lg font-medium hover:bg-champagne/10 transition-colors duration-200"
                >
                  View Cart
                </Link>
                <Link 
                  to="/checkout" 
                  onClick={onClose} 
                  className="block w-full text-center bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-200"
                >
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
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-champagne py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-graphite mb-4 font-primary">Your Cart</h1>
            <p className="text-lg text-graphite/70">Your cart is empty.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-champagne py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-graphite font-primary">Your Cart</h1>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-champagne p-6">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium text-graphite font-primary">{item.name}</h3>
                    <div className="text-lg font-semibold text-lavender mt-2">
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-champagne rounded-lg">
                        <button 
                          className="w-10 h-10 flex items-center justify-center text-graphite hover:bg-champagne disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button 
                          className="w-10 h-10 flex items-center justify-center text-graphite hover:bg-champagne rounded-r-lg" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="text-blush hover:text-blush/80 font-medium transition-colors duration-200" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="mt-8 lg:mt-0 space-y-6">
            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-sm border border-champagne p-6">
              <label htmlFor="cart-notes" className="block text-sm font-medium text-graphite mb-2">
                Order Notes or Special Requests
              </label>
              <textarea
                id="cart-notes"
                placeholder="Let us know if you have any special instructions for your order..."
                className="w-full h-24 px-4 py-2 border border-champagne rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender focus:border-lavender resize-none"
              />
            </div>

            {/* Cart Summary Section */}
            <div className="bg-white rounded-xl shadow-sm border border-champagne p-6">
              <h2 className="text-xl font-semibold text-graphite mb-4 font-primary">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-graphite">
                  <span>Items:</span>
                  <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-graphite border-t border-champagne pt-2">
                  <span>Total:</span>
                  <span>${cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  className="w-full bg-card border border-secondary text-secondary py-3 rounded-lg font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors duration-200"
                >
                  Clear Cart
                </button>
                <Link to="/checkout">
                  <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-200">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;