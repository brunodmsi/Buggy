import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams, useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import CreateNewBugModal from './CreateNewBugModal';
import DragNDrop from './DragNDrop';

import { Container } from './styles';

interface IProjectDataProps {
  id: string;
  name: string;
  logo_url: string;
  owner_id: string;
}

interface IDeveloperData {
  id: string;
  avatar: string | undefined;
  avatar_url: string | undefined;
}

interface IBugData {
  id: string;
  title: string;
  type: string;
  priority: string;
  group: number;
  status: number;
  archived: boolean;
  developers: Array<{ user: IDeveloperData }>;
}

export interface IDragAndDropDataProps {
  [key: string]: {
    name: string;
    items: Array<IBugData>;
  };
}

const ProjectBugs: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const { user } = useAuth();

  const [project, setProject] = useState<IProjectDataProps>(
    {} as IProjectDataProps,
  );
  const [dragAndDropData, setDragAndDropData] = useState(
    {} as IDragAndDropDataProps,
  );
  const [selectedBugGroup, setSelectedBugGroup] = useState('0');

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}/bugs`).then(({ data }) => {
      setProject(data.project);
      setDragAndDropData(data.bugs);
    });
  }, [id]);

  const handleNewBugModalClose = useCallback(
    async (action?: string) => {
      setModalOpen(false);

      if (action === 'reload') {
        const response = await api.get(`/projects/${id}/bugs`);

        setDragAndDropData(response.data.bugs);
      }
    },
    [id],
  );

  return (
    <Container>
      <header>
        <section>
          <button type="button" onClick={() => history.goBack()}>
            <FiArrowLeft size={35} color="#27334D" />
          </button>
          <h1>{project.name}</h1>
        </section>

        {project.owner_id === user.id && (
          <Link to={`/projects/${id}/config`}>Configurações</Link>
        )}
      </header>

      <DragNDrop
        data={dragAndDropData}
        openModal={group => {
          setSelectedBugGroup(group);
          setModalOpen(!modalOpen);
        }}
      />

      <CreateNewBugModal
        project={project}
        bugGroup={selectedBugGroup}
        openModal={modalOpen}
        closeModal={(action?: string) => handleNewBugModalClose(action)}
      />
    </Container>
  );
};

export default ProjectBugs;
