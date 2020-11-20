import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  width: 100%;

  div {
    margin-top: 25px;
  }

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

export const Description = styled.div`
  h1 {
    font-size: 18px;
  }

  p {
    font-size: 20px;
  }
`;

export const ListenerKey = styled.div`
  div {
    margin-top: 0;
    display: flex;
    max-width: 360px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px;

    span {
      letter-spacing: 2px;
      font-size: 14px;
    }

    button {
      background: none;
      border: none;
    }
  }
`;

export const Members = styled.div`
  margin-top: 40px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      background-color: #5f30e2;
      border: none;
      border-radius: 5px;
      padding: 10px;
      font-size: 16px;
      color: #fff;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${darken(0.05, '#5f30e2')};
      }
    }
  }

  table {
    display: inline-block;
    max-height: 80%;
    width: 30%;
    margin-top: 20px;
    border-spacing: 0;
    border-style: hidden;

    tr {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20px;

      th {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      .td-dev-email {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      .td-dev-name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-left: 10px;
      }
    }
  }
`;
