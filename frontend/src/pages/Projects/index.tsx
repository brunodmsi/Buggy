import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, NoProjects } from './styles';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get(`/projects/users/${user.id}`).then(({ data }) => {
      console.log(data);
      setProjects(data);
    });
  }, []);

  return (
    <Container>
      <header>
        <h1>Projetos</h1>
      </header>

      {projects.length === 0 && (
        <NoProjects>
          <h2>Você ainda não está em nenhum projeto :(</h2>
          <button type="button">Crie o seu agora mesmo!</button>
        </NoProjects>
      )}
    </Container>
  );
};

export default Projects;
