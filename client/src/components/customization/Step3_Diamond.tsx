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
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2" />
          <path d="M25 5L45 25L25 45L5 25L25 5Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'princess',
      name: 'Princess',
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="15" width="20" height="20" stroke="currentColor" strokeWidth="2" transform="rotate(45 25 25)" />
          <path d="M25 5L45 25L25 45L5 25L25 5Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'emerald',
      name: 'Emerald',
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="10" width="20" height="30" stroke="currentColor" strokeWidth="2" />
          <path d="M15 15L35 15M15 35L35 35" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'oval',
      name: 'Oval',
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="25" rx="15" ry="20" stroke="currentColor" strokeWidth="2" />
          <path d="M25 5C35 5 40 15 40 25C40 35 35 45 25 45C15 45 10 35 10 25C10 15 15 5 25 5Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'pear',
      name: 'Pear',
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 5C35 5 40 15 40 25C40 35 35 45 25 45C15 45 10 35 10 25C10 15 15 5 25 5Z" stroke="currentColor" strokeWidth="2" />
          <path d="M25 5L25 45" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="font-primary text-2xl font-light text-graphite mb-4">Step 3: Choose Lab Diamond</h3>
      <p className="font-secondary text-base text-graphite opacity-90 mb-8">Select the perfect lab-grown diamond for your piece.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            className={`bg-white border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-lavender text-center
              ${selectedDiamondShape === shape.id 
                ? 'bg-gradient-to-br from-lavender/10 to-white border-lavender shadow-md' 
                : 'border-champagne'}`}
            onClick={() => onSelectDiamondShape && onSelectDiamondShape(shape.id)}
          >
            <div className="w-20 h-20 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" 
              style={{ color: selectedDiamondShape === shape.id ? 'var(--digital-lavender)' : 'var(--graphite-black)' }}>
              {shape.icon}
            </div>
            <h4 className="font-primary text-lg font-normal text-graphite">{shape.name}</h4>
          </div>
        ))}
      </div>
      <Button 
        onClick={() => setShowEducation(!showEducation)} 
        className="w-full bg-gradient-to-r from-champagne/50 to-white border border-champagne text-graphite font-medium py-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-lavender hover:to-blush hover:border-lavender hover:text-white"
      >
        {showEducation ? "Hide Details" : "Learn More About Diamonds (4 C's)"}
      </Button>
      {showEducation && (
        <div className="mt-8 bg-gradient-to-br from-white to-champagne/50 rounded-xl p-8 border border-champagne">
          <h4 className="font-primary text-xl font-medium text-graphite mb-4">The 4 C's of Diamonds</h4>
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
