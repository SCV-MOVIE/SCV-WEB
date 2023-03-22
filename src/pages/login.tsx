import Head from 'next/head';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { styled } from '@root/stitches.config';
import { Button, FlexDiv, Input, Logo, Typography } from '../components';

interface LoginType {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (data) => console.log(data);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Logo width={100} height={100} />
        <Input label="아이디" {...register('email')} />
        <Input label="비밀번호" type="password" {...register('password')} />
        <HelpBox justify="between">
          <Typography type="body4" color="blue">
            아이디 찾기
          </Typography>
          <Typography type="body4" color="blue">
            비밀번호 찾기
          </Typography>
          <Typography type="body4" color="blue">
            회원가입
          </Typography>
        </HelpBox>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </>
  );
}

const LoginForm = styled('form', {
  width: 480,
  height: 420,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  gap: 12,
  margin: '0 auto',
  padding: 32,
  boxSizing: 'border-box',
  backgroundColor: '$gray500',
  borderRadius: '$medium',

  '@bp2': {
    maxWidth: 320,
    paddingInline: 24,
  },
});

const LoginButton = styled(Button, {
  width: '100%',
  height: 32,
  marginTop: 16,
  color: '$white',
  backgroundColor: '$gray400',
});

const HelpBox = styled(FlexDiv, {
  width: '80%',
  margin: '0 auto',

  '& > div': {
    cursor: 'pointer',
    transition: 'all 0.15s ease-in',
  },
  '& > div:hover': {
    color: '$blue600',
  },
});
