import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, Text } from '@react-three/drei'
import { Mesh } from 'three'

interface RegionData {
  name: string
  states: string[]
  color: string
  position: [number, number, number]
  cases: number
  deaths: number
  recovered: number
  inflation: number
}

interface RegionMeshProps {
  region: RegionData
  selected: boolean
  onSelect: (name: string) => void
}

const RegionMesh = ({ region, selected, onSelect }: RegionMeshProps) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const scale = selected ? 1.2 : hovered ? 1.1 : 1
  const height = Math.log(region.cases + 1) / 10

  return (
    <group position={region.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(region.name)}
        scale={[scale, scale, scale]}
      >
        <boxGeometry args={[1.5, height, 1.5]} />
        <meshStandardMaterial
          color={selected ? '#60A5FA' : region.color}
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, height + 0.5, 0]}
        fontSize={0.3}
        characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        material={{
          color: selected ? '#60A5FA' : '#FFFFFF',
          transparent: true,
          opacity: 1
        }}
        anchorX="center"
        anchorY="middle"
      >
        {region.name}
      </Text>
    </group>
  )
}

interface SceneProps {
  regions: RegionData[]
  selectedRegion: string
  onSelectRegion: (name: string) => void
}

export const Scene = ({ regions, selectedRegion, onSelectRegion }: SceneProps) => {
  return (
    <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Center>
        {regions.map((region) => (
          <RegionMesh
            key={region.name}
            region={region}
            selected={selectedRegion === region.name}
            onSelect={onSelectRegion}
          />
        ))}
      </Center>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
} 