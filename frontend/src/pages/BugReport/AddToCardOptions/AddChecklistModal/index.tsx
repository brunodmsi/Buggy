import React, { useCallback, useRef, useState } from 'react';
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

interface IAddChecklistModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  bugId: string;
}

const AddChecklistModal: React.FC<IAddChecklistModalProps> = ({
  bugId,
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});

      try {
        setLoading(false);

        const schema = Yup.object().shape({
          title: Yup.string().required('É obrigatório inserir um título'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`/bugs/${bugId}/checklists`, data);

        closeModal('reload');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao adicionar checklist',
          type: 'error',
        });

        setLoading(false);
      }
    },
    [addToast, bugId, closeModal],
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

      <h1>Adicionar checklist</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="title" placeholder="Insira um título" />

        <Button type="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddChecklistModal;
