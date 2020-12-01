import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 500px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);

  table {
    display: table;
    padding: 10px;
    border-spacing: 0;
    border-style: hidden;

    tr {
      display: table-row;
      vertical-align: bottom;
      border-color: inherit;
    }

    th,
    td {
      display: table-cell;
      border-collapse: collapse;
      padding: 5px;
      text-align: left;
    }

    td img {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 40px;
      max-width: 40px;
      color: #fff;
      font-size: 14px;
      margin-right: 5px;
    }

    td {
      border: 1px solid black;
    }
    tr:first-child td {
      border-top: 0;
    }
    tr td:first-child {
      border-left: 0;
    }
    tr:last-child td {
      border-bottom: 0;
    }
    tr td:last-child {
      border-right: 0;
    }
  }
`;
