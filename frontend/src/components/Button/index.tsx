import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  backgroundColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  backgroundColor,
  ...rest
}) => (
  <Container type="button" backgroundColor={backgroundColor} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
