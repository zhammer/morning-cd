import React from 'react';
import styled, { keyframes } from 'react-emotion';
import { isMobile } from 'react-device-detect';
import api from 'services/api';
import colors from 'theme';
import AutocompleteDropdown from 'components/AutocompleteDropdownInput';
import SongTile from 'components/SongTile';
import Sun from 'components/Sun';
import ClearButtonSvg from 'components/ClearButtonSvg';

const Question = styled('div')`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  padding: .5em 0 0;

  @media (min-width: 35em) {
    padding: 1.5em 0 0;
  }
`;

const SongInput = styled('input')`
  width: 70%;
  margin: .5em auto .25em;
  padding-left: .5em;
  padding-right: .5em;
  font-family: inherit;
  font-size: 1rem;
  color: ${colors.darkGray};
`;

const Song = styled(SongTile)`
  width: 70%;
  margin: 0 auto;
  padding: .25em;
  border-radius: .1em;
  transition: background .5s linear;

  &:hover {
    background: white;
    cursor: pointer;
  }
`;

// TODO: figure out a less hacky width. maybe it's the scaling option on the svg?
// or the different input component on my phone?
const LoadingContainer = styled('div')`
  position: absolute;
  width: ${isMobile ? '1.5em' : '1em'};
  top: .7em;
  right: 16%;
`;

const spinning = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const SpinningSun = styled(Sun)`
  animation: ${spinning} 5s linear infinite;
`;

const ClearButton = styled(ClearButtonSvg)`
  cursor: pointer;
`;


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
