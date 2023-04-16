import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { HStack, Text } from '@chakra-ui/react';

import Logo from './Logo';
import { MENUS } from '../constants';

function NavBar() {
  return (
    <Wrapper justify="space-between">
      <LinkWrapper href="/">
        <StyledLogo width={80} height={80} />
      </LinkWrapper>
      <HStack justify="end" gap="40">
        <LinkWrapper href="/book">
          <Text variant="lg" color="white">
            영화 예매
          </Text>
        </LinkWrapper>
        <LinkWrapper href="/login">
          <Text variant="lg" color="white">
            상영작
          </Text>
        </LinkWrapper>
        <LinkWrapper href="/login">
          <Text variant="lg" color="white">
            로그인
          </Text>
        </LinkWrapper>
      </HStack>
    </Wrapper>
  );
}

const Wrapper = styled(HStack)`
  padding-left: 32px;
  padding-right: 80px;
  z-index: 100;
`;

const LinkWrapper = styled(Link)`
  z-index: 100;
`;

const StyledLogo = styled(Logo)`
  max-width: 300px;
  z-index: 100;
`;

export default NavBar;
