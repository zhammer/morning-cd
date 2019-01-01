import React, { useState, useMemo } from 'react';
import colors from '../../../theme';
import artistNames from './artistNames';
import useRandomState from './useRandomState';
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

interface SongSubmitFormProps {
  onSongSubmitted: ({ name, note }: { name: string, note: string }) => void;
}

function SongSubmitForm({ onSongSubmitted }: SongSubmitFormProps) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const namePlaceholder = useRandomState(artistNames);
  const valid = useMemo(() => (name.length > 0), [name]);

  function handleNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleNoteChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setNote(event.target.value);
  }

  function handleSongSubmitted() {
    onSongSubmitted({ name, note });
  }

  return (
    <div>
      <QuestionContainer>
        <Prompt>Your Name <ColoredSpan color={colors.orange}>*</ColoredSpan></Prompt>
        <InputWithMaxCharacters placeholder={namePlaceholder} value={name} onChange={handleNameChanged} />
      </QuestionContainer>
      <QuestionContainer>
        <Prompt>Note <ColoredSpan color={colors.lightGray}>(optional)</ColoredSpan></Prompt>
        <TextAreaWithMaxCharacters placeholder="What's special about this song?" value={note} onChange={handleNoteChanged} />
      </QuestionContainer>
      <SubmitButton disabled={!valid} onClick={handleSongSubmitted} >Submit</SubmitButton>
    </div>
  )
}

export default SongSubmitForm;
