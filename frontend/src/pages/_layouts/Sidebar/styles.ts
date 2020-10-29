import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.nav`
  display: flex;
  height: 100vh;
  width: 200px;
  position: fixed;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  margin-right: 200px;
  justify-content: space-between;
  z-index: 1;
  overflow: hidden;

  background-color: #fff;
  flex-direction: column;
  color: #fefefe;

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;

    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    p {
      font-size: 24px;
      font-weight: 600;
    }
  }

  section {
    margin-top: 50px;

    a {
      display: flex;
      align-items: center;
      padding: 6px 0;
      position: relative;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background-color: ${shade(0.15, '#5F30E2')};

        svg,
        p {
          color: #fff;
        }

        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          left: 4px;
          width: 2px;
          height: 20px;
          background-color: #ffffff;
        }
      }

      p {
        font-weight: 500;
      }

      svg {
        /* background-color: #fefefe; */
        color: #5f30e2;
        border-radius: 4px;
        margin-left: 20px;
        margin-right: 10px;
      }
    }
  }

  footer {
    display: flex;
    margin-bottom: 40px;
    padding: 20px;
    justify-content: center;

    button {
      width: 100%;
      background-color: #ff3333;
      color: #fff;
      border: 0;
      border-radius: 5px;
    }
  }
`;
