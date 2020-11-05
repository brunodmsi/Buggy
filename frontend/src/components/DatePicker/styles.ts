import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  font-size: 20px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: transparent;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  border: 0;

  color: #707070;

  .react-datepicker-wrapper {
    width: 100%;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #516efa;
      box-shadow: 0px 0px 5px 3px rgba(81, 110, 250, 1);
    `}

  ${props =>
    props.isErrored &&
    css`
      box-shadow: 0px 0px 5px 1px rgba(197, 48, 48, 1);
    `};

  ${props =>
    props.isFilled &&
    css`
      color: #516efa;
    `}
`;

export const ReactDatePicker = styled(DatePicker)`
  width: 100%;
  border: 0;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  background-color: transparent;
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
