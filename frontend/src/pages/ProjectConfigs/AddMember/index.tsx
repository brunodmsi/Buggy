import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Modal } from './styles';

interface IAddMemberProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  projectId: string;
}

const AddMember: React.FC<IAddMemberProps> = ({
  projectId,
  closeModal,
  openModal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});

      try {
        setLoading(false);

        const schema = Yup.object().shape({
          email: Yup.string()
            .email()
            .required('É obrigatório inserir um e-mail'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`/projects/${projectId}/users`, data);

        closeModal('reload');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        console.log();

        addToast({
          title: 'Erro ao adicionar usuário',
          type: 'error',
        });

        setLoading(false);
      }
    },
    [addToast, projectId, closeModal],
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

      <h1>Adicionar membro</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="Insira um e-mail" />

        <Button type="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddMember;
