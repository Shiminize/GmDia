import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`border-t border-border ${className}`}>
      <div className="container mx-auto px-6 py-section">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-h2 text-foreground">Facet & Co.</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-editorial-sm">
              Crafting exceptional jewelry experiences with timeless elegance and modern sophistication. 
              Every piece tells your unique story.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 text-muted-foreground hover:text-accent-foreground transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-accent-foreground transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-accent-foreground transition-colors duration-300" aria-label="Twitter">
                <Twitter size={20} />
              </button>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-primary text-foreground text-left mb-editorial-sm">Shop</h3>
            <ul className="space-y-3">
              {[
                { name: 'All Products', path: '/products' },
                { name: 'Engagement Rings', path: '/products?category=rings' },
                { name: 'Wedding Bands', path: '/products?category=bands' },
                { name: 'Necklaces', path: '/products?category=necklaces' },
                { name: 'Earrings', path: '/products?category=earrings' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-accent-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-primary text-foreground text-left mb-editorial-sm">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Story', path: '/about' },
                { name: 'Sustainability', path: '/sustainability' },
                { name: 'Education', path: '/education' },
                { name: 'Events', path: '/events' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-accent-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border pt-8 mb-8">
          <h3 className="text-lg font-primary text-foreground text-left mb-editorial-sm">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-accent-foreground mt-0.5" />
              <div className="text-muted-foreground">
                <p>123 Luxury Lane</p>
                <p>Beverly Hills, CA 90210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-accent-foreground" />
              <a href="tel:+1-555-0123" className="flex items-center text-muted-foreground hover:text-accent-foreground transition-colors">
                +1 (555) 012-3456
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-accent-foreground" />
              <a href="mailto:hello@facetandco.com" className="flex items-center text-muted-foreground hover:text-accent-foreground transition-colors">
                hello@facetandco.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Facet & Co. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-accent-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-accent-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-accent-foreground transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;