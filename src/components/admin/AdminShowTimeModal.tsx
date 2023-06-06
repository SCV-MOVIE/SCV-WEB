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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Movie, Theater } from '@root/src/@types';
import ReactDatePicker from 'react-datepicker';
import styled from '@emotion/styled';

interface CreateShowTime {
  movieId: number;
  round: number;
  startDate: Date;
  theaterId: number;
}

interface Props {
  movies: Movie[];
  theaters: Theater[];
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminShowTimeModal({ movies, theaters, isOpen, onClose }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit, control } = useForm<CreateShowTime>();
  const onSubmit: SubmitHandler<CreateShowTime> = async (data) => {
    console.log(data);
  };

  const validTheaters = theaters.filter((theater) => theater.deleted === 'N');

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>상영 일정 생성</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack>
                <label htmlFor="movieId">영화</label>
                <Select {...register('movieId')} defaultValue={movies[0]?.id ?? 0}>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name}
                    </option>
                  ))}
                </Select>
                <label htmlFor="round">상영 회차</label>
                <Input placeholder="N회차 (숫자만 입력)" {...register('round')} />
                <label htmlFor="startDate">상영 일자</label>
                <Controller
                  control={control}
                  name="startDate"
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <StyledDatePicker
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      dateFormat="yyyy-MM-dd HH:mm"
                      showTimeInput
                    />
                  )}
                />
                <label htmlFor="theaterId">상영관</label>
                <Select {...register('theaterId')} defaultValue={theaters[0]?.id ?? 0}>
                  {validTheaters.map((theater) => (
                    <option key={theater.id} value={theater.id}>
                      {theater.name}
                    </option>
                  ))}
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

const StyledDatePicker = styled(ReactDatePicker)`
  width: 100%;
  border: 1px solid;
  padding-inline: 1rem;
  height: 2.5rem;
  border-radius: 0.375rem;
`;

export default AdminShowTimeModal;
