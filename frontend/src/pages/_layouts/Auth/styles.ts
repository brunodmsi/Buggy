import styled from 'styled-components';

import backgroundImage from '../../../assets/background.jpg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 600px;
`;

export const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;

  background-color: #5F30E2;
  h1, h2 { color: #fff; }
  
  place-content: center;
  justify-content: center;
  align-items: center;
  opacity: 0.99;

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 30px;
  }

  div {
    max-width: 400px;

    h1, h2 {
      text-shadow: 2px 5px rgba(0, 0, 0, 0.2);
    }

    button {
      box-shadow: 2px 5px rgba(0, 0, 0, 0.2);
    }
  }

  button {
    padding: 15px;
    background-color: #fff;
    border: 0;
    border-radius: 5px;
    color: #5751FF;
    font-weight: 700;
    margin-top: 20px;
  }

  &::after {
    content: "";
    background: url(${backgroundImage});
    background-size: cover;
    opacity: 0.1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: -1;
  }
`;