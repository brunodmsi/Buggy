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
      vertical-align: left;
      max-height: 40px;
      max-width: 40px;
      margin: 0 auto;
      color: #fff;
    }
  }
`;
