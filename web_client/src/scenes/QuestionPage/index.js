import React from 'react';
import styled, { keyframes } from 'react-emotion';
import colors from 'theme';
import SvgSun from './SvgSun';

const Question = styled('div')`
  width: 70%;
  margin: 0 auto;
  text-align: center;
  padding: 1.5em 0 0;
`;

const CenterContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SongInput = styled('input')`
  width: 70%;
  margin: .5em auto;
  padding-left: .5em;
  padding-right: .5em;
  font-family: inherit;
  font-size: 1rem;
  color: ${colors.darkGray};
`;

const rise = keyframes`
  from { transform: translateY(.5em); }
  to   { transform: translateY(0em); }
`;

const SunContainer = styled('div')`
  position: fixed;
  width: 100%;
  bottom: -50vw;
  animation: ${rise} 3s ease-in 0s both;
  z-index: -1;
`;

const QuestionPage = props => (
  <div>
    <Question>What was the first piece of music you listened to this morning?</Question>
    <CenterContainer>
      <SongInput type='text' spellCheck={false} />
    </CenterContainer>
    <SunContainer>
      <SvgSun fill={colors.orange} />
    </SunContainer>
  </div>
);

export default QuestionPage;
