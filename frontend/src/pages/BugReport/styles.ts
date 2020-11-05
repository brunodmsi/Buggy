import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  width: 100%;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;

  > header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    gap: 20px;

    button {
      border: 0;
      background: none;
    }
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
