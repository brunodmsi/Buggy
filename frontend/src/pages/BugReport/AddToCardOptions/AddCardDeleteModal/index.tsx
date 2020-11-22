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

interface IAddCardDeleteModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  bugId: string;
}

const AddCardDeleteModal: React.FC<IAddCardDeleteModalProps> = ({
  bugId,
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`/bugs/${bugId}`);

      closeModal('reload');

      setLoading(false);
    } catch (err) {
      addToast({
        title: 'Erro ao excluir card',
        type: 'error',
      });

      setLoading(false);
    }
  }, [addToast, bugId, closeModal]);

  return (
    <Modal isOpen={openModal}>
      <button
        type="button"
        className="close-button"
        onClick={() => closeModal()}
      >
        <FiX size={20} color="#fff" />
      </button>

      <h1>Excluir card de bug</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Button loading={loading} onClick={() => closeModal()}>
          Cancelar
        </Button>

        <Button className="deleteButton" type="submit" loading={loading}>
          Deletar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCardDeleteModal;
