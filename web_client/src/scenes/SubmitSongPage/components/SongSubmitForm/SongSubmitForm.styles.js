import styled, { css } from 'react-emotion';
import colors from 'theme';

export const QuestionContainer = styled('div')`
  margin-bottom: .5rem;
`;

const inputCss = css`
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  color: ${colors.darkGray};
  padding-left: .25rem;
`;

export const Input = styled('input')`
  ${inputCss};
`;

export const TextArea = styled('textarea')`
  ${inputCss};
  resize: none;
`;

export const ColoredSpan = styled('span')`
  color: ${props => props.color};
`;

export const Prompt = styled('div')`
  font-size: .7rem;
`;

export const SubmitButton = styled('button')`
  border-radius: 1em;
  width: 100%;
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
