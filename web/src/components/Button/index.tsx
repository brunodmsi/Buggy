import React, { ButtonHTMLAttributes } from 'react';

import Spinner from '../Spinner';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  spinnerSize?: number;
  backgroundColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  backgroundColor,
  spinnerSize,
  ...rest
}) => (
  <Container type="button" backgroundColor={backgroundColor} {...rest}>
    {loading ? <Spinner size={spinnerSize} /> : children}
  </Container>
);

export default Button;
