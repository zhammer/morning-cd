import React from 'react';
import styled, { css } from 'react-emotion';
import colors from 'theme';
import withMaxCharacters from './withMaxCharacters';

const QuestionContainer = styled('div')`
  margin-bottom: .5rem;
`;

const inputCss = css`
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  color: ${colors.darkGray};
  padding-left: .25rem;
`;

const Input = withMaxCharacters(styled('input')`
  ${inputCss};
`, 30);

const TextArea = withMaxCharacters(styled('textarea')`
  ${inputCss};
  resize: none;
`, 100);

const ColoredSpan = styled('span')`
  color: ${props => props.color};
`;

const Prompt = styled('div')`
  font-size: .7rem;
`;

const SubmitButton = styled('button')`
  border-radius: 1em;
  display: block;
  width: 90%;
  margin: 0 auto;
  color: ${colors.darkGray};
  background: ${props => props.disabled ? colors.lightGray : colors.lightTeal};
  border-width: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: background .05s linear;

  &:hover {
    background: ${props => props.disabled ? colors.lightGray : colors.teal};
  }
`;

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
      <Input placeholder={namePlaceholder} value={nameValue} onChange={onNameChange} />
    </QuestionContainer>
    <QuestionContainer>
      <Prompt>Note <ColoredSpan color={colors.lightGray}>(optional)</ColoredSpan></Prompt>
      <TextArea placeholder="What's special about this song?" value={noteValue} onChange={onNoteChange} />
    </QuestionContainer>
    <SubmitButton disabled={!valid} onClick={onSongSubmitted} >Submit</SubmitButton>
  </div>
);

export default SongSubmitForm;
