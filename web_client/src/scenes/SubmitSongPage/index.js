import React from 'react';
import styled from 'react-emotion';
import SongTile from 'components/SongTile';
import SongSubmitForm from './components/SongSubmitForm';

const Column = styled('div')`
  margin: .5em auto;
  width: 80%;
  @media (min-width: 35em) {
    width: 70%;
  }
`;

const Song = styled(SongTile)`
  margin: .5rem auto;
  padding: .25em;
  border-radius: .1em;
  background: white;
  font-size: 1.25em;

  @media (min-width: 35em) {
    font-size: 2rem;
  }
`;

const SubmitSongPage = ({ song }) => (
  <Column>
    <Song {...song} imageSize='medium' imageMaxHeight='1.5em'/>
    <SongSubmitForm onSongSubmitted={formData => alert(JSON.stringify(formData))}/>
  </Column>
);

export default SubmitSongPage;
