import React, { useEffect, useMemo, useState } from 'react';
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
import { Movie, ShowTime, Theater } from '@root/src/@types';
import ReactDatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import { useGetSuggestedStartDate, useUpdateShowTime } from '@root/src/api/query';
import { getHHMM, getYYYYMMDD } from '@root/src/utils';
import { toast } from 'react-toastify';

interface UpdateShowTime {
  movieId: number;
  round: number;
  startDate: Date;
  theaterId: number;
}

interface Props {
  data: ShowTime;
  movies: Movie[];
  theaters: Theater[];
  isOpen: boolean;
  onClose: VoidFunction;
}
function AdminShowTimeUpdateModal({ data, movies, theaters, isOpen, onClose }: Props) {
  const updateShowTime = useUpdateShowTime();
  const [buttonText, setButtonText] = useState('수정');
  const [movieId, setMovieId] = useState(movies[0]?.id ?? 0);

  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const { register, handleSubmit, control, setValue, reset } = useForm<UpdateShowTime>();
  const onSubmit: SubmitHandler<UpdateShowTime> = async (inputData) => {
    if (Object.values(inputData).some((elem) => !Boolean(elem))) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }
    setButtonText('Loading...');
    const { round, startDate: dateData, theaterId } = inputData;
    const startDate = `${getYYYYMMDD(dateData, '-')} ${getHHMM(dateData, ':')}`;
    updateShowTime.mutate(
      { showtimeId: data.id, movieId, round, theaterId, startDate },
      {
        onSuccess: () => {
          toast.success('상영 일정 수정 성공!');
          onClickClose();
        },
        onSettled: () => {
          setButtonText('수정');
        },
        onError: (res: any) => {
          const { message } = res?.response?.data;
          toast.error(message ?? '상영 일정 수정 실패!');
        },
      },
    );
  };

  const {
    data: suggestedData,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetSuggestedStartDate(movieId);

  const validTheaters = theaters.filter((theater) => theater.deleted === 'N');

  const suggestedStartTime = useMemo(
    () => (isSuccess ? new Date(suggestedData) : new Date()),
    [suggestedData, isSuccess],
  );

  useEffect(() => {
    setValue('startDate', suggestedStartTime);
  }, [setValue, suggestedStartTime]);

  useEffect(() => {
    if (data) {
      reset({
        movieId: data.movieDTO.id,
        round: data.round,
        startDate: new Date(data.startDate),
        theaterId: Number(
          theaters.find(
            (theater) =>
              theater.name === data.theaterName && theater.theaterType === data.theaterType,
          )?.id ?? 0,
        ),
      });
    }
  }, [data, reset, theaters]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>상영 일정 수정</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack gap={4}>
                <Stack>
                  <label htmlFor="movieId">영화</label>
                  <Select
                    id="movieId"
                    onChange={(e) => {
                      setMovieId(Number(e.currentTarget.value));
                    }}
                    value={movieId}
                  >
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.id}>
                        {movie.name}
                      </option>
                    ))}
                  </Select>
                </Stack>
                <Stack>
                  <label htmlFor="round">상영 회차</label>
                  <Input placeholder="N회차 (숫자만 입력)" {...register('round')} />
                </Stack>
                <Stack>
                  <label htmlFor="startDate">상영 일자</label>
                  {isLoading || isFetching ? (
                    <Input readOnly placeholder={'상영 시간 계산중...'} />
                  ) : (
                    <Controller
                      control={control}
                      name="startDate"
                      defaultValue={suggestedStartTime}
                      render={({ field }) => (
                        <StyledDatePicker
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                          dateFormat="yyyy-MM-dd HH:mm"
                          showTimeInput
                        />
                      )}
                    />
                  )}
                </Stack>
                <Stack>
                  <label htmlFor="theaterId">상영관</label>
                  <Select {...register('theaterId')} defaultValue={theaters[0]?.id ?? 0}>
                    {validTheaters.map((theater) => (
                      <option key={theater.id} value={theater.id}>
                        {theater.name}
                      </option>
                    ))}
                  </Select>
                </Stack>
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

const StyledDatePicker = styled(ReactDatePicker)`
  width: 100%;
  border: 1px solid;
  padding-inline: 1rem;
  height: 2.5rem;
  border-radius: 0.375rem;
`;

export default AdminShowTimeUpdateModal;
