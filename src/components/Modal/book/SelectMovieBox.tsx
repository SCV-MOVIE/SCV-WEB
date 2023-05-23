import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Movie } from '@root/src/@types';
import { useBookContext } from './BookContext';
import { ShowTime } from '@root/src/@types/theater';
import MovieRating from '@root/src/components/MovieRating';
import SelectedTicketInformation from './SelectedTicketInformation';
import { DUMMY_MOVIE, DUMMY_SHOWTIME } from '@root/src/constants/dummy';
import { korDay, colorDay, dateFormatter } from '@root/src/utils';

const currentDate = dateFormatter.format(new Date()).split(', ');
const formatedDate = currentDate[0].split('/');
const theaters = ['1관', 'IMAX관'];

function SelectMovieBox() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [showTimes, setShowTimes] = React.useState<ShowTime[]>([]);
  const { value, setValue } = useBookContext();

  React.useEffect(() => {
    const nextMovies = [...Array(24)].map((_, idx) => ({ ...DUMMY_MOVIE, id: idx }));
    setMovies(nextMovies);
    const nextShowTimes = [...Array(12)].map((_, idx) => ({ ...DUMMY_SHOWTIME, id: idx }));
    setShowTimes(nextShowTimes);
  }, []);

  return (
    <HStack width="100%" alignItems="start">
      <Stack w="240px">
        <Center>
          <Heading size="md">영화</Heading>
        </Center>
        <ColumnContent>
          {movies?.map((movie) => (
            <Button
              key={movie.id}
              flexShrink={0}
              py={6}
              pl={12}
              justifyContent="start"
              onClick={() => setValue((prev) => ({ ...prev, movie }))}
              colorScheme={movie === value?.movie ? 'teal' : 'gray'}
            >
              <HStack justifyContent="start">
                <Text as={'span'}>
                  <MovieRating rating={movie.rating} size="sm" />
                </Text>
                <Text as={'strong'} fontWeight={700} size="md">
                  {movie.name}
                </Text>
              </HStack>
            </Button>
          ))}
        </ColumnContent>
      </Stack>
      <Divider orientation="vertical" />
      <Stack w="240px">
        <Center>
          <Heading size="md">날짜</Heading>
        </Center>
        <Heading fontSize={24} textAlign="center" pt={4}>
          {formatedDate[0] ?? '06'}
        </Heading>
        <Heading fontSize={14} textAlign="center">
          {formatedDate[2] ?? '2023'}
        </Heading>
        <ColumnContent>
          {showTimes?.map((showTime) => (
            <Button
              key={showTime.id}
              flexShrink={0}
              py={6}
              justifyContent="center"
              disabled={!value?.showTime}
              onClick={() => setValue((prev) => ({ ...prev, showTime }))}
              colorScheme={showTime === value?.showTime ? 'teal' : 'gray'}
            >
              <HStack spacing={0} gap={'6px'}>
                <Text
                  fontSize={14}
                  color={
                    showTime === value?.showTime
                      ? 'white'
                      : colorDay(new Date(showTime.startDate).getDay()).kor
                  }
                >
                  {korDay(new Date(showTime.startDate).getDay())}
                </Text>
                <Text
                  fontSize={18}
                  color={
                    showTime === value?.showTime
                      ? 'white'
                      : colorDay(new Date(showTime.startDate).getDay()).day
                  }
                >
                  {formatedDate[1]}
                </Text>
              </HStack>
            </Button>
          ))}
        </ColumnContent>
      </Stack>
      <Divider orientation="vertical" />
      <Stack w="320px">
        <Center>
          <Heading size="md">상영시간</Heading>
        </Center>
        {theaters.map((theater) => (
          <Stack key={theater}>
            <Text>{theater}</Text>
            <Grid templateColumns={`repeat(3, 1fr)`} columnGap={2} rowGap={2}>
              {showTimes?.map((showTime) => (
                <Button
                  key={showTime.id}
                  flexShrink={0}
                  py={'48px'}
                  justifyContent="center"
                  onClick={() => setValue((prev) => ({ ...prev, showTime }))}
                  colorScheme={showTime === value?.showTime ? 'teal' : 'gray'}
                  disabled={!value?.showTime}
                >
                  <Stack spacing={0} gap={'4px'}>
                    <Text>{currentDate[1]}</Text>
                    <Text fontSize={12} color={showTime === value?.showTime ? 'white' : 'gray.600'}>
                      {currentDate[1]}
                    </Text>
                    <Divider />
                    <Text fontSize={10} color={showTime === value?.showTime ? 'white' : 'gray.400'}>
                      23/36
                    </Text>
                  </Stack>
                </Button>
              ))}
            </Grid>
          </Stack>
        ))}
      </Stack>
      <Divider orientation="vertical" />
      <SelectedTicketInformation selectedMovie={value} />
    </HStack>
  );
}

const ColumnContent = styled(Flex)`
  flex-direction: column;
  min-height: 400px;
  max-height: 400px;
  gap: 2px;
  overflow-y: scroll;
  overscroll-behavior-y: none;
`;

export default SelectMovieBox;
