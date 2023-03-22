import React from 'react';
import localFont from 'next/font/local';
import { styled } from 'stitches.config';

import NavBar from './NavBar';

const pretandard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});

function MainLayout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Wrapper className={pretandard.className}>
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
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',

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
