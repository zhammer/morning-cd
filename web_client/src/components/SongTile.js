import React from 'react';
import styled from 'react-emotion';

const Main = styled('div')`
  font-size: .7em;
`;

const Sub = styled('div')`
  font-size: .5em;
`;

const Columns = styled('div')`
  display: flex;
`;

const Italic = styled('span')`
  font-style: italic;
`;

const CoverArt = styled('img')`
  align-self: center;
  margin-right: .25em;
  border-radius: .1em;
  max-height: ${props => props.maxHeight};
`;

const SongTile = ({ name, artist, album, images, imageSize='small', imageMaxHeight='100%', className, onClick }) => (
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
