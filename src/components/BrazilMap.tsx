/// <reference types="@react-three/fiber" />
/// <reference types="@react-three/drei" />

'use client'

import { useState } from 'react'
import { Card, Title, Text as TremorText, Select, SelectItem } from '@tremor/react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene').then((mod) => mod.Scene), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] bg-gray-800/50 rounded-xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Carregando visualização 3D...</span>
    </div>
  ),
})

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

const regions: RegionData[] = [
  {
    name: 'Norte',
    states: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
    color: '#FF6B6B',
    position: [0, 0, -2],
    cases: 0,
    deaths: 0,
    recovered: 0,
    inflation: 0
  },
  {
    name: 'Nordeste',
    states: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
    color: '#4ECDC4',
    position: [2, 0, -1],
    cases: 0,
    deaths: 0,
    recovered: 0,
    inflation: 0
  },
  {
    name: 'Centro-Oeste',
    states: ['DF', 'GO', 'MT', 'MS'],
    color: '#FFD93D',
    position: [0, 0, 0],
    cases: 0,
    deaths: 0,
    recovered: 0,
    inflation: 0
  },
  {
    name: 'Sudeste',
    states: ['ES', 'MG', 'RJ', 'SP'],
    color: '#95E1D3',
    position: [2, 0, 1],
    cases: 0,
    deaths: 0,
    recovered: 0,
    inflation: 0
  },
  {
    name: 'Sul',
    states: ['PR', 'RS', 'SC'],
    color: '#A8E6CF',
    position: [0, 0, 2],
    cases: 0,
    deaths: 0,
    recovered: 0,
    inflation: 0
  }
]

const periods = [
  { value: '2020.1', label: '1º Semestre 2020' },
  { value: '2020.2', label: '2º Semestre 2020' },
  { value: '2021.1', label: '1º Semestre 2021' },
  { value: '2021.2', label: '2º Semestre 2021' },
  { value: '2022.1', label: '1º Semestre 2022' },
  { value: '2022.2', label: '2º Semestre 2022' },
  { value: '2023.1', label: '1º Semestre 2023' },
  { value: '2023.2', label: '2º Semestre 2023' },
  { value: '2024.1', label: '1º Semestre 2024' },
  { value: '2024.2', label: '2º Semestre 2024' }
]

interface BrazilMapProps {
  data: {
    state: string
    cases: number
    deaths: number
    recovered: number
    inflation: number
  }[]
}

const BrazilMap = ({ data }: BrazilMapProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedPeriod, setSelectedPeriod] = useState('2024.1')

  const updatedRegions = regions.map(region => {
    const regionData = data.filter(item => region.states.includes(item.state))
    return {
      ...region,
      cases: regionData.reduce((sum, item) => sum + item.cases, 0),
      deaths: regionData.reduce((sum, item) => sum + item.deaths, 0),
      recovered: regionData.reduce((sum, item) => sum + item.recovered, 0),
      inflation: regionData.reduce((sum, item) => sum + (item.inflation || 0), 0) / regionData.length
    }
  })

  const selectedRegionData = updatedRegions.find(r => r.name === selectedRegion)

  return (
    <Card className="h-[600px]">
      <div className="flex items-center justify-between mb-4">
        <Title className="mb-2">Mapa de Casos por Região</Title>
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-48"
          >
            {periods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[450px]">
          <Scene
            regions={updatedRegions}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4">
          {selectedRegionData ? (
            <div className="space-y-4">
              <Title className="text-xl">{selectedRegionData.name}</Title>
              <div className="space-y-2">
                <TremorText>Casos: {Intl.NumberFormat('pt-BR').format(selectedRegionData.cases)}</TremorText>
                <TremorText>Óbitos: {Intl.NumberFormat('pt-BR').format(selectedRegionData.deaths)}</TremorText>
                <TremorText>Recuperados: {Intl.NumberFormat('pt-BR').format(selectedRegionData.recovered)}</TremorText>
                <TremorText>Inflação Média: {selectedRegionData.inflation.toFixed(2)}%</TremorText>
              </div>
              <div className="mt-4">
                <TremorText className="font-semibold">Estados:</TremorText>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedRegionData.states.map(state => (
                    <TremorText key={state} className="text-sm">{state}</TremorText>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <TremorText className="text-center text-gray-400">
              Selecione uma região para ver os detalhes
            </TremorText>
          )}
        </div>
      </div>
    </Card>
  )
}

export default BrazilMap 