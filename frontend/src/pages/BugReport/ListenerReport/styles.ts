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
    display: table;
    /* padding: 10px; */
    border-spacing: 0;
    border-style: hidden;
    border: 3px solid #5f30e2;
    background-color: #e2e2e2;
    border-radius: 5px;

    tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    tr:first-child {
      th,
      td {
        border-top: none;
      }
    }

    th,
    td {
      display: table-cell;
      border-collapse: collapse;
    }

    th,
    td {
      border-top: 1px solid #5f30e2;
    }

    th {
      font-weight: bold;
      background-color: #e2e2e2;
    }

    td {
      background-color: #fff;
    }

    .td-heading {
      background-color: #e2e2e2;
      border-top: 1px solid #5f30e2;
    }

    th,
    td {
      padding: 10px;
      text-align: left;
    }
  }
`;
