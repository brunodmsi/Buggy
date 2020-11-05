import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Container } from './styles';

interface SummaryProps {
  title: string;
  bugId: string;
}

const Summary: React.FC<SummaryProps> = ({ bugId, title: propTitle }) => {
  const formRef = useRef<FormHandles>(null);
  const [title, setTitle] = useState(propTitle);
  const [isEdit, setIsEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const { addToast } = useToast();

  const handleEditSubmit = useCallback(
    async data => {
      try {
        setEditLoading(true);

        const schema = Yup.object().shape({
          title: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch(`/bugs/${bugId}/title`, data);

        addToast({
          title: 'Edição feita com sucesso!',
          type: 'success',
        });

        setTitle(data.title);
        setEditLoading(false);
        setIsEdit(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        setEditLoading(false);

        addToast({
          title: 'Erro ao editar',
          description: 'Verifique se está tudo correto e tente novamente',
          type: 'error',
        });
      }
    },
    [addToast, bugId],
  );

  return (
    <Container onClick={() => !isEdit && setIsEdit(true)}>
      <h3>Sumário</h3>

      {isEdit ? (
        <Form ref={formRef} onSubmit={handleEditSubmit}>
          <Input name="title" defaultValue={title} />

          <div>
            <Button className="cancel-button" onClick={() => setIsEdit(false)}>
              Cancelar
            </Button>

            <Button type="submit" loading={editLoading} spinnerSize={20}>
              Salvar
            </Button>
          </div>
        </Form>
      ) : (
        <p>{title}</p>
      )}
    </Container>
  );
};

export default Summary;
