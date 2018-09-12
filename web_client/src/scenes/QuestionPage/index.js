import React from 'react';
import api from 'services/api';
import SongSelect from './components/SongSelect';
import { Question } from './QuestionPage.styles';

const QuestionPage = ({ onSongSelected }) => (
  <div>
    <Question>What was the first piece of music you listened to this morning?</Question>
    <SongSelect fetchOptions={api.searchTracks} onOptionSelected={onSongSelected} />
  </div>
);

export default QuestionPage;
