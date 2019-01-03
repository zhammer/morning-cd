import React from 'react';
import { Song as SongInterface } from '../../types';
import SongSelect from './SongSelect';
import { Question } from './QuestionPage.styles';

interface QuestionPageProps {
  onSongSelected: (song: SongInterface) => void;
  searchSongs: (query: string) => Promise<SongInterface[]>;
}

function QuestionPage({ onSongSelected, searchSongs }: QuestionPageProps) {
  return (
    <div>
      <Question>What was the first piece of music you listened to this morning?</Question>
      <SongSelect searchSongs={searchSongs} onSongSelected={onSongSelected} />
    </div>
  );
}

export default QuestionPage;
