import styled from '@emotion/styled/macro';

export const Main = styled.div`
  font-size: .7em;
`;

export const Sub = styled.div`
  font-size: .5em;
`;

export const Columns = styled.div`
  display: flex;
`;

export const Italic = styled.span`
  font-style: italic;
`;

type MaxHeightProps = {
  maxHeight: string;
}

export const CoverArt = styled.img<MaxHeightProps>`
  align-self: center;
  margin-right: .25em;
  border-radius: .1em;
  max-height: ${props => props.maxHeight};
`;
