import React from 'react';

import { Container, Content } from './styles';

import Sidebar from '../Sidebar';

const Default: React.FC = ({ children }) => (
  <Container>    
    <Sidebar />

    <Content>
      {children}
    </Content>
  </Container>
)

export default Default;