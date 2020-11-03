import styled from 'styled-components';
import MockInput from '../../../components/Input';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 800;

  img {
    object-fit: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    form {
      display: flex;
      align-items: center;

      button {
        margin-top: 0;
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;

    > div {
      max-width: 600px;

      & + div {
        margin-top: 15px;
      }

      > p {
        font-size: 18px;
        font-weight: 400;
        background-color: #fff;
        border: 1px solid #d5d5d5;
        padding: 5px 15px;
        border-radius: 10px;
        margin-left: 35px;
        width: 100%;
      }

      header {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        justify-content: space-between;

        div {
          display: flex;
          align-items: center;
        }

        p {
          font-size: 18px;
          font-weight: 400;
        }

        button {
          display: flex;
          border: 0;
          background: 0;
          color: #fff;
          background-color: #c53030;
          align-items: center;
          margin-left: 15px;
          padding: 2px;
          border-radius: 5px;
        }
      }
    }
  }
`;

export const Input = styled(MockInput)`
  width: 400px;
`;
