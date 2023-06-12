import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { HStack, Text } from '@chakra-ui/react';

import Logo from './Logo';
import { MENUS } from '../constants';
import { useUserInfo } from '../hooks';
import { useRouter } from 'next/router';

function NavBar() {
  const router = useRouter();
  const { isLogin, logout } = useUserInfo();

  const handleClickLogoutButton = async () => {
    const { isSuccess } = await logout();
    if (isSuccess) {
      if (router.pathname === '/mypage') {
        router.push('/');
      }
      alert('로그아웃에 성공했습니다.');
    } else {
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <Wrapper justify="space-between">
      <LinkWrapper href="/">
        <StyledLogo width={80} height={80} />
      </LinkWrapper>
      <HStack justify="end" gap={12}>
        {MENUS.map(
          (menu) =>
            (!isLogin || menu.href !== '/login') && (
              <LinkWrapper href={menu.href} key={menu.href}>
                <Text variant="lg" color="white">
                  {menu.title}
                </Text>
              </LinkWrapper>
            ),
        )}
        {isLogin && (
          <>
            <LinkWrapper href={'/mypage'}>
              <Text variant="lg" color="white">
                마이페이지
              </Text>
            </LinkWrapper>
            <Text variant="lg" color="white" onClick={handleClickLogoutButton} role="button">
              로그아웃
            </Text>
          </>
        )}
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
