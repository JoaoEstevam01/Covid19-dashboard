import { Card, Title, Text, DonutChart as TremorDonutChart, Legend, Grid } from '@tremor/react'

interface DonutChartProps {
  data: {
    totalCases: number
    totalDeaths: number
    recovered: number
    activeCases: number
  }
}

export function DonutChart({ data }: DonutChartProps) {
  const chartData = [
    { name: 'Casos Ativos', value: data.activeCases },
    { name: 'Recuperados', value: data.recovered },
    { name: 'Óbitos', value: data.totalDeaths }
  ]

  const calculatePercentage = (value: number) => {
    const total = data.totalCases
    return ((value / total) * 100).toFixed(1)
  }

  const colors = {
    'Casos Ativos': 'yellow',
    'Recuperados': 'emerald',
    'Óbitos': 'red'
  }

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50">
      <Title className="text-slate-200 mb-4">Status dos Casos</Title>
      <Grid numItems={1} numItemsSm={2} className="gap-4">
        <div>
          <TremorDonutChart
            data={chartData}
            category="value"
            index="name"
            colors={['yellow', 'emerald', 'red']}
            valueFormatter={(value) => Intl.NumberFormat('pt-BR').format(value)}
            className="h-48"
          />
        </div>
        <div className="space-y-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full bg-${colors[item.name as keyof typeof colors]}-500`}
                />
                <Text className="text-slate-200">{item.name}</Text>
              </div>
              <div className="text-right">
                <Text className="text-slate-200 font-semibold">
                  {Intl.NumberFormat('pt-BR').format(item.value)}
                </Text>
                <Text className="text-slate-400 text-sm">
                  {calculatePercentage(item.value)}%
                </Text>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <Text className="text-slate-200">Total de Casos</Text>
              <Text className="text-slate-200 font-semibold">
                {Intl.NumberFormat('pt-BR').format(data.totalCases)}
              </Text>
            </div>
          </div>
        </div>
      </Grid>
    </Card>
  )
} 