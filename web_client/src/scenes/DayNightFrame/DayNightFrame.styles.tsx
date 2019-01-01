import styled from '@emotion/styled/macro';
import colors from '../../theme';

const nightBackgroundColor = `linear-gradient(${colors.obsidian}, ${colors.deepTurquoise})`;
const dayBackgroundColor = colors.eggWhite;

interface SundialProps {
  isDay?: boolean;
}

// as far as i know, you can't smoothly transition between a solid background (day background) and
// a gradient background (night background) so for now `NightBackdrop` is a separate background layer
// on top of day backdrop where opacity is toggled for day vs. night.
const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: -3;
`;

export const DayBackdrop = styled(Backdrop)`
  background: ${dayBackgroundColor};
`;

export const NightBackdrop = styled(Backdrop)<SundialProps>`
  background: ${nightBackgroundColor};
  opacity: ${props => props.isDay ? '0' : '1'};
  transition: opacity 5s linear;
  z-index: -2;
`;

export const SunContainer = styled.div<SundialProps>`
  position: fixed;
  width: 100%;
  bottom: -50vw;
  transform: ${props => props.isDay ? '' : 'translateY(50vw)'};
  transition: transform 5s linear;
  z-index: -1;
`;
