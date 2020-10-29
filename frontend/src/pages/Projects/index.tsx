import React, { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get(`/projects/users/${user.id}`).then(({ data }) => {
      setProjects(data);
    });
  }, []);

  return (
    <Container>
      <h1>Projects</h1>
    </Container>
  );
};

export default Projects;
