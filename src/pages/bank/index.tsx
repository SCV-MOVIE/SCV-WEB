import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button, Input, Stack, Text, Box, Center } from '@chakra-ui/react';

import { Logo } from '@/components';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const BANK_ADMIN = {
  ID: 'bankAdmin',
  PW: '1234',
};

interface LoginType {
  id: string;
  password: string;
}

export default function BankLogin() {
  const theme = useTheme();

  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    if (data.id !== BANK_ADMIN.ID || data.password !== BANK_ADMIN.PW) {
      toast.error('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }
    toast.success('로그인 성공!');
    router.push('/bank/dashboard');
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Logo width={100} height={100} />
        </Center>
        <Stack px={8} gap={4}>
          <Stack gap={1}>
            <label htmlFor="id" style={{ color: theme.colors.gray300 }}>
              아이디
            </label>
            <Input
              id="id"
              placeholder="아이디"
              {...register('id')}
              padding={4}
              color={theme.colors.gray400}
              borderColor={theme.colors.gray200}
            />
          </Stack>
          <Stack gap={1}>
            <label htmlFor="password" style={{ color: theme.colors.gray300 }}>
              비밀번호
            </label>
            <Input
              id="password"
              placeholder="비밀번호"
              type="password"
              {...register('password')}
              padding={4}
              color={theme.colors.gray400}
              borderColor={theme.colors.gray200}
            />
          </Stack>
        </Stack>
        <Center px={8}>
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
      </LoginForm>
    </>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: 'bank',
    title: 'Login',
  },
});

const LoginForm = styled('form')`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-between;
  margin: auto;
  padding: 4rem 1rem;
  gap: 3rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
`;
