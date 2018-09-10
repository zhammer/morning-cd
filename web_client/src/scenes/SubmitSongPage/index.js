import React from 'react';
import SongSubmitForm from './components/SongSubmitForm';
import { Column, Song } from './SubmitSongPage.styles';

const SubmitSongPage = ({ song }) => (
  <Column>
    <Song {...song} imageSize='medium' imageMaxHeight='1.5em'/>
    <SongSubmitForm onSongSubmitted={formData => alert(JSON.stringify(formData))}/>
  </Column>
);

export default SubmitSongPage;
