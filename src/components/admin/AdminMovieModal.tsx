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
import { Movie } from '@root/src/@types';

type CreateMovie = Pick<
  Movie,
  | 'actor'
  | 'director'
  | 'staff'
  | 'distributor'
  | 'imgUrl'
  | 'introduction'
  | 'length'
  | 'name'
  | 'rating'
>;

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminMovieModal({ isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit } = useForm<CreateMovie>();
  const onSubmit: SubmitHandler<CreateMovie> = async (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>영화 생성</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack>
                <label htmlFor="name">영화 제목</label>
                <Input placeholder="영화 제목" {...register('name')} />

                <label htmlFor="length">영화 길이</label>
                <Input placeholder="N분 (숫자만 입력)" {...register('length')} />

                <label htmlFor="distributor">영화 배급사</label>
                <Input placeholder="영화 배급사" {...register('distributor')} />

                <label htmlFor="director">감독</label>
                <Input placeholder="감독" {...register('director')} />

                <label htmlFor="staff">스태프</label>
                <Input placeholder="제작진 이름 목록" {...register('staff')} />

                <label htmlFor="actor">배우</label>
                <Input placeholder="배우 이름 목록" {...register('actor')} />

                <label htmlFor="imgUrl">포스터 URL</label>
                <Input placeholder="이미지 URL" {...register('imgUrl')} />
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
export default AdminMovieModal;
