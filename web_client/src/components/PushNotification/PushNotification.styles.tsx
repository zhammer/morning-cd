/** @jsx jsx */
import React, { Ref } from 'react';
import { jsx, css } from '@emotion/core';
import colors from '../../theme';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

jsx; // https://github.com/emotion-js/emotion/issues/1112

export const Container = React.forwardRef((props: React.HTMLAttributes<HTMLDivElement>, forwardRef: Ref<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <div
      ref={forwardRef}
      css={css`
        font-family: 'Amatic SC', cursive;
        font-size: .75rem;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 2em;
        color: ${isDay ? colors.darkGray : colors.white};
        background: ${isDay ? 'hsl(47, 100%, 99%, 90%)' : 'hsl(229, 89%, 4%, 85%)'};
        border-radius: .25em;
        width: 95%;
        margin: 0 auto .25em;
        padding: .5em .5em 2em;
        transition: color 5s linear,
                    background 5s linear;
      `}
      {...props}
    />
  );
});
