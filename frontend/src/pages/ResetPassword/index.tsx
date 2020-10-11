import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';
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

interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const params = useParams<{ token: string }>();

  console.log('hmm')

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6, 'No mínimo 6 dígitos'),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      const { password, password_confirmation } = data;
      const { token } = params;

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token
      })

      history.push('/login');
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar a sua senha, tente novamente.',
        type: 'error'
      })
    }
  }, [addToast, history, params])

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy"/>
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Resete sua <strong>senha</strong></h1>
        <p>HORA DE RESETAR</p>

        <Input icon={FiLock} name="password" type="password" placeholder="Nova senha" />
        <Input icon={FiLock} name="password_confirmation" type="password" placeholder="Confirmação da senha" />

        <Button type="submit">Alterar senha</Button>
      </Form>

      <a href="https://github.com/brunodmsi">Desenvolvido por Bruno De Masi</a>
    </Container>
  )
}

export default ResetPassword;
