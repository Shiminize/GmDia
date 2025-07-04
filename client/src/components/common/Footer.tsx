import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-champagne border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-section">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-editorial-md">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/Logo.png" 
                  alt="Facet & Co. Logo" 
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
                <span className="text-h2 text-graphite">Facet & Co.</span>
              </Link>
              <p className="text-graphite/80 leading-relaxed mb-editorial-sm">
                Crafting ethical brilliance with lab-grown diamonds. 
                Timeless designs for the modern conscious consumer.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 text-graphite/60 hover:text-blush transition-colors duration-300" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="p-2 text-graphite/60 hover:text-blush transition-colors duration-300" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-graphite/60 hover:text-blush transition-colors duration-300" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Shop Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-graphite text-left mb-editorial-sm">Shop</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Engagement Rings', path: '/products' },
                  { name: 'Wedding Bands', path: '/products' },
                  { name: 'Necklaces', path: '/products' },
                  { name: 'Tennis Bands', path: '/products' },
                  { name: 'Custom Design', path: '/customize' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-graphite/80 hover:text-blush transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-graphite text-left mb-editorial-sm">Company</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Our Story', path: '/about' },
                  { name: 'Lab Diamond Education', path: '/education' },
                  { name: 'Sustainability', path: '/sustainability' },
                  { name: 'Contact Us', path: '/contact' },
                  { name: 'Blog', path: '/blog' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-graphite/80 hover:text-blush transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-primary text-graphite text-left mb-editorial-sm">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blush mt-0.5" />
                  <div className="text-graphite/80">
                    <p>123 Diamond District</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blush" />
                  <a href="tel:+1-555-0123" className="text-graphite/80 hover:text-blush transition-colors">
                    +1 (555) 012-3456
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blush" />
                  <a href="mailto:hello@facetandco.com" className="text-graphite/80 hover:text-blush transition-colors">
                    hello@facetandco.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ivory/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-ivory/60 text-sm">
              &copy; {new Date().getFullYear()} Facet & Co. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-ivory/60 hover:text-blush transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-ivory/60 hover:text-blush transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-ivory/60 hover:text-blush transition-colors">
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
