import React from 'react';
import { styled } from 'stitches.config';
import NavBar from './NavBar';

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

const Wrapper = styled('div', {
  maxWidth: '1920px',
  margin: '0 auto',
  height: '100%',
});

const Main = styled('main', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '$background',

  '@bp1': {},
  '@bp2': {},
  '@bp3': {},
  '@bp4': {},
});

const Content = styled('div', {
  width: '100%',
  height: '100%',
  marginTop: '80px',
});

export default MainLayout;
