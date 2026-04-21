import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Brand palette (user-specified) ─────────────────────────────────────────
const NEON_CYAN   = new THREE.Color('#00F2FE')
const NEON_VIOLET = new THREE.Color('#A18CD1')

// ─── Dark-mode detection (no next-themes — this project uses class-based DM) ─
function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark'))
    )
    obs.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])
  return isDark
}

// ─── MeshPhysicalMaterial with world-Y cyan→violet gradient ─────────────────
// Uses onBeforeCompile to inject the gradient into both diffuse and emissive
// channels, keeping all PBR lighting (metalness, roughness, clearcoat) intact.
function useNeonMaterial(isDark) {
  const mat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness:          isDark ? 0.82 : 0.65,
      roughness:          isDark ? 0.14 : 0.22,
      clearcoat:          1.0,
      clearcoatRoughness: 0.08,
      emissiveIntensity:  1.0,
      side: THREE.DoubleSide,
    })
    const emStr = isDark ? 0.9 : 0.42

    m.onBeforeCompile = (shader) => {
      shader.uniforms.uColorA = { value: NEON_CYAN }
      shader.uniforms.uColorB = { value: NEON_VIOLET }
      shader.uniforms.uEmStr  = { value: emStr }

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vNeonWorld;'
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvNeonWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;'
        )

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform float uEmStr;
varying vec3  vNeonWorld;`
        )
        .replace(
          '#include <color_fragment>',
          `float gradT = smoothstep(-1.4, 1.4, vNeonWorld.y);
vec3 gradCol = mix(uColorA, uColorB, gradT);
diffuseColor.rgb = gradCol;`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#include <emissivemap_fragment>
float emT = smoothstep(-1.4, 1.4, vNeonWorld.y);
totalEmissiveRadiance += mix(uColorA, uColorB, emT) * uEmStr;`
        )
    }
    return m
  }, [isDark])

  // Dispose the old material when isDark flips
  useEffect(() => () => { mat.dispose() }, [mat])

  return mat
}

// ─── Ring geometry ───────────────────────────────────────────────────────────
// Rectangular cross-section LatheGeometry — DO NOT change r, R, d, or segments.
function Ring() {
  const geometry = useMemo(() => {
    const R = 1.0
    const r = 0.55
    const d = 0.14
    const points = [
      new THREE.Vector2(r,  d),
      new THREE.Vector2(R,  d),
      new THREE.Vector2(R, -d),
      new THREE.Vector2(r, -d),
      new THREE.Vector2(r,  d),
    ]
    return new THREE.LatheGeometry(points, 96)
  }, [])
  return <primitive object={geometry} />
}

// ─── Hopf-link animation ─────────────────────────────────────────────────────
// HARD CONSTRAINTS (must not be changed):
//   • setRotationFromAxisAngle — never rotateOnWorldAxis
//   • swapAxis = (1,0,1).normalize()
//   • DWELL 1 s / SPIN 2 s / easeInOutSine per cycle
//   • role-based SCALE_BOWL / SCALE_TAIL swap
function LinkedRings({ isDark }) {
  const animGroup = useRef()
  const bowlRing  = useRef()
  const tailRing  = useRef()
  const neonMat   = useNeonMaterial(isDark)

  const swapAxis = useMemo(() => new THREE.Vector3(1, 0, 1).normalize(), [])

  const DWELL      = 1.0
  const SPIN       = 2.0
  const CYCLE      = DWELL + SPIN
  const SCALE_BOWL = 1.0
  const SCALE_TAIL = 0.85

  useFrame((state) => {
    if (!animGroup.current) return
    const t        = state.clock.getElapsedTime()
    const cycleIdx = Math.floor(t / CYCLE)
    const cycleT   = t - cycleIdx * CYCLE

    const spinPhase = cycleT < DWELL
      ? 0
      : (1 - Math.cos(((cycleT - DWELL) / SPIN) * Math.PI)) / 2

    const angle = (cycleIdx + spinPhase) * Math.PI
    animGroup.current.setRotationFromAxisAngle(swapAxis, angle)

    const halfPhase = (1 - Math.cos(angle)) / 2
    const delta     = SCALE_BOWL - SCALE_TAIL
    if (bowlRing.current) bowlRing.current.scale.setScalar(SCALE_BOWL - delta * halfPhase)
    if (tailRing.current) tailRing.current.scale.setScalar(SCALE_TAIL + delta * halfPhase)
  })

  return (
    <group>
      <group ref={animGroup}>
        {/* Bowl ring — starts face-on to camera */}
        <mesh ref={bowlRing} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]} material={neonMat}>
          <Ring />
        </mesh>
        {/* Tail ring — starts edge-on, interlocked */}
        <mesh ref={tailRing} position={[0, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]} material={neonMat}>
          <Ring />
        </mesh>
      </group>
    </group>
  )
}

// ─── Scene root ──────────────────────────────────────────────────────────────
export default function HeroQ() {
  const isDark = useDarkMode()

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 35 }}
      dpr={[1, 2]}
      gl={{
        toneMapping:         THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        antialias:           true,
        alpha:               true,
      }}
    >
      {/* Slate-950 in dark, slate-50 in light — matches HeroSection bg */}
      <color attach="background" args={[isDark ? '#020617' : '#f8fafc']} />

      {/* Low ambient so emissive/metalness pops, hemi tinted to brand colors */}
      <ambientLight intensity={isDark ? 0.10 : 0.35} />
      <hemisphereLight args={['#00F2FE', '#A18CD1', isDark ? 0.45 : 0.22]} />

      {/* PBR key light preserves clearcoat specular highlights */}
      <directionalLight
        position={[-4, 5, 4]}
        intensity={isDark ? 1.4 : 2.2}
        color={isDark ? '#ffffff' : '#e0e7ff'}
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.1, 15]} />
      </directionalLight>

      {/* Sky-500 rim light from behind for the neon halo silhouette */}
      <pointLight
        position={[3, -2, -3]}
        intensity={isDark ? 2.0 : 1.0}
        color="#0EA5E9"
        distance={12}
      />

      <LinkedRings isDark={isDark} />

      {/* Bloom is lighter in light mode so it doesn't blow out the ring shape */}
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={isDark ? 1.2 : 0.55}
          luminanceThreshold={isDark ? 0.35 : 0.55}
          luminanceSmoothing={0.6}
          mipmapBlur
          radius={isDark ? 0.7 : 0.45}
        />
      </EffectComposer>
    </Canvas>
  )
}
