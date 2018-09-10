import React from 'react';
import api from 'services/api';
import colors from 'theme';
import AutocompleteDropdown from 'components/AutocompleteDropdownInput';
import {
  ClearButton,
  LoadingContainer,
  Question,
  Song,
  SongInput,
  SpinningSun,
} from './QuestionPage.styles';


const Loading = () => <LoadingContainer><SpinningSun fill={colors.orange}/></LoadingContainer>;
const Clear = ({ onClick }) => <LoadingContainer><ClearButton onClick={onClick}/></LoadingContainer>;

const SongSelect = (props) => <AutocompleteDropdown LoadingComponent={Loading} InputComponent={SongInput} OptionComponent={Song} ClearButtonComponent={Clear} { ...props } />;


const QuestionPage = ({ onSongSelected }) => (
  <div>
    <Question>What was the first piece of music you listened to this morning?</Question>
    <SongSelect fetchOptions={api.searchTracks} onOptionSelected={option => onSongSelected(option)}/>
  </div>
);

export default QuestionPage;
