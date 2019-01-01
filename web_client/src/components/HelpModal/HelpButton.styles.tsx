import styled from '@emotion/styled';
import CircleSvg from './Circle.svg';
import colors from '../../theme';

interface IsDayProps {
  isDay: boolean;
}

export const Container = styled.div<IsDayProps>`
  position: fixed;
  height: 2.5em;
  width: 2.5em;
  right: .5em;
  bottom: .5em;
  opacity: .5;
  cursor: pointer;
  color: ${props => props.isDay ? colors.mediumGray : colors.lightGray};
  fill: ${props => props.isDay ? colors.mediumGray : colors.lightGray};
  transition: color 5s linear, fill 5s linear, opacity .5s linear;

  &:hover {
    opacity: 1;
  }
`;


export const Circle = styled(CircleSvg)`
`;

export const Text = styled.div`
  user-select: none;
  font-size: 3rem;
  position: fixed;
  right: .45em;
  bottom: .57em;
  cursor: pointer;
  transform: scaleY(.55);
  line-height: 0;
`;
