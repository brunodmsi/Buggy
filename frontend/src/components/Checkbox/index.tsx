import React from 'react';

import { Container } from './styles';

const Checkbox: React.FC = () => (
  <Container>
    <input type="checkbox" />

    <svg viewBox="0 0 21 21">
      <polyline points="5 10.75 8.5 14.25 16 6" />
    </svg>
  </Container>
);

export default Checkbox;
