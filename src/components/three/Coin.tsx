import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

/* ── GLSL for textured golden coin ─────────────────────────────────── */

const vertexShader = /* glsl */`
  precision highp float;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vEdgeMask;
  varying vec3 vViewDir;
  varying float vIsFace;

  void main() {
    vUv       = uv;
    vNormal   = normalize(normalMatrix * normal);

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos     = worldPos.xyz;
    vViewDir      = normalize(cameraPosition - worldPos.xyz);

    // Detect if this is a face (top/bottom) vs edge
    float ny  = abs(dot(normalize(normal), vec3(0.0, 1.0, 0.0)));
    vEdgeMask = 1.0 - smoothstep(0.0, 0.25, ny);
    vIsFace   = smoothstep(0.8, 1.0, ny);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */`
  precision highp float;

  varying vec3  vNormal;
  varying vec3  vWorldPos;
  varying vec2  vUv;
  varying float vEdgeMask;
  varying vec3  vViewDir;
  varying float vIsFace;

  uniform float uTime;
  uniform vec3  uLightA;
  uniform vec3  uLightB;
  uniform vec3  uGoldA;
  uniform vec3  uGoldB;
  uniform vec3  uGoldC;
  uniform vec3  uRim;
  uniform float uRoughness;
  uniform sampler2D uTexture;
  uniform float uTextureLoaded;

  vec3 groovedNormal(vec3 n, float edgeMask) {
    float angle   = atan(vWorldPos.z, vWorldPos.x);
    float grooves = sin(angle * 120.0) * 0.35 * edgeMask;
    vec3  tangent = normalize(vec3(-vWorldPos.z, 0.0, vWorldPos.x));
    return normalize(n + tangent * grooves);
  }

  float GGX(vec3 N, vec3 H, float roughness) {
    float a  = roughness * roughness;
    float a2 = a * a;
    float nh = max(dot(N, H), 0.0);
    float d  = nh * nh * (a2 - 1.0) + 1.0;
    return a2 / (3.14159 * d * d + 0.0001);
  }

  float Geo(float nv, float nl, float roughness) {
    float k  = (roughness + 1.0) * (roughness + 1.0) / 8.0;
    float gv = nv / (nv * (1.0 - k) + k);
    float gl = nl / (nl * (1.0 - k) + k);
    return gv * gl;
  }

  float Fresnel(float cosTheta, float f0) {
    return f0 + (1.0 - f0) * pow(1.0 - cosTheta, 5.0);
  }

  float anisoSpec(vec3 N, vec3 L, vec3 V, float sharpness) {
    vec3  H  = normalize(L + V);
    vec3  T  = normalize(vec3(-N.z, 0.0, N.x));
    float th = dot(T, H);
    return pow(max(1.0 - th * th, 0.0), sharpness);
  }

  // Convert texture to grayscale for relief/bump effect
  float getRelief(vec3 texColor) {
    return dot(texColor, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec3  N0  = normalize(vNormal);
    vec3  N   = groovedNormal(N0, vEdgeMask);
    vec3  V   = normalize(vViewDir);

    // Sample texture for coin face
    vec2 centeredUv = vUv;
    vec4 texSample = texture2D(uTexture, centeredUv);
    
    // Extract luminance from texture for relief effect
    float relief = getRelief(texSample.rgb);
    
    // Create gold base color with texture influence
    float radial = length(vUv - 0.5) * 2.0;
    vec3 goldBase = mix(uGoldA, uGoldC, radial * 0.4);
    
    // Mix texture detail into gold - use luminance to modulate gold brightness
    // This creates the embossed golden look
    vec3 base;
    if (vIsFace > 0.5 && uTextureLoaded > 0.5) {
      // On coin faces: blend texture relief with gold color
      vec3 goldTint = vec3(1.0, 0.85, 0.4); // Golden tint multiplier
      vec3 texturedGold = texSample.rgb * goldTint;
      
      // Enhance contrast and shift to gold spectrum
      float lum = relief;
      vec3 enhancedGold = mix(uGoldC * 0.7, uGoldB * 1.3, lum);
      
      // Blend between gold-tinted texture and pure gold based on relief
      base = mix(enhancedGold * 0.8, texturedGold * 1.2, 0.6);
      base = mix(base, uGoldB, relief * 0.3);
    } else {
      // On edges: pure gold
      base = goldBase;
    }

    // Lighting calculations
    vec3  Lk  = normalize(uLightA);
    float NLk = max(dot(N, Lk), 0.0);
    float NVk = max(dot(N, V), 0.001);
    vec3  Hk  = normalize(Lk + V);
    float spec = GGX(N, Hk, uRoughness)
               * Geo(NVk, NLk, uRoughness)
               * Fresnel(max(dot(Hk, V), 0.0), 0.9);
    spec      /= max(4.0 * NVk * NLk, 0.001);
    float aniso = anisoSpec(N, Lk, V, 32.0) * 0.5;

    vec3  Lf  = normalize(uLightB);
    float NLf = max(dot(N, Lf), 0.0) * 0.5;

    // Enhanced rim and shimmer for golden shine
    float rim     = pow(1.0 - max(dot(N, V), 0.0), 3.5);
    float shimmer = sin(uTime * 0.8 + vWorldPos.y * 4.0) * 0.08 + 0.92;
    
    // Sparkle effect based on view angle
    float sparkle = pow(max(dot(reflect(-Lk, N), V), 0.0), 64.0) * 0.4;

    // Combine all lighting
    vec3 colour = base * (NLk * 1.5 + NLf + 0.22);
    colour     += uGoldB * spec * 4.0;
    colour     += uGoldB * aniso;
    colour     += uRim   * rim * (0.7 + vEdgeMask * 0.9);
    colour     += vec3(1.0, 0.95, 0.7) * sparkle;
    colour     *= shimmer;

    // Subtle golden color boost
    colour.r *= 1.05;
    colour.g *= 0.98;

    colour = pow(clamp(colour, 0.0, 1.0), vec3(0.4545));
    gl_FragColor = vec4(colour, 1.0);
  }
`

/* ── Component ─────────────────────────────────────────────────────── */

interface CoinProps {
  nudge: { x: number; y: number }
}

export function Coin({ nudge }: CoinProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef  = useRef<THREE.ShaderMaterial>(null)

  // Load the coin texture
  const texture = useLoader(THREE.TextureLoader, '/Anish_Coin.png')
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.anisotropy = 16
      texture.needsUpdate = true
    }
  }, [texture])

  const geometry = useMemo(() => {
    const g = new THREE.CylinderGeometry(1.0, 1.0, 0.14, 128, 4, false)
    const pos = g.attributes.position
    const uv = g.attributes.uv
    const normal = g.attributes.normal
    
    // Fix UV mapping for cylinder faces
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const r = Math.sqrt(x * x + z * z)
      
      // Bevel the edge
      if (Math.abs(y) > 0.05 && r > 0.95) {
        pos.setXYZ(i, x * 0.96, y - 0.045 * Math.sign(y), z * 0.96)
      }
      
      // Remap UVs for top and bottom faces to show texture properly
      const ny = normal.getY(i)
      if (Math.abs(ny) > 0.9) {
        // This is a face (top or bottom) - flip horizontally to correct mirror
        const u = 1 - (x + 1) / 2
        const v = (z + 1) / 2
        uv.setXY(i, u, ny > 0 ? v : 1 - v)
      }
    }
    
    g.attributes.uv.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])

  const uniforms = useMemo(() => ({
    uTime:          { value: 0 },
    uLightA:        { value: new THREE.Vector3(0.6, 1.2, 0.8) },
    uLightB:        { value: new THREE.Vector3(-0.8, 0.4, -0.5) },
    uGoldA:         { value: new THREE.Color('#D4A84B') },
    uGoldB:         { value: new THREE.Color('#FFE082') },
    uGoldC:         { value: new THREE.Color('#A67C00') },
    uRim:           { value: new THREE.Color('#FFF3C4') },
    uRoughness:     { value: 0.22 },
    uTexture:       { value: null as THREE.Texture | null },
    uTextureLoaded: { value: 0 },
  }), [])

  // Update texture uniform when loaded
  useEffect(() => {
    if (matRef.current && texture) {
      matRef.current.uniforms.uTexture.value = texture
      matRef.current.uniforms.uTextureLoaded.value = 1.0
      matRef.current.needsUpdate = true
    }
  }, [texture])

  useFrame((state, delta) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime

    matRef.current.uniforms.uTime.value = t

    // Idle hover: gentle bob + slow spin
    const targetY = Math.sin(t * 0.9) * 0.08
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * delta * 2.5
    meshRef.current.rotation.y += delta * 0.35

    // Parallax tilt from nudge (scroll / pointer)
    const targetTiltX = nudge.y * 0.18 + 0.14
    const targetTiltZ = nudge.x * -0.12
    meshRef.current.rotation.x += (targetTiltX - meshRef.current.rotation.x) * delta * 3
    meshRef.current.rotation.z += (targetTiltZ - meshRef.current.rotation.z) * delta * 3
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
