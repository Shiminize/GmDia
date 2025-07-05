import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeJSViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf5f5f5);
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 2, 4);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;

      container.appendChild(renderer.domElement);

      // Lighting setup - simplified and optimized
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(5, 5, 5);
      mainLight.castShadow = true;
      mainLight.shadow.mapSize.setScalar(1024);
      mainLight.shadow.camera.near = 1;
      mainLight.shadow.camera.far = 15;
      mainLight.shadow.camera.left = -5;
      mainLight.shadow.camera.right = 5;
      mainLight.shadow.camera.top = 5;
      mainLight.shadow.camera.bottom = -5;
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(-3, 2, -3);
      scene.add(fillLight);

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
      controls.enableZoom = true;
      controls.enablePan = false;
      controls.minDistance = 2;
      controls.maxDistance = 8;
      controls.maxPolarAngle = Math.PI * 0.8;
      controls.target.set(0, 1, 0);
      controlsRef.current = controls;

      // Ground plane for shadows
      const groundGeometry = new THREE.PlaneGeometry(10, 10);
      const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.5;
      ground.receiveShadow = true;
      scene.add(ground);

      // Load model
      const loader = new GLTFLoader();
      loader.load(
        '/customize/ringmodel.glb',
        (gltf) => {
          const model = gltf.scene;
          
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          model.position.sub(center);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          model.scale.setScalar(scale);
          
          // Enable shadows and improve materials
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach((mat) => {
                    if (mat instanceof THREE.MeshStandardMaterial) {
                      mat.envMapIntensity = 1;
                      mat.roughness = 0.1;
                      mat.metalness = 0.9;
                    }
                  });
                } else if (child.material instanceof THREE.MeshStandardMaterial) {
                  child.material.envMapIntensity = 1;
                  child.material.roughness = 0.1;
                  child.material.metalness = 0.9;
                }
              }
            }
          });
          
          scene.add(model);
          modelRef.current = model;
          setLoading(false);
          console.log('Model loaded successfully');
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
          console.error('Error loading model:', error);
          setError('Failed to load 3D model');
          setLoading(false);
        }
      );

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        if (!container || !camera || !renderer) return;
        
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        if (controlsRef.current) {
          controlsRef.current.dispose();
        }
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
          if (container.contains(rendererRef.current.domElement)) {
            container.removeChild(rendererRef.current.domElement);
          }
        }
        
        if (sceneRef.current) {
          sceneRef.current.clear();
        }
      };

    } catch (err) {
      console.error('Error initializing Three.js:', err);
      setError('Failed to initialize 3D viewer');
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">3D Viewer Error</h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Loading 3D Model</h3>
          <p className="text-gray-600 text-sm">Please wait while we prepare your jewelry preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
};

export default ThreeJSViewer; 