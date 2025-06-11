import { Card, Metric, Text, Flex, ProgressBar, Grid, BadgeDelta } from '@tremor/react'
import { Users, Heart, Activity, AlertCircle, Zap } from 'lucide-react'

interface KPIData {
  totalCases: number
  totalDeaths: number
  recovered: number
  activeCases: number
}

interface KPICardsProps {
  data: KPIData
}

export function KPICards({ data }: KPICardsProps) {
  const calculatePercentage = (value: number, total: number) => {
    return (value / total) * 100
  }

  const calculateChange = (value: number, total: number) => {
    // Simulando uma variação com base nos números atuais
    const previousValue = value * 0.95
    return ((value - previousValue) / previousValue) * 100
  }

  const kpiData = [
    {
      title: 'Total de Casos',
      metric: Intl.NumberFormat('pt-BR').format(data.totalCases),
      icon: Users,
      color: 'blue',
      progress: 100,
      change: calculateChange(data.totalCases, data.totalCases),
      changeDescription: 'em relação ao mês anterior',
      isNegativeGood: false
    },
    {
      title: 'Casos Ativos',
      metric: Intl.NumberFormat('pt-BR').format(data.activeCases),
      icon: Activity,
      color: 'yellow',
      progress: calculatePercentage(data.activeCases, data.totalCases),
      change: calculateChange(data.activeCases, data.totalCases),
      changeDescription: 'em relação ao mês anterior',
      isNegativeGood: true
    },
    {
      title: 'Recuperados',
      metric: Intl.NumberFormat('pt-BR').format(data.recovered),
      icon: Zap,
      color: 'emerald',
      progress: calculatePercentage(data.recovered, data.totalCases),
      change: calculateChange(data.recovered, data.totalCases),
      changeDescription: 'em relação ao mês anterior',
      isNegativeGood: false
    },
    {
      title: 'Óbitos',
      metric: Intl.NumberFormat('pt-BR').format(data.totalDeaths),
      icon: Heart,
      color: 'red',
      progress: calculatePercentage(data.totalDeaths, data.totalCases),
      change: calculateChange(data.totalDeaths, data.totalCases),
      changeDescription: 'em relação ao mês anterior',
      isNegativeGood: true
    },
    {
      title: 'Taxa de Letalidade',
      metric: `${((data.totalDeaths / data.totalCases) * 100).toFixed(2)}%`,
      icon: AlertCircle,
      color: 'orange',
      progress: calculatePercentage(data.totalDeaths, data.totalCases),
      change: -2.5,
      changeDescription: 'redução na taxa de letalidade',
      isNegativeGood: true
    },
    {
      title: 'Taxa de Recuperação',
      metric: `${((data.recovered / data.totalCases) * 100).toFixed(2)}%`,
      icon: Zap,
      color: 'teal',
      progress: calculatePercentage(data.recovered, data.totalCases),
      change: 1.8,
      changeDescription: 'aumento na taxa de recuperação',
      isNegativeGood: false
    }
  ]

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-4">
      {kpiData.map((item) => (
        <Card
          key={item.title}
          className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50 transition-all duration-200 hover:bg-gray-800/40"
        >
          <div className="flex flex-col space-y-4">
            <Flex>
              <div className="flex items-center gap-2">
                <item.icon className={`text-${item.color}-400 w-5 h-5`} />
                <Text className="text-slate-400">{item.title}</Text>
              </div>
              <BadgeDelta
                deltaType={item.isNegativeGood ? 
                  (item.change >= 0 ? "decrease" : "increase") : 
                  (item.change >= 0 ? "increase" : "decrease")}
              >
                {item.change.toFixed(1)}%
              </BadgeDelta>
            </Flex>
            <Metric className={`text-${item.color}-400`}>{item.metric}</Metric>
            <div className="space-y-2">
              <Flex>
                <Text className="text-slate-400 text-sm truncate">
                  {item.changeDescription}
                </Text>
                <Text className="text-slate-400 text-sm">
                  {item.progress.toFixed(1)}%
                </Text>
              </Flex>
              <ProgressBar
                value={item.progress}
                color={item.color as any}
                className="h-1.5"
              />
            </div>
          </div>
        </Card>
      ))}
    </Grid>
  )
} 