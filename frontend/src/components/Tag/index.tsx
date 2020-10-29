import React from 'react';

import { Container } from './styles';

interface TagProps {
  name: string;
  backgroundColor: string;
}

const Tag: React.FC<TagProps> = ({ name, backgroundColor }) => (
  <Container backgroundColor={backgroundColor}>{name.toUpperCase()}</Container>
);

export default Tag;
