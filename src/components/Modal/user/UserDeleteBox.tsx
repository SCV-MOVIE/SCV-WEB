import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { api } from '@root/src/api';
import { useUserInfo } from '@root/src/hooks';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface DeleteProps {
  password: string;
}

function UserDeleteBox() {
  const { user } = useUserInfo();
  const router = useRouter();
  const { register, handleSubmit } = useForm<DeleteProps>();
  const onSubmit: SubmitHandler<DeleteProps> = async (data) => {
    if (user?.id) {
      await api.delete('/api/member/withdrawal', {
        data: {
          id: user.id,
          password: data.password,
        },
      });
      router.push('/');
      alert('탈퇴가 완료되었습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <label htmlFor="name">비밀번호</label>
        <Input placeholder="비밀번호" type="password" {...register('password')} />
        <Button type="submit" colorScheme="blue">
          탈퇴하기
        </Button>
      </Stack>
    </form>
  );
}

export default UserDeleteBox;
