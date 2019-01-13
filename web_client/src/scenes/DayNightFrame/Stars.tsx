/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import { NightStar } from './Stars.styles';

jsx; // https://github.com/emotion-js/emotion/issues/1112

function Stars() {
  return (
    <div>
      <NightStar
        css={css`
          left: 2%;
          top: 5%;
        `}
      />
      <NightStar
        css={css`
          right: 0%;
          top: 8%;
        `}
      />
      <NightStar
        dim={true}
        css={css`
          right: 25%;
          top: 15%;
        `}
      />
      <NightStar
        dim={true}
        css={css`
          left: 20%;
          top: 30%;
        `}
      />
      <NightStar
        dim={true}
        css={css`
          bottom: 30%;
          left: 30%;
        `}
      />
      <NightStar
        css={css`
          bottom: 25%;
          right: 5%;
        `}
      />
      <NightStar
        css={css`
          bottom: 2%;
          left: 5%;
        `}
      />
      <NightStar
        css={css`
          right: 20%;
          bottom: 5%;
        `}
      />
    </div>
  );
}

export default Stars;
