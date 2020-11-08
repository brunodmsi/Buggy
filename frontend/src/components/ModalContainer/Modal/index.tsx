import React from 'react';

import { Container, Content } from './styles';

const Modal: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  style,
}) => (
  <Container style={style}>
    <Content className={className}>{children}</Content>
  </Container>
);

export default Modal;
