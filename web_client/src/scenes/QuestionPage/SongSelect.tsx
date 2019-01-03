import React, { useRef } from 'react';
import colors from '../../theme';
import { Song as SongInterface } from '../../types';
import {
  ClearButton,
  FlexColumn,
  RightAbsolute,
  Song,
  SongInput,
  SpinningSun,
  SongInputContainer,
} from './SongSelect.styles';
import useAutocomplete from '../../hooks/useAutocomplete';

export interface SongSelectProps {
  searchSongs: (query: string) => Promise<SongInterface[]>;
  onSongSelected: (song: SongInterface) => void;
}

export default function ({ searchSongs, onSongSelected }: SongSelectProps) {
  const [input, setInput, songs, loading] = useAutocomplete<SongInterface>(searchSongs, 1000);
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
      <SongInputContainer>
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
      </SongInputContainer>
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