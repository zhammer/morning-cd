/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import colors from '../../theme';
import AddToHomescreenIconIOSSvg from './AddToHomescreenIconIOS.svg';
import ShareIconIOSSvg from './ShareIconIOS.svg';
import { SectionBody, SectionTitle } from '../../components/Modal';
import { isMobileSafari } from 'react-device-detect';

jsx; // https://github.com/emotion-js/emotion/issues/1112

const AddToHomescreenIconIOS = () => (
  <AddToHomescreenIconIOSSvg
    css={css`
      width: 1em;
      background: hsl(60,4%,38%);
      border: .11em solid hsl(54,100%,96%);
      transform: scale(.75) translateY(-.1em);
      border-radius: .25em;
      stroke: hsl(54,100%,96%);
    `}
  />
);

const ShareIconIOS = () => (
  <ShareIconIOSSvg
    css={css`
      height: 1em;
      background: ${colors.white};
      border-radius: .25em;
      fill: ${colors.lightGray};
      transform: translateY(-.1em);
    `}
  />
)

export const AddToHomescreenSection = () => (
  <>
    <SectionTitle>📲 Add to Homescreen 📲</SectionTitle>
    <SectionBody>
      {!isMobileSafari && <span>- Open morning cd on safari<br/></span>}
      - Click the <ShareIconIOS /> icon at the bottom of the browser<br/>
      - Select '<AddToHomescreenIconIOS/> Add to Home Screen'<br/>
      <i>[Check out the <a target='_blank' href='https://www.instagram.com/p/Bs1dzHQHBrc/'>
    instruction video</a> for help!]</i>
    </SectionBody>
  </>
);
