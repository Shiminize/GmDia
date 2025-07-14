import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBanner from './components/common/TopBanner';
import Footer from './components/common/Footer';
import CartSlider from './components/cart/CartSlider';
import ChatWidget from './components/ChatWidget';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomePageVariant from './pages/HomePage_variant';
import ProductsPage from './pages/ProductsPage';
import Configurator from './components/customization/Configurator';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/AccountSettings';
import OrderHistory from './pages/OrderHistory';
import AboutPage from './pages/AboutPage';
import LabDiamondEducationPage from './pages/LabDiamondEducationPage';
import SustainabilityPage from './pages/SustainabilityPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import SizingGuide from './pages/SizingGuide';
import ShineYourMomentEvent from './pages/ShineYourMomentEvent';
import RingQuizPage from './pages/RingQuizPage';
import StyleAdvice from './pages/StyleAdvice';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePageVariant = location.pathname === '/home-variant';

  const footerClassNames = isHomePageVariant ? "bg-transparent text-white" : "bg-secondary";

  return (
    <div className="App">
      <TopBanner />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home-variant" element={<HomePageVariant />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/customize" element={<Configurator />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/account" element={<AccountSettings />} />
          <Route path="/dashboard/orders" element={<OrderHistory />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/education" element={<LabDiamondEducationPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/sizing-guide" element={<SizingGuide />} />
          <Route path="/shineyourmoment" element={<ShineYourMomentEvent />} />
          <Route path="/quiz" element={<RingQuizPage />} />
          <Route path="/style-advice" element={<StyleAdvice />} />
          {/* Add other routes here as needed */}
        </Routes>
      </main>
      <CartSlider />
      <Footer className={footerClassNames} />
      <ChatWidget />
    </div>
  );
};

export default AppContent;
