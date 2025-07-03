import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import Step1_Setting from './Step1_Setting';
import Step2_Metal from './Step2_Metal';
import Step3_Diamond from './Step3_Diamond';
import Step4_Personalization from './Step4_Personalization';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import ThreeDViewer from './ThreeDViewer';

const Configurator: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSetting, setSelectedSetting] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedDiamondShape, setSelectedDiamondShape] = useState<string>('');
  const [engravingText, setEngravingText] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const { user } = useAuth();

  // Ref to store the Three.js ring object
  const ringRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a simple ring (TorusGeometry) as a placeholder
    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700 }); // Default Gold color
    const ring = new THREE.Mesh(geometry, material);
    scene.add(ring);
    ringRef.current = ring; // Store the ring object in ref

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // white light
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    camera.position.z = 3;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when damping is enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // only required if controls.enableDamping is set to true
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Effect to update ring color based on selectedMetal
  useEffect(() => {
    if (ringRef.current) {
      let color;
      switch (selectedMetal) {
        case 'yellow-gold':
          color = 0xffd700; // Gold
          break;
        case 'white-gold':
          color = 0xF0F8FF; // AliceBlue (close to white gold)
          break;
        case 'rose-gold':
          color = 0xB76E79; // Rose Gold
          break;
        case 'platinum':
          color = 0xE5E4E2; // Platinum
          break;
        default:
          color = 0xffd700; // Default to gold
      }
      (ringRef.current.material as THREE.MeshStandardMaterial).color.setHex(color);
    }
  }, [selectedMetal]); // Rerun this effect when selectedMetal changes

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Setting onSelectSetting={setSelectedSetting} selectedSetting={selectedSetting} />;
      case 2:
        return <Step2_Metal onSelectMetal={setSelectedMetal} selectedMetal={selectedMetal} />;
      case 3:
        return <Step3_Diamond onSelectDiamondShape={setSelectedDiamondShape} selectedDiamondShape={selectedDiamondShape} />;
      case 4:
        return <Step4_Personalization onEngravingChange={setEngravingText} engravingText={engravingText} />;
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
      const design = {
        name: `Custom ${selectedSetting || 'Ring'} - ${new Date().toLocaleDateString()}`,
        designData: {
          setting: selectedSetting,
          metal: selectedMetal,
          diamondShape: selectedDiamondShape,
          engraving: engravingText,
          specifications: {
            metalType: selectedMetal,
            diamondShape: selectedDiamondShape,
            settingStyle: selectedSetting,
            customText: engravingText
          }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-primary text-graphite mb-8">Customize Your Jewelry</h2>
      
      {!user && (
        <div className="bg-white rounded-xl shadow-sm border border-champagne p-8 mb-8">
          <p className="text-lg text-graphite mb-4">
            Sign in to save your custom designs and access them anytime.
          </p>
          <Button 
            variant="primary"
            href="/login"
          >
            Sign In
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 3D Viewer */}
        <div className="bg-white rounded-xl shadow-sm border border-champagne p-6">
          <div ref={mountRef} className="w-full aspect-square rounded-lg overflow-hidden" />
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
                      ? 'bg-lavender text-white'
                      : step < currentStep
                        ? 'bg-sage text-white'
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
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                ${currentStep === 4
                  ? 'bg-gray-100 text-warm-gray cursor-not-allowed'
                  : 'bg-lavender text-white hover:bg-lavender/90'
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
                      : 'bg-sage text-white hover:bg-sage/90'
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
  );
};

export default Configurator;
