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

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;

      p {
        font-size: 14px;
      }

      svg {
        margin-right: 4px;
      }
    }
  }
`;
