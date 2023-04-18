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
          <Stack px={8}>
            <label htmlFor="id" style={{ color: theme.colors.gray100 }}>
              아이디
            </label>
            <Input
              id="id"
              placeholder="아이디"
              {...register('email')}
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
          <HStack px={8} mt={4} justifyContent="space-between">
            <Text size="md" color={theme.colors.coreBlue}>
              아이디 찾기
            </Text>
            <Text size="md" color={theme.colors.coreBlue}>
              비밀번호 찾기
            </Text>
            <Text size="md" color={theme.colors.coreBlue}>
              회원가입
            </Text>
          </HStack>
          <Center px={8} mt={12}>
            <Button
              width="100%"
              py={2}
              type="submit"
              variant="solid"
              bgColor={theme.colors.blue600}
              cursor={'pointer'}
              borderRadius={8}
              transition="all 0.2s ease-in"
              _hover={{
                bgColor: theme.colors.coreBlue,
              }}
            >
              <Text color={theme.colors.offwhite} fontSize="16px">
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
  background-color: ${({ theme }) => theme.colors.gray500};
  border-radius: 12px;

  '@bp2': {
    max-width: 320px;
    padding-inline: 24px;
  },
`;
