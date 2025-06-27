import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css'; // Import global styles
import App from './App';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);