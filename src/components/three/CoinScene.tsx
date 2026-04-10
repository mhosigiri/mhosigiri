import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Coin } from './Coin'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CoinSceneProps {
  nudge: { x: number; y: number }
  /** 0 = fully in hero, 1 = hero completely scrolled past */
  exitRatio: number
}

export function CoinScene({ nudge, exitRatio }: CoinSceneProps) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null

  const blur    = exitRatio * 18          // 0px → 18px
  const opacity = 1 - exitRatio * 0.85   // 1 → 0.15 (never fully invisible)

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        filter: `blur(${blur.toFixed(2)}px)`,
        opacity,
        transition: 'filter 0.15s linear, opacity 0.15s linear',
        willChange: 'filter, opacity',
      }}
    >
    <Canvas
      aria-hidden="true"
      role="presentation"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      camera={{ position: [0, 0.4, 4.2], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      shadows
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 3]}   intensity={3.5} color="#FFE0A0" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#B0C8FF" />
      <directionalLight position={[0, -3, 2]}  intensity={0.4} color="#FFD080" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Coin nudge={nudge} />
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.3}
          scale={3.5}
          blur={2.5}
          far={3}
          color="#8B6914"
        />
      </Suspense>
    </Canvas>
    </div>
  )
}
