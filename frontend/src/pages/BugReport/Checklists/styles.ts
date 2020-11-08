import styled from 'styled-components';
import { darken } from 'polished';

import InputComponent from '../../../components/Input';
import CheckboxComponent from '../../../components/Checkbox';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  margin-bottom: 25px;
  font-size: 18px;
`;

export const ShowChecklist = styled.div`
  span {
    font-size: 14px;
  }

  button {
    margin-top: 5px;
    background-color: rgba(46, 49, 49, 0.2);
    padding: 8px 10px;
    font-size: 14px;
    height: 40px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.05, 'rgba(46, 49, 49, 0.4)')};
    }
  }

  .saveNewItem {
    background-color: #66cc00;
    color: #fff;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.05, '#66cc00')};
    }
  }

  .cancelNewItem {
    background-color: #c53030;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${darken(0.05, '#c53030')};
    }
  }

  .newItemOptions {
    display: flex;
    flex-direction: row;

    button + button {
      margin-left: 5px;
    }
  }
`;

export const Input = styled(InputComponent)`
  padding: 8px;
  max-width: 40%;
`;

export const Checkbox = styled(CheckboxComponent)`
  label {
    margin-left: 5px;
  }
`;
