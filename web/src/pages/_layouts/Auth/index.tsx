import React from 'react';

import { Container, Content, SideContent } from './styles';

const Auth: React.FC = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>

      <SideContent>
        <div>
          <h1>Gerencie os bugs da sua aplicação.</h1>
          <h2>Comece hoje.</h2>
          <button type="button">Conheça mais</button>
        </div>
      </SideContent>
    </Container>
  );
};

export default Auth;
