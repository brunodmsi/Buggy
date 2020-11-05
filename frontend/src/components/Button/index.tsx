import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';

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
    {loading ? <Spinner /> : children}
  </Container>
);

export default Button;
