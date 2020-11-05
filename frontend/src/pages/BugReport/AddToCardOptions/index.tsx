import React, { useCallback, useState } from 'react';

import { FaUserAlt, FaFile, FaClock, FaCheck } from 'react-icons/fa';

import api from '../../../services/api';

import AddFileModal from './AddFileModal';
import AddDeveloperModal from './AddDeveloperModal';

import { Container } from './styles';

interface IAddToCardOptionsProps {
  bugId: string;
  projectId: string;
}

const AddToCardOptions: React.FC<IAddToCardOptionsProps> = ({
  bugId,
  projectId,
}) => {
  const [openFileModal, setOpenFileModal] = useState(false);
  const [openDeveloperModal, setOpenDeveloperModal] = useState(false);

  return (
    <Container>
      <p>Adicionar ao card</p>

      <button type="button">
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

      <button type="button">
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

      <button className="bottom" type="button">
        EXCLUIR CARD
      </button>
    </Container>
  );
};

export default AddToCardOptions;
