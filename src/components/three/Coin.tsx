import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  CircleGeometry,
  Color,
  Group,
  LatheGeometry,
  MathUtils,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
} from 'three'

export interface CoinProps {
  pointerTarget: RefObject<HTMLElement | null>
  getProgress: () => number
  image: string
}

const radius = 1
const coinScale = 1.3
const rollingRadius = radius * coinScale
const cameraLift = rollingRadius - radius
const faceRadius = 0.958
const halfDepth = 0.116
const rimProfile = [
  new Vector2(faceRadius, -halfDepth),
  new Vector2(0.978, -0.112),
  new Vector2(0.995, -0.098),
  new Vector2(radius, -0.078),
  new Vector2(radius, 0.078),
  new Vector2(0.995, 0.098),
  new Vector2(0.978, 0.112),
  new Vector2(faceRadius, halfDepth),
]

const coinVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vTangent;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vTangent = normalize(mat3(modelMatrix) * vec3(1.0, 0.0, 0.0));
    vec4 positionWorld = modelMatrix * vec4(position, 1.0);
    vPosition = positionWorld.xyz;
    gl_Position = projectionMatrix * viewMatrix * positionWorld;
  }
`

const coinFragment = /* glsl */ `
  uniform sampler2D uImage;
  uniform vec3 uBase;
  uniform vec3 uHighlight;
  uniform vec3 uShadow;
  uniform vec3 uRim;
  uniform bool uFace;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vTangent;
  varying vec3 vPosition;

  float luma(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
  }

  float engravingHeight(vec2 uv) {
    return sqrt(max(luma(texture2D(uImage, uv, 0.65).rgb), 0.0));
  }

  vec3 reliefNormal(vec3 normal, vec2 uv) {
    vec2 stepSize = max(vec2(0.0025), fwidth(uv) * 0.8);
    vec2 u = vec2(stepSize.x, 0.0);
    vec2 v = vec2(0.0, stepSize.y);
    vec2 slope = vec2(
      engravingHeight(uv + u) - engravingHeight(uv - u),
      engravingHeight(uv + v) - engravingHeight(uv - v)
    ) / (2.0 * stepSize);
    vec3 tangent = normalize(vTangent);
    vec3 bitangent = normalize(cross(normal, tangent));
    return normalize(normal - (slope.x * tangent + slope.y * bitangent) * 0.0075);
  }

  float softbox(vec3 ray, vec3 direction, float spread) {
    return pow(max(dot(ray, normalize(direction)), 0.0), spread);
  }

  vec3 studioReflection(vec3 normal, vec3 view, float roughness) {
    vec3 ray = reflect(-view, normal);
    float focus = mix(1.0, 0.45, roughness);
    float key = softbox(ray, vec3(-0.55, 1.65, 1.0), 5.5 * focus);
    float fill = softbox(ray, vec3(0.45, 0.25, 1.0), 3.5 * focus);
    float highlight = softbox(ray, vec3(0.76, 0.30, 0.85), 16.0 * focus);
    float strip = softbox(ray, vec3(1.2, 0.85, -0.25), 14.0 * focus);
    float back = softbox(ray, vec3(-0.6, 1.1, -0.8), 8.0 * focus);
    float ceiling = smoothstep(-0.35, 0.85, ray.y);

    return vec3(0.25 + ceiling * 0.24)
      + key * vec3(1.28, 1.22, 1.10)
      + fill * vec3(0.36, 0.40, 0.46)
      + highlight * vec3(0.58, 0.52, 0.44)
      + strip * vec3(0.82, 0.87, 1.0)
      + back * vec3(0.55, 0.50, 0.40);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 view = normalize(cameraPosition - vPosition);
    vec3 metal;
    float roughness;
    float occlusion;

    if (uFace) {
      vec2 uv = (vUv - 0.5) * 0.973 + 0.5;
      float relief = sqrt(max(luma(texture2D(uImage, uv).rgb), 0.0));
      float stamp = smoothstep(0.06, 0.78, relief);
      float radial = length(vUv - 0.5);
      float lathe = sin(radial * 1180.0);
      lathe *= 1.0 - smoothstep(0.0008, 0.0032, fwidth(radial));
      normal = reliefNormal(normal, uv);

      float polished = smoothstep(0.30, 0.83, stamp);
      roughness = mix(0.52, 0.24, polished) + lathe * 0.018;
      metal = mix(uBase, uHighlight, 0.33 + polished * 0.40);
      occlusion = mix(0.11, 1.31, pow(stamp, 0.80));
    } else {
      float grooveBand = smoothstep(0.24, 0.43, vUv.y) * (1.0 - smoothstep(0.57, 0.76, vUv.y));
      float phase = vUv.x * 691.1504;
      float detail = 1.0 - smoothstep(0.70, 3.05, fwidth(phase));
      float groove = 0.5 + 0.5 * cos(phase) * detail;
      vec3 tangent = vec3(-normal.y, normal.x, 0.0);
      normal = normalize(normal + tangent * sin(phase) * grooveBand * detail * 0.22);
      roughness = mix(0.23, 0.43, grooveBand * (1.0 - groove));
      metal = mix(uBase, uHighlight, 0.36 + (1.0 - grooveBand) * 0.33);
      occlusion = mix(1.0, 0.58 + groove * 0.38, grooveBand);
    }

    float grazing = pow(1.0 - max(dot(normal, view), 0.0), 5.0);
    vec3 reflectance = mix(metal, uRim, grazing * 0.72);
    vec3 color = studioReflection(normal, view, roughness) * reflectance * occlusion;
    color += uShadow * 0.06 * occlusion;
    gl_FragColor = vec4(color / (1.0 + color * 0.25), 1.0);
    #include <colorspace_fragment>
  }
`

const shadowVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec4 vClipPosition;

  void main() {
    vUv = uv;
    vClipPosition = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vClipPosition;
  }
`

const shadowFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec4 vClipPosition;

  void main() {
    vec2 floorPoint = vec2(vUv.x - 0.5, 0.5 - vUv.y) * vec2(4.6, 3.8) - vec2(0.0, 0.6);
    vec2 contact = floorPoint / vec2(0.32, 0.24);
    vec2 ambient = floorPoint / vec2(0.88, 0.48);
    float contactShadow = exp(-dot(contact, contact)) * 0.42;
    float ambientShadow = exp(-dot(ambient, ambient)) * 0.14;

    // Project the coin's silhouette away from the same key light used on its metal.
    float ray = max(0.0, -floorPoint.y);
    vec2 hit = vec2(floorPoint.x - ray * 0.55, ray * 1.65 - 1.0);
    float penumbra = 0.15 + ray * 0.35;
    float castShadow = 1.0 - smoothstep(1.0 - penumbra, 1.0 + penumbra, length(hit));
    castShadow *= smoothstep(-0.07, 0.20, -floorPoint.y) * exp(-ray * 0.85) * 0.26;

    float alpha = 1.0 - (1.0 - contactShadow) * (1.0 - ambientShadow) * (1.0 - castShadow);
    float canvasY = 0.5 + 0.5 * vClipPosition.y / vClipPosition.w;
    gl_FragColor = vec4(0.15, 0.13, 0.11, alpha * smoothstep(0.0, 0.08, canvasY));
  }
`

export function Coin({ pointerTarget, getProgress, image }: CoinProps) {
  const rollingGroup = useRef<Group>(null)
  const shadowGroup = useRef<Group>(null)
  const input = useRef({ progress: 0, pointerX: 0, pointerY: 0 })
  const pose = useRef({ progress: 0, pointerX: 0, pointerY: 0 })
  const hasFrame = useRef(false)
  const source = useLoader(TextureLoader, image)
  const { gl, invalidate } = useThree()

  const { face, rim, texture, palette, faceUniforms, rimUniforms } = useMemo(() => {
    const face = new CircleGeometry(faceRadius, 128)
    const rim = new LatheGeometry(rimProfile, 128).rotateX(Math.PI / 2)
    const texture = source.clone()
    texture.colorSpace = SRGBColorSpace
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    texture.needsUpdate = true
    const palette = {
      uBase: { value: new Color() },
      uHighlight: { value: new Color() },
      uShadow: { value: new Color() },
      uRim: { value: new Color() },
    }
    const uniforms = { ...palette, uImage: { value: texture } }

    return {
      face,
      rim,
      texture,
      palette,
      faceUniforms: { ...uniforms, uFace: { value: true } },
      rimUniforms: { ...uniforms, uFace: { value: false } },
    }
  }, [gl, source])

  useEffect(() => () => texture.dispose(), [texture])

  useEffect(() => {
    const target = pointerTarget.current
    if (!target) return

    const updatePalette = () => {
      const styles = getComputedStyle(target)
      palette.uBase.value.setStyle(styles.getPropertyValue('--coin-base-color').trim())
      palette.uHighlight.value.setStyle(styles.getPropertyValue('--coin-highlight-color').trim())
      palette.uShadow.value.setStyle(styles.getPropertyValue('--coin-shadow-color').trim())
      palette.uRim.value.setStyle(styles.getPropertyValue('--coin-rim-color').trim())
      invalidate()
    }

    const updateScroll = () => {
      const progress = getProgress()
      if (input.current.progress === progress) return
      input.current.progress = progress
      invalidate()
    }

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const bounds = target.getBoundingClientRect()
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) return
      input.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1
      input.current.pointerY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
      invalidate()
    }

    const resetPointer = () => {
      input.current.pointerX = 0
      input.current.pointerY = 0
      invalidate()
    }

    const onContextLost = () => {
      gl.domElement.removeAttribute('data-coin-ready')
      hasFrame.current = false
    }

    const onContextRestored = () => invalidate()

    const observer = new MutationObserver(updatePalette)
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
    updatePalette()
    updateScroll()
    target.addEventListener('pointermove', updatePointer, { passive: true })
    target.addEventListener('pointerleave', resetPointer)
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    gl.domElement.addEventListener('webglcontextlost', onContextLost)
    gl.domElement.addEventListener('webglcontextrestored', onContextRestored)

    return () => {
      observer.disconnect()
      target.removeEventListener('pointermove', updatePointer)
      target.removeEventListener('pointerleave', resetPointer)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
      gl.domElement.removeEventListener('webglcontextlost', onContextLost)
      gl.domElement.removeEventListener('webglcontextrestored', onContextRestored)
      gl.domElement.removeAttribute('data-coin-ready')
      hasFrame.current = false
    }
  }, [getProgress, gl, invalidate, palette, pointerTarget])

  useFrame(({ camera }, delta) => {
    const coin = rollingGroup.current
    const shadow = shadowGroup.current
    if (!coin || !shadow || gl.getContext().isContextLost()) return

    const desired = input.current
    const current = pose.current
    const elapsed = Math.min(delta, 0.05)
    current.progress = MathUtils.damp(current.progress, desired.progress, 13, elapsed)
    current.pointerX = MathUtils.damp(current.pointerX, desired.pointerX, 6, elapsed)
    current.pointerY = MathUtils.damp(current.pointerY, desired.pointerY, 6, elapsed)
    const error = Math.abs(desired.progress - current.progress)
      + Math.abs(desired.pointerX - current.pointerX)
      + Math.abs(desired.pointerY - current.pointerY)
    if (error > 0.0005) {
      invalidate()
    } else {
      Object.assign(current, desired)
    }

    const distance = current.progress * rollingRadius * Math.PI * 4
    const followX = distance - Math.sin(current.progress * Math.PI) * 0.35
    coin.position.x = distance
    coin.rotation.z = 0.09 - distance / rollingRadius
    shadow.position.x = distance

    camera.position.set(followX - 1.58 + current.pointerX * 0.15, 1.57 + cameraLift - current.pointerY * 0.09, 4.55)
    camera.lookAt(followX, 0.99 + cameraLift, 0)

    if (!hasFrame.current) {
      gl.domElement.toggleAttribute('data-coin-ready', true)
      hasFrame.current = true
    }
  })

  return (
    <>
      <group ref={shadowGroup} position={[0, 0.002, 0]} scale={coinScale}>
        <mesh position={[0, 0, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.6, 3.8]} />
          <shaderMaterial
            vertexShader={shadowVertex}
            fragmentShader={shadowFragment}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
      <group ref={rollingGroup} position={[0, rollingRadius, 0]} rotation={[0, 0, 0.09]} scale={coinScale}>
        <mesh geometry={rim}>
          <shaderMaterial vertexShader={coinVertex} fragmentShader={coinFragment} uniforms={rimUniforms} />
        </mesh>
        <mesh geometry={face} position={[0, 0, halfDepth]}>
          <shaderMaterial vertexShader={coinVertex} fragmentShader={coinFragment} uniforms={faceUniforms} />
        </mesh>
        <mesh geometry={face} position={[0, 0, -halfDepth]} rotation={[0, Math.PI, 0]}>
          <shaderMaterial vertexShader={coinVertex} fragmentShader={coinFragment} uniforms={faceUniforms} />
        </mesh>
      </group>
    </>
  )
}
