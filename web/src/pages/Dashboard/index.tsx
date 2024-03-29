/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';
import { groupOptions, typeOptions } from '../../utils/getBugOptions';

import PieCard from './PieCard';
import BugFixersCard from './BugFixersCard';
import BugsAssignedToUser from './BugsAssignedToUser';
import BugGraphs from './BugGraphs';

import { Container, Row } from './styles';

import { BugData } from '../BugReport';

interface IParseData {
  name: string;
  value: any;
  color: string;
}

interface BugFixerData {
  id: string;
  name: string;
  avatar_url: string | undefined;
  counter: number;
}

interface IDashboardDataProps {
  status: IParseData[];
  types: IParseData[];
  userBugs: BugData[];
  bugFixers: BugFixerData[];
  graphData: {
    [key: string]: {
      open: number;
      closed: number;
    };
  };
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({} as IDashboardDataProps);

  const { user, signOut } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    api
      .get('/users/dashboard')
      .then(response => {
        const { statuses, types, assignedToUser, projects, graph } =
          response.data;

        const parseStatus = groupOptions.map(group => {
          const currStatus = statuses[group.value];

          return {
            name: group.label,
            value: currStatus ? currStatus.bugs.length : 0,
            color: group.backColor ? group.backColor : '#000',
          };
        });

        const parseTypes = typeOptions.map(type => {
          const currType = types[type.value];

          return {
            name: type.label,
            value: currType ? currType.bugs.length : 0,
            color: type.backColor ? type.backColor : '#000',
          };
        });

        const userWithBugCounter: {
          [key: string]: BugFixerData;
        } = {};
        projects.forEach(({ project }: any) => {
          project.bugs.forEach((bug: any) => {
            bug.developers.forEach(({ user: dev }: any) => {
              if (userWithBugCounter[dev.id]) {
                userWithBugCounter[dev.id] = {
                  ...userWithBugCounter[dev.id],
                  counter: userWithBugCounter[dev.id].counter + 1,
                };
              } else {
                userWithBugCounter[dev.id] = {
                  id: dev.id,
                  name: dev.name,
                  avatar_url: dev.avatar ? dev.avatar_url : null,
                  counter: 1,
                };
              }
            });
          });
        });

        const parseProjects = Object.values(userWithBugCounter)
          .sort((a, b) => a.counter - b.counter)
          .reverse();

        setDashboardData({
          status: parseStatus,
          types: parseTypes,
          userBugs: assignedToUser,
          bugFixers: parseProjects,
          graphData: graph,
        });

        setLoading(false);
      })
      .catch((err: { message: string }) => {
        if (err.message.endsWith('401')) {
          addToast({
            title: 'Sessão expirada',
            description:
              'A sua sessão expirou, vamos te redirecionar para o login',
            type: 'error',
          });

          signOut();
        }
      });
  }, [addToast, signOut]);

  return (
    <Container>
      {!loading && (
        <>
          <header>
            <span>Olá, {user.name}</span>
            <h1>Seja bem vindo de volta ao Buggy</h1>
          </header>

          <div>
            <Row>
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
                bugFixers={dashboardData.bugFixers}
              />
            </Row>

            <Row>
              <BugGraphs data={dashboardData.graphData} />

              <BugsAssignedToUser
                title="Bugs designados a mim"
                bugs={dashboardData.userBugs}
              />
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
