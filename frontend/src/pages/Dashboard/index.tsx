import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import { groupOptions, typeOptions } from '../../utils/getBugOptions';

import PieCard from './PieCard';
import BugFixersCard from './BugFixersCard';
import BugsAssignedToUser from './BugsAssignedToUser';

import { Container } from './styles';

import { BugData } from '../BugReport';

const avatar_url =
  'https://buggy-demasi.s3.us-east-2.amazonaws.com/2f5ca41d38871de68d75-imagem.jpg';

interface IParseData {
  name: string;
  value: any;
  color: string;
}

interface IDashboardDataProps {
  status: IParseData[];
  types: IParseData[];
  userBugs: BugData[];
}

const statusColors = ['#4882FF', '#39ff14', '#eead2d', '#FF3333'];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({} as IDashboardDataProps);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/users/dashboard').then(response => {
      const { statuses, types, assignedToUser } = response.data;

      const statusKeys = Object.keys(statuses);
      const parseStatus = groupOptions.map(group => {
        const status = statuses[statusKeys[Number(group.value)]];

        return {
          name: group.label,
          value: status ? status.bugs.length : 0,
          color: statusColors[Number(group.value)],
        };
      });

      const typesKeys = Object.keys(types);
      const parseTypes = typeOptions.map((type, index) => {
        const currType = types[typesKeys[index]];

        return {
          name: type.label,
          value: currType ? currType.bugs.length : 0,
          color: type.backColor ? type.backColor : '#000',
        };
      });

      setDashboardData({
        status: parseStatus,
        types: parseTypes,
        userBugs: assignedToUser,
      });

      setLoading(false);
    });
  }, []);

  return (
    <Container>
      {!loading && (
        <>
          <header>
            <span>Olá, {user.name}</span>
            <h1>Seja bem vindo de volta ao Buggy</h1>
          </header>

          <div>
            <PieCard
              title="Bug status"
              description="Status atual dos bugs das aplicações"
              pieChartData={dashboardData.status}
            />

            <PieCard
              title="Bug ativos por tipos"
              description="Veja quais são os tipos que tem bugs ativos"
              pieChartData={dashboardData.types}
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

            <BugsAssignedToUser
              title="Bugs designados a mim"
              bugs={dashboardData.userBugs}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
