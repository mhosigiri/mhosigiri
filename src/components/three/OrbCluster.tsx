import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useOrbStore } from '../../context/OrbEventBus'

interface OrbConfig {
  id: string
  label: string
  color: string
  emissive: string
  position: [number, number, number]
  radius: number
}

const ORBS: OrbConfig[] = [
  { id: 'vr',   label: 'VR/XR',       color: '#7C3AED', emissive: '#4C1D95', position: [-2.5, 1, 0],   radius: 0.6 },
  { id: 'ai',   label: 'AI/ML',       color: '#2563EB', emissive: '#1E3A5F', position: [2.5, 0.5, 0],   radius: 0.7 },
  { id: 'fs',   label: 'Full-Stack',  color: '#0D9488', emissive: '#134E4A', position: [0, -1.5, 0],   radius: 0.5 },
  { id: 'net',  label: 'Networking',  color: '#F59E0B', emissive: '#78350F', position: [-1.5, -0.5, 1], radius: 0.4 },
  { id: 'res',  label: 'Research',    color: '#F8FAFC', emissive: '#94A3B8', position: [1.5, 1.5, 0.5], radius: 0.45 },
]

function Orb({ config, isHovered, onHover, onUnhover }: {
  config: OrbConfig
  isHovered: boolean
  onHover: (id: string) => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.PointLight>(null)
  const targetScale = isHovered ? 1.15 : 1.0
  const targetIntensity = isHovered ? 3 : 0.5

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 4
      )
    }
    if (lightRef.current) {
      lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * delta * 4
    }
  })

  return (
    <group position={config.position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(config.id)}
        onPointerLeave={onUnhover}
      >
        <sphereGeometry args={[config.radius, 32, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        color={config.color}
        intensity={0.5}
        distance={4}
      />
    </group>
  )
}

export function OrbCluster({ compact = false }: { compact?: boolean }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  useOrbStore(s => s.activeSection) // reactive, used by parent

  const orbPositions = ORBS.map((o, index) => {
    if (compact) {
      const angle = (index / ORBS.length) * Math.PI * 2
      return [Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0] as [number, number, number]
    }
    return o.position
  })

  useFrame((_, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {ORBS.map((orb, i) => (
        <group key={orb.id} position={compact ? orbPositions[i] : orb.position}>
          <Orb
            config={orb}
            isHovered={hoveredId === orb.id}
            onHover={setHoveredId}
            onUnhover={() => setHoveredId(null)}
          />
        </group>
      ))}
      <ConstellationLines orbs={ORBS} compact={compact} positions={orbPositions} />
    </group>
  )
}

function ConstellationLines({ orbs, compact, positions }: {
  orbs: OrbConfig[]
  compact: boolean
  positions: [number, number, number][]
}) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const timeRef = useRef(0)
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3]
  ]

  useFrame((_, delta) => {
    timeRef.current += delta
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.15 + 0.1 * Math.sin(timeRef.current * 0.5)
    }
  })

  const points: number[] = []
  connections.forEach(([a, b]) => {
    const pa = compact ? positions[a] : orbs[a].position
    const pb = compact ? positions[b] : orbs[b].position
    points.push(...pa, ...pb)
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#7C3AED"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </lineSegments>
  )
}

export { ORBS }
