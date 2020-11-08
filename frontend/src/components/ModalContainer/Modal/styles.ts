import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  z-index: 400;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  padding: 10px;
  /* background-color: rgba(255, 255, 255, 0.5); */
  border-radius: 10px;
`;

export const Content = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 40px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
`;
