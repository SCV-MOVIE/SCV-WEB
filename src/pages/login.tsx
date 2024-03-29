import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button, Input, Stack, Text, Box, Center, HStack, useDisclosure } from '@chakra-ui/react';

import { Bottom, Logo, NavBar } from '@/components';
import { useTheme } from '@emotion/react';
import { UserUtilModal } from '../components/Modal/user';
import { useRouter } from 'next/router';
import { useUserInfo } from '../hooks';

interface LoginType {
  loginId: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const theme = useTheme();
  const { login } = useUserInfo();
  const [utilModalType, setUtilModalType] = React.useState<'findID' | 'signUp' | 'changeInfo'>(
    'findID',
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClickModalOpen = React.useCallback(
    (type: 'changeInfo' | 'signUp') => {
      setUtilModalType(type);
      onOpen();
    },
    [onOpen],
  );

  const { register, handleSubmit } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const { isSuccess } = await login(data);
    if (isSuccess) {
      router.back();
      alert('로그인에 성공했습니다.');
    } else {
      alert('로그인에 실패하였습니다.');
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <NavBar />

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Box height={'100%'}>
          <Center>
            <Logo width={100} height={100} />
          </Center>
          <Stack px={8}>
            <label htmlFor="id" style={{ color: theme.colors.gray100 }}>
              아이디
            </label>
            <Input
              id="id"
              placeholder="아이디"
              {...register('loginId')}
              padding={4}
              color={theme.colors.gray100}
            />
            <label htmlFor="password" style={{ color: theme.colors.gray100 }}>
              비밀번호
            </label>
            <Input
              id="password"
              placeholder="비밀번호"
              type="password"
              {...register('password')}
              padding={4}
              color={theme.colors.gray100}
            />
          </Stack>

          <Center px={8} mt={12}>
            <Button
              width="100%"
              py={2}
              type="submit"
              variant="solid"
              bgColor="blue.600"
              cursor={'pointer'}
              borderRadius={8}
              transition="all 0.2s ease-in"
              _hover={{
                bgColor: 'blue.800',
              }}
            >
              <Text color={theme.colors.offwhite} fontSize="16px">
                로그인
              </Text>
            </Button>
          </Center>
          <Center px={8} mt={4}>
            <Button
              width="100%"
              py={2}
              type="button"
              variant="solid"
              bgColor="green.600"
              cursor={'pointer'}
              borderRadius={8}
              transition="all 0.2s ease-in"
              _hover={{
                bgColor: 'green.800',
              }}
              onClick={() => handleClickModalOpen('signUp')}
            >
              <Text color={theme.colors.offwhite} fontSize="16px">
                회원가입
              </Text>
            </Button>
          </Center>
        </Box>
      </LoginForm>
      <UserUtilModal type={utilModalType} isOpen={isOpen} onClose={onClose} />
      <Bottom />
    </>
  );
}

const LoginForm = styled('form')`
  width: 480px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 12;
  margin: 0 auto;
  padding: 32;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 12px;
`;
