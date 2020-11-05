import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';

import { useToast } from '../../../../hooks/toast';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErrors';

import DatePicker from '../../../../components/DatePicker';
import Button from '../../../../components/Button';

import { Modal } from './styles';

interface IAddDateLimitModalProps {
  openModal: boolean;
  closeModal: (action?: string) => void;
  bugId: string;
  modalTitleText: string;
  defaultValue?: string;
}

const AddDateLimitModal: React.FC<IAddDateLimitModalProps> = ({
  bugId,
  openModal,
  closeModal,
  modalTitleText,
  defaultValue,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [dateLimit, setDateLimit] = useState(defaultValue);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});

      try {
        setLoading(false);

        const schema = Yup.object().shape({
          date_limit: Yup.date().required('É obrigatório inserir um e-mail'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch(`/bugs/${bugId}/date`, data);

        closeModal('reload');

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao adicionar data',
          description: err.response.data.message || '',
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

      <h1>{modalTitleText}</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <DatePicker
          name="date_limit"
          placeholderText="Selecione a data limite de entrega"
        />

        <Button type="submit" loading={loading}>
          Enviar
        </Button>
      </Form>
    </Modal>
  );
};

export default AddDateLimitModal;
