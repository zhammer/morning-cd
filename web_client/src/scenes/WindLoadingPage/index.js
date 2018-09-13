import React from 'react';
import styled from 'react-emotion';
import WindLoading from 'components/WindLoading';

const Container = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WindLoadingPage = props => (
  <Container>
    <WindLoading />
  </Container>
);

export default WindLoadingPage;
