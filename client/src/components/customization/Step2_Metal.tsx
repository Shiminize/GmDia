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
      color: '#E5E4E2',
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
      color: '#F4F7F8',
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
      color: '#FFD700',
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
      color: '#B76E79',
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
    <div className="customization-step">
      <h3>Step 2: Select Your Metal</h3>
      <p>Choose from our selection of premium metals, each carefully selected for both beauty and durability.</p>
      
      <div className="metal-options">
        {metals.map((metal) => (
          <div
            key={metal.id}
            className={`metal-option ${selectedMetal === metal.id ? 'selected' : ''}`}
            onClick={() => onSelectMetal && onSelectMetal(metal.id)}
            onMouseEnter={() => setShowInfo(metal.id)}
            onMouseLeave={() => setShowInfo(null)}
          >
            <div className="metal-preview" style={{ background: metal.color }}>
              <span className="metal-karat">{metal.karat}</span>
            </div>
            <div className="metal-info">
              <h4>{metal.name}</h4>
              <div className="metal-details">
                <FaCircleInfo className="info-icon" />
                <span>View Details</span>
              </div>
            </div>
            {showInfo === metal.id && (
              <div className="metal-tooltip">
                <p>{metal.description}</p>
                <ul>
                  {metal.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="metal-education">
        <h4>About Our Metals</h4>
        <p>All our metals are sourced from responsible suppliers and crafted to the highest standards. Each piece is stamped with its purity mark and comes with a certificate of authenticity.</p>
        <div className="metal-care">
          <h5>Care Instructions</h5>
          <ul>
            <li>Store your jewelry separately to prevent scratching</li>
            <li>Clean regularly with a soft, lint-free cloth</li>
            <li>Remove jewelry before swimming or using chemicals</li>
            <li>Have your pieces professionally cleaned annually</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step2_Metal;
