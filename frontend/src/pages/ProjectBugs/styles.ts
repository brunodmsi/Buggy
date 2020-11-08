import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;

    section {
      display: flex;
      align-items: center;

      button {
        background: none;
        border: none;
      }

      h1 {
        font-size: 40px;
        font-weight: 800;
        margin-left: 5px;
      }
    }
  }
`;
