/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

import { Object3D, Material, Mesh } from 'three'
import { ReactThreeFiber } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>
      mesh: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>
      meshStandardMaterial: ReactThreeFiber.MaterialNode<Material, typeof Material>
      ambientLight: ReactThreeFiber.LightNode
      pointLight: ReactThreeFiber.LightNode
      boxGeometry: ReactThreeFiber.BufferGeometryNode
    }
  }
} 