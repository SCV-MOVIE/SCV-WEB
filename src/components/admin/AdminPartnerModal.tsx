import React from 'react';
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
  Stack,
  Text,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Partner } from '@root/src/@types';
import { useCreatePartner } from '@root/src/api/query';
import { toast } from 'react-toastify';

type CreatePartner = Pick<Partner, 'name' | 'discount'>;

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminPartnerModal({ isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const createPartner = useCreatePartner();

  const { register, handleSubmit, reset } = useForm<CreatePartner>();
  const onSubmit: SubmitHandler<CreatePartner> = async (data) => {
    if (Object.values(data).some((elem) => !Boolean(elem))) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }
    createPartner.mutate(data, {
      onSuccess: () => {
        toast.success('제휴사 등록 성공!');
        reset();
        onClickClose();
      },
      onError: (res: any) => {
        const { message } = res?.response?.data;
        toast.error(message ?? '제휴사 등록 실패!');
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>제휴사 등록</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack gap={4}>
                <Stack>
                  <label htmlFor="name">제휴사 이름</label>
                  <Input placeholder="이름" {...register('name')} />
                </Stack>
                <Stack>
                  <label htmlFor="discount">할인 금액</label>
                  <Input placeholder="N (숫자만 입력)" {...register('discount')} />
                </Stack>
              </Stack>
              <Button type="submit" colorScheme="blue">
                등록
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default AdminPartnerModal;
