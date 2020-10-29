import React from 'react';
import { FiSquare } from 'react-icons/fi';
import { PieChart } from 'react-minimal-pie-chart';

import { Container } from './styles';

interface PieChartDataProps {
  name: string;
  value: number;
  color: string;
}

interface PieCardProps {
  title: string;
  description: string;
  pieChartData: Array<PieChartDataProps>;
}

const PieCard: React.FC<PieCardProps> = ({
  title,
  description,
  pieChartData,
}) => {
  return (
    <Container>
      <h2>{title}</h2>
      <span>{description}</span>

      <PieChart
        data={pieChartData}
        lineWidth={15}
        rounded
        style={{
          height: '200px',
        }}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={index => ({
          fontSize: '7px',
          fontFamily: 'sans-serif',
          fill: pieChartData[index].color,
        })}
        labelPosition={60}
      />

      <footer>
        {pieChartData.map(data => (
          <div>
            <FiSquare color={data.color} fill={data.color} size={10} />
            <p>{data.name}</p>
          </div>
        ))}
      </footer>
    </Container>
  );
};

export default PieCard;
