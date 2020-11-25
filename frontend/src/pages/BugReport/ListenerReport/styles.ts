import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 25px;
  font-size: 18px;

  h3 {
    margin-top: 0;
  }

  p {
    white-space: pre-line;
  }

  table {
    &,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    th {
      background-color: #e2e2e2;
    }

    td {
      background-color: #fff;
    }

    span {
      display: flex;
      padding: 5px;
      font-weight: 600;
      background-color: #e2e2e2;
      width: 100%;
    }

    .td-heading {
      background-color: #e2e2e2;
      border: none;
    }

    th,
    td {
      padding: 5px;
      text-align: left;
    }
  }
`;
