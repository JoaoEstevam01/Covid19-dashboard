'use client';

import { ResponsiveLine } from '@nivo/line';
import { Card, Title } from '@tremor/react';
import { useSpring, animated } from 'react-spring';

interface TrendChartProps {
  data: {
    date: string;
    newCases: number;
    newDeaths: number;
    recoveryRate: number;
  }[];
}

const TrendChart = ({ data }: TrendChartProps) => {
  const chartData = [
    {
      id: 'Novos Casos',
      data: data.map((d) => ({ x: d.date, y: d.newCases })),
    },
    {
      id: 'Novas Mortes',
      data: data.map((d) => ({ x: d.date, y: d.newDeaths })),
    },
    {
      id: 'Taxa de Recuperação',
      data: data.map((d) => ({ x: d.date, y: d.recoveryRate })),
    },
  ];

  const AnimatedLine = animated(ResponsiveLine);
  const springProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { tension: 300, friction: 20 },
  });

  return (
    <Card className="mt-4">
      <Title>Tendências ao Longo do Tempo</Title>
      <animated.div style={springProps} className="h-[400px]">
        <ResponsiveLine
          data={chartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: 'Data',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Valor',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enablePoints={true}
          pointSize={8}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          enableSlices="x"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: '#777777',
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fill: '#555555',
                },
              },
            },
            grid: {
              line: {
                stroke: '#dddddd',
                strokeWidth: 1,
              },
            },
            legends: {
              text: {
                fontSize: 12,
              },
            },
          }}
        />
      </animated.div>
    </Card>
  );
};

export default TrendChart; 