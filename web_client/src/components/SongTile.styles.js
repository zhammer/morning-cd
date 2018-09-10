import styled from 'react-emotion';

export const Main = styled('div')`
  font-size: .7em;
`;

export const Sub = styled('div')`
  font-size: .5em;
`;

export const Columns = styled('div')`
  display: flex;
`;

export const Italic = styled('span')`
  font-style: italic;
`;

export const CoverArt = styled('img')`
  align-self: center;
  margin-right: .25em;
  border-radius: .1em;
  max-height: ${props => props.maxHeight};
`;
