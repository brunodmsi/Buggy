import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Container } from './styles';

interface DescriptionProps {
  description: string;
  bugId: string;
}

const Description: React.FC<DescriptionProps> = ({
  bugId,
  description: propDescription,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [description, setDescription] = useState(propDescription);
  const [isEdit, setIsEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const { addToast } = useToast();

  const handleEditSubmit = useCallback(
    async data => {
      try {
        setEditLoading(true);

        const schema = Yup.object().shape({
          description: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch(`/bugs/${bugId}/description`, data);

        addToast({
          title: 'Edição feita com sucesso!',
          type: 'success',
        });

        setDescription(data.description);
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
      <h2>Descrição</h2>

      {isEdit ? (
        <Form ref={formRef} onSubmit={handleEditSubmit}>
          <Textarea name="description" defaultValue={description} />

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
        <p>{description}</p>
      )}
    </Container>
  );
};

export default Description;
