import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Text } from '@react-three/drei'
import dynamic from 'next/dynamic'

export const ThreeCanvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false })
export const ThreeOrbitControls = dynamic(() => import('@react-three/drei').then(mod => mod.OrbitControls), { ssr: false })
export const ThreeCenter = dynamic(() => import('@react-three/drei').then(mod => mod.Center), { ssr: false })
export const ThreeText = dynamic(() => import('@react-three/drei').then(mod => mod.Text), { ssr: false }) 