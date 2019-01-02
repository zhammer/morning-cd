import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import { isMobile } from 'react-device-detect';
import ClearButtonSvg from '../../components/ClearButtonSvg';
import SongTile from '../../components/SongTile';
import Sun from '../../components/Sun';
import colors from '../../theme';

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SongInputContainer = styled.div`
  width: 70%;
  margin: .5em auto;
  position: relative;
`;

export const SongInput = styled.input`
  width: 100%;
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

// Some tinkering on `top` here as I'm having issues vertically centering.
export const RightAbsolute = styled.div`
  position: absolute;
  width: ${isMobile ? '1.5em' : '1em'};
  top: ${isMobile ? '13.5%' : '3.5%'};
  right: 1.5%;
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