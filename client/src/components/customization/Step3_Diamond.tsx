import React, { useState } from 'react';
import Button from '../common/Button';

interface Step3_DiamondProps {
  onSelectDiamondShape?: (shape: string) => void;
  selectedDiamondShape?: string;
}

const Step3_Diamond: React.FC<Step3_DiamondProps> = ({ onSelectDiamondShape, selectedDiamondShape }) => {
  const [showEducation, setShowEducation] = useState(false);

  const diamondShapes = [
    {
      id: 'round',
      name: 'Round',
      image: '/Diamond Shapes/shop-by-round.jpg'
    },
    {
      id: 'princess',
      name: 'Princess',
      image: '/Diamond Shapes/shop-by-princess.jpg'
    },
    {
      id: 'emerald',
      name: 'Emerald',
      image: '/Diamond Shapes/shop-by-emerald.jpg'
    },
    {
      id: 'oval',
      name: 'Oval',
      image: '/Diamond Shapes/shop-by-oval.jpg'
    },
    {
      id: 'pear',
      name: 'Pear',
      image: '/Diamond Shapes/shop-by-cushion.png'
    }
  ];

  return (
    <div className="px-6 py-editorial-md bg-ivory">
      <h3 className="font-primary text-graphite text-lg md:text-xl font-semibold text-left mb-editorial-sm">Step 3: Choose Lab Diamond</h3>
      <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">Select the perfect lab-grown diamond for your piece.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            className={`bg-white border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-lavender flex flex-col items-center
              ${selectedDiamondShape === shape.id 
                ? 'bg-gradient-to-br from-lavender/10 to-white border-lavender shadow-md' 
                : 'border-champagne'}`}
            onClick={() => onSelectDiamondShape && onSelectDiamondShape(shape.id)}
          >
            <div className="w-20 h-20 flex items-center justify-center mb-2">
              <img src={shape.image} alt={shape.name} className="w-16 h-16 object-contain" />
            </div>
            <h4 className="font-primary text-lg font-normal text-graphite text-center mt-1">{shape.name}</h4>
          </div>
        ))}
      </div>
      <Button 
        onClick={() => setShowEducation(!showEducation)} 
        className="w-full bg-gradient-to-r from-muted/50 to-card border border-muted text-foreground font-medium py-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-secondary hover:to-secondary hover:border-secondary hover:text-secondary-foreground"
      >
        {showEducation ? "Hide Details" : "Learn More About Diamonds (4 C's)"}
      </Button>
      {showEducation && (
        <div className="mt-8 bg-gradient-to-br from-white to-champagne/50 rounded-xl p-8 border border-champagne">
          <h4 className="text-h4 text-charcoal">The 4 C's of Diamonds</h4>
          <p className="text-base text-graphite mb-6">Understanding the 4 C's (Cut, Color, Clarity, and Carat Weight) is crucial when choosing a diamond. They collectively determine a diamond's beauty and value.</p>
          <ul className="space-y-4 my-6">
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Cut:</strong> Refers to how well a diamond's facets interact with light. A well-cut diamond will have exceptional brilliance, fire, and sparkle.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Color:</strong> Measures the absence of color in a diamond. The less color, the higher the grade. Diamonds are graded on a scale from D (colorless) to Z (light yellow or brown).
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Clarity:</strong> Evaluates the absence of inclusions (internal flaws) and blemishes (external flaws). Graded from Flawless (FL) to Included (I).
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Carat Weight:</strong> The standard unit of weight for diamonds. One carat equals 200 milligrams. Larger diamonds are rarer and generally more valuable.
            </li>
          </ul>
          <p className="text-base text-graphite">Each 'C' plays a role, but Cut is often considered the most important for a diamond's sparkle.</p>
        </div>
      )}
    </div>
  );
};

export default Step3_Diamond;
