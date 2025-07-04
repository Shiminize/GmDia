import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-secondary to-accent text-foreground py-2 sm:py-3 px-2 sm:px-4 z-40">
      {/* 
        Background: gradient from secondary (278 35% 78% - lavender) to accent (340 82% 52% - blush)
        Text: foreground (200 15% 8% - graphite) 
        Z-index: 40 to appear above other content
      */}
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <Link 
            to="/shineyourmoment" 
            className="text-sm sm:text-base font-primary hover:text-muted-foreground transition-colors duration-300 cursor-pointer"
          >
            {/* 
              Link text: foreground (200 15% 8% - graphite)
              Hover: muted-foreground (200 8% 46% - lighter graphite)
            */}
            ✨ <strong>Share your moment to win $3,000 worth diamond ring!</strong>
          </Link>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground hover:text-muted-foreground transition-colors duration-300 min-h-[44px] px-2"
          aria-label="Close banner"
        >
          {/* 
            Close button: foreground (200 15% 8% - graphite)
            Hover: muted-foreground (200 8% 46% - lighter graphite)
          */}
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopBanner; 