import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const checkWebGLSupport = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const setupLights = (scene: THREE.Scene): THREE.Light[] => {
  const lights: THREE.Light[] = [];

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
  lights.push(ambientLight);

  // Main directional light
  const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
  mainLight.position.set(5, 8, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);
  lights.push(mainLight);

  // Fill light
  const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);
  lights.push(fillLight);

  // Rim light
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
  rimLight.position.set(0, -2, 5);
  scene.add(rimLight);
  lights.push(rimLight);

  return lights;
};

const ThreeJSViewer: React.FC = () => {
  console.log('[ThreeJSViewer] Component render');
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    console.log('[ThreeJSViewer] useLayoutEffect running');
    setTimeout(() => {
      if (!containerRef.current) {
        console.log('[ThreeJSViewer] containerRef.current still null after timeout');
        return;
      }
      console.log('[ThreeJSViewer] containerRef.current is present, proceeding with loader setup');

      // Check WebGL support
      if (!checkWebGLSupport()) {
        setError('WebGL is not available in your browser');
        setLoading(false);
        return;
      }

      console.log('🎨 Initializing ThreeJS Scene');
      const container = containerRef.current;
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      // Camera setup with better positioning
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 20);
      camera.position.set(0, 1, 4); // Move camera even closer to the model
      cameraRef.current = camera;

      // Renderer setup with better defaults
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      
      console.log('📊 Renderer Capabilities:', {
        webgl: renderer.capabilities.isWebGL2 ? 'WebGL2' : 'WebGL1',
        maxTextures: renderer.capabilities.maxTextures,
        maxAttributes: renderer.capabilities.maxAttributes
      });

      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      // Setup orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 3;
      controls.maxDistance = 20;
      controls.maxPolarAngle = Math.PI / 1.5;
      controlsRef.current = controls;

      // Setup lights with logging
      const lights = setupLights(scene);
      console.log('💡 Lights Setup:', lights.map(light => ({
        type: light.type,
        position: light.position,
        intensity: light.intensity
      })));

      // Load model with timeout
      const loader = new GLTFLoader();
      console.log('[ThreeJSViewer] About to call loader.load');
      const modelPath = (process.env.PUBLIC_URL || '') + '/Customize/ringmodel.glb';
      console.log('[ThreeJSViewer] Attempting to load model:', modelPath);
      
      // Set loading timeout using ref
      loadingTimeoutRef.current = setTimeout(() => {
        if (!modelRef.current) {
          setError('Model loading timed out. Please refresh the page.');
          setLoading(false);
          console.error('[ThreeJSViewer] Model loading timed out');
        }
      }, 30000);
      
      try {
        console.log('[ThreeJSViewer] Calling loader.load...');
        loader.load(
          modelPath,
          (gltf) => {
            console.log('[ThreeJSViewer] Model loaded successfully:', gltf);
            console.log('✅ Model Loaded Successfully:', {
              version: gltf.parser.json.asset.version,
              scenes: gltf.scenes.length,
              animations: gltf.animations.length,
              materials: Object.keys(gltf.parser.json.materials || {}).length
            });
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            gltf.scene.position.x += (gltf.scene.position.x - center.x);
            gltf.scene.position.y += (gltf.scene.position.y - center.y);
            gltf.scene.position.z += (gltf.scene.position.z - center.z);
            
            // Scale the model to a more visible size (e.g., 4 units)
            const desiredSize = 4;
            const scale = desiredSize / Math.max(size.x, size.y, size.z);
            gltf.scene.scale.multiplyScalar(scale);
            
            scene.add(gltf.scene);
            modelRef.current = gltf.scene;
            
            // Log scene hierarchy
            console.log('🌳 Scene Hierarchy:', {
              children: scene.children.map(child => ({
                type: child.type,
                name: child.name,
                position: child.position,
                visible: child.visible
              }))
            });
            
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
              loadingTimeoutRef.current = null;
            }
            setLoading(false);
          },
          (progress) => {
            console.log('[ThreeJSViewer] Model loading progress:', progress);
            const percent = Math.round((progress.loaded / progress.total) * 100);
            console.log(`📦 Loading Progress: ${percent}%`, {
              loaded: progress.loaded,
              total: progress.total
            });
          },
          (err: unknown) => {
            console.error('[ThreeJSViewer] Model loading error:', err);
            const error = err as Error;
            console.error('❌ Model Loading Error:', error);
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
              loadingTimeoutRef.current = null;
            }
            setError('Failed to load 3D model. Please check your connection or try again later.');
            setLoading(false);
          }
        );
        console.log('[ThreeJSViewer] loader.load call finished (async)');
      } catch (e) {
        console.error('[ThreeJSViewer] Exception thrown during loader.load:', e);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        setError('Unexpected error during model load.');
        setLoading(false);
      }

      // Animation loop with performance monitoring
      let frameCount = 0;
      const animate = () => {
        frameCount++;
        if (frameCount % 60 === 0) {
          console.log('🎬 Animation Frame:', {
            frame: frameCount,
            modelLoaded: !!modelRef.current,
            sceneChildren: scene.children.length
          });
        }
        
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        const animationId = requestAnimationFrame(animate);
        animationIdRef.current = animationId;
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

      // Global error logging for silent errors
      const handleError = (event: ErrorEvent) => {
        console.error('[ThreeJSViewer] window.onerror:', event.message, event.filename, event.lineno, event.colno, event.error);
      };
      const handleRejection = (event: PromiseRejectionEvent) => {
        console.error('[ThreeJSViewer] window.onunhandledrejection:', event.reason);
      };
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleRejection);

      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up Three.js viewer...');
        
        // Stop animation loop
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        
        // Clear loading timeout
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        
        // Dispose controls
        if (controlsRef.current) {
          controlsRef.current.dispose();
          controlsRef.current = null;
        }
        
        // Dispose model
        if (modelRef.current) {
          scene.remove(modelRef.current);
          modelRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material instanceof THREE.Material) {
                child.material.dispose();
              } else if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              }
            }
          });
          modelRef.current = null;
        }
        
        // Dispose lights
        scene.traverse((object) => {
          if (object instanceof THREE.Light) {
            scene.remove(object);
          }
        });
        
        // Dispose renderer
        if (container && rendererRef.current) {
          container.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
          rendererRef.current = null;
        }
        
        // Remove event listener
        window.removeEventListener('resize', handleResize);
        
        // Clear scene
        if (sceneRef.current) {
          while(sceneRef.current.children.length > 0) { 
            sceneRef.current.remove(sceneRef.current.children[0]);
          }
          sceneRef.current = null;
        }

        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleRejection);
      };
    }, 0);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div 
        ref={containerRef}
        data-testid="threejs-container"
        className="w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      ></div>
      {loading && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)', zIndex: 2 }}>
          <div className="w-12 h-12 border-2 border-lavender/30 border-t-lavender rounded-full animate-spin mb-4"></div>
          <p className="text-graphite font-medium">Loading 3D Model<br /><span className="text-xs text-warm-gray">Please wait while we prepare your jewelry preview...</span></p>
        </div>
      )}
      {error && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)', zIndex: 2 }}>
          <div className="w-12 h-12 border-2 border-blush/30 border-t-blush rounded-full animate-spin mb-4"></div>
          <p className="text-blush font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ThreeJSViewer; 