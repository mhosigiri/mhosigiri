import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Coin, type CoinProps } from './Coin'

export default function CoinCanvas({ pointerTarget, getProgress, image }: CoinProps) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [-1.58, 1.57, 4.55], fov: 35, near: 0.1, far: 30 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Coin pointerTarget={pointerTarget} getProgress={getProgress} image={image} />
      </Suspense>
    </Canvas>
  )
}
