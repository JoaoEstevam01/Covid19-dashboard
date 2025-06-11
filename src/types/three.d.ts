/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

declare module '@react-three/fiber' {
  import { Canvas } from '@react-three/fiber'
  export { Canvas }
}

declare module '@react-three/drei' {
  import { OrbitControls, Center, Text } from '@react-three/drei'
  export { OrbitControls, Center, Text }
}

declare module 'three' {
  import { Mesh } from 'three'
  export { Mesh }
} 