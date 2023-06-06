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
import { Theater } from '@root/src/@types';

type CreateTheater = Pick<Theater, 'name'> & {
  row: number;
  column: number;
  theaterType: Theater['theaterType']['value'];
};

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminTheaterModal({ isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit } = useForm<CreateTheater>();
  const onSubmit: SubmitHandler<CreateTheater> = async (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>상영관 생성</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack>
                <label htmlFor="name">상영관 이름</label>
                <Input placeholder="이름" {...register('name')} />

                <label htmlFor="length">상영관 행</label>
                <Input placeholder="N(숫자만 입력)" {...register('row')} />

                <label htmlFor="distributor">상영관 열</label>
                <Input placeholder="M(숫자만 입력)" {...register('column')} />

                <label htmlFor="theaterType">상영관 타입</label>
                <Select {...register('theaterType')} defaultValue="NORMAL">
                  <option value="NORMAL">NORMAL</option>
                  <option value="PREMIUM">PREMIUM</option>
                  <option value="3D">3D</option>
                </Select>
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
export default AdminTheaterModal;
