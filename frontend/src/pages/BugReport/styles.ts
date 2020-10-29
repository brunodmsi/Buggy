import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;

    gap: 20px;
  }

  > p {
    margin-bottom: 25px;
  }

  > section {
    display: flex;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 25px;

    div + div {
      margin-left: 40px;
    }
  }

  > p {
    font-size: 30px;
    font-weight: 300;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin-left: 10rem;

  p {
    font-size: 16px;
    font-weight: 700;
  }

  button {
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

export const Developers = styled.div`
  display: flex;
  flex-direction: column;

  section {
    display: flex;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 4px;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e5ecf8;
      border: 0;
      background-color: #5f30e2;
      border-radius: 50%;
      height: 35px;
      width: 35px;

      svg {
        color: #fff;
      }
    }
  }
`;

export const LimitDate = styled.div`
  display: flex;
  flex-direction: column;

  section {
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
      font-weight: 400;
    }
  }
`;

export const Description = styled.div`
  margin-bottom: 25px;
  font-size: 18px;
`;

export const Files = styled.div`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 25px;

  img {
    height: 100px;

    & + img {
      margin-left: 5px;
    }
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 800;

  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    input {
      padding: 5px 15px;
      border-radius: 10px;
      width: 500px;
      border: 1px solid #d5d5d5;
    }
  }

  section {
    display: flex;
    flex-direction: column;

    div {
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
        width: 500px;
      }

      header {
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        p {
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
`;
