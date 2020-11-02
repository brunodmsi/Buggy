import React from 'react';

import { Container } from './styles';

interface TagProps {
  name: string | undefined;
  backgroundColor: string;
}

const Tag: React.FC<TagProps> = ({ name, backgroundColor }) => (
  <Container backgroundColor={backgroundColor}>
    {name ? name?.toUpperCase() : 'ND'}
  </Container>
);

export default Tag;
