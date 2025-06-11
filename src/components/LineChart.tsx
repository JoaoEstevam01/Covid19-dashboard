import { Card, Title } from '@tremor/react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { date: '2023-01', cases: 12000 },
  { date: '2023-02', cases: 15000 },
  { date: '2023-03', cases: 18000 },
  { date: '2023-04', cases: 16000 },
  { date: '2023-05', cases: 14000 },
  { date: '2023-06', cases: 13000 },
  { date: '2023-07', cases: 11000 },
  { date: '2023-08', cases: 10000 },
  { date: '2023-09', cases: 9000 },
  { date: '2023-10', cases: 8500 },
  { date: '2023-11', cases: 8000 },
  { date: '2023-12', cases: 7500 },
]

export function LineChart() {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
      <Title className="text-slate-200 mb-4">Novos Casos por Dia</Title>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '0.5rem',
              }}
              itemStyle={{ color: '#e2e8f0' }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#00fff5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, className: 'glow-effect' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
} 