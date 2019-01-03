import React from 'react';
import { Song as SongInterface } from '../../types';
import SongSelect from './SongSelect';
import { Question } from './QuestionPage.styles';

interface QuestionPageProps {
  onSongSelected: (song: SongInterface) => void;
  searchSongs: (query: string) => Promise<SongInterface[]>;
}

const QuestionPage = ({ onSongSelected, searchSongs }: QuestionPageProps) => (
  <div>
    <Question>What was the first piece of music you listened to this morning?</Question>
    <SongSelect searchSongs={searchSongs} onSongSelected={onSongSelected} />
  </div>
);

export default QuestionPage;
