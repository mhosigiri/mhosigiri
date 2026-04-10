import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StarFieldProps {
  count?: number
  scrollY?: number
}

export function StarField({ count = 8000, scrollY = 0 }: StarFieldProps) {
  const timeRef = useRef(0)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#C4B5FD'),
      new THREE.Color('#93C5FD'),
    ]
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      const col = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
      sizes[i] = 0.5 + Math.random() * 2
    }
    return { positions, colors, sizes }
  }, [count])

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uScrollY: { value: 0 } },
    vertexShader: `
      attribute float aSize;
      attribute vec3 aColor;
      varying vec3 vColor;
      uniform float uTime;
      uniform float uScrollY;
      void main() {
        vColor = aColor;
        vec3 pos = position;
        pos.y -= uScrollY * 0.02;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + position.x * 10.0);
        gl_PointSize = aSize * twinkle * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, d);
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, colors, sizes])

  useFrame((_, delta) => {
    timeRef.current += delta
    material.uniforms.uTime.value = timeRef.current
    material.uniforms.uScrollY.value = scrollY
  })

  return <points geometry={geometry} material={material} />
}
