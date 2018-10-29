import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import colors from 'theme';
import App from './App';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Amatic SC', cursive;
  }
  :root {
    font-size: 2rem;
    @media (min-width: 35em) {
      font-size: 3rem;
    }
  }
  input {
    outline-color: ${colors.lightTeal};
  }
`;

const AppWithGlobalStyles = () => (
  <>
    <Global styles={globalStyles} />
    <App />
  </>
);


ReactDOM.render(<AppWithGlobalStyles />, document.getElementById('root'));
