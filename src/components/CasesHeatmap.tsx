'use client';

import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Card, Title } from '@tremor/react';

interface CasesHeatmapProps {
  data: {
    state: string;
    cases: number;
    deaths: number;
    recovered: number;
  }[];
}

const CasesHeatmap = ({ data }: CasesHeatmapProps) => {
  const heatmapData = data.map((item) => ({
    state: item.state,
    cases: item.cases,
    deaths: item.deaths,
    recovered: item.recovered,
  }));

  return (
    <Card className="mt-4">
      <Title>Distribuição de Casos por Estado</Title>
      <div className="h-[400px]">
        <ResponsiveHeatMap
          data={heatmapData}
          keys={['cases', 'deaths', 'recovered']}
          indexBy="state"
          margin={{ top: 20, right: 90, bottom: 60, left: 90 }}
          colors={{
            type: 'sequential',
            scheme: 'red_yellow_blue',
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Estados',
            legendPosition: 'middle',
            legendOffset: 45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Métricas',
            legendPosition: 'middle',
            legendOffset: -72,
          }}
          cellOpacity={0.85}
          cellHoverOthersOpacity={0.25}
          cellShape="circle"
          enableLabels={true}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              anchor: 'right',
              translateX: 60,
              translateY: 0,
              length: 300,
              thickness: 10,
              direction: 'column',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              title: 'Valor',
              titleAlign: 'start',
              titleOffset: 4,
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default CasesHeatmap; 