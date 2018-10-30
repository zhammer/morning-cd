import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import { isMobile } from 'react-device-detect';
import ClearButtonSvg from 'components/ClearButtonSvg';
import SongTile from 'components/SongTile';
import Sun from 'components/Sun';
import colors from 'theme';

export const SongInput = styled('input')`
  width: 70%;
  margin: .5em auto .25em;
  padding-left: .5em;
  padding-right: .5em;
  font-family: inherit;
  font-size: 1rem;
  color: ${colors.darkGray};
`;

export const Song = styled(SongTile)`
  width: 70%;
  margin: 0 auto;
  padding: .25em;
  border-radius: .1em;
  transition: background .5s linear;

  &:hover {
    background: white;
    cursor: pointer;
  }
`;

// TODO: figure out a less hacky width. maybe it's the scaling option on the svg?
// or the different input component on my phone?
export const RightAbsolute = styled('div')`
  position: absolute;
  width: ${isMobile ? '1.5em' : '1em'};
  top: .7em;
  right: 16%;
`;

const spinning = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const SpinningSun = styled(Sun)`
  animation: ${spinning} 5s linear infinite;
`;

export const ClearButton = styled(ClearButtonSvg)`
  transform: scale(.8);
  cursor: pointer;
`;
