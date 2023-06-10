import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexProps, Icon, Text } from '@chakra-ui/react';

import Logo from '../Logo';
import { DashBoard, Users } from '@root/public/icons';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

function BankSideBar() {
  const router = useRouter();
  const handleClickLogOut = () => {
    toast.success('로그아웃 성공!');
    router.push('/bank');
  };

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo width={36} height={36} />
      </LogoWrapper>
      <SideBarContent title="MAIN MENU" flexGrow={1}>
        <NavItem icon={DashBoard} isSelected>
          Dashboard
        </NavItem>
      </SideBarContent>
      <SideBarContent title="GENERAL" minHeight="30%">
        <NavItem icon={Users} onClick={handleClickLogOut}>
          LogOut
        </NavItem>
      </SideBarContent>
    </Wrapper>
  );
}

interface SideBarContentProps extends FlexProps {
  title: string;
  children: ReactNode;
}
function SideBarContent({ title, children, ...rest }: SideBarContentProps) {
  const theme = useTheme();
  return (
    <Flex flexDirection="column" {...rest}>
      <Text fontSize="12" mb="2" color={theme.colors.gray300}>
        {title}
      </Text>
      {children}
    </Flex>
  );
}

interface NavItemProps extends FlexProps {
  icon: any;
  isSelected?: boolean;
}
function NavItem({ icon, isSelected = false, children, ...rest }: NavItemProps) {
  const theme = useTheme();
  return (
    <Flex
      p="2"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      alignItems="center"
      color={isSelected ? theme.colors.black : theme.colors.gray400}
      fontSize="16"
      fontWeight={isSelected ? 'medium' : 'normal'}
      bg={isSelected ? 'rgba(33, 150, 243, 0.1)' : 'none'}
      _hover={{
        bg: 'rgba(33, 150, 243, 0.1)',
        color: theme.colors.black,
      }}
      {...rest}
    >
      <Icon
        mr="4"
        fontSize="24"
        filter={
          isSelected
            ? 'invert(42%) sepia(85%) saturate(942%) hue-rotate(180deg) brightness(98%) contrast(94%)'
            : 'invert(67%) sepia(0%) saturate(0%) hue-rotate(342deg) brightness(89%) contrast(91%)'
        }
        _groupHover={{
          filter:
            'invert(42%) sepia(85%) saturate(942%) hue-rotate(180deg) brightness(98%) contrast(94%)',
        }}
        as={icon}
      />
      {children}
    </Flex>
  );
}

const Wrapper = styled.div`
  width: 20%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;

  width: 3rem;
  height: 3rem;
  min-height: 3rem;

  margin-bottom: 2rem;
`;

export default BankSideBar;
