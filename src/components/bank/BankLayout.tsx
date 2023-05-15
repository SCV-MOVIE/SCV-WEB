import React, { ReactNode } from 'react';

import styled from '@emotion/styled';
import BankSideBar from './BankSideBar';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { DashBoard } from '@root/public/icons';
import { pretendard } from '@root/src/pages/_app';

const ICON_TITLE_TABLE: { [key: string]: any } = {
  Dashboard: DashBoard,
} as const;

interface BankLayoutProps {
  title: string;
  children: ReactNode;
}
function BankLayout({ title, children }: BankLayoutProps) {
  return (
    <Wrapper className={pretendard.className}>
      {title !== 'Login' ? (
        <>
          <BankSideBar />
          <Main>
            <Flex mb="8" alignItems="center">
              <Icon mr="4" fontSize="36" as={ICON_TITLE_TABLE[`${title}`]} />
              <Text fontSize="36" fontWeight="medium">
                {title}
              </Text>
            </Flex>
            <Content>{children}</Content>
          </Main>
        </>
      ) : (
        <Main>{children}</Main>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  height: 100%;
  z-index: 50;
  display: flex;
  background-color: ${({ theme }) => theme.colors.offwhite};
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0 0 1.5rem;
  z-index: 40;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 1rem 0 0 0;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
    0px 1px 1px rgba(0, 0, 0, 0.08);
`;

export default BankLayout;
