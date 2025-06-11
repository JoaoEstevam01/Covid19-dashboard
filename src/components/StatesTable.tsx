import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Select,
  SelectItem,
  TextInput
} from '@tremor/react'
import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import { StateData } from '@/types/dashboard'

interface StatesTableProps {
  data: StateData[]
}

const regions = {
  'Norte': ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
  'Nordeste': ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
  'Sudeste': ['ES', 'MG', 'RJ', 'SP'],
  'Sul': ['PR', 'RS', 'SC']
}

export function StatesTable({ data }: StatesTableProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('todas')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const getStateRegion = (state: string): string => {
    for (const [region, states] of Object.entries(regions)) {
      if (states.includes(state)) {
        return region
      }
    }
    return ''
  }

  const filteredData = data
    .filter(item => 
      selectedRegion === 'todas' || 
      regions[selectedRegion as keyof typeof regions]?.includes(item.state)
    )
    .filter(item =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.cases - a.cases)

  const calculateMortalityRate = (deaths: number, cases: number) => {
    return ((deaths / cases) * 100).toFixed(2)
  }

  const calculateRecoveryRate = (recovered: number, cases: number) => {
    return ((recovered / cases) * 100).toFixed(2)
  }

  const getMortalityRateColor = (rate: number) => {
    if (rate < 1) return 'emerald'
    if (rate < 2) return 'yellow'
    return 'red'
  }

  const getRecoveryRateColor = (rate: number) => {
    if (rate > 95) return 'emerald'
    if (rate > 90) return 'yellow'
    return 'red'
  }

  return (
    <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Title className="text-slate-200">Dados por Estado</Title>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <Select
              value={selectedRegion}
              onValueChange={setSelectedRegion}
              className="w-40"
            >
              <SelectItem value="todas">Todas as Regiões</SelectItem>
              {Object.keys(regions).map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="relative">
            <TextInput
              icon={Search}
              placeholder="Buscar estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-slate-400">Estado</TableHeaderCell>
            <TableHeaderCell className="text-slate-400">Região</TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Casos Confirmados
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Óbitos
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Taxa de Mortalidade
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Recuperados
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Taxa de Recuperação
            </TableHeaderCell>
            <TableHeaderCell className="text-slate-400 text-right">
              Inflação
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => {
            const mortalityRate = calculateMortalityRate(item.deaths, item.cases)
            const recoveryRate = calculateRecoveryRate(item.recovered, item.cases)

            return (
              <TableRow key={item.state} className="hover:bg-gray-800/50 transition-colors">
                <TableCell>
                  <Text className="text-slate-200 font-semibold">{item.state}</Text>
                </TableCell>
                <TableCell>
                  <Badge color="gray">{getStateRegion(item.state)}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Text className="text-cyan-400">
                    {Intl.NumberFormat('pt-BR').format(item.cases)}
                  </Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text className="text-red-400">
                    {Intl.NumberFormat('pt-BR').format(item.deaths)}
                  </Text>
                </TableCell>
                <TableCell className="text-right">
                  <Badge color={getMortalityRateColor(parseFloat(mortalityRate))}>
                    {mortalityRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Text className="text-emerald-400">
                    {Intl.NumberFormat('pt-BR').format(item.recovered)}
                  </Text>
                </TableCell>
                <TableCell className="text-right">
                  <Badge color={getRecoveryRateColor(parseFloat(recoveryRate))}>
                    {recoveryRate}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Text className="text-amber-400">
                    {item.inflation.toFixed(1)}%
                  </Text>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
} 