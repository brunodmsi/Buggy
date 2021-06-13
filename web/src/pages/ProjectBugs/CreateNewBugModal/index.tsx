import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  allTypeWithoutColors,
  allPriorityWithoutColors,
} from '../../../utils/getBugOptions';

import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';
import Button from '../../../components/Button';

import { Modal } from './styles';

interface IProjectData {
  id: string;
  name: string;
}

interface CreateNewBugModalProps {
  project: IProjectData;
  bugGroup: string;
  openModal: boolean;
  closeModal: (action?: string) => void;
}

const CreateNewBugModal: React.FC<CreateNewBugModalProps> = ({
  project,
  bugGroup,
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('O bug precisa de um sumário'),
          description: Yup.string().required('O bug precisa de uma descrição'),
          type: Yup.string()
            .oneOf(
              ['backend', 'web', 'design', 'outro'],
              'Tipo selecionado inválido',
            )
            .required('É obrigatório selecionar uma opção'),
          priority: Yup.string()
            .oneOf(
              ['baixa', 'media', 'alta'],
              'Prioridade selecionada inválida',
            )
            .required('É obrigatório selecionar uma opção'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/bugs', {
          title: data.title,
          description: data.description,
          type: data.type,
          group: bugGroup,
          priority: data.priority,
          status: 0,
          project_id: project.id,
        });

        addToast({
          title: 'Bug criado',
          description: 'O bug foi criado com sucesso!',
          type: 'success',
        });

        closeModal('reload');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro no bug',
          description: 'Ocorreu um erro na hora de criar o bug',
          type: 'error',
        });
      }
    },
    [addToast, bugGroup, closeModal, project.id],
  );

  return (
    <Modal isOpen={openModal}>
      <h2>Reportar um novo bug</h2>
      <p>você está no projeto {project.name}</p>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-row">
          <label>
            Tipo de bug
            <Select
              name="type"
              placeholder="Selecione um tipo"
              options={allTypeWithoutColors}
            />
          </label>

          <label>
            Tipo de bug
            <Select
              name="priority"
              placeholder="Qual a prioridade?"
              options={allPriorityWithoutColors}
            />
          </label>
        </div>

        <label>
          Sumário
          <Input name="title" placeholder="ex: API retornando dados errados" />
        </label>

        <label>
          Descrição
          <Textarea
            name="description"
            placeholder="ex: Quando uma requisição é feita na rota /hotel, o nome do hotel não é retornado na chamada."
          />
        </label>

        <div className="modal-row space">
          <Button className="cancel" onClick={() => closeModal()}>
            CANCELAR
          </Button>

          <Button type="submit" className="report">
            REPORTAR
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateNewBugModal;
