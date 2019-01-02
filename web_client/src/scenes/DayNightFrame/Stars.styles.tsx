import styled from '@emotion/styled/macro';
import Star from '../../components/Star';

interface StarProps {
  dim?: boolean;
  isDay: boolean;
}

// Not sure how to actually update the typing of props sent to child.
function shouldForwardProp(prop: string) {
  return prop !== 'isDay' && prop !== 'dim';
}

const NightStar = styled(Star, { shouldForwardProp })<StarProps>`
  opacity: ${props => props.isDay ? '0' : props.dim ? '.25' : '1'};
  transition: opacity 5s linear;
  height: 5%;
  position: fixed;
  z-index: -1;
`;

export const Star1 = styled(NightStar, { shouldForwardProp })`
  left: 2%;
  top: 5%;
`;

export const Star2 = styled(NightStar, { shouldForwardProp })`
  right: 0%;
  top: 8%;
`;

export const Star3 = styled(NightStar, { shouldForwardProp })`
  right: 25%;
  top: 15%;
`;

export const Star4 = styled(NightStar, { shouldForwardProp })`
  left: 20%;
  top: 30%;
`;

export const Star5 = styled(NightStar, { shouldForwardProp })`
  bottom: 30%;
  left: 30%;
`;

export const Star6 = styled(NightStar, { shouldForwardProp })`
  bottom: 25%;
  right: 5%;
`;

export const Star7 = styled(NightStar, { shouldForwardProp })`
  bottom: 2%;
  left: 5%;
`;

export const Star8 = styled(NightStar, { shouldForwardProp })`
  right: 20%;
  bottom: 5%;
`;
