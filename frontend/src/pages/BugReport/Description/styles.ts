import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 25px;
  font-size: 18px;

  form {
    display: flex;
    flex-direction: column;

    > div {
      display: flex;
      width: 100%;
      justify-content: space-between;

      button {
        width: 150px;
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
