import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

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

function LinkedRings() {
  const animGroup = useRef()
  const bowlRing = useRef()
  const tailRing = useRef()

  // Swap axis, expressed in animGroup's local frame. A 180° rotation around
  // (1, 0, 1)/√2 maps the bowl ring's position + normal onto the tail ring's
  // and vice-versa, so every half-revolution the two rings trade places. The
  // "second Q" appears in the original Q's screen position with the former
  // tail now serving as the new bowl.
  const swapAxis = useMemo(
    () => new THREE.Vector3(1, 0, 1).normalize(),
    []
  )

  // Timing: dwell motionless at the Q pose, then spin 180° around swapAxis
  // (which swaps the rings and produces a visually identical "new Q"), then
  // dwell again, repeat. Each spin advances the cumulative rotation by π.
  const DWELL = 1.0
  const SPIN = 2.0
  const CYCLE = DWELL + SPIN
  const SCALE_BOWL = 1.0
  const SCALE_TAIL = 0.85

  useFrame((state) => {
    if (!animGroup.current) return
    const t = state.clock.getElapsedTime()
    const cycleIdx = Math.floor(t / CYCLE)
    const cycleTime = t - cycleIdx * CYCLE

    // spinPhase: 0 during dwell, 0→1 eased across the spin.
    let spinPhase
    if (cycleTime < DWELL) {
      spinPhase = 0
    } else {
      const spinT = (cycleTime - DWELL) / SPIN
      spinPhase = (1 - Math.cos(spinT * Math.PI)) / 2
    }

    // Cumulative angle: each completed cycle adds π (one swap). During the
    // active spin we interpolate another π on top, so the pose is continuous
    // and the dwells land exactly on Q-poses (angle = kπ).
    const angle = (cycleIdx + spinPhase) * Math.PI
    animGroup.current.setRotationFromAxisAngle(swapAxis, angle)

    // Role-based scale: whichever ring is in the BOWL position is 1.0, the
    // one in the TAIL position is 0.85. halfPhase = sin²(angle/2) is 0 at
    // every Q-pose (angle = 2kπ, original roles) and 1 at every swapped
    // Q-pose (angle = (2k+1)π, roles exchanged), so dwells always show the
    // canonical Q silhouette regardless of which ring is currently the bowl.
    const halfPhase = (1 - Math.cos(angle)) / 2
    const delta = SCALE_BOWL - SCALE_TAIL
    if (bowlRing.current) {
      bowlRing.current.scale.setScalar(SCALE_BOWL - delta * halfPhase)
    }
    if (tailRing.current) {
      tailRing.current.scale.setScalar(SCALE_TAIL + delta * halfPhase)
    }
  })

  // Symmetric Hopf pair, designed so the swap axis above is a true symmetry:
  //   bowlRing starts at (0, +0.3, 0) with normal +Z  → face-on to camera
  //   tailRing starts at (0, -0.3, 0) with normal +X  → edge-on in local frame
  // No outer tilt: the rest pose is face-on to the camera. The 180° swap
  // around (1,0,1)/√2 still exchanges the rings' positions and normals, so a
  // visually identical Q appears at every dwell (swapped-role pose).
  return (
    <group>
      <group ref={animGroup}>
        {/* Ring that starts as the BOWL — larger */}
        <mesh ref={bowlRing} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <Ring />
          <meshStandardMaterial
            color="#f2f2f2"
            roughness={0.5}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Ring that starts as the TAIL — initially a bit smaller */}
        <mesh ref={tailRing} position={[0, -0.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <Ring />
          <meshStandardMaterial
            color="#f2f2f2"
            roughness={0.5}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroQ() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 35 }} dpr={[1, 2]} shadows>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#ffffff', '#101010', 0.7]} />
      <directionalLight
        position={[-4, 5, 4]}
        intensity={3.5}
        castShadow
      />
      <LinkedRings />
    </Canvas>
  )
}
