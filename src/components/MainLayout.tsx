import React from 'react';

import NavBar from './NavBar';
import styled from '@emotion/styled';

function MainLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Wrapper>
      <NavBar />
      <Main>
        <Content>{children}</Content>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  z-index: 50;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 40;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export default MainLayout;
