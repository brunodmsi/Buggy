import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;

    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      font-size: 14px;
      background-color: #5f30e2;
      color: #fff;
      border-radius: 5px;
      border: none;
      margin-right: 50px;
      text-decoration: none;
    }

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
