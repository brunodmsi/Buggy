import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 35px 0;
`;
