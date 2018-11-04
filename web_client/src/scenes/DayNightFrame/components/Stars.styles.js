import styled from '@emotion/styled/macro';
import withIsDaySundialConsumer from 'components/util/withIsDaySundialConsumer';
import Star from 'components/Star';

const NightStar = withIsDaySundialConsumer(styled(Star)`
  opacity: ${props => props.isDay ? '0' : '1'};
  transition: opacity 5s linear;
  height: 5%;
  position: fixed;
  z-index: -1;
`);

export const Star1 = styled(NightStar)`
  left: 2%;
  top: 5%;
`;

export const Star2 = styled(NightStar)`
  right: 0%;
  top: 8%;
`;

export const Star3 = styled(NightStar)`
  right: 25%;
  top: 15%;
`;

export const Star4 = styled(NightStar)`
  left: 20%;
  top: 30%;
`;

export const Star5 = styled(NightStar)`
  bottom: 30%;
  left: 30%;
`;

export const Star6 = styled(NightStar)`
  bottom: 25%;
  right: 5%;
`;

export const Star7 = styled(NightStar)`
  bottom: 2%;
  left: 5%;
`;

export const Star8 = styled(NightStar)`
  right: 20%;
  bottom: 5%;
`;
