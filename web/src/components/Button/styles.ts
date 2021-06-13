import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ButtonProps {
  backgroundColor?: string;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 15px;
  height: 55px;
  background-color: #5f30e2;
  color: #fff;
  border: 0;
  border-radius: 5px;
  font-weight: 500;
  font-size: 17px;
  transition: background 0.2s;

  &:hover {
    background-color: ${darken(0.05, '#5F30E2')};
  }

  ${props =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};

      &:hover {
        background-color: ${darken(0.05, props.backgroundColor)};
      }
    `}
`;
