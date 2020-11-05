import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';

import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import { Modal } from './styles';

import { BugDeveloperData } from '../..';

interface IAddDeveloperModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  bugId: string;
  projectId: string;
}

const AddDeveloperModal: React.FC<IAddDeveloperModalProps> = ({
  bugId,
  projectId,
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [projectDevelopers, setProjectDevelopers] = useState(
    {} as BugDeveloperData[],
  );

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    api
      .get(`/projects/${projectId}/users`)
      .then(response => setProjectDevelopers(response.data));
  }, [projectId]);

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});

      try {
        setLoading(false);

        const schema = Yup.object().shape({
          developer: Yup.string()
            .oneOf(
              projectDevelopers.map(dev => dev.email),
              'E-mail do desenvolvedor não encontrado',
            )
            .required('É obrigatório inserir um e-mail'),
        });

        await schema.validate(data, { abortEarly: false });

        const user = projectDevelopers.find(
          projectDev => projectDev.email === data.developer,
        );

        await api.post(`/bugs/${bugId}/developers`, {
          user_id: user?.id,
        });

        closeModal('reload');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao adicionar desenvolvedor',
          description: err.response.data.message || '',
          type: 'error',
        });

        setLoading(false);
      }
    },
    [addToast, bugId, closeModal, projectDevelopers],
  );

  return (
    <Modal isOpen={openModal}>
      <button
        type="button"
        className="close-button"
        onClick={() => closeModal()}
      >
        <FiX size={20} color="#fff" />
      </button>

      <h1>Adicionar arquivo</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="developer" placeholder="Adicionar por e-mail" />

        <Button type="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddDeveloperModal;
