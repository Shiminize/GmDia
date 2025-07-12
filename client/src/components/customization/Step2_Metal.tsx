import React, { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';

interface Step2_MetalProps {
  onSelectMetal?: (metal: string) => void;
  selectedMetal?: string;
}

const Step2_Metal: React.FC<Step2_MetalProps> = ({ onSelectMetal, selectedMetal }) => {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const metals = [
    {
      id: 'platinum',
      name: 'Platinum',
      karat: '950',
      color: 'var(--champagne-light)',
      description: 'The most precious of all metals, platinum is known for its purity, rarity, and strength. Its naturally white color will never fade or change.',
      benefits: [
        'Extremely durable and naturally hypoallergenic',
        'Maintains its white color forever',
        'Holds diamonds more securely than other metals',
        'Develops a beautiful patina over time'
      ]
    },
    {
      id: 'white-gold',
      name: 'White Gold',
      karat: '18K',
      color: 'var(--card)',
      description: 'A modern classic, 18K white gold is an alloy of pure gold and white metals like palladium, creating a bright white color.',
      benefits: [
        'More affordable than platinum',
        'Excellent durability',
        'Classic bright white appearance',
        'Can be rhodium plated for extra shine'
      ]
    },
    {
      id: 'yellow-gold',
      name: 'Yellow Gold',
      karat: '18K',
      color: 'var(--champagne-dark)',
      description: 'Traditional and timeless, 18K yellow gold offers the purest gold color while maintaining excellent durability.',
      benefits: [
        'Traditional and timeless appearance',
        'Never needs plating',
        'Complements warm skin tones',
        'Becomes more beautiful with age'
      ]
    },
    {
      id: 'rose-gold',
      name: 'Rose Gold',
      karat: '18K',
      color: 'var(--blush-dark)',
      description: 'Romantic and modern, rose gold gets its warm pink hue from copper added to pure gold.',
      benefits: [
        'Unique and romantic appearance',
        'Very durable due to copper content',
        'Complements all skin tones',
        'Growing in popularity'
      ]
    }
  ];

  return (
    <div className="px-6 py-editorial-md mb-8">
      <h3 className="font-primary text-graphite text-lg md:text-xl font-semibold text-left mb-editorial-sm">Step 2: Select Your Metal</h3>
      <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">Choose from our selection of premium metals, each carefully selected for both beauty and durability.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {metals.map((metal) => (
          <div
            key={metal.id}
            className={`relative bg-white border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-lavender group
              ${selectedMetal === metal.id 
                ? 'bg-gradient-to-br from-lavender/10 to-white border-lavender shadow-md' 
                : 'border-champagne'}`}
            onClick={() => onSelectMetal && onSelectMetal(metal.id)}
            onMouseEnter={() => setShowInfo(metal.id)}
            onMouseLeave={() => setShowInfo(null)}
          >
            <div className="flex items-center gap-4">
              <div 
                className={`w-16 h-16 rounded-full border-2 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  selectedMetal === metal.id ? 'border-lavender' : 'border-champagne'
                }`}
                style={{ 
                  backgroundColor: metal.color
                }}
              >
                <span className="text-xs font-medium text-graphite/80 bg-white/80 px-2 py-0.5 rounded-full">
                  {metal.karat}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-primary text-lg font-normal text-graphite mb-1">{metal.name}</h4>
                <div className="flex items-center gap-2 text-sm text-graphite/70">
                  <FaCircleInfo className="text-lavender" />
                  <span>View Details</span>
                </div>
              </div>
            </div>
            {showInfo === metal.id && (
              <div className="absolute left-0 right-0 top-0 -translate-y-full mt-0 bg-white border border-champagne rounded-lg p-4 shadow-lg z-[9999] pointer-events-none animate-fade-in">
                <p className="text-sm text-graphite mb-3">{metal.description}</p>
                <ul className="space-y-2">
                  {metal.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-graphite/90 relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-lavender">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-white to-champagne/50 rounded-xl p-8 border border-champagne">
        <h4 className="text-h4 text-charcoal">About Our Metals</h4>
        <p className="text-base text-graphite mb-6">All our metals are sourced from responsible suppliers and crafted to the highest standards. Each piece is stamped with its purity mark and comes with a certificate of authenticity.</p>
        <div className="bg-white/50 rounded-lg p-6 border border-champagne/50">
          <h5 className="font-primary text-lg font-medium text-graphite mb-4">Care Instructions</h5>
          <ul className="space-y-3">
            <li className="text-base text-graphite/90 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              Store your jewelry separately to prevent scratching
            </li>
            <li className="text-base text-graphite/90 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              Clean regularly with a soft, lint-free cloth
            </li>
            <li className="text-base text-graphite/90 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              Remove jewelry before swimming or using chemicals
            </li>
            <li className="text-base text-graphite/90 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              Have your pieces professionally cleaned annually
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step2_Metal;
