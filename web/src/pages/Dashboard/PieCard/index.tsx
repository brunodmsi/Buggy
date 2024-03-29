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

      {pieChartData.length > 0 ? (
        <>
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
              fontWeight: 800,
            })}
            labelPosition={60}
          />

          <footer>
            {pieChartData.map(data => (
              <div key={data.name}>
                <FiSquare color={data.color} fill={data.color} size={10} />
                <p>{data.name}</p>
              </div>
            ))}
          </footer>
        </>
      ) : (
        <p>Você ainda não está registrado(a) em nenhum projeto</p>
      )}
    </Container>
  );
};

export default PieCard;
