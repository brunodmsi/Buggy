import React from 'react';

import { Container } from './styles';

interface TagProps {
  name: string | number | undefined;
  backgroundColor: string | undefined;
}

const Tag: React.FC<TagProps> = ({ name, backgroundColor }) => (
  <Container backgroundColor={backgroundColor}>
    {name ? name?.toString().toUpperCase() : 'ND'}
  </Container>
);

export default Tag;
