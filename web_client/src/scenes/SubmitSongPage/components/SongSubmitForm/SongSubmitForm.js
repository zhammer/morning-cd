import React from 'react';
import colors from 'theme';
import withMaxCharacters from './withMaxCharacters';
import {
  ColoredSpan,
  Input,
  Prompt,
  QuestionContainer,
  SubmitButton,
  TextArea,
} from './SongSubmitForm.styles';

const InputWithMaxCharacters = withMaxCharacters(Input, 30);
const TextAreaWithMaxCharacters = withMaxCharacters(TextArea, 100);

const SongSubmitForm = ({
  nameValue,
  noteValue,
  onNameChange,
  onNoteChange,
  namePlaceholder,
  valid,
  onSongSubmitted
}) => (
  <div>
    <QuestionContainer>
      <Prompt>Your Name <ColoredSpan color={colors.orange}>*</ColoredSpan></Prompt>
      <InputWithMaxCharacters placeholder={namePlaceholder} value={nameValue} onChange={onNameChange} />
    </QuestionContainer>
    <QuestionContainer>
      <Prompt>Note <ColoredSpan color={colors.lightGray}>(optional)</ColoredSpan></Prompt>
      <TextAreaWithMaxCharacters placeholder="What's special about this song?" value={noteValue} onChange={onNoteChange} />
    </QuestionContainer>
    <SubmitButton disabled={!valid} onClick={onSongSubmitted} >Submit</SubmitButton>
  </div>
);

export default SongSubmitForm;
