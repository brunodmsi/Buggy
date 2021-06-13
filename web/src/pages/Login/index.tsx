import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

import logoRoxa from '../../assets/logo_roxa.png';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
          type: 'error',
        });

        setLoading(false);
      }
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy" />
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>
          Entre no <strong>Buggy</strong>
        </h1>
        <p>GERENCIE SEU TIME</p>

        <Input icon={FiMail} name="email" placeholder="Insira seu e-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Insira sua senha"
        />

        <Link to="/forgot-password">Esqueci minha senha</Link>

        <Button type="submit" loading={loading}>
          Entrar agora
        </Button>

        <Link to="/register">
          Não tem uma conta? <span>Crie agora</span>
        </Link>
      </Form>

      <a href="https://github.com/brunodmsi">Desenvolvido por Bruno De Masi</a>
    </Container>
  );
};

export default Login;
