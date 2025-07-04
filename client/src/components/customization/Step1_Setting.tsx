import React, { useState } from 'react';
import Button from '../common/Button';

interface Step1_SettingProps {
  onSelectSetting?: (setting: string) => void;
  selectedSetting?: string;
}

const Step1_Setting: React.FC<Step1_SettingProps> = ({ onSelectSetting, selectedSetting }) => {
  const [showEducation, setShowEducation] = useState(false);

  const settings = [
    { id: 'solitaire', name: 'Solitaire', description: 'A single, prominent diamond.' },
    { id: 'pave', name: 'Pave', description: 'Band adorned with small diamonds.' },
    { id: 'bezel', name: 'Bezel', description: 'Diamond fully encircled by metal.' },
    { id: 'halo', name: 'Halo', description: 'Center diamond surrounded by smaller diamonds.' },
  ];

  return (
    <div className="mb-8 px-6 py-editorial-md bg-ivory">
      <h3 className="font-primary text-graphite text-lg md:text-xl font-semibold text-left mb-editorial-sm">Step 1: Choose Setting/Base Style</h3>
      <p className="font-secondary text-graphite/80 text-left mb-editorial-sm">Select your preferred jewelry setting or base style.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className={`bg-white border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-lavender
              ${selectedSetting === setting.id 
                ? 'bg-gradient-to-br from-lavender/10 to-white border-lavender shadow-md' 
                : 'border-champagne'}`}
            onClick={() => onSelectSetting && onSelectSetting(setting.id)}
          >
            <h4 className="font-primary text-lg font-normal text-graphite mb-2">{setting.name}</h4>
            <p className="text-sm text-graphite/90">{setting.description}</p>
          </div>
        ))}
      </div>
      <Button 
        onClick={() => setShowEducation(!showEducation)} 
        className="w-full bg-gradient-to-r from-muted/50 to-card border border-muted text-foreground font-medium py-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-secondary hover:to-secondary hover:border-secondary hover:text-secondary-foreground"
      >
        {showEducation ? 'Hide Details' : 'Learn More About Settings'}
      </Button>
      {showEducation && (
        <div className="mt-8 bg-gradient-to-br from-white to-champagne/50 rounded-xl p-8 border border-champagne">
          <h4 className="text-h4 text-charcoal">Understanding Jewelry Settings</h4>
          <p className="text-base text-graphite mb-6">The setting is the metal structure that holds the diamond or gemstone in place. It significantly impacts the jewelry's overall look, durability, and how light interacts with the stone.</p>
          <ul className="space-y-4 my-6">
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Solitaire:</strong> A classic and timeless choice, emphasizing the single diamond's brilliance.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Pave:</strong> Creates a continuous surface of sparkle, making the main stone appear larger.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Bezel:</strong> Offers maximum protection for the diamond, ideal for active lifestyles.
            </li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-lavender before:text-lg">
              <strong className="text-graphite font-medium">Halo:</strong> Enhances the perceived size and brilliance of the center stone.
            </li>
          </ul>
          <p className="text-base text-graphite">Consider your lifestyle, aesthetic preferences, and the diamond's characteristics when choosing a setting.</p>
        </div>
      )}
    </div>
  );
};

export default Step1_Setting;
