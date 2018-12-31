import React from 'react';
import { Song } from '../types';
import {
  Columns,
  CoverArt,
  Italic,
  Main,
  Sub,
} from './SongTile.styles';

export interface SongTileProps extends Song {
  imageSize: 'small' | 'medium' | 'large';
  imageMaxHeight: string;
  className: string;
  onClick: () => void;
}

const SongTile = ({ name, artist, album, images, imageSize='small', imageMaxHeight='100%', className, onClick }: SongTileProps) => (
  <div className={className} onClick={onClick}>
    <Columns>
      <CoverArt alt='coverart' src={images[imageSize].url} maxHeight={imageMaxHeight}/>
      <div>
        <Main>{name}</Main>
        <Sub>{artist} - <Italic>{album}</Italic></Sub>
      </div>
    </Columns>
  </div>
);

export default SongTile;
