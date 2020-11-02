import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 5px;
  border: 1px solid #b9b9b9;
  padding: 15px;
  width: 100%;
  color: #b9b9b9;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #5f30e2;
      border-color: #5f30e2;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #5f30e2;
    `}

  textarea {
    flex: 1;
    border: none;
    background: transparent;
    height: 200px;
    font-size: 16px;

    &::placeholder {
      color: #b9b9b9;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
