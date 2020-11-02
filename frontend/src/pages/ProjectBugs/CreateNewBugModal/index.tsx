import React from 'react';

import Select from '../../../components/Select';

import { Modal } from './styles';

const bugOptions = [
  {
    label: 'WEB',
    value: 'web',
    backColor: '#B080F8',
    selected: true,
  },
  {
    label: 'BACKEND',
    value: 'backend',
    backColor: '#8DD1FF',
  },
  {
    label: 'DESIGN',
    value: 'design',
    backColor: '#DB6C6C',
  },
  {
    label: 'OUTRO',
    value: 'outro',
    backColor: '#15D815',
  },
];

const priorityOptions = [
  {
    label: 'ALTA',
    value: 'alta',
    backColor: '#FF3333',
    selected: true,
  },
  {
    label: 'MÉDIA',
    value: 'media',
    backColor: '#F1C73F',
  },
  {
    label: 'BAIXA',
    value: 'baixa',
    backColor: '#5CD439',
  },
];

interface CreateNewBugModalProps {
  openModal: boolean;
  closeModal: () => void;
}

const CreateNewBugModal: React.FC<CreateNewBugModalProps> = ({
  openModal,
  closeModal,
}) => {
  return (
    <Modal isOpen={openModal}>
      <h2>Reportar um novo bug</h2>
      <p>você está no projeto Scient</p>

      <div className="modal-row">
        <label>
          Tipo de bug
          <Select name="bug" options={bugOptions} />
        </label>

        <label>
          Prioridade
          <Select name="bug" options={priorityOptions} />
        </label>
      </div>

      <label>
        Sumário
        <input type="text" placeholder="ex: API retornando dados errados" />
      </label>

      <label>
        Descrição
        <textarea
          name="description"
          placeholder="ex: Quando uma requisição é feita na rota /hotel, o nome do hotel não é retornado na chamada."
        />
      </label>

      <div className="modal-row space">
        <button type="button" className="cancel" onClick={() => closeModal()}>
          CANCELAR
        </button>

        <button type="button" className="report">
          REPORTAR
        </button>
      </div>
    </Modal>
  );
};

export default CreateNewBugModal;
