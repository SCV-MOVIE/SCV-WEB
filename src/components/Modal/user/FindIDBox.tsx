import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

interface FindId {
  name: string;
  phoneNumber: string;
  securityFrontNumber: string;
  securityBackNumber: string;
}

function FindIdBox() {
  const { register, handleSubmit } = useForm<FindId>();
  const onSubmit: SubmitHandler<FindId> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack padding={8}>
        <Stack>
          <label htmlFor="name">이름</label>
          <Input placeholder="이름" {...register('name')} />
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
          아이디 찾기
        </Button>
      </Stack>
    </form>
  );
}

export default FindIdBox;
