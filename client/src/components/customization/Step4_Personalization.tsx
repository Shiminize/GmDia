import React from 'react';

interface Step4_PersonalizationProps {
  onEngravingChange?: (text: string) => void;
  engravingText?: string;
}

const Step4_Personalization: React.FC<Step4_PersonalizationProps> = ({ onEngravingChange, engravingText }) => {
  return (
    <div className="customization-step">
      <h3>Step 4: Add Personalization</h3>
      <p>Add a personal touch with engraving or birthstones.</p>
      <div className="personalization-options">
        <label htmlFor="engraving-text">Engraving Text:</label>
        <input
          type="text"
          id="engraving-text"
          value={engravingText}
          onChange={(e) => onEngravingChange && onEngravingChange(e.target.value)}
          placeholder="Enter your engraving text (max 20 chars)"
          maxLength={20}
        />
        {/* Add options for birthstones */}
      </div>
    </div>
  );
};

export default Step4_Personalization;