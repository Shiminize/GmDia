import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartSlider: React.FC = () => {
  const { cartItems, cartTotal, toggleCartSlider, isCartOpen, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-50 transition-opacity duration-300"
      onClick={toggleCartSlider}
    >
      <div
        className={`fixed top-0 right-0 w-[85%] max-w-[400px] h-full bg-white transform transition-transform 
          duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto safe-bottom`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b border-champagne/30 
          bg-white/95 backdrop-blur-sm safe-top">
          <h2 className="text-h2 text-charcoal">Shopping Cart</h2>
          <button
            onClick={toggleCartSlider}
            className="p-2 hover:bg-blush/5 rounded-full transition-colors duration-300"
            aria-label="Close cart"
          >
            <X size={24} className="text-graphite" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] p-6 text-center">
            <ShoppingCart size={48} className="text-champagne mb-4" />
            <p className="text-lg text-graphite mb-2">Your cart is empty</p>
            <p className="text-sm text-graphite/60 mb-6">Add some beautiful pieces to get started</p>
            <Link
              to="/products"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/90 transition-colors duration-300"
              onClick={toggleCartSlider}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 sm:p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-champagne/30">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-graphite truncate">{item.name}</h3>
                    <p className="text-sm text-graphite/60 mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-graphite hover:text-blush transition-colors duration-300"
                      >
                        -
                      </button>
                      <span className="text-sm text-graphite">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-graphite hover:text-blush transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-graphite/60 hover:text-blush transition-colors duration-300"
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-champagne/30 safe-bottom">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-graphite">Total</span>
                <span className="text-lg font-bold text-graphite">{formatPrice(cartTotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full py-3 px-6 bg-secondary text-secondary-foreground text-center rounded-full 
                  hover:bg-secondary/90 transition-colors duration-300"
                onClick={toggleCartSlider}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSlider; 