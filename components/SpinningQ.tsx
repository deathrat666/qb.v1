import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import './SpinningQ.css';

/* ---------------------------------------------------------------------------
 * Neon gradient material
 *
 * Built on top of MeshStandardMaterial via onBeforeCompile so we keep PBR
 * lighting (metalness, roughness, env reflections) but inject a vertical
 * world-space gradient from neon cyan -> vivid lavender for both the diffuse
 * and emissive channels. This gives the rings a glowing-glass / neon look
 * without touching any geometry or animation code.
 * ------------------------------------------------------------------------- */
const NEON_CYAN = new THREE.Color('#00F2FE');
const NEON_VIOLET = new THREE.Color('#A18CD1');

function useNeonMaterial() {
  return useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 0.85,
      roughness: 0.18,
      emissive: '#1a0033',
      emissiveIntensity: 1.0,
      side: THREE.DoubleSide,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uColorA = { value: NEON_CYAN };
      shader.uniforms.uColorB = { value: NEON_VIOLET };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>\nvarying vec3 vNeonWorldPos;`
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>\nvNeonWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
           uniform vec3 uColorA;
           uniform vec3 uColorB;
           varying vec3 vNeonWorldPos;`
        )
        .replace(
          '#include <color_fragment>',
          `float gradT = smoothstep(-1.4, 1.4, vNeonWorldPos.y);
           vec3 gradCol = mix(uColorA, uColorB, gradT);
           diffuseColor.rgb = gradCol;`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
           float emT = smoothstep(-1.4, 1.4, vNeonWorldPos.y);
           totalEmissiveRadiance += mix(uColorA, uColorB, emT) * 0.85;`
        );
    };

    return mat;
  }, []);
}

/**
 * A thick annulus ring with a rectangular cross-section.
 * Proportions (based on OD = 2.0):
 * - R (Outer Radius) = 1.0 (100% OD)
 * - r (Inner Radius) = 0.55 (55% OD)
 * - d (Half-Depth) = 0.14 (14% OD total depth)
 */
function RingMesh({ material }: { material: THREE.Material }) {
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

  return <mesh geometry={geometry} material={material} />;
}

function TailMesh({ material }: { material: THREE.Material }) {
  return (
    <mesh material={material}>
      {/*
        A smooth pill-like shape that matches the overall aesthetic of the rings.
        Args: [radius, length, capSegments, radialSegments]
      */}
      <capsuleGeometry args={[0.22, 0.7, 16, 64]} />
    </mesh>
  );
}

function LinkedRings() {
  const groupRef = useRef<THREE.Group>(null);
  const axis = useMemo(() => new THREE.Vector3(0.34, 0.94, 0).normalize(), []);
  const neonMaterial = useNeonMaterial();

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
        <RingMesh material={neonMaterial} />
      </group>

      {/* Ring 2 (Edge-on initially, interlocked) */}
      <group position={[0, 0, -offset]} rotation={[Math.PI / 2, 0, 0]}>
        <RingMesh material={neonMaterial} />
      </group>

      {/* Tail (Bottom right, interlocked into the Q shape) */}
      <group position={[0.7, -0.7, 0.15]} rotation={[0, 0, -Math.PI / 4]}>
        <TailMesh material={neonMaterial} />
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
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={['#020617']} />

        {/* Neon-aesthetic lighting: low ambient, cyan/violet hemi tint,
            white key for material highlights, sky-cyan rim for glow accent. */}
        <ambientLight intensity={0.12} />
        <hemisphereLight args={['#00F2FE', '#A18CD1', 0.45]} />

        {/* Key light — keeps PBR specular highlights crisp on the metallic
            material so the rings still read as glass/metal, not flat neon. */}
        <directionalLight
          position={[-4, 5, 4]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.1, 15]} />
        </directionalLight>

        {/* Sky-500 rim light from behind for the neon halo silhouette */}
        <pointLight position={[3, -2, -3]} intensity={2.2} color="#0EA5E9" distance={12} />

        <LinkedRings />

        {/* Bloom amplifies the high-emissive material into a true neon glow. */}
        <EffectComposer multisampling={4}>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.6}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>

      {/* Vignette and film grain are handled in SpinningQ.css */}
    </div>
  );
}
