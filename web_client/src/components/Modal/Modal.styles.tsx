/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ModalBody as BootstrapModalBody } from 'reactstrap';
import colors from '../../theme';
import useIsDaySundialConsumer from '../../util/useIsDaySundialConsumer';

jsx; // https://github.com/emotion-js/emotion/issues/1112

export const ModalBody = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <BootstrapModalBody
      css={css`
        background: ${isDay ? colors.eggWhite : colors.deepTurquoise};
        transition: background 5s linear;
        border-radius: .25em;
      `}
      {...props}
      />
  );
}

export const SectionTitle = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <div
      css={css`
        color: ${isDay ? colors.darkGray : colors.white};
        transition: color 5s linear;
        text-align: center;
        font-family: 'Amatic SC', cursive;
      `}
      {...props}
      />
  );
}

export const SectionBody = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <div
      css={css`
        color: ${isDay ? colors.darkGray : colors.white};
        transition: color 5s linear;
        font-size: .5rem;
        line-height: 1.5em;
        font-family: 'Open Sans Condensed', sans-serif;

        & a {
          color: ${colors.teal};
        }
      `}
      {...props}
      />
  );
}

export const SectionDivider = (props: React.HTMLAttributes<HTMLHRElement>) => {
  const isDay = useIsDaySundialConsumer();
  return (
    <hr
      css={css`
        border-color: ${isDay ? 'default' : colors.yellow};
        opacity: .5;
        transition: border-color 5s linear;
        margin: .5rem 0 .3rem;
      `}
      {...props}
      />
  );
}
