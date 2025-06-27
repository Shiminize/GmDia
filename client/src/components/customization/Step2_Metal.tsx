import React, { useState } from 'react';
import Button from '../common/Button';

interface Step2_MetalProps {
  onSelectMetal?: (metal: string) => void;
  selectedMetal?: string;
}

const Step2_Metal: React.FC<Step2_MetalProps> = ({ onSelectMetal, selectedMetal }) => {
  const [showEducation, setShowEducation] = useState(false);

  const metals = [
    { id: 'yellow-gold', name: '14K Yellow Gold', color: '#FFD700' },
    { id: 'white-gold', name: '14K White Gold', color: '#F0F8FF' },
    { id: 'rose-gold', name: '14K Rose Gold', color: '#B76E79' },
    { id: 'platinum', name: 'Platinum', color: '#E5E4E2' },
  ];

  return (
    <div className="customization-step">
      <h3>Step 2: Select Metal</h3>
      <p>Choose the metal for your jewelry.</p>
      <div className="metal-options">
        {metals.map((metal) => (
          <div
            key={metal.id}
            className={`metal-option ${selectedMetal === metal.id ? 'selected' : ''}`}
            onClick={() => onSelectMetal && onSelectMetal(metal.id)}
          >
            <div className="metal-color-swatch" style={{ backgroundColor: metal.color }}></div>
            <h4>{metal.name}</h4>
          </div>
        ))}
      </div>
      <Button onClick={() => setShowEducation(!showEducation)} className="learn-more-btn">
        {showEducation ? 'Hide Details' : 'Learn More About Metals'}
      </Button>
      {showEducation && (
        <div className="education-content">
          <h4>Understanding Jewelry Metals</h4>
          <p>The metal you choose for your jewelry not only affects its appearance but also its durability and value. Here are some common options:</p>
          <ul>
            <li><strong>Yellow Gold:</strong> A classic and timeless choice, known for its warm luster. Often alloyed with silver and copper.</li>
            <li><strong>White Gold:</strong> A popular alternative to platinum, offering a bright, silvery-white appearance. It's typically an alloy of gold with white metals like palladium or nickel, and often rhodium-plated for extra brilliance.</li>
            <li><strong>Rose Gold:</strong> A romantic and modern choice, gaining popularity for its distinctive pinkish hue. It's an alloy of gold with a higher proportion of copper.</li>
            <li><strong>Platinum:</strong> A naturally white and extremely durable metal, known for its rarity and hypoallergenic properties. It's denser than gold, making it feel more substantial.</li>
          </ul>
          <p>Consider your skin tone, lifestyle, and personal preference when selecting your metal.</p>
        </div>
      )}
    </div>
  );
};

export default Step2_Metal;
