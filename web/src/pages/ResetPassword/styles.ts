import styled from 'styled-components';
import { shade } from 'polished';

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
    width: 100%;
    min-width: 250px;

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

    a {
      margin-top: 20px;
      color: #b9b9b9;
      font-size: 15px;
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s;

      span {
        color: #5f30e2;
      }

      &:hover {
        color: ${shade(0.05, '#5F30E2')};
      }
    }
  }

  @media (max-width: 450px) {
    padding: 50px;
  }
`;
