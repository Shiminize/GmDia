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
import './Customization.css';
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
    <div className="configurator-page">
      <h2>Customize Your Jewelry</h2>
      {!user && (
        <div className="login-prompt" style={{
          background: 'var(--pure-white)',
          borderRadius: 'var(--radius-large)',
          boxShadow: 'var(--shadow-light)',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <p>Please log in to save your custom design and preview in 3D.</p>
        </div>
      )}
      {saveMessage && (
        <div className={`save-message ${saveMessage.includes('Failed') ? 'error' : 'success'}`} style={{
          background: saveMessage.includes('Failed') ? 'rgba(231, 76, 60, 0.1)' : 'rgba(46, 204, 113, 0.1)',
          color: saveMessage.includes('Failed') ? 'var(--error-color)' : 'var(--success-progress)',
          borderRadius: 'var(--radius-medium)',
          padding: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          border: `1px solid ${saveMessage.includes('Failed') ? 'var(--error-color)' : 'var(--success-progress)'}`,
        }}>
          {saveMessage}
        </div>
      )}
      <div className="configurator-content">
        <div className="configurator-3d-viewer">
          <ThreeDViewer />
        </div>
        <div className="configurator-steps">
          <div className="step-progress" style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`step-indicator ${currentStep >= step ? 'active' : ''}`}
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: currentStep >= step ? 'var(--digital-lavender)' : 'var(--light-gray)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: currentStep >= step ? 'var(--pure-white)' : 'var(--warm-gray)',
                  fontWeight: '500',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {step}
              </div>
            ))}
            <div
              className="step-progress-bar"
              style={{
                position: 'absolute',
                top: '50%',
                left: '10%',
                right: '10%',
                height: '2px',
                background: 'var(--light-gray)',
                transform: 'translateY(-50%)',
                zIndex: 0
              }}
            >
              <div
                style={{
                  width: `${((currentStep - 1) / 3) * 100}%`,
                  height: '100%',
                  background: 'var(--digital-lavender)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
          {renderStepComponent()}
          <div className="navigation-buttons">
            <Button onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                  onClick={handleSaveDesign}
                  disabled={saving || !user || !isConfigurationComplete}
                  style={{
                    background: 'linear-gradient(135deg, var(--digital-lavender) 0%, var(--muted-blush) 100%)',
                    color: 'var(--graphite-black)'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Design'}
                </Button>
                <Button
                  onClick={handleShareDesign}
                  disabled={!isConfigurationComplete}
                  style={{
                    background: 'var(--graphite-black)',
                    color: 'var(--pure-white)'
                  }}
                >
                  Share Design
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
