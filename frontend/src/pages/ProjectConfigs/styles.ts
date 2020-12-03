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
    width: fit-content;
    flex-direction: row;
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
      margin-left: 10px;
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
    display: table;
    padding: 10px;
    border-spacing: 0;
    border-style: hidden;

    tr {
      display: table-row;
      vertical-align: center;
      border-color: inherit;

      td img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      th,
      td {
        display: table-cell;
        border-collapse: collapse;
        padding: 5px;
        margin: 0 auto;
        text-align: left;
      }

      .bugs-assigned {
        text-align: center;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;
