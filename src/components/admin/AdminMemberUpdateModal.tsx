import React, { useEffect } from 'react';
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Membership, RequestUpdateUser, User } from '@root/src/@types';
import { useUpdateMember } from '@root/src/api/query';
import { toast } from 'react-toastify';

type UpdateUser = Pick<RequestUpdateUser, 'newMembership' | 'newPoint'>;

interface Props {
  data: User;
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminMemberUpdateModal({ data, isOpen, onClose }: Props) {
  const updateMember = useUpdateMember();
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit, reset } = useForm<UpdateUser>();
  const onSubmit: SubmitHandler<UpdateUser> = async (inputData) => {
    if (inputData.newPoint.length === 0) {
      toast.error('모든 데이터를 정확히 채워주셔야 합니다!');
      return;
    }

    const req = {
      ...inputData,
      clientId: data.id,
    };
    updateMember.mutate(req, {
      onSuccess: () => {
        toast.success('회원 수정 성공!');
        onClickClose();
      },
      onError: (res: any) => {
        const { message } = res?.response?.data;

        toast.error(message ?? '회원 수정 실패!');
      },
    });
  };

  useEffect(() => {
    if (data) {
      reset({
        newMembership: data.membership ?? 'COMMON',
        newPoint: `${data.point}`,
      });
    }
  }, [data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>{`'${data.name}'`} 회원 정보 수정</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack>
                <Stack>
                  <label htmlFor="newMembership">회원 등급</label>
                  <Select
                    {...register('newMembership')}
                    defaultValue={data.membership as Membership}
                  >
                    <option value={'COMMON' as Membership}>COMMON</option>
                    <option value={'VIP' as Membership}>VIP</option>
                    <option value={'VVIP' as Membership}>VVIP</option>
                  </Select>

                  <Stack>
                    <label htmlFor="newPoint">포인트</label>
                    <Input
                      placeholder="N (숫자만 입력)"
                      {...register('newPoint')}
                      defaultValue={data.point}
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Button type="submit" colorScheme="blue">
                수정
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AdminMemberUpdateModal;
