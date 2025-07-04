import React from 'react';

interface Step4_PersonalizationProps {
  onEngravingChange?: (text: string) => void;
  engravingText?: string;
}

const Step4_Personalization: React.FC<Step4_PersonalizationProps> = ({ onEngravingChange, engravingText }) => {
  return (
    <div className="mb-8 px-6 py-editorial-md bg-ivory">
      <h3 className="font-primary text-graphite text-lg md:text-xl font-semibold text-left mb-editorial-sm">Step 4: Add Personalization</h3>
      <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">Add a personal touch with engraving or birthstones.</p>
      <div className="space-y-4">
        <label 
          htmlFor="engraving-text" 
          className="block font-primary text-lg text-graphite mb-2"
        >
          Engraving Text:
        </label>
        <input
          type="text"
          id="engraving-text"
          value={engravingText}
          onChange={(e) => onEngravingChange && onEngravingChange(e.target.value)}
          placeholder="Enter your engraving text (max 20 chars)"
          maxLength={20}
          className="w-full px-4 py-3 rounded-lg border border-champagne bg-white text-graphite placeholder-graphite/50 focus:outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20 transition-all duration-300"
        />
        {/* Add options for birthstones */}
      </div>
    </div>
  );
};

export default Step4_Personalization;