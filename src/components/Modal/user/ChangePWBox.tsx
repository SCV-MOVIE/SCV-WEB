import { Button, Input, Stack } from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface FindPW {
  password: string;
  passwordCheck: string;
}

function ChangePWBox() {
  const { register, handleSubmit } = useForm<FindPW>();
  const onSubmit: SubmitHandler<FindPW> = async (data) => {
    if (data.password !== data.passwordCheck) {
      alert('비밀번호가 서로 다릅니다.');
      return;
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack padding={8}>
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
        <Button type="submit" colorScheme="blue">
          비밀번호 변경
        </Button>
      </Stack>
    </form>
  );
}

export default ChangePWBox;
