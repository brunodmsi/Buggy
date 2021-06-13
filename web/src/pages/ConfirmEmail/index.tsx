import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import logoRoxa from '../../assets/logo_roxa.png';
import api from '../../services/api';

const ConfirmEmail: React.FC = () => {
  const history = useHistory();
  const params = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);

  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  useEffect(() => {
    const token = params.token.split('=')[1];

    api
      .post('/users/confirm-email', {
        token,
      })
      .then(() => {
        user.active = true;
        updateUser(user);

        setLoading(false);
      })
      .catch(() => {
        addToast({
          title: 'Erro ao confirmar e-mail',
          description:
            'Ocorreu um erro ao confirmar o seu e-mail, tente novamente mais tarde.',
          type: 'error',
        });
      });
  }, [addToast, history, params, user, updateUser]);

  return (
    <Container>
      <header>
        <img src={logoRoxa} alt="Buggy" />
      </header>

      <div>
        <h1>
          {loading ? 'Verificando e-mail...' : 'E-mail verificado com sucesso!'}
        </h1>
        <Link to="/">
          <FiArrowLeft size={15} />
          Ir para a página inicial
        </Link>
      </div>
    </Container>
  );
};

export default ConfirmEmail;
