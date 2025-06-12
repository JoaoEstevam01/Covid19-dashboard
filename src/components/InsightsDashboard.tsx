'use client';

import { Card, Title, Text, Grid, Col, Metric, BadgeDelta, Flex, AreaChart, BarChart, DonutChart, LineChart } from '@tremor/react';
import { motion } from 'framer-motion';
import { TimelineData, TrendData } from '@/types/dashboard';

interface InsightsDashboardProps {
  data: TimelineData[];
  trends: TrendData[];
  selectedPeriod: string;
}

const InsightsDashboard = ({ data, trends, selectedPeriod }: InsightsDashboardProps) => {
  const chartData = data.map(item => ({
    date: item.date,
    'Novos Casos': item.novosCasos,
    'Novas Mortes': item.novasMortes,
    'Taxa de Recuperação': item.taxaRecuperacao,
    'Taxa de Vacinação': item.taxaVacinacao,
    'Taxa de Positividade': item.taxaPositividade,
  }));

  const valueFormatter = (number: number) => 
    Intl.NumberFormat('pt-BR').format(number).toString();

  const percentFormatter = (number: number) => 
    `${number.toFixed(1)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-xl text-gray-100 mb-4">Evolução de Casos e Óbitos</Title>
            <AreaChart
              className="h-72 mt-4"
              data={data}
              index="date"
              categories={["novosCasos", "novasMortes"]}
              colors={["blue", "red"]}
              valueFormatter={valueFormatter}
              yAxisWidth={60}
              showAnimation={true}
              showLegend={true}
              curveType="monotone"
            />
          </Card>
        </Col>

        <Col>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-xl text-gray-100 mb-4">Taxas de Vacinação e Recuperação</Title>
            <AreaChart
              className="h-72 mt-4"
              data={data}
              index="date"
              categories={["taxaVacinacao", "taxaRecuperacao"]}
              colors={["emerald", "amber"]}
              valueFormatter={percentFormatter}
              yAxisWidth={60}
              showAnimation={true}
              showLegend={true}
              curveType="monotone"
            />
          </Card>
        </Col>

        <Col>
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
            <Title className="text-xl text-gray-100 mb-4">Taxa de Positividade dos Testes</Title>
            <AreaChart
              className="h-72 mt-4"
              data={data}
              index="date"
              categories={["taxaPositividade"]}
              colors={["purple"]}
              valueFormatter={percentFormatter}
              yAxisWidth={60}
              showAnimation={true}
              showLegend={true}
              curveType="monotone"
            />
          </Card>
        </Col>
      </Grid>

      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
        <Grid numItems={1} numItemsLg={2} className="gap-6">
          {trends.map((trend, index) => (
            <Col key={trend.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <Text className="text-gray-400">{trend.name}</Text>
                  <div className={`px-2 py-1 rounded text-sm ${trend.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trend.change >= 0 ? '+' : ''}{trend.change}%
                  </div>
                </div>
                <Text className="text-2xl font-bold text-gray-100 mb-2">
                  {typeof trend.value === 'number' ? 
                    trend.value % 1 === 0 ? 
                      Intl.NumberFormat('pt-BR').format(trend.value)
                      : trend.value.toFixed(1) 
                    : trend.value}
                  {trend.name.includes('Taxa') || trend.name.includes('Índice') ? '%' : ''}
                </Text>
                <Text className="text-sm text-gray-400">{trend.description}</Text>
              </motion.div>
            </Col>
          ))}
        </Grid>
      </Card>
    </motion.div>
  );
};

export default InsightsDashboard; 