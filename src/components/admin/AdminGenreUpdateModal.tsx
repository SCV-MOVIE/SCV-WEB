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
import { toast } from 'react-toastify';

type CreateGenre = Pick<Genre, 'name'>;

interface Props {
  data: Genre;
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminGenreUpdateModal({ data, isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const { register, handleSubmit, reset } = useForm<CreateGenre>();
  const onSubmit: SubmitHandler<CreateGenre> = async (data) => {
    console.log(data);
    toast.success('장르 수정 성공!');
  };

  React.useEffect(() => {
    if (data) {
      reset({
        name: data.name,
      });
    }
  }, [data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>장르 수정</Text>
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
                수정
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default AdminGenreUpdateModal;