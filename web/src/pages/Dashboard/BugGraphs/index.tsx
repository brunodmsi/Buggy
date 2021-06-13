import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface DatasetChartDataProps {
  label: string;
  data: Array<number>;
  fill: boolean;
  borderColor: Array<string>;
  borderWidth: number;
  [key: string]: unknown;
}

interface ChartDataProps {
  labels: Array<string>;
  datasets: Array<DatasetChartDataProps>;
}

interface BugGraphsProps {
  data: {
    [key: string]: {
      open: number;
      closed: number;
    };
  };
}

const BugGraphs: React.FC<BugGraphsProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartDataProps>(
    {} as ChartDataProps,
  );

  useEffect(() => {
    setChartData({
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Abertos',
          data: Object.values(data).map(month => {
            return month.open;
          }),
          borderColor: ['#43D954'],
          fill: false,
          borderWidth: 4,
        },
        {
          label: 'Fechados',
          data: Object.values(data).map(month => {
            return month.closed;
          }),
          borderColor: ['#d72b72'],
          fill: false,
          borderWidth: 4,
        },
      ],
    });
  }, [data]);

  return (
    <div style={{ width: 1000, height: 300 }}>
      <Line
        type={{}}
        width={1000}
        height={300}
        data={chartData}
        options={{
          responsive: true,
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default BugGraphs;
