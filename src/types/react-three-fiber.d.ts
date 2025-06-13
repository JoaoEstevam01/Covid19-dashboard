import { Object3D, Material, Mesh, Light } from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    group: JSX.IntrinsicElements['div'] & { position?: [number, number, number] }
    mesh: JSX.IntrinsicElements['div'] & {
      ref?: React.RefObject<Mesh>
      scale?: [number, number, number]
      position?: [number, number, number]
      onPointerOver?: () => void
      onPointerOut?: () => void
      onClick?: () => void
    }
    boxGeometry: JSX.IntrinsicElements['div'] & { args?: [number, number, number] }
    meshStandardMaterial: JSX.IntrinsicElements['div'] & {
      color?: string
      metalness?: number
      roughness?: number
      transparent?: boolean
      opacity?: number
    }
    ambientLight: JSX.IntrinsicElements['div'] & { intensity?: number }
    pointLight: JSX.IntrinsicElements['div'] & { position?: [number, number, number] }
  }
}

declare module '@react-three/drei' {
  interface TextProps {
    children: string
    position?: [number, number, number]
    fontSize?: number
    color?: string
    anchorX?: string
    anchorY?: string
  }

  interface OrbitControlsProps {
    enablePan?: boolean
    enableZoom?: boolean
    enableRotate?: boolean
    autoRotate?: boolean
    autoRotateSpeed?: number
  }

  interface CenterProps {
    children: React.ReactNode
  }
} 