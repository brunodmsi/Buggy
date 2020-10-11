import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  margin-top: 25px;
  padding: 15px;
  height: 55px;
  background-color: #5F30E2;
  color: #fff;
  border: 0;
  border-radius: 5px;
  font-weight: 500;
  font-size: 17px;
  transition: background .2s;

  &:hover {
    background-color: ${darken(0.05, '#5F30E2')};
  }
`;
