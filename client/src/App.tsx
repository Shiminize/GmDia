import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
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
import Button from './components/common/Button';
import SizingGuide from './pages/SizingGuide';
import ShineYourMomentEvent from './pages/ShineYourMomentEvent';
import TopBanner from './components/common/TopBanner';
import { useAuth } from './contexts/AuthContext';
import RingQuizPage from './pages/RingQuizPage';

interface ChatMessage {
  id: number;
  message: string;
  sender: 'user' | 'support';
  timestamp: Date;
  actions?: Array<{ text: string; action: string }>;
}

function App() {
  const { user } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      message: "Hello! I'm here to help you find the perfect piece. What can I assist you with today?",
      sender: 'support',
      timestamp: new Date(),
      actions: [
        { text: "Style Advice", action: "style" },
        { text: "Sizing Guide", action: "sizing-guide" },
        { text: "Customization", action: "customize" },
        { text: "Pricing Info", action: "pricing" }
      ]
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const getSmartResponse = (userMessage: string): ChatMessage => {
    const message = userMessage.toLowerCase();
    
    // Style and design questions
    if (message.includes('style') || message.includes('design') || message.includes('look') || message.includes('trend')) {
      return {
        id: Date.now(),
        message: "Great question! Our jewelry comes in various styles: Classic Solitaire for timeless elegance, Vintage-inspired for romantic charm, and Modern Geometric for contemporary appeal. What's your personal style preference?",
        sender: 'support',
        timestamp: new Date(),
        actions: [
          { text: "View Classic Collection", action: "products" },
          { text: "Start Customizing", action: "customize" }
        ]
      };
    }
    
    // Sizing questions
    if (message.includes('size') || message.includes('measure') || message.includes('fit') || message.includes('ring size')) {
      return {
        id: Date.now(),
        message: "Ring sizing is crucial! You can measure at home using our printable ring sizer, visit a local jeweler, or use our online sizing guide. Most rings can be resized within 2 sizes. Would you like our sizing guide?",
        sender: 'support',
        timestamp: new Date(),
        actions: [
          { text: "View Sizing Guide", action: "sizing-guide" },
          { text: "Book Consultation", action: "consultation" }
        ]
      };
    }
    
    // Customization questions
    if (message.includes('custom') || message.includes('personalize') || message.includes('engrave') || message.includes('modify')) {
      return {
        id: Date.now(),
        message: "Absolutely! Our customization options include metal choice (14K/18K Gold, Platinum), diamond shape, setting style, and personal engraving. You can start designing your perfect piece right now!",
        sender: 'support',
        timestamp: new Date(),
        actions: [
          { text: "Start Customizing", action: "customize" },
          { text: "View Examples", action: "examples" }
        ]
      };
    }
    
    // Pricing and budget questions
    if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('expensive') || message.includes('afford')) {
      return {
        id: Date.now(),
        message: "Our lab-grown diamonds offer exceptional value! Prices start from $500 for simple bands to $5,000+ for elaborate designs. We also offer flexible payment plans. What's your budget range?",
        sender: 'support',
        timestamp: new Date(),
        actions: [
          { text: "View Price Ranges", action: "pricing" },
          { text: "Payment Plans", action: "payment" }
        ]
      };
    }
    
    // Lab diamond questions
    if (message.includes('lab') || message.includes('synthetic') || message.includes('natural') || message.includes('diamond')) {
      return {
        id: Date.now(),
        message: "Lab-grown diamonds are chemically identical to natural diamonds but more ethical and affordable. They're graded using the same 4C standards and come with certification. Would you like to learn more?",
        sender: 'support',
        timestamp: new Date(),
        actions: [
          { text: "Learn About Lab Diamonds", action: "education" },
          { text: "Compare Options", action: "compare" }
        ]
      };
    }
    
    // Default response
    return {
      id: Date.now(),
      message: "Thank you for your message! I'd be happy to help you find the perfect piece. You can browse our collection, start customizing, or ask me about sizing, styles, or pricing. What interests you most?",
      sender: 'support',
      timestamp: new Date(),
      actions: [
        { text: "Browse Collection", action: "products" },
        { text: "Start Customizing", action: "customize" },
        { text: "Learn More", action: "education" }
      ]
    };
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'products':
        window.location.href = '/products';
        break;
      case 'customize':
        window.location.href = '/customize';
        break;
      case 'education':
        window.location.href = '/education';
        break;
      case 'sizing-guide':
        window.location.href = '/sizing-guide';
        break;
      case 'consultation':
        alert('Booking consultation feature coming soon!');
        break;
      case 'examples':
        window.location.href = '/products';
        break;
      case 'pricing':
        alert('Pricing guide will be displayed');
        break;
      case 'payment':
        alert('Payment plans information will be shown');
        break;
      case 'compare':
        window.location.href = '/education';
        break;
      default:
        break;
    }
  };

  const handleLiveChatClick = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      message: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    const userInput = currentMessage;
    setCurrentMessage('');

    // Get smart response
    setTimeout(() => {
      const smartResponse = getSmartResponse(userInput);
      setChatMessages(prev => [...prev, smartResponse]);
    }, 1000);
  };

  return (
    <Router>
      <div className="App">
        <TopBanner />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            {/* Add other routes here as needed */}
          </Routes>
        </main>
        <Footer />
        <button onClick={handleLiveChatClick} className="live-chat-button">
          {showChat ? 'Close Chat' : 'Live Chat'}
        </button>
        {showChat && (
          <div className="chat-window" style={{
            position: 'fixed',
            bottom: '90px',
            right: '30px',
            width: '350px',
            height: '450px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0,0,0,0.1)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Lato, sans-serif'
          }}>
            <div style={{
              padding: '15px',
              borderBottom: '1px solid #eee',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px 8px 0 0'
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>Live Chat Support</h3>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                We're here to help!
              </p>
            </div>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '15px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: msg.sender === 'user' ? '#1A1A1A' : '#f1f3f5',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    fontSize: '14px',
                    wordWrap: 'break-word'
                  }}
                >
                  <div>{msg.message}</div>
                  <div style={{
                    fontSize: '10px',
                    opacity: 0.7,
                    marginTop: '4px'
                  }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {msg.actions && (
                    <div style={{ marginTop: '8px' }}>
                      {msg.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleActionClick(action.action)}
                          style={{
                            padding: '4px 8px',
                            background: '#1A1A1A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '4px',
                            marginTop: '4px'
                          }}
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} style={{
              padding: '15px',
              borderTop: '1px solid #eee',
              display: 'flex',
              gap: '8px'
            }}>
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: '#1A1A1A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1A1A1A'}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
