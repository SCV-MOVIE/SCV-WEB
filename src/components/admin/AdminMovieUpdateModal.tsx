import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  theme,
  useCheckboxGroup,
} from '@chakra-ui/react';

import { pretendard } from '@root/src/pages/_app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Genre, Movie } from '@root/src/@types';
import { useUpdateMovie } from '@root/src/api/query';
import { toast } from 'react-toastify';

interface UpdateMovie {
  newActor: string;
  newDirector: string;
  newStaff: string;
  newDistributor: string;
  newImgUrl: string;
  newIntroduction: string;
  newLength: number;
  newRating: 'ALL' | '12+' | '15+' | '18+';
}

interface Props {
  data: Movie;
  isOpen: boolean;
  onClose: VoidFunction;
  genres: Genre[];
}
function AdminMovieUpdateModal({ data, isOpen, onClose, genres }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);
  const initialGenres = data.genreDTOList.map((genre) => genre.name);

  const updateMovie = useUpdateMovie();
  const { value: checkedGenres, getCheckboxProps } = useCheckboxGroup({
    defaultValue: initialGenres,
  });

  const { register, handleSubmit, reset } = useForm<UpdateMovie>();
  const onSubmit: SubmitHandler<UpdateMovie> = async (inputData) => {
    if (Object.values(inputData).some((elem) => !Boolean(elem)) || checkedGenres.length === 0) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }
    const req = {
      ...inputData,
      genreDTOList: [...checkedGenres.map((genreName) => ({ name: genreName }))] as Pick<
        Genre,
        'name'
      >[],
      movieId: data.id,
    };
    updateMovie.mutate(req, {
      onSuccess: () => {
        toast.success('영화 수정 성공!');
        onClickClose();
      },
      onError: (res: any) => {
        const { message } = res?.response?.data;

        toast.error(message ?? '영화 수정 실패!');
      },
    });
  };

  useEffect(() => {
    if (data) {
      reset({
        newActor: data.actor,
        newDirector: data.director,
        newStaff: data.staff,
        newDistributor: data.distributor,
        newImgUrl: data.imgUrl,
        newIntroduction: data.introduction,
        newLength: Number(data.length),
        newRating: data.rating as 'ALL' | '12+' | '15+' | '18+',
      });
    }
  }, [data, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClickClose} size="5xl">
      <ModalOverlay />
      <ModalContent overflow="scroll" minH={620} className={pretendard.className}>
        <ModalHeader>
          <HStack justifyContent="center" position="relative">
            <Text>{`'${data.name}'`} 영화 수정</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack padding={8} gap={8}>
              <Stack gap={4}>
                <Stack>
                  <label htmlFor="newLength">영화 길이</label>
                  <Input
                    defaultValue={data.length}
                    placeholder="N분 (숫자만 입력)"
                    {...register('newLength')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="newRating">상영물 등급</label>
                  <Select defaultValue={data.rating} {...register('newRating')}>
                    <option value="ALL">ALL</option>
                    <option value="12+">12+</option>
                    <option value="15+">15+</option>
                    <option value="18+">18+</option>
                  </Select>
                </Stack>
                <Stack>
                  <label htmlFor="newDistributor">배급사</label>
                  <Input
                    defaultValue={data.distributor}
                    placeholder="영화 배급사"
                    {...register('newDistributor')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="newDirector">감독</label>
                  <Input
                    defaultValue={data.director}
                    placeholder="감독"
                    {...register('newDirector')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="newStaff">스태프</label>
                  <Input
                    defaultValue={data.staff}
                    placeholder="제작진 이름 목록"
                    {...register('newStaff')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="newActor">배우</label>
                  <Input
                    defaultValue={data.actor}
                    placeholder="배우 이름 목록"
                    {...register('newActor')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="newImgUrl">포스터 URL</label>
                  <Input
                    defaultValue={data.imgUrl}
                    placeholder="이미지 URL"
                    {...register('newImgUrl')}
                  />
                </Stack>
                <Stack>
                  <label htmlFor="genre">장르</label>
                  <CheckboxGroup colorScheme="blue" defaultValue={initialGenres}>
                    <SimpleGrid columns={5} spacing={[1, 5]}>
                      {genres.map((genre) => (
                        <Checkbox
                          key={genre.name}
                          borderColor={theme.colors.blue[700]}
                          {...getCheckboxProps({ value: genre.name })}
                        >
                          {genre.name}
                        </Checkbox>
                      ))}
                    </SimpleGrid>
                  </CheckboxGroup>
                </Stack>
                <Stack>
                  <label htmlFor="newIntroduction">줄거리</label>
                  <Textarea
                    defaultValue={data.introduction}
                    placeholder="줄거리"
                    {...register('newIntroduction')}
                  />
                </Stack>
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
export default AdminMovieUpdateModal;
