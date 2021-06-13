import React, { useState, useCallback } from 'react';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import { Container, Content, ConfirmEmail } from './styles';

import Sidebar from '../Sidebar';

const Default: React.FC = ({ children }) => {
  const [loadSendMail, setLoadSendMail] = useState(false);

  const { addToast } = useToast();
  const { user } = useAuth();

  const handleResendConfirmMail = useCallback(async () => {
    try {
      setLoadSendMail(true);

      await api.post('/users/resend-confirm-email');

      addToast({
        title: 'Verifique seu e-mail',
        description:
          'Caso não esteja na caixa de entrada, verifique o Lixo Eletrônico',
        type: 'success',
      });

      setLoadSendMail(false);
    } catch (err) {
      addToast({
        title: 'Erro ao reenviar',
        description: 'Tente novamente mais tarde',
        type: 'error',
      });

      setLoadSendMail(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Sidebar />

      <Content>
        {!user.active && (
          <ConfirmEmail>
            Foi enviado um e-mail para você confirmar sua conta.
            <button type="button" onClick={handleResendConfirmMail}>
              {loadSendMail ? 'Carregando...' : 'Reenviar'}
            </button>
          </ConfirmEmail>
        )}

        {children}
      </Content>
    </Container>
  );
};

export default Default;
