import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import colors from 'theme';
import App from './App';

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Amatic SC', cursive;
    background: ${colors.eggWhite};
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


ReactDOM.render(<App />, document.getElementById('root'));
