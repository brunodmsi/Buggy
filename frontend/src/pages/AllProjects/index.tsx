import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import CreateNewProjectModal from './CreateNewProjectModal';

import {
  Container,
  NoProjects,
  OpenNewProjectModalButton,
  ShowProjects,
} from './styles';

interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  logo?: string;
  logo_url?: string;
  dominant_color?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState([] as ProjectData[]);
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/projects/users/${user.id}`).then(({ data }) => {
      setProjects(data);
    });
  }, [user.id]);

  const handleCloseModal = useCallback(
    async (action?: string) => {
      setOpenCreateProjectModal(false);

      if (action === 'reload') {
        const response = await api.get(`/projects/users/${user.id}`);

        setProjects(response.data);
      }
    },
    [user.id],
  );

  return (
    <Container>
      <header>
        <h1>Projetos</h1>
      </header>

      <CreateNewProjectModal
        openModal={openCreateProjectModal}
        closeModal={action => handleCloseModal(action)}
      />

      {projects.length === 0 && (
        <>
          <NoProjects>
            <h2>Você ainda não está em nenhum projeto :(</h2>
            <OpenNewProjectModalButton
              type="button"
              onClick={() => setOpenCreateProjectModal(true)}
            >
              Crie o seu agora mesmo!
            </OpenNewProjectModalButton>
          </NoProjects>
        </>
      )}

      {projects.length > 0 && (
        <>
          <ShowProjects>
            {projects.map(project => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                {project.logo && <img src={project.logo_url} alt="" />}
                <p>{project.name}</p>
              </Link>
            ))}
          </ShowProjects>

          <OpenNewProjectModalButton
            type="button"
            onClick={() => setOpenCreateProjectModal(true)}
          >
            Criar novo projeto
          </OpenNewProjectModalButton>
        </>
      )}
    </Container>
  );
};

export default Projects;
