import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import Button from '../common/Button';

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // In a real application, you would integrate with a payment gateway here.
    // This is a placeholder for successful payment processing.
    alert('Processing payment...');
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      // In a real application, navigate to an order confirmation page.
    }, 1500);
  };

  const renderCheckoutStep = () => {
    if (orderPlaced) {
      return (
        <div className="order-confirmation">
          <h3>Thank You for Your Order!</h3>
          <p>Your order has been placed successfully and a confirmation email has been sent to your inbox.</p>
          <p>Order Total: ${cartTotal.toLocaleString()}</p>
          <p>You will receive shipping updates shortly.</p>
          {/* Add a link to order history or home page */}
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="checkout-step">
            <h3>1. Shipping Information</h3>
            <form>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" required />
              </div>
              <div className="form-group">
                <label htmlFor="city">City:</label>
                <input type="text" id="city" required />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code:</label>
                <input type="text" id="zip" required />
              </div>
              <Button onClick={() => setCurrentStep(2)}>Continue to Payment</Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="checkout-step">
            <h3>2. Payment Details</h3>
            <form>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" required />
              </div>
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" required />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" required />
              </div>
              <Button onClick={() => setCurrentStep(1)}>Back to Shipping</Button>
              <Button onClick={() => setCurrentStep(3)}>Review Order</Button>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="checkout-step">
            <h3>3. Review Your Order</h3>
            <div className="order-summary">
              <h4>Items in Cart:</h4>
              {cartItems.map((item) => (
                <div key={item.id} className="review-item-summary">
                  <p>{item.name} x {item.quantity} - ${item.price.toLocaleString()}</p>
                </div>
              ))}
              <p className="order-total">Total: ${cartTotal.toLocaleString()}</p>
            </div>
            <Button onClick={() => setCurrentStep(2)}>Back to Payment</Button>
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {renderCheckoutStep()}
    </div>
  );
};

export default Checkout;
