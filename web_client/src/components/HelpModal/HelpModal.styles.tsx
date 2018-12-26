import styled from '@emotion/styled/macro';
import { ModalBody as BootstrapModalBody } from 'reactstrap';
import colors from '../../theme';

type SundialProps = {
  isDay?: boolean;
}

export const ModalBody = styled(BootstrapModalBody)<SundialProps>`
  background: ${props => props.isDay ? colors.eggWhite : colors.deepTurquoise};
  transition: background 5s linear;
  border-radius: .25em;
`;

export const SectionTitle = styled.div<SundialProps>`
  color: ${props => props.isDay ? colors.darkGray : colors.white};
  transition: color 5s linear;
  text-align: center;
  font-family: 'Amatic SC', cursive;
`;

export const SectionBody = styled.div<SundialProps>`
  color: ${props => props.isDay ? colors.darkGray : colors.white};
  transition: color 5s linear;
  font-size: .5rem;
  line-height: 1.5em;
  font-family: 'Open Sans Condensed', sans-serif;

  & + ${SectionTitle} {
      margin-top: .5em;
  }

  & > a {
      color: ${colors.teal};
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: .75em;
`;

export const SectionDivider = styled.hr<SundialProps>`
  border-color: ${props => props.isDay ? 'default' : colors.yellow};
  opacity: .5;
  transition: border-color 5s linear;
  margin: .5rem 0 .3rem;
`;