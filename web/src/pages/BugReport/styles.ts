import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  width: 100%;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    gap: 20px;

    button {
      border: 0;
      background: none;
    }
  }

  > p {
    margin-bottom: 25px;
  }

  > section {
    display: flex;
    font-size: 20px;
    font-weight: 800;

    div + div {
      margin-left: 20px;
    }
  }

  > p {
    font-size: 30px;
    font-weight: 300;
  }
`;
