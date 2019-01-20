/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import colors from '../../theme';
import ShareIconIOS from './ShareIconIOS.svg';
import { SectionBody, SectionTitle } from '../../components/Modal';

jsx; // https://github.com/emotion-js/emotion/issues/1112

export const AddToHomescreenSection = () => (
  <>
    <SectionTitle>📲 Add to Homescreen 📲</SectionTitle>
    <SectionBody>
      Open morning cd on safari, click{' '}
      <ShareIconIOS css={css`
        height: 1em;
        background: ${colors.white};
        border-radius: .25em;
        fill: ${colors.lightGray};
        transform: translateY(-.1em);
      `} />
      {' '}and select 'Add to Home Screen'. (Check out the{' '}
      <a target='_blank' href='https://www.instagram.com/p/Bs1dzHQHBrc/'>
        instruction video
        </a> for help!)
    </SectionBody>
  </>
);
