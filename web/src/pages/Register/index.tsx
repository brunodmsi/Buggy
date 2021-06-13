import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

import logoRoxa from '../../assets/logo_roxa.png';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signUp } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
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

        await signUp({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        history.push('/login');

        addToast({
          title: 'Cadastro realizado com sucesso',
          description: 'Você já pode entrar com sua conta no Buggy',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro no registro',
          description: 'Verifique seus dados',
          type: 'error',
        });
      }
    },
    [addToast, history, signUp],
  );

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy" />
      </header>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>
          Crie sua <strong>conta</strong>
        </h1>
        <p>COMECE GRATIS</p>

        <Input icon={FiUser} name="name" placeholder="Insira seu nome" />
        <Input icon={FiMail} name="email" placeholder="Insira seu e-mail" />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Insira sua senha"
        />

        <Button type="submit">Cadastrar</Button>

        <Link to="/login">
          Já tem uma conta? <span>Entre agora</span>
        </Link>
      </Form>

      <a href="https://github.com/brunodmsi">Desenvolvido por Bruno De Masi</a>
    </Container>
  );
};

export default Register;
