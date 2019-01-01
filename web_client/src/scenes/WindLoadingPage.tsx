import React from 'react';
import styled from '@emotion/styled/macro';
import WindLoading from '../components/WindLoading';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function WindLoadingPage() {
  return (
    <Container>
      <WindLoading />
    </Container>
  )
}

export default WindLoadingPage;