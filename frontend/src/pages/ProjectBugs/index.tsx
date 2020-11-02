import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../services/api';

import CreateNewBugModal from './CreateNewBugModal';
import DragNDrop from './DragNDrop';

import { Container } from './styles';

interface IProjectDataProps {
  id: string;
  name: string;
  logo_url: string;
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
  group: number;
  status: number;
  bug_developers: Array<{ user: IDeveloperData }>;
}

export interface IDragAndDropDataProps {
  [key: string]: {
    name: string;
    items: Array<IBugData>;
  };
}

const Bugs: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProjectDataProps>(
    {} as IProjectDataProps,
  );
  const [dragAndDropData, setDragAndDropData] = useState(
    {} as IDragAndDropDataProps,
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}/bugs`).then(({ data }) => {
      setProject(data.project);
      setDragAndDropData(data.bugs);
    });
  }, [id]);

  return (
    <Container>
      <header>
        <section>
          <button type="button" onClick={() => history.goBack()}>
            <FiArrowLeft size={35} color="#27334D" />
          </button>
          <h1>{project.name}</h1>
        </section>
      </header>

      <DragNDrop
        data={dragAndDropData}
        openModal={() => setModalOpen(!modalOpen)}
      />

      <CreateNewBugModal
        openModal={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </Container>
  );
};

export default Bugs;
