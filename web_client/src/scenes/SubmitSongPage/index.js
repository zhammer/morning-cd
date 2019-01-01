import React from 'react';
import SongSubmitForm from './SongSubmitForm';
import { Column, Song } from './SubmitSongPage.styles';

const SubmitSongPage = ({ song, onSongSubmitted }) => (
  <Column>
    <Song {...song} imageSize='medium' imageMaxHeight='1.5em'/>
    <SongSubmitForm onSongSubmitted={onSongSubmitted}/>
  </Column>
);

export default SubmitSongPage;
