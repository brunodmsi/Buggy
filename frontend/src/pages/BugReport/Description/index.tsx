import React from 'react';

import { Container } from './styles';

interface DescriptionProps {
  description: string;
  bugId: string;
}

const Description: React.FC<DescriptionProps> = ({ bugId, description }) => {
  return (
    <Container>
      <h2>Descrição</h2>

      <p>{description}</p>
    </Container>
  );
};

export default Description;
