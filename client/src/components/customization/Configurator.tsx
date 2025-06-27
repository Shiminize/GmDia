import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import Step1_Setting from './Step1_Setting';
import Step2_Metal from './Step2_Metal';
import Step3_Diamond from './Step3_Diamond';
import Step4_Personalization from './Step4_Personalization';
import Button from '../common/Button';

const Configurator: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSetting, setSelectedSetting] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedDiamondShape, setSelectedDiamondShape] = useState<string>('');
  const [engravingText, setEngravingText] = useState<string>('');

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

  const handleSaveDesign = () => {
    const design = {
      setting: selectedSetting,
      metal: selectedMetal,
      diamondShape: selectedDiamondShape,
      engraving: engravingText,
    };
    console.log('Saving design:', design);
    alert('Design saved! (Check console for details)');
    // In a real application, this would send the design to the backend
  };

  const handleShareDesign = () => {
    const shareLink = `https://yourbrand.com/customize?setting=${selectedSetting}&metal=${selectedMetal}&shape=${selectedDiamondShape}&engraving=${engravingText}`;
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert('Design link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy link.');
      });
  };

  return (
    <div className="configurator-page">
      <h2>Customize Your Jewelry</h2>
      <div className="configurator-content">
        <div className="configurator-3d-viewer">
          <div ref={mountRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}></div>
        </div>
        <div className="configurator-steps">
          {renderStepComponent()}
          <div className="navigation-buttons">
            <Button onClick={handlePrevious} disabled={currentStep === 1}>Previous</Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <>
                <Button onClick={handleSaveDesign}>Save Design</Button>
                <Button onClick={handleShareDesign}>Share Design</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
