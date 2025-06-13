'use client'

import { KPICards } from '@/components/KPICards'
import { StatesTable } from '@/components/StatesTable'
import { DonutChart } from '@/components/DonutChart'
import InsightsDashboard from '@/components/InsightsDashboard'
import RegionalMap from '@/components/RegionalMap'
import { SymptomsStats } from '@/components/SymptomsStats'
import { Grid, Col, Title, Text, Button } from '@tremor/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Globe, Map, Bot } from 'lucide-react'
import { Card } from '@tremor/react'
import Link from 'next/link'
import { BrazilMap } from '@/components/BrazilMap'
import { InflationChart } from '@/components/InflationChart'
import { CasesChart } from '@/components/CasesChart'
import { DeathsChart } from '@/components/DeathsChart'
import { RecoveredChart } from '@/components/RecoveredChart'

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'brazil' | 'world'>('brazil')
  const [selectedPeriod, setSelectedPeriod] = useState('geral')
  const [isLoading, setIsLoading] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Olá, como posso ajudar?' }
  ])

  const toggleView = () => {
    setIsLoading(true)
    setViewMode(prev => prev === 'brazil' ? 'world' : 'brazil')
    setTimeout(() => setIsLoading(false), 500)
  }

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    // Aqui você pode adicionar a lógica para filtrar os dados com base no período selecionado
    // Por exemplo, fazer uma nova chamada à API ou filtrar os dados localmente
  }

  // Função para filtrar dados baseado no período selecionado
  const filterDataByPeriod = (data: any) => {
    if (!data) return data;

    // Se for "geral", retorna dados de 2020 até 2024
    if (selectedPeriod === 'geral') {
      if (Array.isArray(data)) {
        return data.filter(item => {
          const itemDate = new Date(item.date);
          const startDate = new Date(2020, 0, 1);
          const endDate = new Date(2024, 11, 31);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      return data;
    }

    // Extrair ano e semestre do período selecionado
    const [year, semester] = selectedPeriod.split('.');
    
    // Calcular as datas de início e fim do semestre
    const startDate = new Date(parseInt(year), semester === '1' ? 0 : 6, 1);
    const endDate = new Date(parseInt(year), semester === '1' ? 5 : 11, 31);

    // Exemplo de filtro para dados de timeline
    if (Array.isArray(data)) {
      return data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    return data;
  }

  const mockData = {
    kpi: {
      totalCases: 37614422,
      totalDeaths: 704658,
      recovered: 36737859,
      activeCases: 171905,
    },
    symptoms: {
      symptoms: [
        { name: 'Febre', percentage: 87, severity: 'high' as const },
        { name: 'Tosse Seca', percentage: 68, severity: 'high' as const },
        { name: 'Fadiga', percentage: 38, severity: 'medium' as const },
        { name: 'Perda de Paladar', percentage: 23, severity: 'medium' as const },
        { name: 'Perda de Olfato', percentage: 21, severity: 'medium' as const },
        { name: 'Dificuldade Respiratória', percentage: 19, severity: 'high' as const },
        { name: 'Dores Musculares', percentage: 15, severity: 'low' as const },
        { name: 'Dor de Garganta', percentage: 14, severity: 'low' as const }
      ],
      statistics: {
        averageRecoveryTime: 14,
        hospitalizationRate: 5.2,
        icuAdmissionRate: 1.8,
        asymptomaticRate: 40
      }
    },
    states: [
      {
        state: 'SP',
        cases: 6674225,
        deaths: 177937,
        recovered: 6496288,
        inflation: 5.2
      },
      {
        state: 'RJ',
        cases: 2825457,
        deaths: 76875,
        recovered: 2748582,
        inflation: 5.5
      },
      {
        state: 'MG',
        cases: 4157852,
        deaths: 64512,
        recovered: 4093340,
        inflation: 4.8
      },
      {
        state: 'ES',
        cases: 1487632,
        deaths: 15987,
        recovered: 1471645,
        inflation: 4.9
      },
      {
        state: 'PR',
        cases: 2874521,
        deaths: 45987,
        recovered: 2828534,
        inflation: 4.7
      },
      {
        state: 'SC',
        cases: 2154789,
        deaths: 22145,
        recovered: 2132644,
        inflation: 4.6
      },
      {
        state: 'RS',
        cases: 2987456,
        deaths: 41254,
        recovered: 2946202,
        inflation: 4.8
      },
      {
        state: 'BA',
        cases: 1987456,
        deaths: 31254,
        recovered: 1956202,
        inflation: 5.1
      },
      {
        state: 'SE',
        cases: 487456,
        deaths: 7254,
        recovered: 480202,
        inflation: 5.3
      },
      {
        state: 'AL',
        cases: 587456,
        deaths: 8254,
        recovered: 579202,
        inflation: 5.4
      },
      {
        state: 'PE',
        cases: 1287456,
        deaths: 21254,
        recovered: 1266202,
        inflation: 5.2
      },
      {
        state: 'PB',
        cases: 687456,
        deaths: 11254,
        recovered: 676202,
        inflation: 5.3
      },
      {
        state: 'RN',
        cases: 587456,
        deaths: 9254,
        recovered: 578202,
        inflation: 5.2
      },
      {
        state: 'CE',
        cases: 1387456,
        deaths: 24254,
        recovered: 1363202,
        inflation: 5.1
      },
      {
        state: 'PI',
        cases: 487456,
        deaths: 8254,
        recovered: 479202,
        inflation: 5.3
      },
      {
        state: 'MA',
        cases: 787456,
        deaths: 14254,
        recovered: 773202,
        inflation: 5.4
      },
      {
        state: 'PA',
        cases: 987456,
        deaths: 17254,
        recovered: 970202,
        inflation: 5.6
      },
      {
        state: 'AP',
        cases: 287456,
        deaths: 4254,
        recovered: 283202,
        inflation: 5.7
      },
      {
        state: 'AM',
        cases: 687456,
        deaths: 12254,
        recovered: 675202,
        inflation: 5.5
      },
      {
        state: 'RR',
        cases: 187456,
        deaths: 3254,
        recovered: 184202,
        inflation: 5.8
      },
      {
        state: 'RO',
        cases: 387456,
        deaths: 6254,
        recovered: 381202,
        inflation: 5.6
      },
      {
        state: 'AC',
        cases: 287456,
        deaths: 4254,
        recovered: 283202,
        inflation: 5.7
      },
      {
        state: 'TO',
        cases: 387456,
        deaths: 6254,
        recovered: 381202,
        inflation: 5.5
      },
      {
        state: 'MT',
        cases: 787456,
        deaths: 13254,
        recovered: 774202,
        inflation: 4.9
      },
      {
        state: 'MS',
        cases: 587456,
        deaths: 9254,
        recovered: 578202,
        inflation: 4.8
      },
      {
        state: 'GO',
        cases: 1187456,
        deaths: 19254,
        recovered: 1168202,
        inflation: 4.7
      },
      {
        state: 'DF',
        cases: 887456,
        deaths: 15254,
        recovered: 872202,
        inflation: 4.6
      }
    ],
    timelineData: Array.from({ length: 66 }, (_, i) => {
      const date = new Date(2020, i, 1);
      const yearProgress = (i % 12) / 12;
      const totalProgress = i / 66;
      
      // Simular tendências realistas
      const casesBase = 100000 + Math.sin(i * 0.5) * 50000;
      const deathsBase = 1000 + Math.sin(i * 0.5) * 500;
      const recoveryBase = 85 + Math.sin(i * 0.3) * 5;
      const vaccinationBase = Math.min(95, Math.max(0, totalProgress * 100));
      const positivityBase = Math.max(5, 30 - totalProgress * 25);

      return {
        date: date.toISOString().slice(0, 7),
        novosCasos: Math.floor(casesBase * (1 - totalProgress * 0.7)),
        novasMortes: Math.floor(deathsBase * (1 - totalProgress * 0.8)),
        taxaRecuperacao: Math.min(98, recoveryBase + totalProgress * 10),
        taxaVacinacao: vaccinationBase,
        taxaPositividade: positivityBase
      }
    }),
    trends: [
      {
        name: 'Taxa de Vacinação',
        value: 87.2,
        change: 5.3,
        description: 'Aumento significativo na cobertura vacinal com mais de 87% da população totalmente vacinada',
      },
      {
        name: 'Positividade de Testes',
        value: 8.7,
        change: -15.2,
        description: 'Redução consistente na taxa de testes positivos indica menor transmissão comunitária',
      },
      {
        name: 'Ocupação de UTIs',
        value: 65.4,
        change: -8.7,
        description: 'Diminuição na ocupação de leitos de UTI em todo o país, refletindo menor gravidade dos casos',
      },
      {
        name: 'Variantes Circulantes',
        value: 3,
        change: -2,
        description: 'Monitoramento genômico identifica 3 principais variantes em circulação no território nacional',
      },
      {
        name: 'Efetividade Vacinal',
        value: 92.8,
        change: 1.2,
        description: 'Alta efetividade das vacinas na prevenção de casos graves e óbitos',
      },
      {
        name: 'Índice de Isolamento',
        value: 45.6,
        change: -12.5,
        description: 'Redução no índice de isolamento social após flexibilização das medidas restritivas',
      },
      {
        name: 'Impacto Econômico',
        value: -3.2,
        change: 2.8,
        description: 'Recuperação gradual dos indicadores econômicos em relação ao período mais crítico da pandemia',
      }
    ],
  }

  const predefinedQuestions = [
    'Qual o número de afetados?',
    'Qual o estado mais afetado?'
  ]

  function handleChatSend(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!chatInput.trim()) return
    const userMessage = chatInput.trim()
    setChatMessages(msgs => [...msgs, { from: 'user', text: userMessage }])
    let botReply = ''
    if (userMessage === predefinedQuestions[0]) {
      botReply = `O número de afetados é ${mockData.kpi.totalCases.toLocaleString('pt-BR')}.`
    } else if (userMessage === predefinedQuestions[1]) {
      const mostAffected = mockData.states.reduce((a, b) => a.cases > b.cases ? a : b)
      botReply = `O estado mais afetado é ${mostAffected.state} com ${mostAffected.cases.toLocaleString('pt-BR')} casos.`
    } else {
      botReply = 'Estamos em manutenção, entre em contato mais tarde. Obrigado!'
    }
    setTimeout(() => {
      setChatMessages(msgs => [...msgs, { from: 'bot', text: botReply }])
    }, 500)
    setChatInput('')
  }

  if (viewMode === 'world') {
    return (
      <div className="min-h-screen bg-emerald-950/90 space-y-6 p-6 relative transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-[80vh]"
        >
          <Title className="text-4xl font-bold mb-4 text-emerald-100">Visão Mundial</Title>
          <Text className="text-2xl text-emerald-300 mb-8">Em desenvolvimento...</Text>
          <Globe className="w-24 h-24 text-emerald-400 animate-pulse" />
        </motion.div>

        <motion.div
          className="fixed bottom-6 right-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={toggleView}
            icon={Map}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Alternar para Visão Brasil'}
          </Button>
        </motion.div>
      </div>
    )
  }

  const filteredTimelineData = filterDataByPeriod(mockData.timelineData)

  return (
    <>
    <div className="min-h-screen bg-gray-900 space-y-6 p-4 md:p-6 relative transition-colors duration-500">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <Title className="text-4xl font-bold mb-2">Dashboard COVID-19 Brasil</Title>
        <Text className="text-gray-400">
          Monitoramento em tempo real da situação da COVID-19 no Brasil
        </Text>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <KPICards data={mockData.kpi} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6"
      >
        <RegionalMap 
          data={mockData.states} 
          onPeriodChange={handlePeriodChange}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
          <InsightsDashboard
            data={filteredTimelineData}
            trends={mockData.trends}
            selectedPeriod={selectedPeriod}
          />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12"
      >
        <SymptomsStats data={mockData.symptoms} />
      </motion.div>

      <Grid numItems={1} numItemsLg={2} className="gap-6 mt-12">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-xl text-gray-100 mb-6">Distribuição de Casos</Title>
            <DonutChart data={mockData.kpi} />
          </Card>
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-700/50">
            <StatesTable data={mockData.states} />
          </Card>
        </Col>
      </Grid>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-12 pb-8 text-center text-gray-400 text-sm"
      >
        <p>Dados atualizados em tempo real. Fonte: Ministério da Saúde</p>
      </motion.footer>

      <motion.div
        className="fixed bottom-6 right-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={toggleView}
          icon={Globe}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Alternar para Visão Mundial'}
        </Button>
      </motion.div>
    </div>

    <motion.div 
      className="w-full bg-gray-900 py-6 border-t border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className="container mx-auto px-4 text-center">
        <Link 
          href="/doacoes" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
        >
          Faça uma Doação
        </Link>
      </div>
    </motion.div>

    {/* Chatbot flutuante - sempre visível */}
    <div className="fixed bottom-28 right-6 z-50">
      <button
        className="bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 shadow-lg flex items-center justify-center"
        onClick={() => setShowChatbot(v => !v)}
        aria-label="Abrir chatbot"
      >
        <Bot className="w-7 h-7 text-white" />
      </button>
      {showChatbot && (
        <div className="mt-4 w-80 bg-white rounded-xl shadow-2xl border border-emerald-200 flex flex-col overflow-hidden animate-fade-in">
          <div className="flex items-center gap-2 bg-emerald-600 px-4 py-3">
            <Bot className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Chatbot</span>
          </div>
          <div className="flex-1 px-4 py-2 max-h-64 overflow-y-auto space-y-2 bg-emerald-50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-3 py-2 text-sm ${msg.from === 'bot' ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-600 text-white'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSend} className="flex flex-col gap-2 px-4 py-2 bg-emerald-100">
            <div className="flex gap-2 mb-1">
              {predefinedQuestions.map(q => (
                <button
                  type="button"
                  key={q}
                  className="bg-emerald-200 hover:bg-emerald-300 text-emerald-900 rounded px-2 py-1 text-xs border border-emerald-300"
                  onClick={() => { setChatInput(q); setTimeout(() => handleChatSend(), 100) }}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded px-2 py-1 border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Digite sua pergunta..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-3 py-1 font-semibold"
              >Enviar</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </>
  )
}
