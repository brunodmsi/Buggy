import React, { useCallback, useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

import logoRoxa from '../../assets/logo_roxa.png';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          // name: Yup.string().required'Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy" />
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>
          Recupere a sua <strong>senha</strong>
        </h1>
        <p>UH OH... PERDEU A CHAVE?</p>

        <Input icon={FiMail} name="email" placeholder="Insira seu e-mail" />

        <Button loading={loading} type="submit">
          Recuperar
        </Button>

        <Link to="/login">Voltar ao login</Link>
      </Form>

      <a href="https://github.com/brunodmsi">Desenvolvido por Bruno De Masi</a>
    </Container>
  );
};

export default ForgotPassword;
