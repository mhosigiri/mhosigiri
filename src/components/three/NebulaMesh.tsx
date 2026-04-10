import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NebulaPlane({ color1, color2, position, rotation, speed, opacity }: {
  color1: string; color2: string;
  position: [number, number, number];
  rotation: [number, number, number];
  speed: number; opacity: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const timeRef = useRef(Math.random() * 100)

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(color1) },
      uColor2: { value: new THREE.Color(color2) },
      uOpacity: { value: opacity },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uOpacity;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1,0));
        float c = hash(i + vec2(0,1));
        float d = hash(i + vec2(1,1));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv - 0.5;
        vec2 offset = vec2(uTime * 0.008, uTime * 0.005);
        float n = fbm(uv * 3.0 + offset);
        float n2 = fbm(uv * 5.0 - offset * 0.7);
        float cloud = n * n2;
        float edge = 1.0 - smoothstep(0.0, 0.7, length(uv));
        float alpha = cloud * edge * uOpacity;
        vec3 col = mix(uColor1, uColor2, n2);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  }), [color1, color2, opacity])

  useFrame((_, delta) => {
    timeRef.current += delta * speed
    if (matRef.current) matRef.current.uniforms.uTime.value = timeRef.current
    else material.uniforms.uTime.value = timeRef.current
  })

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[20, 20]} />
      <primitive object={material} ref={matRef} />
    </mesh>
  )
}

export function NebulaMesh() {
  return (
    <group>
      <NebulaPlane
        color1="#4C1D95" color2="#7C3AED"
        position={[-2, 1, -8]} rotation={[0.2, 0.3, 0]}
        speed={1} opacity={0.28}
      />
      <NebulaPlane
        color1="#1E3A5F" color2="#2563EB"
        position={[3, -1, -10]} rotation={[-0.1, -0.2, 0.1]}
        speed={0.7} opacity={0.22}
      />
      <NebulaPlane
        color1="#831843" color2="#BE185D"
        position={[0, 2, -6]} rotation={[0.3, -0.1, 0.2]}
        speed={0.5} opacity={0.18}
      />
    </group>
  )
}
