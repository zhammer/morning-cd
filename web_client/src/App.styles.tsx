import { css } from '@emotion/core';
import colors from './theme';

export const globalStyles = css`
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