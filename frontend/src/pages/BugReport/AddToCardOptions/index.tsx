import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FaUserAlt, FaFile, FaClock, FaCheck } from 'react-icons/fa';

import AddFileModal from './AddFileModal';
import AddDeveloperModal from './AddDeveloperModal';
import AddDateLimitModal from './AddDateLimitModal';
import AddChecklistModal from './AddChecklistModal';
import AddCardDeleteModal from './AddCardDeleteModal';

import { Container } from './styles';

interface IAddToCardOptionsProps {
  bugId: string;
  projectId: string;
}

const AddToCardOptions: React.FC<IAddToCardOptionsProps> = ({
  bugId,
  projectId,
}) => {
  const history = useHistory();

  const [openFileModal, setOpenFileModal] = useState(false);
  const [openDeveloperModal, setOpenDeveloperModal] = useState(false);
  const [openDateLimitModal, setOpenDateLimitModal] = useState(false);
  const [openChecklistModal, setOpenChecklistModal] = useState(false);
  const [openCardDeleteModal, setOpenCardDeleteModal] = useState(false);

  return (
    <Container>
      <p>Adicionar ao card</p>

      <button type="button" onClick={() => setOpenChecklistModal(true)}>
        <FaCheck size={25} />
        Checklist
      </button>

      <button type="button" onClick={() => setOpenDeveloperModal(true)}>
        <FaUserAlt size={25} />
        Desenvolvedor
      </button>

      <button type="button" onClick={() => setOpenFileModal(true)}>
        <FaFile size={25} />
        Arquivo
      </button>

      <button type="button" onClick={() => setOpenDateLimitModal(true)}>
        <FaClock size={25} />
        Data de entrega
      </button>

      <AddFileModal
        bugId={bugId}
        openModal={openFileModal}
        closeModal={async (action?: string) => {
          setOpenFileModal(false);

          if (action === 'reload') {
            document.location.reload();
          }
        }}
      />

      <AddDeveloperModal
        projectId={projectId}
        bugId={bugId}
        openModal={openDeveloperModal}
        closeModal={async (action?: string) => {
          setOpenDeveloperModal(false);

          if (action === 'reload') {
            document.location.reload();
          }
        }}
      />

      <AddDateLimitModal
        bugId={bugId}
        openModal={openDateLimitModal}
        closeModal={async (action?: string) => {
          setOpenDateLimitModal(false);

          if (action === 'reload') {
            document.location.reload();
          }
        }}
      />

      <AddChecklistModal
        bugId={bugId}
        openModal={openChecklistModal}
        closeModal={async (action?: string) => {
          setOpenChecklistModal(false);

          if (action === 'reload') {
            document.location.reload();
          }
        }}
      />

      <AddCardDeleteModal
        bugId={bugId}
        openModal={openCardDeleteModal}
        closeModal={async (action?: string) => {
          setOpenCardDeleteModal(false);

          if (action === 'reload') {
            history.goBack();
          }
        }}
      />

      <button
        className="bottom"
        type="button"
        onClick={() => setOpenCardDeleteModal(true)}
      >
        EXCLUIR CARD
      </button>
    </Container>
  );
};

export default AddToCardOptions;
