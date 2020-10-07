import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #fefefe;
    color: #141414;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6, p {
    color: #27334D;
  }

  body, input, button {
    font-family: 'Heebo', serif;
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;
