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
import { Genre, RequestUpdateGenre } from '@root/src/@types';
import { toast } from 'react-toastify';
import { useUpdateGenre } from '@root/src/api/query';

type CreateGenre = Pick<RequestUpdateGenre, 'newName'>;

interface Props {
  data: Genre;
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminGenreUpdateModal({ data, isOpen, onClose }: Props) {
  const [buttonText, setButtonText] = React.useState('수정');
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const { register, handleSubmit, reset } = useForm<CreateGenre>();
  const updateGenre = useUpdateGenre();
  const onSubmit: SubmitHandler<CreateGenre> = async (inputData) => {
    if (Object.values(inputData).some((elem) => !Boolean(elem))) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }
    setButtonText('Loading...');
    updateGenre.mutate(
      { ...inputData, id: data.id },
      {
        onSuccess: () => {
          toast.success('장르 수정 성공!');
          onClickClose();
        },
        onSettled: () => {
          setButtonText('수정');
        },
        onError: (res: any) => {
          const { message } = res?.response?.data;

          toast.error(message ?? '장르 수정 실패!');
        },
      },
    );
  };

  React.useEffect(() => {
    if (data) {
      reset({
        newName: data.name,
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
                <label htmlFor="newName">장르 이름</label>
                <Input placeholder="이름" {...register('newName')} />
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
export default AdminGenreUpdateModal;
