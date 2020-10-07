import React from 'react';

import { Container, Content } from './styles';

interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps & React.HTMLAttributes<HTMLDivElement>> = ({ 
  isOpen,
  children, 
  className 
}) => (
  <Container isOpen={isOpen}>
    <Content className={className}>
      {children}
    </Content>
  </Container>
)

export default Modal;