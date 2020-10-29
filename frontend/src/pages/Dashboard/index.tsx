import React from 'react';

import { useAuth } from '../../hooks/auth';

import PieCard from './PieCard';
import BugFixersCard from './BugFixersCard';

import { Container } from './styles';

const avatar_url =
  'https://buggy-demasi.s3.us-east-2.amazonaws.com/2f5ca41d38871de68d75-imagem.jpg';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <header>
        <span>Olá, {user.name}</span>
        <h1>Seja bem vindo de volta ao Buggy</h1>
      </header>

      <div>
        <PieCard
          title="Bug status"
          description="Status atual dos bugs das aplicações"
          pieChartData={[
            { name: 'Aberto', value: 10, color: '#4882FF' },
            { name: 'Fechado', value: 15, color: '#FF3333' },
          ]}
        />

        <PieCard
          title="Bug ativos por tipos"
          description="Veja quais são os tipos que tem bugs ativos"
          pieChartData={[
            { name: 'Web', value: 6, color: '#31B465' },
            { name: 'UX', value: 4, color: '#2839A5' },
            { name: 'Back-end', value: 8, color: '#9B66B9' },
          ]}
        />

        <BugFixersCard
          title="Top 5 bug fixers"
          description="Os 5 que mais consertaram bugs das aplicações"
          bugFixers={[
            { id: '1', name: 'Bruno De Masi', avatar_url },
            { id: '2', name: 'Renato Aquino', avatar_url },
            { id: '3', name: 'João Tomé', avatar_url },
            { id: '4', name: 'Bolo', avatar_url },
            { id: '5', name: 'Anne', avatar_url },
          ]}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
