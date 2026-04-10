import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { StarField } from './StarField'
import { NebulaMesh } from './NebulaMesh'
import { OrbCluster } from './OrbCluster'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function CameraRig({ scrollY, reduceMotion }: { scrollY: number; reduceMotion: boolean }) {
  const { camera } = useThree()
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    if (!reduceMotion) {
      timeRef.current += delta
      camera.position.x = Math.sin(timeRef.current * 0.0003 * 60) * 0.5
    }
    const targetZ = 5 - (scrollY / window.innerHeight) * 3
    camera.position.z += (THREE.MathUtils.clamp(targetZ, 2, 5) - camera.position.z) * delta * 2
  })

  return null
}

function SceneContent({ scrollY, reduceMotion, isMobile }: {
  scrollY: number; reduceMotion: boolean; isMobile: boolean
}) {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const showPP = !reduceMotion && fps > 30

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    if (now - lastTime.current > 1000) {
      setFps(frameCount.current)
      frameCount.current = 0
      lastTime.current = now
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <CameraRig scrollY={scrollY} reduceMotion={reduceMotion} />
      <StarField count={isMobile ? 3000 : 8000} scrollY={scrollY} />
      <NebulaMesh />
      <OrbCluster />
      {showPP ? (
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.6} luminanceSmoothing={0.4} />
          {!isMobile ? (
            <ChromaticAberration
              offset={new THREE.Vector2(0.0005, 0.0005) as any}
              blendFunction={BlendFunction.NORMAL}
            />
          ) : <></>}
          <Vignette darkness={0.4} offset={0.3} />
        </EffectComposer>
      ) : <></>}
    </>
  )
}

interface CosmicSceneProps {
  scrollY?: number
}

export function CosmicScene({ scrollY = 0 }: CosmicSceneProps) {
  const reduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      aria-hidden="true"
      role="presentation"
      gl={{ antialias: true, alpha: false }}
    >
      <SceneContent scrollY={scrollY} reduceMotion={reduceMotion} isMobile={isMobile} />
    </Canvas>
  )
}
