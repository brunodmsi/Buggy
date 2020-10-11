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

  ${(props) => 
    props.isErrored && 
    css`
      border-color: #c53030;
    `
  }

  ${(props) => 
    props.isFocused && 
    css`
      color: #5F30E2; 
      border-color: #5F30E2;
    `
  }

  ${(props) => 
    props.isFilled && 
    css`
      color: #5F30E2;
    `
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: #232129;
    border: 1px;

    &::placeholder {
      color: #b9b9b9;
    }
  }

  svg {
    margin-right: 8px;
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
      border-color: #c53030 transparent
    }
  }
`;