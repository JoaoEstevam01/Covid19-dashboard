/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

declare module '@react-three/fiber' {
  import { ReactThreeFiber } from '@react-three/fiber'
  export * from '@react-three/fiber'
}

declare module '@react-three/drei' {
  export * from '@react-three/drei'
}

declare module 'three' {
  export * from 'three'
} 