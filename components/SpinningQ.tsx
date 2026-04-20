import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import './SpinningQ.css';

/**
 * A thick annulus ring with a rectangular cross-section.
 * Proportions (based on OD = 2.0):
 * - R (Outer Radius) = 1.0 (100% OD)
 * - r (Inner Radius) = 0.55 (55% OD)
 * - d (Half-Depth) = 0.14 (14% OD total depth)
 */
function RingMesh() {
  const geometry = useMemo(() => {
    const R = 1.0;      // outer radius
    const r = 0.55;     // inner radius
    const d = 0.14;     // half-depth (total depth 0.28 = 14% of OD 2.0)
    
    // Points for a closed rectangular profile
    const points = [
      new THREE.Vector2(r,  d),
      new THREE.Vector2(R,  d),
      new THREE.Vector2(R, -d),
      new THREE.Vector2(r, -d),
      new THREE.Vector2(r,  d),
    ];
    
    // 96 segments for buttery smooth circular edges
    const geom = new THREE.LatheGeometry(points, 96);
    return geom;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color="#ededed" 
        roughness={0.55} 
        metalness={0} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

function LinkedRings() {
  const groupRef = useRef<THREE.Group>(null);
  const axis = useMemo(() => new THREE.Vector3(0.34, 0.94, 0).normalize(), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // "One full revolution every 10 seconds, eased with easeInOutSine"
    const period = 10;
    const t = state.clock.getElapsedTime() % period;
    const progress = t / period;

    // easeInOutSine mapping [0, 1] to [0, 1]
    const easedProgress = (1 - Math.cos(progress * Math.PI)) / 2;
    
    // Total angle for the current revolution
    const angle = easedProgress * Math.PI * 2;

    // Reset rotation and apply based on the single fixed tilted axis
    groupRef.current.setRotationFromAxisAngle(axis, angle);
  });

  // Position offset to form a true Hopf link/chain link appearance
  // We offset them slightly so they interlock with space, rather than intersecting volumes.
  const offset = 0.35;

  return (
    <group ref={groupRef}>
      {/* Ring 1 (Face-on initially) */}
      <group position={[-offset, 0, 0]}>
        <RingMesh />
      </group>
      
      {/* Ring 2 (Edge-on initially, interlocked) */}
      <group position={[0, 0, -offset]} rotation={[Math.PI / 2, 0, 0]}>
        <RingMesh />
      </group>
    </group>
  );
}

export default function SpinningQ() {
  return (
    <div className="spinning-q-container cursor-default overflow-hidden">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        
        {/* Cinematic Studio Lighting tuned for unglazed porcelain */}
        <ambientLight intensity={0.2} />
        <hemisphereLight args={['#ffffff', '#101010', 0.6]} />
        
        {/* Strong Key Light from upper-front-left */}
        <directionalLight
          position={[-4, 5, 4]}
          intensity={2.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.1, 15]} />
        </directionalLight>

        <LinkedRings />
      </Canvas>
      
      {/* Vignette and film grain are handled in SpinningQ.css */}
    </div>
  );
}
