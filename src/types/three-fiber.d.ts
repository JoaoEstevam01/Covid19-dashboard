import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Text } from '@react-three/drei'

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshStandardMaterial: JSX.IntrinsicElements['meshStandardMaterial'] & {
      color?: string | number
      metalness?: number
      roughness?: number
      transparent?: boolean
      opacity?: number
    }
  }
}

declare module '@react-three/drei' {
  export interface TextProps {
    children: React.ReactNode
    position?: [number, number, number]
    fontSize?: number
    color?: string
    anchorX?: 'center' | 'left' | 'right'
    anchorY?: 'middle' | 'top' | 'bottom'
  }
}

export { Canvas, OrbitControls, Center, Text } 