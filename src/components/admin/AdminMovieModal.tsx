import React from 'react';
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
import { useCreateMovie } from '@root/src/api/query';
import { toast } from 'react-toastify';

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
  genres: Genre[];
}
function AdminMovieModal({ isOpen, onClose, genres }: Props) {
  const onClickClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const createMovie = useCreateMovie();
  const { value: checkedGenres, getCheckboxProps } = useCheckboxGroup();
  const { register, handleSubmit } = useForm<CreateMovie>();
  const onSubmit: SubmitHandler<CreateMovie> = async (data) => {
    if (Object.values(data).some((elem) => !Boolean(elem)) || checkedGenres.length === 0) {
      toast.error('모든 데이터를 채워주셔야 합니다!');
      return;
    }
    const req = {
      ...data,
      genreDTOList: [...checkedGenres.map((genreName) => ({ name: genreName }))] as Pick<
        Genre,
        'name'
      >[],
    };
    createMovie.mutate(req, {
      onSuccess: () => {
        toast.success('영화 생성 성공!');
        onClickClose();
      },
      onError: (res: any) => {
        const { message } = res?.response?.data;

        toast.error(message ?? '영화 생성 실패!');
      },
    });
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
              <Stack gap={4}>
                <Stack>
                  <label htmlFor="name">영화 제목</label>
                  <Input placeholder="영화 제목" {...register('name')} />
                </Stack>
                <Stack>
                  <label htmlFor="length">영화 길이</label>
                  <Input placeholder="N분 (숫자만 입력)" {...register('length')} />
                </Stack>
                <Stack>
                  <label htmlFor="rating">상영물 등급</label>
                  <Select {...register('rating')} defaultValue="ALL">
                    <option value="ALL">ALL</option>
                    <option value="12+">12+</option>
                    <option value="15+">15+</option>
                    <option value="19+">19+</option>
                  </Select>
                </Stack>
                <Stack>
                  <label htmlFor="distributor">배급사</label>
                  <Input placeholder="영화 배급사" {...register('distributor')} />
                </Stack>
                <Stack>
                  <label htmlFor="director">감독</label>
                  <Input placeholder="감독" {...register('director')} />
                </Stack>
                <Stack>
                  <label htmlFor="staff">스태프</label>
                  <Input placeholder="제작진 이름 목록" {...register('staff')} />
                </Stack>
                <Stack>
                  <label htmlFor="actor">배우</label>
                  <Input placeholder="배우 이름 목록" {...register('actor')} />
                </Stack>
                <Stack>
                  <label htmlFor="imgUrl">포스터 URL</label>
                  <Input placeholder="이미지 URL" {...register('imgUrl')} />
                </Stack>
                <Stack>
                  <label htmlFor="genre">장르</label>
                  <CheckboxGroup colorScheme="blue">
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
                  <label htmlFor="introduction">줄거리</label>
                  <Textarea placeholder="줄거리" {...register('introduction')} />
                </Stack>
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
