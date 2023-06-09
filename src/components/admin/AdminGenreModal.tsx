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
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Genre } from '@root/src/@types';
import { useCreateGenre } from '@root/src/api/query';
import { toast } from 'react-toastify';

type CreateGenre = Pick<Genre, 'name'>;

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminGenreModal({ isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const createGenre = useCreateGenre();
  const { register, handleSubmit } = useForm<CreateGenre>();
  const onSubmit: SubmitHandler<CreateGenre> = async (data) => {
    createGenre.mutate(data, {
      onSuccess: () => {
        toast.success('장르 생성 성공!');
        onClickClose();
      },
      onError: (res: any) => {
        const { data } = res?.response;

        toast.error(data?.message ?? '장르 생성 실패!');
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>장르 생성</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack>
                <label htmlFor="name">장르 이름</label>
                <Input placeholder="이름" {...register('name')} />
              </Stack>
              <Button type="submit" colorScheme="blue">
                생성
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default AdminGenreModal;
