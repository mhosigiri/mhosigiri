import { Component, lazy, Suspense, useState, type ReactNode, type RefObject } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './CoinScene.css'

const CoinCanvas = lazy(() => import('./CoinCanvas'))
const coinImage = '/anish-coin.webp'

interface CoinSceneProps {
  pointerTarget: RefObject<HTMLElement | null>
  getProgress: () => number
}

class CoinCanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

function canRenderCoin() {
  const context = document.createElement('canvas').getContext('webgl2')
  if (!context) return false
  context.getExtension('WEBGL_lose_context')?.loseContext()
  return true
}

function AnimatedCoin({ pointerTarget, getProgress }: CoinSceneProps) {
  const [supported] = useState(canRenderCoin)
  if (!supported) return null

  return (
    <CoinCanvasBoundary>
      <Suspense fallback={null}>
        <CoinCanvas pointerTarget={pointerTarget} getProgress={getProgress} image={coinImage} />
      </Suspense>
    </CoinCanvasBoundary>
  )
}

export function CoinScene({ pointerTarget, getProgress }: CoinSceneProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="coin-scene" aria-hidden="true">
      <div className="coin-scene__fallback">
        <img src={coinImage} alt="" width={960} height={960} fetchPriority="high" />
      </div>
      {!reduceMotion && <AnimatedCoin pointerTarget={pointerTarget} getProgress={getProgress} />}
    </div>
  )
}
