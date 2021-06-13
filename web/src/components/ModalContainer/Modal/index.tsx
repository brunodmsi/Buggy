import React from 'react';
import { SpringValue } from 'react-spring';

import { Container, Content } from './styles';

interface ModalProps {
  className: string | undefined;
  style: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

const Modal: React.FC<ModalProps> = ({ children, className, style }) => (
  <Container style={style}>
    <Content className={className}>{children}</Content>
  </Container>
);

export default Modal;
