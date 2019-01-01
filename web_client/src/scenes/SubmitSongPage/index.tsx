import React from 'react';
import SongSubmitForm from './SongSubmitForm';
import { Column, Song } from './SubmitSongPage.styles';
import { Song as SongInterface } from '../../types';

interface SubmitSongPageProps {
  song: SongInterface;
  onSongSubmitted: ({ name, note }: { name: string, note: string }) => void;
}

function SubmitSongPage({ song, onSongSubmitted }: SubmitSongPageProps) {
  return (
    <Column>
      <Song {...song} imageSize='medium' imageMaxHeight='1.5em' />
      <SongSubmitForm onSongSubmitted={onSongSubmitted} />
    </Column>
  )
}
export default SubmitSongPage;
