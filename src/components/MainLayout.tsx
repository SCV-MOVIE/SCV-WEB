import React from 'react';
import localFont from 'next/font/local';

import NavBar from './NavBar';
import styled from '@emotion/styled';

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

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  z-index: 50;
`;

const Main = styled.main`
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
