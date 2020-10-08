import styled from 'styled-components';
import { shade, darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 80px;
  width: 100%;

  img {
    width: 60px;
  }

  a {
    color: #999999;
    font-size: 14px;
    text-decoration: none;
  }

  form {
    display: flex;
    flex-direction: column;

    place-content: center;

    p {
      font-size: 13px;
      font-weight: 700;
      color: #707070;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 40px;
      font-weight: 400;
    }

    input {
      flex: 1;
      padding: 15px;
      height: 50px;
      border: 1px solid #b9b9b9;
      border-radius: 5px;

      &::placeholder {
        color: #b9b9b9;
      }

      & + input {
        margin-top: 15px;
      }
    }

    button {
      margin-top: 25px;
      padding: 15px;
      height: 55px;
      background-color: #5F30E2;
      color: #fff;
      border: 0;
      border-radius: 5px;
      font-weight: 500;
      font-size: 17px;
      transition: background .2s;

      &:hover {
        background-color: ${darken(0.05, '#5F30E2')};
      }
    }

    a {
      margin-top: 20px;
      color: #b9b9b9;
      font-size: 15px;
      cursor: pointer;
      text-decoration: none;
      transition: color .2s;

      span {
        color: #5F30E2;
      }

      &:hover {
        color: ${shade(0.05, '#5F30E2')};
      }
    }
  }
`;