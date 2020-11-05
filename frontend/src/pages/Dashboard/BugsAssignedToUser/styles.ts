import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 370px;
  width: 370px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);

  table {
    display: inline-block;
    max-height: 80%;
    margin-top: 20px;
    border-spacing: 0;
    border-style: hidden;
    width: 100%;

    tr {
      display: flex;
      align-items: center;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 20px;

      td img {
        display: flex;
        justify-content: center;
        align-items: center;
        max-height: 60px;
        max-width: 60px;
        color: #fff;
        font-size: 14px;
        margin-right: 5px;
      }

      .td-file-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        a {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          max-width: 650px;
          text-decoration: none;
          font-size: 14px;
          margin: 0 5px 0 5px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;
