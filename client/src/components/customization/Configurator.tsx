import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Step1Setting from './Step1_Setting';
import Step2Metal from './Step2_Metal';
import Step3Diamond from './Step3_Diamond';
import Step4Personalization from './Step4_Personalization';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import ThreeJSViewer from './ThreeJSViewer';
import type { SavedDesign } from '../../pages/Dashboard';

type NewDesign = Omit<SavedDesign, '_id' | 'createdAt'>;

const Configurator: React.FC = () => {
  const testRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log('[Configurator] testRef.current:', testRef.current);
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSetting, setSelectedSetting] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedDiamondShape, setSelectedDiamondShape] = useState<string>('');
  const [engravingText, setEngravingText] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const { user } = useAuth();

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Setting onSelectSetting={setSelectedSetting} selectedSetting={selectedSetting} />;
      case 2:
        return <Step2Metal onSelectMetal={setSelectedMetal} selectedMetal={selectedMetal} />;
      case 3:
        return <Step3Diamond onSelectDiamondShape={setSelectedDiamondShape} selectedDiamondShape={selectedDiamondShape} />;
      case 4:
        return <Step4Personalization onEngravingChange={setEngravingText} engravingText={engravingText} />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSaveDesign = async () => {
    if (!user) {
      setSaveMessage('Please log in to save your design');
      return;
    }

    setSaving(true);
    setSaveMessage('');
    
    try {
      const design: NewDesign = {
        name: `Custom ${selectedSetting || 'Ring'} - ${new Date().toLocaleDateString()}`,
        designData: {
          setting: selectedSetting,
          metal: selectedMetal,
          diamondShape: selectedDiamondShape,
          engraving: engravingText
        }
      };

      await api.customDesigns.save(design, user.token);
      setSaveMessage('Design saved successfully!');
      
    } catch (error: any) {
      console.error('Error saving design:', error);
      setSaveMessage('Failed to save design. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleShareDesign = () => {
    const shareLink = `${window.location.origin}/customize?setting=${selectedSetting}&metal=${selectedMetal}&shape=${selectedDiamondShape}&engraving=${encodeURIComponent(engravingText)}`;
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        setSaveMessage('Design link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setSaveMessage('Failed to copy link.');
      });
  };

  const isConfigurationComplete = selectedSetting && selectedMetal && selectedDiamondShape;

  return (
    <div className="w-full min-h-screen bg-champagne">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-primary text-graphite mb-8">Customize Your Jewelry</h2>
        
        {!user && (
          <div className="bg-white rounded-xl shadow-sm border border-champagne p-8 mb-8">
            <p className="text-lg text-graphite mb-4">
              Sign in to save your custom designs and access them anytime.
            </p>
            <Link 
              to="/login"
              className="btn-primary inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Viewer */}
          <div className="bg-white rounded-xl shadow-sm border border-champagne p-6 sticky top-8 h-[600px]">
            <div className="w-full h-full rounded-lg overflow-hidden">
              <ThreeJSViewer />
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="space-y-8">
            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${currentStep === step
                        ? 'bg-secondary text-secondary-foreground'
                        : step < currentStep
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-gray-100 text-warm-gray'
                      }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-0.5 mx-2
                        ${step < currentStep ? 'bg-sage' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-champagne p-6">
              {renderStepComponent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${currentStep === 1
                    ? 'bg-gray-100 text-warm-gray cursor-not-allowed'
                    : 'bg-white border border-champagne text-graphite hover:bg-champagne/10'
                  }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === 4}
                className={`px-6 py-2 rounded-lg text-base font-semibold text-gray-900 transition-colors duration-200
                  ${currentStep === 4
                    ? 'bg-gray-100 text-warm-gray cursor-not-allowed'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                  }`}
              >
                Next
              </button>
            </div>

            {/* Save and Share */}
            {currentStep === 4 && (
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveDesign}
                    disabled={!isConfigurationComplete || saving}
                    className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                      ${!isConfigurationComplete || saving
                        ? 'bg-gray-100 text-warm-gray cursor-not-allowed'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                      }`}
                  >
                    {saving ? 'Saving...' : 'Save Design'}
                  </button>
                  <button
                    onClick={handleShareDesign}
                    disabled={!isConfigurationComplete}
                    className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                      ${!isConfigurationComplete
                        ? 'bg-gray-100 text-warm-gray cursor-not-allowed'
                        : 'bg-white border border-champagne text-graphite hover:bg-champagne/10'
                      }`}
                  >
                    Share Design
                  </button>
                </div>
                {saveMessage && (
                  <p className={`text-center text-sm font-medium
                    ${saveMessage.includes('success')
                      ? 'text-emerald-600'
                      : saveMessage.includes('Failed')
                        ? 'text-rose-600'
                        : 'text-warm-gray'
                    }`}
                  >
                    {saveMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
