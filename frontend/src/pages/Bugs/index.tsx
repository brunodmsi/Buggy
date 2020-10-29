import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import Select from '../../components/Select';
import DragNDrop from './DragNDrop';

import { Container, Modal } from './styles';

const defaultData = [
  {
    title: 'Aberto',
    items: [
      {
        tag: {
          name: 'WEB',
          color: '#B080F8',
        },
        text: 'Styled Components quebrando na build de produção',
        image_url: 'https://jooinn.com/images/photo-of-woman-11.jpg',
        priority: {
          type: 'BAIXA',
          backColor: '#5CD439',
        },
      },
      {
        tag: {
          name: 'WEB',
          color: '#B080F8',
        },
        text: 'Styled Components quebrando na build de produção',
        image_url: 'https://jooinn.com/images/photo-of-woman-11.jpg',
        priority: {
          type: 'ALTA',
          backColor: '#FF3333',
        },
      },
    ],
  },
  {
    title: 'Fazendo',
    items: [
      {
        tag: {
          name: 'WEB',
          color: '#B080F8',
        },
        text: 'Erro na estilização',
        image_url: 'https://jooinn.com/images/photo-of-woman-11.jpg',
        priority: {
          type: 'MÉDIA',
          backColor: '#F1C73F',
        },
      },
      {
        tag: {
          name: 'BACKEND',
          color: '#8DD1FF',
        },
        text: 'Styled Components quebrando na build de produção',
        image_url: 'https://jooinn.com/images/photo-of-woman-11.jpg',
        priority: {
          type: 'ALTA',
          backColor: '#FF3333',
        },
      },
    ],
  },
];

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

const Bugs: React.FC = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const localSaved = localStorage.getItem('@buggy:kanbanList');

    if (localSaved) {
      setData(JSON.parse(localSaved));
    } else {
      setData(defaultData as []);
    }
  }, [setData]);

  return (
    <Container>
      <header>
        <section>
          <FiArrowLeft size={35} color="#27334D" />
          <h1>Scient</h1>
        </section>
      </header>

      <DragNDrop data={data} openModal={() => setModalOpen(!modalOpen)} />

      <Modal isOpen={modalOpen}>
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
          <button
            type="button"
            className="cancel"
            onClick={() => setModalOpen(!modalOpen)}
          >
            CANCELAR
          </button>

          <button type="button" className="report">
            REPORTAR
          </button>
        </div>
      </Modal>
    </Container>
  );
};

export default Bugs;
