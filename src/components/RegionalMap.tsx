'use client'

import { useState } from 'react'
import { Card, Title, Text, Select, SelectItem } from '@tremor/react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'
import { motion } from 'framer-motion'
import { StateData } from '@/types/dashboard'

interface RegionalMapProps {
  data: StateData[]
  onPeriodChange?: (period: string) => void
}

interface GeoProperties {
  name: string
  sigla: string
  regiao: string
}

const periods = [
  { value: 'geral', text: 'Geral (2020-2024)' },
  { value: '2020.1', text: '1º Semestre 2020' },
  { value: '2020.2', text: '2º Semestre 2020' },
  { value: '2021.1', text: '1º Semestre 2021' },
  { value: '2021.2', text: '2º Semestre 2021' },
  { value: '2022.1', text: '1º Semestre 2022' },
  { value: '2022.2', text: '2º Semestre 2022' },
  { value: '2023.1', text: '1º Semestre 2023' },
  { value: '2023.2', text: '2º Semestre 2023' },
  { value: '2024.1', text: '1º Semestre 2024' },
  { value: '2024.2', text: '2º Semestre 2024' },
  { value: '2025.1', text: '1º Semestre 2025' },
  { value: '2025.2', text: '2º Semestre 2025' }
]

const RegionalMap = ({ data, onPeriodChange }: RegionalMapProps) => {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedPeriod, setSelectedPeriod] = useState('geral')
  const [geoList, setGeoList] = useState<Array<{ properties: GeoProperties }>>([])

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
    if (onPeriodChange) {
      onPeriodChange(value)
    }
  }

  const getStateData = (stateCode: string) => {
    const stateData = data.find(item => item.state === stateCode)
    return stateData || null
  }

  const selectedData = selectedState ? getStateData(selectedState) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
        <div className="flex justify-between items-center mb-4">
          <Title className="text-xl text-gray-100">Mapa do Brasil</Title>
          <Select
            value={selectedPeriod}
            onValueChange={handlePeriodChange}
            className="w-48"
          >
            {periods.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.text}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="h-[450px] relative">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 750,
              center: [-54, -15]
            }}
          >
            <ZoomableGroup>
              <Geographies geography="/brazil-states.json">
                {({ geographies }) => {
                  if (geoList.length === 0) {
                    setGeoList(geographies)
                  }
                  return geographies.map((geo) => {
                    const state = geo.properties.sigla as string
                    const isSelected = state === selectedState
                    const stateData = getStateData(state)

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => setSelectedState(state)}
                        style={{
                          default: {
                            fill: isSelected ? '#ef4444' : '#374151',
                            stroke: '#1f2937',
                            strokeWidth: 0.5,
                            outline: 'none',
                            transition: 'all 250ms'
                          },
                          hover: {
                            fill: '#f3f4f6',
                            stroke: '#e5e7eb',
                            strokeWidth: 1,
                            outline: 'none',
                            cursor: 'pointer'
                          },
                          pressed: {
                            fill: '#ef4444',
                            stroke: '#dc2626',
                            strokeWidth: 1,
                            outline: 'none'
                          }
                        }}
                        data-tip={`${geo.properties.name} - ${stateData ? Intl.NumberFormat('pt-BR').format(stateData.cases) + ' casos' : 'Sem dados'}`}
                      />
                    )
                  })
                }}
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </Card>

      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
        <Title className="text-xl text-gray-100 mb-4">Dados do Estado</Title>
        {selectedState && selectedData ? (
          <div className="space-y-4">
            <div>
              <Text className="text-gray-400">Estado Selecionado</Text>
              <Text className="text-2xl font-bold text-gray-100">
                {geoList.find(geo => geo.properties.sigla === selectedState)?.properties.name || selectedState}
              </Text>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Text className="text-gray-400">Total de Casos</Text>
                <Text className="text-xl font-semibold text-gray-100">
                  {Intl.NumberFormat('pt-BR').format(selectedData.cases)}
                </Text>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Text className="text-gray-400">Óbitos</Text>
                <Text className="text-xl font-semibold text-gray-100">
                  {Intl.NumberFormat('pt-BR').format(selectedData.deaths)}
                </Text>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Text className="text-gray-400">Recuperados</Text>
                <Text className="text-xl font-semibold text-gray-100">
                  {Intl.NumberFormat('pt-BR').format(selectedData.recovered)}
                </Text>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Text className="text-gray-400">
              Selecione um estado no mapa para ver os dados
            </Text>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

export default RegionalMap 