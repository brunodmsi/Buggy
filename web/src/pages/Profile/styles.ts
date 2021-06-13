import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    align-items: center;

    button {
      background: none;
      border: none;
    }

    h1 {
      font-size: 40px;
      font-weight: 800;
      margin-left: 5px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 340px;
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #5f30e2;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: ${shade(0.2, '#5f30e2')};
    }
  }
`;
