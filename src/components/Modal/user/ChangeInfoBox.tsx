import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { api } from '@root/src/api';
import { useUserInfo } from '@root/src/hooks';
import { forPhoneNumber } from '@root/src/utils';
import { useRouter } from 'next/router';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface FindPW {
  name: string;
  loginId: string;
  phoneNumber: string;
}

function ChangeInfoBox() {
  const { user } = useUserInfo();
  const router = useRouter();
  const { register, handleSubmit } = useForm<FindPW>();
  const onSubmit: SubmitHandler<FindPW> = async (data) => {
    if (user?.id) {
      const result = await api.patch('/api/member/info', {
        id: user.id,
        newLoginId: data.loginId,
        newName: data.name,
        newPhoneNm: forPhoneNumber(data.phoneNumber),
      });

      if (result.status === 200) {
        alert('수정이 완료되었습니다.');
        router.push('/');
      } else {
        alert('문제가 생겼습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack padding={8}>
        <Stack>
          <label htmlFor="name">이름</label>
          <Input placeholder="이름" {...register('name')} />
          <label htmlFor="loginId">아이디</label>
          <Input placeholder="아이디" {...register('loginId')} />
          <label htmlFor="phoneNumber">핸드폰 번호</label>
          <Input
            id="phoneNumber"
            placeholder="핸드폰 번호(01011112222)"
            {...register('phoneNumber')}
            padding={4}
            maxLength={11}
          />
        </Stack>
        <Button type="submit" colorScheme="blue">
          내정보 변경
        </Button>
      </Stack>
    </form>
  );
}

export default ChangeInfoBox;
