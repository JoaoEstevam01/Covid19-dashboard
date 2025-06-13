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
    stateData: [
      { state: 'SP', cases: 6889543, deaths: 177853, recovered: 6623478, inflation: 5.2 },
      { state: 'RJ', cases: 2789654, deaths: 76543, recovered: 2698765, inflation: 5.5 },
      { state: 'MG', cases: 2187654, deaths: 54321, recovered: 2098765, inflation: 4.8 },
      { state: 'BA', cases: 1876543, deaths: 43210, recovered: 1798765, inflation: 6.1 },
      { state: 'PR', cases: 1654321, deaths: 32109, recovered: 1598765, inflation: 4.9 },
      { state: 'RS', cases: 1543210, deaths: 29876, recovered: 1498765, inflation: 4.7 },
      { state: 'PE', cases: 1432109, deaths: 27654, recovered: 1398765, inflation: 5.8 },
      { state: 'CE', cases: 1321098, deaths: 25432, recovered: 1298765, inflation: 5.9 },
      { state: 'PA', cases: 1210987, deaths: 23210, recovered: 1198765, inflation: 6.2 },
      { state: 'SC', cases: 1109876, deaths: 21098, recovered: 1098765, inflation: 4.6 },
      { state: 'AM', cases: 987654, deaths: 19876, recovered: 958765, inflation: 6.5 },
      { state: 'GO', cases: 876543, deaths: 17654, recovered: 858765, inflation: 5.1 },
      { state: 'MA', cases: 765432, deaths: 15432, recovered: 748765, inflation: 6.3 },
      { state: 'ES', cases: 654321, deaths: 13210, recovered: 638765, inflation: 5.0 },
      { state: 'MT', cases: 543210, deaths: 11098, recovered: 528765, inflation: 5.3 },
      { state: 'DF', cases: 432109, deaths: 9876, recovered: 418765, inflation: 4.9 },
      { state: 'MS', cases: 321098, deaths: 7654, recovered: 308765, inflation: 5.0 },
      { state: 'PB', cases: 210987, deaths: 5432, recovered: 198765, inflation: 5.7 },
      { state: 'RN', cases: 198765, deaths: 4321, recovered: 188765, inflation: 5.6 },
      { state: 'AL', cases: 187654, deaths: 3210, recovered: 178765, inflation: 5.9 },
      { state: 'PI', cases: 176543, deaths: 2987, recovered: 168765, inflation: 6.0 },
      { state: 'SE', cases: 165432, deaths: 2765, recovered: 158765, inflation: 5.8 },
      { state: 'RO', cases: 154321, deaths: 2543, recovered: 148765, inflation: 5.4 },
      { state: 'TO', cases: 143210, deaths: 2321, recovered: 138765, inflation: 5.5 },
      { state: 'AC', cases: 132109, deaths: 2109, recovered: 128765, inflation: 5.6 },
      { state: 'AP', cases: 121098, deaths: 1987, recovered: 118765, inflation: 5.7 },
      { state: 'RR', cases: 110987, deaths: 1765, recovered: 108765, inflation: 5.8 }
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
      const mostAffected = mockData.stateData.reduce((a, b) => a.cases > b.cases ? a : b)
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
          data={mockData.stateData} 
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
        <SymptomsStats data={mockData.symptoms as any} />
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
            <StatesTable data={mockData.stateData} />
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
