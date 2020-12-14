import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
  width: 100%;

  img {
    width: 60px;
  }

  a {
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 14px;
    text-decoration: none;

    svg {
      margin-right: 5px;
    }
  }

  @media (max-width: 450px) {
    padding: 50px;
  }
`;
