import { Component, lazy, Suspense, useRef, useState, type ReactNode, type RefObject } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './CoinScene.css'

const CoinCanvas = lazy(() => import('./CoinCanvas'))
const coinImage = '/anish-coin.webp'
// Resting frame from the WebGL scene, including the rim, studio light, and shadow.
const coinPoster = '/anish-coin-poster.webp'

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
  const spinTarget = useRef<HTMLButtonElement>(null)
  if (!supported) return null

  return (
    <CoinCanvasBoundary>
      <Suspense fallback={null}>
        <CoinCanvas pointerTarget={pointerTarget} getProgress={getProgress} image={coinImage} spinTarget={spinTarget} />
      </Suspense>
      <button ref={spinTarget} className="coin-scene__spin" type="button" aria-label="Spin the coin" />
    </CoinCanvasBoundary>
  )
}

export function CoinScene({ pointerTarget, getProgress }: CoinSceneProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="coin-scene">
      <img className="coin-scene__poster" src={coinPoster} alt="" width={1680} height={952} fetchPriority="high" />
      {!reduceMotion && <AnimatedCoin pointerTarget={pointerTarget} getProgress={getProgress} />}
    </div>
  )
}
