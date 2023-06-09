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

  const { register, handleSubmit } = useForm<CreatePartner>();
  const onSubmit: SubmitHandler<CreatePartner> = async (data) => {
    createPartner.mutate(data);
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
