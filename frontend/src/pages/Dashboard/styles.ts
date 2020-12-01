import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 50px;
  }
`;
