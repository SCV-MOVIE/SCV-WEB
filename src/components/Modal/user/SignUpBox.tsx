import React from 'react';
import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface SignUp {
  name: string;
  loginId: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string;
  securityFrontNumber: string;
  securityBackNumber: string;
}

function SignUpBox() {
  const { watch, register, handleSubmit } = useForm<SignUp>();
  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    if (data.password !== data.passwordCheck) {
      alert('비밀번호가 서로 다릅니다.');
      return;
    }
    console.log(data);
  };

  const handleClickCheckEmailButton = React.useCallback(() => {
    const loginId = watch('loginId');
    console.log(loginId);
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack padding={8}>
        <Stack>
          <label htmlFor="name">이름</label>
          <Input placeholder="이름" {...register('name')} />
          <label htmlFor="id">아이디</label>
          <HStack>
            <Input id="id" placeholder="아이디" {...register('loginId')} padding={4} />
            <Button type="button" onClick={handleClickCheckEmailButton}>
              중복 확인
            </Button>
          </HStack>
          <label htmlFor="password">비밀번호</label>
          <Input
            id="password"
            placeholder="비밀번호"
            type="password"
            {...register('password')}
            padding={4}
          />
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <Input
            id="passwordCheck"
            placeholder="비밀번호 확인"
            type="password"
            {...register('passwordCheck')}
            padding={4}
          />
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <Input
            id="phoneNumber"
            placeholder="핸드폰 번호(01011112222)"
            {...register('phoneNumber')}
            padding={4}
            maxLength={11}
          />
          <label htmlFor="securityFrontNumber">주민등록번호</label>
          <HStack>
            <Input
              id="securityFrontNumber"
              placeholder="앞자리(6)"
              {...register('securityFrontNumber')}
              padding={4}
              maxLength={6}
            />
            <Input
              id="securityBackNumber"
              placeholder="뒷자리(7)"
              type="password"
              {...register('securityBackNumber')}
              padding={4}
              maxLength={7}
            />
          </HStack>
        </Stack>
        <Button type="submit" colorScheme="blue">
          회원가입
        </Button>
      </Stack>
    </form>
  );
}

export default SignUpBox;
