import Head from 'next/head';

import { styled } from '@root/stitches.config';
import { Button, FlexDiv, Input, Logo, Typography } from '../components';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Content direction="column" gap={12} align="center">
        <Logo width={100} height={100} />
        <Input label="아이디" />
        <Input label="비밀번호" type="password" />
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
        <LoginButton type="button">Login</LoginButton>
      </Content>
    </>
  );
}

const Content = styled(FlexDiv, {
  margin: '0 auto',
  width: 480,
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

  '& > div': {
    cursor: 'pointer',
    transition: 'all 0.15s ease-in',
  },
  '& > div:hover': {
    color: '$blue600',
  },
});
