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
    <div className="customization-step">
      <h3>Step 1: Choose Setting/Base Style</h3>
      <p>Select your preferred jewelry setting or base style.</p>
      <div className="setting-options">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className={`setting-option ${selectedSetting === setting.id ? 'selected' : ''}`}
            onClick={() => onSelectSetting && onSelectSetting(setting.id)}
          >
            <h4>{setting.name}</h4>
            <p>{setting.description}</p>
          </div>
        ))}
      </div>
      <Button onClick={() => setShowEducation(!showEducation)} className="learn-more-btn">
        {showEducation ? 'Hide Details' : 'Learn More About Settings'}
      </Button>
      {showEducation && (
        <div className="education-content">
          <h4>Understanding Jewelry Settings</h4>
          <p>The setting is the metal structure that holds the diamond or gemstone in place. It significantly impacts the jewelry's overall look, durability, and how light interacts with the stone.</p>
          <ul>
            <li><strong>Solitaire:</strong> A classic and timeless choice, emphasizing the single diamond's brilliance.</li>
            <li><strong>Pave:</strong> Creates a continuous surface of sparkle, making the main stone appear larger.</li>
            <li><strong>Bezel:</strong> Offers maximum protection for the diamond, ideal for active lifestyles.</li>
            <li><strong>Halo:</strong> Enhances the perceived size and brilliance of the center stone.</li>
          </ul>
          <p>Consider your lifestyle, aesthetic preferences, and the diamond's characteristics when choosing a setting.</p>
        </div>
      )}
    </div>
  );
};

export default Step1_Setting;
