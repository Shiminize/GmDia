import React, { useState } from 'react';
import Button from '../common/Button';

interface Step3_DiamondProps {
  onSelectDiamondShape?: (shape: string) => void;
  selectedDiamondShape?: string;
}

const Step3_Diamond: React.FC<Step3_DiamondProps> = ({ onSelectDiamondShape, selectedDiamondShape }) => {
  const [showEducation, setShowEducation] = useState(false);

  const diamondShapes = [
    { id: 'round', name: 'Round' },
    { id: 'princess', name: 'Princess' },
    { id: 'emerald', name: 'Emerald' },
    { id: 'oval', name: 'Oval' },
    { id: 'pear', name: 'Pear' },
  ];

  return (
    <div className="customization-step">
      <h3>Step 3: Choose Lab Diamond</h3>
      <p>Select the perfect lab-grown diamond for your piece.</p>
      <div className="diamond-shape-options">
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            className={`diamond-shape-option ${selectedDiamondShape === shape.id ? 'selected' : ''}`}
            onClick={() => onSelectDiamondShape && onSelectDiamondShape(shape.id)}
          >
            <h4>{shape.name}</h4>
            {/* Placeholder for diamond shape image */}
            <div className="diamond-shape-image" style={{ width: '50px', height: '50px', border: '1px solid #ccc', margin: '0 auto' }}></div>
          </div>
        ))}
      </div>
      {/* Add options for Carat Weight, Cut, Color, Clarity */}
      <Button onClick={() => setShowEducation(!showEducation)} className="learn-more-btn">
        {showEducation ? "Hide Details" : "Learn More About Diamonds (4 C's)"}
      </Button>
      {showEducation && (
        <div className="education-content">
          <h4>The 4 C's of Diamonds</h4>
          <p>Understanding the 4 C's (Cut, Color, Clarity, and Carat Weight) is crucial when choosing a diamond. They collectively determine a diamond's beauty and value.</p>
          <ul>
            <li><strong>Cut:</strong> Refers to how well a diamond's facets interact with light. A well-cut diamond will have exceptional brilliance, fire, and sparkle.</li>
            <li><strong>Color:</strong> Measures the absence of color in a diamond. The less color, the higher the grade. Diamonds are graded on a scale from D (colorless) to Z (light yellow or brown).</li>
            <li><strong>Clarity:</strong> Evaluates the absence of inclusions (internal flaws) and blemishes (external flaws). Graded from Flawless (FL) to Included (I).</li>
            <li><strong>Carat Weight:</strong> The standard unit of weight for diamonds. One carat equals 200 milligrams. Larger diamonds are rarer and generally more valuable.</li>
          </ul>
          <p>Each 'C' plays a role, but Cut is often considered the most important for a diamond's sparkle.</p>
        </div>
      )}
    </div>
  );
};

export default Step3_Diamond;
