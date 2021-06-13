import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;

export const NoProjects = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const OpenNewProjectModalButton = styled.button`
  max-width: 300px;
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
`;

export const ShowProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  a {
    display: flex;
    background-color: #fff;
    align-items: center;
    padding: 15px;
    font-size: 25px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);

    img {
      width: 40px;
      margin-right: 20px;
    }
  }
`;
