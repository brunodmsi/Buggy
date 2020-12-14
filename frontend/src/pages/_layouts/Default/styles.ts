import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #fafaff;
  margin-left: 200px;

  padding: 40px;
`;

export const ConfirmEmail = styled.div`
  display: flex;
  background-color: #d5b60a;
  padding: 10px;
  margin-bottom: 10px;
  justify-content: space-between;

  button {
    padding: 4px;
    border: 0;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);
  }
`;
