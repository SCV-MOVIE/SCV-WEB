import Head from 'next/head';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button, Input, Stack, Text, Box, Center, HStack } from '@chakra-ui/react';

import { Bottom, Logo } from '@/components';
import { useTheme } from '@emotion/react';

interface LoginType {
  email: string;
  password: string;
}

export default function Login() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Box height={'100%'}>
          <Center>
            <Logo width={100} height={100} />
          </Center>
          <Stack px={32}>
            <label htmlFor="id">아이디</label>
            <Input id="id" placeholder="아이디" {...register('email')} padding={8} />
            <label htmlFor="password">아이디</label>
            <Input
              id="password"
              placeholder="비밀번호"
              type="password"
              {...register('password')}
              padding={8}
            />
          </Stack>
          <HStack px={32} mt={2} justifyContent="space-between">
            <Text variant="md" color={theme.colors.coreBlue}>
              아이디 찾기
            </Text>
            <Text variant="md" color={theme.colors.coreBlue}>
              비밀번호 찾기
            </Text>
            <Text variant="md" color={theme.colors.coreBlue}>
              회원가입
            </Text>
          </HStack>
          <Center px={32} mt={32}>
            <Button
              width="100%"
              py={2}
              type="submit"
              variant="solid"
              bgColor={theme.colors.coreBlue}
              cursor={'pointer'}
              borderRadius={8}
            >
              <Text color={theme.colors.white} fontSize="16px">
                로그인
              </Text>
            </Button>
          </Center>
        </Box>
      </LoginForm>
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
  background-color: #e3e3e3;
  border-radius: 12px;

  '@bp2': {
    max-width: 320px;
    padding-inline: 24px;
  },
`;
