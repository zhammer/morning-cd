import styled from '@emotion/styled/macro';
import colors from 'theme';
import withIsDaySundialConsumer from 'components/util/withIsDaySundialConsumer';

const nightBackgroundColor = `linear-gradient(${colors.obsidian}, ${colors.deepTurquoise})`;
const dayBackgroundColor = colors.eggWhite;

// as far as i know, you can't smoothly transition between a solid background (day background) and
// a gradient background (night background) so for now `NightBackdrop` is a separate background layer
// on top of day backdrop where opacity is toggled for day vs. night.
const Backdrop = styled('div')`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: -3;
`;

export const DayBackdrop = styled(Backdrop)`
  background: ${dayBackgroundColor};
`;

export const NightBackdrop = withIsDaySundialConsumer(styled(Backdrop)`
  background: ${nightBackgroundColor};
  opacity: ${props => props.isDay ? '0' : '1'};
  transition: opacity 5s linear;4
  z-index: -2;
`);

export const SunContainer = withIsDaySundialConsumer(styled('div')`
  position: fixed;
  width: 100%;
  bottom: -50vw;
  transform: ${props => props.isDay ? '' : 'translateY(50vw)'};
  transition: transform 5s linear;
  z-index: -1;
`);
