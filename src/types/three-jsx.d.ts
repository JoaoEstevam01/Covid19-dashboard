/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

import { Object3D, Mesh, BufferGeometry, Material } from 'three'
import { ReactThreeFiber } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>
      boxGeometry: ReactThreeFiber.BufferGeometryNode<BufferGeometry, typeof BufferGeometry>
      meshPhongMaterial: ReactThreeFiber.MaterialNode<Material, typeof Material>
    }
  }
} 