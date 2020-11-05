import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;

    div {
      display: flex;
      transition: background 0.2s;
      padding: 4px;
      border-radius: 5px;

      label {
        font-weight: 400;
        margin-left: 10px;
      }

      &:hover {
        background-color: rgb(205, 205, 205, 0.3);
      }
    }
  }
`;
