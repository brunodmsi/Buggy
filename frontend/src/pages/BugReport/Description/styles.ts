import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 25px;
  font-size: 18px;

  span {
    font-size: 12px;
  }

  p {
    white-space: pre-line;
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
        margin-bottom: 25px;

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
