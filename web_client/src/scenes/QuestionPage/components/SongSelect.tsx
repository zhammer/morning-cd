import React, { useRef } from 'react';
import colors from '../../../theme';
import { Song as SongInterface } from '../../../types';
import {
  ClearButton,
  FlexColumn,
  RightAbsolute,
  Song,
  SongInput,
  SpinningSun,
} from './SongSelect.styles';
import useAutocomplete from '../../../hooks/useAutocomplete';

export interface SongSelectProps {
  fetchSongs: (query: string) => Promise<Array<SongInterface>>;
  onSongSelected: (song: SongInterface) => void;
}

export default function ({ fetchSongs, onSongSelected }: SongSelectProps) {
  const [input, setInput, songs, loading] = useAutocomplete<SongInterface>(fetchSongs, 2000);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleClearButtonClicked() {
    setInput('');
    inputRef && inputRef.current && inputRef.current.focus();
  }

  return (
    <FlexColumn>
      <SongInput
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        spellCheck={false} />
      {loading && (
        <RightAbsolute>
          <SpinningSun fill={colors.orange} />
        </RightAbsolute>
      )}
      {input && !loading && (
        <RightAbsolute>
          <ClearButton onClick={handleClearButtonClicked} />
        </RightAbsolute>
      )}
      {songs.map(song => (
        <Song
          key={song.id}
          onClick={() => onSongSelected(song)}
          {...song}
        />
      ))}
    </FlexColumn>
  )
}