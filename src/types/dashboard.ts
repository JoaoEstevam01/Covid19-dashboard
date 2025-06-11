export interface StateData {
  state: string
  cases: number
  deaths: number
  recovered: number
  inflation: number
}

export interface KPIData {
  totalCases: number
  totalDeaths: number
  recovered: number
  activeCases: number
}

export interface TimelineData {
  date: string
  novosCasos: number
  novasMortes: number
  taxaRecuperacao: number
  taxaVacinacao: number
  taxaPositividade: number
}

export interface TrendData {
  name: string
  value: number
  change: number
  description: string
}

export interface RegionData {
  name: string
  states: string[]
  color: string
  cases: number
  deaths: number
  recovered: number
  inflation: number
}

export interface DashboardData {
  kpi: KPIData
  stateData: StateData[]
  timelineData: TimelineData[]
  trends: TrendData[]
} 