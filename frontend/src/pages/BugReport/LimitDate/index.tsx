import React, { useCallback, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import Checkbox from '../../../components/Checkbox';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Container } from './styles';

interface LimitDateProps {
  date: string;
  delivered: boolean;
  bugId: string;
}

const LimitDate: React.FC<LimitDateProps> = ({
  bugId,
  date,
  delivered: propDelivered,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [delivered, setDelivered] = useState(propDelivered);

  const { addToast } = useToast();

  const handleEditSubmit = useCallback(async () => {
    try {
      await api.patch(`/bugs/${bugId}/delivered`, {
        delivered: !delivered,
      });

      setDelivered(!delivered);

      addToast({
        title: delivered ? 'Desmarcado como entregue' : 'Atividade entregue!',
        type: 'success',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Erro ao editar entrega',
        description: 'Tente novamente mais tarde.',
        type: 'error',
      });
    }
  }, [addToast, bugId, delivered]);

  return (
    <Container>
      {date && (
        <>
          <h4>Data limite</h4>

          <section>
            <Form ref={formRef} onSubmit={handleEditSubmit}>
              <Checkbox
                name="limit_date"
                defaultChecked={delivered}
                options={[
                  {
                    id: bugId,
                    label: format(
                      parseISO(date),
                      "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                      {
                        locale: ptBR,
                      },
                    ),
                    value: 'delivered',
                  },
                ]}
                onClick={() => formRef.current?.submitForm()}
              />
            </Form>
          </section>
        </>
      )}
    </Container>
  );
};

export default LimitDate;
