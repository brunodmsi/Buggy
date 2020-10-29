import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const NoProjects = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  button {
    height: 44px;
    background-color: #5f30e2;
    color: #fff;
    padding: 10px;
    border: 0;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
    transition: background 0.2s;

    &:hover {
      background-color: ${darken(0.1, '#5F30E2')};
    }
  }
`;
