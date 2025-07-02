// Make sure to install @react-three/fiber and three: npm install @react-three/fiber three
import React from 'react';
import { Canvas } from '@react-three/fiber';
import type { Mesh } from 'three';

function SpinningCube() {
  const meshRef = React.useRef<Mesh>(null);

  React.useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.02;
      }
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshNormalMaterial />
    </mesh>
  );
}

const ThreeDViewer: React.FC = () => (
  <div style={{ width: '100%', height: 400 }}>
    <Canvas camera={{ position: [0, 0, 1] }}>
      <SpinningCube />
    </Canvas>
  </div>
);

export default ThreeDViewer; 