import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 370px;
  width: 370px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);

  span {
    font-size: 14px;
    margin-bottom: 20px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + div {
      margin-top: 6px;
    }

    p {
      font-weight: 800;
    }

    & + div {
      margin-bottom: 4px;
    }

    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;
