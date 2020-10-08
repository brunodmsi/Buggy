import React from 'react';
import { Form } from '@unform/web';

import { Container } from './styles';

import logoRoxa from '../../assets/logo_roxa.png';

const Login: React.FC = () => {

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy"/>
      </header>

      <Form onSubmit={() => {}}>
        <h1>Entre no <strong>Buggy</strong></h1>
        <p>GERENCIE SEU TIME</p>

        <input type="text" placeholder="Insira seu e-mail"/>
        <input type="text" placeholder="Insira sua senha"/>

        <a href="#">Esqueci minha senha</a>

        <button>Entrar agora</button>

        <a href="#">Não tem uma conta? <span>Crie agora</span></a>
      </Form>

      <a href="https://github.com/brunodmsi">Desenvolvido por Bruno De Masi</a>
    </Container>
  )
}

export default Login;