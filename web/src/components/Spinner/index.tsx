import React from 'react';

import { Container } from './styles';

interface ISpinnerProps {
  size?: number;
}

const Spinner: React.FC<ISpinnerProps> = ({ size }) => (
  <Container size={size}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </Container>
);

export default Spinner;
