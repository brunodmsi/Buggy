import styled from 'styled-components';

interface ContainerProps {
  size?: number;
}

export const Container = styled.div<ContainerProps>`
  /* ${props => (props.size ? `${props.size}px` : '40px')}; */
  width: ${props => (props.size ? `${props.size}px` : '40px')};
  height: ${props => (props.size ? `${props.size}px` : '40px')};
  position: relative;
  animation: chase 2.5s infinite linear both;

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: chase-dot 2s infinite ease-in-out both;
  }

  div:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: chase-dot-before 2s infinite ease-in-out both;
  }

  div:nth-child(1) {
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    animation-delay: -1s;
  }
  div:nth-child(3) {
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    animation-delay: -0.6s;
  }
  div:nth-child(1):before {
    animation-delay: -1.1s;
  }
  div:nth-child(2):before {
    animation-delay: -1s;
  }
  div:nth-child(3):before {
    animation-delay: -0.9s;
  }
  div:nth-child(4):before {
    animation-delay: -0.8s;
  }
  div:nth-child(5):before {
    animation-delay: -0.7s;
  }
  div:nth-child(6):before {
    animation-delay: -0.6s;
  }

  @keyframes chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;
