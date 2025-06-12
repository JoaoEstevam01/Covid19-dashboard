import { Card, Title, Text, Grid, Col, Badge } from '@tremor/react'
import { motion } from 'framer-motion'

interface SymptomsStatsProps {
  data: {
    symptoms: {
      name: string
      percentage: number
      severity: 'high' | 'medium' | 'low'
    }[]
    statistics: {
      averageRecoveryTime: number
      hospitalizationRate: number
      icuAdmissionRate: number
      asymptomaticRate: number
    }
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'red'
    case 'medium':
      return 'yellow'
    case 'low':
      return 'emerald'
    default:
      return 'gray'
  }
}

export function SymptomsStats({ data }: SymptomsStatsProps) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
      <Title className="text-xl text-gray-100 mb-6">Sintomas e Estatísticas da COVID-19</Title>
      
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Col>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-lg text-gray-100 mb-4">Principais Sintomas</Title>
            <div className="space-y-4">
              {data.symptoms.map((symptom) => (
                <div key={symptom.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge color={getSeverityColor(symptom.severity)}>
                      {symptom.severity === 'high' ? 'Alta' : symptom.severity === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                    <Text className="text-gray-200">{symptom.name}</Text>
                  </div>
                  <Text className="text-gray-200 font-semibold">{symptom.percentage}%</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-lg text-gray-100 mb-4">Estatísticas Gerais</Title>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Text className="text-gray-200">Tempo Médio de Recuperação</Text>
                <Text className="text-gray-200 font-semibold">{data.statistics.averageRecoveryTime} dias</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-200">Taxa de Hospitalização</Text>
                <Text className="text-gray-200 font-semibold">{data.statistics.hospitalizationRate}%</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-200">Taxa de Admissão em UTI</Text>
                <Text className="text-gray-200 font-semibold">{data.statistics.icuAdmissionRate}%</Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="text-gray-200">Taxa de Casos Assintomáticos</Text>
                <Text className="text-gray-200 font-semibold">{data.statistics.asymptomaticRate}%</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Grid>
    </Card>
  )
} 