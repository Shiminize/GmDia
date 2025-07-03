import React, { useState } from 'react';
import { X } from 'lucide-react';

const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-blush to-lavender text-white py-3 px-4 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium">
            ✨ <strong>Special Offer:</strong> Free shipping on orders over $500 + complimentary gift wrapping
          </p>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white/80 transition-colors duration-300"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopBanner; 