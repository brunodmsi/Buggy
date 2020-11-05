import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';

import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';
import FileInput from '../../../../components/FileInput';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';

import { Modal } from './styles';

interface IAddFileModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  bugId: string;
}

const AddFileModal: React.FC<IAddFileModalProps> = ({
  bugId,
  openModal,
  closeModal,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);

        const schema = Yup.object().shape({
          file: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const formData = new FormData();

        formData.append('file', data.file);

        await api.post(`/bugs/${bugId}/files`, formData);

        closeModal('reload');

        setLoading(false);
      } catch (err) {
        addToast({
          title: 'Erro ao adicionar arquivo',
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

      <h1>Adicionar arquivo</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <FileInput name="file" placeholder="Adicionar arquivo" />

        <Button type="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddFileModal;
