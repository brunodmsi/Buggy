import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 50px;
  top: 200px;

  margin-left: 10rem;

  p {
    font-size: 16px;
    font-weight: 700;
  }

  > button {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #e5ecf8;
    border: 0;
    border-radius: 5px;
    color: #2a60e4;
    font-weight: 900;
    font-size: 20px;
    max-width: 235px;

    & + button {
      margin-top: 8px;
    }

    svg {
      margin-right: 10px;
    }
  }

  .bottom {
    background-color: #ff3333;
    color: #fff;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
  }

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    left: -30px;
    width: 1px;
    height: 350px;
    background-color: #707070;
  }
`;

export const File = styled.div``;
