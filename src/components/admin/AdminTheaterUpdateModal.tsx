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
import { RequestTheater, Theater } from '@root/src/@types';
import { useUpdateTheater } from '@root/src/api/query';
import { toast } from 'react-toastify';

type UpdateTheater = RequestTheater;

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  data: Theater;
}
function AdminTheaterModal({ data, isOpen, onClose }: Props) {
  const [buttonText, setButtonText] = React.useState('수정');
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit, reset } = useForm<UpdateTheater>();
  const updateTheater = useUpdateTheater();
  const onSubmit: SubmitHandler<UpdateTheater> = async (inputData) => {
    if (Object.values(inputData).some((elem) => !Boolean(elem))) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }

    setButtonText('Loading...');

    updateTheater.mutate(
      { ...inputData, theaterId: data.id },
      {
        onSuccess: () => {
          toast.success('상영관 수정 성공!');
          onClickClose();
        },
        onSettled: () => {
          setButtonText('수정');
        },
        onError: (res: any) => {
          const { message } = res?.response?.data;
          toast.error(message ?? '상영관 수정 실패!');
        },
      },
    );
  };

  useEffect(() => {
    if (data) {
      reset({
        row: Number(data.layout.split('x')[0]),
        column: Number(data.layout.split('x')[1]),
        name: data.name,
        theaterType: data.theaterType,
      });
    }
  }, [data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>{`'${data.name}'`} 상영관 수정</Text>
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
              <Button type="submit" colorScheme="blue" isDisabled={buttonText !== '수정'}>
                {buttonText}
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default AdminTheaterModal;
