import styled from '@emotion/styled/macro';
import SongTile from 'components/SongTile';

export const Column = styled('div')`
  margin: .5em auto;
  width: 80%;
  @media (min-width: 35em) {
    width: 70%;
  }
`;

export const Song = styled(SongTile)`
  margin: .5rem auto;
  padding: .25em;
  border-radius: .1em;
  background: white;
  font-size: 1.25em;

  @media (min-width: 35em) {
    font-size: 2rem;
  }
`;
