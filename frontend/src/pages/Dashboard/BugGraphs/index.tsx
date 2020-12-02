import React, { useState, useEffect } from 'react';
import { Line, ChartData } from 'react-chartjs-2';

interface DatasetChartDataProps {
  label: string;
  data: Array<number>;
  fill: boolean;
  borderColor: Array<string>;
  borderWidth: number;
  [key: string]: any;
}

interface ChartDataProps {
  labels: Array<string>;
  datasets: Array<DatasetChartDataProps>;
}

const BugGraphs: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<ChartDataProps>>();

  useEffect(() => {
    setChartData({
      labels: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [
        {
          label: 'Instagram',
          data: [32, 45, 12, 76, 69],
          borderColor: ['#d72b72'],
          fill: false,
          borderWidth: 4,
        },
        {
          label: 'Whatsapp',
          data: [50, 10, 70, 10, 12],
          borderColor: ['#43D954'],
          fill: false,
          borderWidth: 4,
        },
        {
          label: 'Website',
          data: [15, 6, 86, 3, 83],
          fill: false,
          borderColor: ['#516EF7'],
          borderWidth: 4,
        },
      ],
    });
  }, []);

  return (
    <div style={{ width: 1000, height: 300 }}>
      <Line
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
