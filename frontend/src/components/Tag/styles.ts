import styled from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  backgroundColor?: string;
}

export const Container = styled.span<ContainerProps>`
  display: flex;
  height: 23px;
  justify-content: center;
  border-radius: 12px;
  width: fit-content;
  padding: 0 10px;
  font-size: 15px;
  font-weight: 900;
  background-color: ${props => props.backgroundColor};
  color: ${props => darken(0.5, props.backgroundColor || '')};
`;
