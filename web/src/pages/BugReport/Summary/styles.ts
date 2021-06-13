import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 15px;
  font-size: 18px;

  span {
    font-size: 12px;
    margin-bottom: 5px;
    margin-top: 0px;
  }

  p {
    font-size: 30px;
    font-weight: 300;
  }

  form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      width: 100%;

      button {
        padding: 10px 11px;
        font-size: 14px;
        height: 40px;
        margin-top: 5px;

        &.cancel-button {
          background-color: #c53030;
        }

        & + button {
          margin-left: 5px;
        }
      }
    }
  }
`;
