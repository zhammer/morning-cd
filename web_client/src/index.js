import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/core';
import colors from 'theme';
import App from './App';
import * as Sentry from '@sentry/browser';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://2e20f00fde4a48c7bf36cd7cabac511c@sentry.io/1362113' });
}

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
