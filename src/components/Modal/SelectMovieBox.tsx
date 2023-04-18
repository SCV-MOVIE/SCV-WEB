import Image from 'next/image';
import { Button, Center, Divider, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { DUMMY_MOVIE, DUMMY_SHOWTIME } from '@root/src/constants/dummy';

import { Movie } from '@root/src/@types';
import { ShowTime } from '@root/src/@types/theater';
import React from 'react';
import MovieRating from '../MovieRating';

function SelectMovieBox() {
  const [movies, setMovies] = React.useState<Movie[] | null>(null);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [showTimes, setShowTimes] = React.useState<ShowTime[] | null>(null);
  const [selectedShowTime, setSelectedShowTime] = React.useState<ShowTime | null>(null);

  React.useEffect(() => {
    const nextMovies = [...Array(24)].map((_, idx) => ({ ...DUMMY_MOVIE, id: idx }));
    setMovies(nextMovies);
    const nextShowTimes = [...Array(12)].map((_, idx) => ({ ...DUMMY_SHOWTIME, id: idx }));
    setShowTimes(nextShowTimes);
  }, []);

  return (
    <HStack width="100%">
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
              onClick={() => setSelectedMovie(movie)}
              colorScheme={movie === selectedMovie ? 'teal' : 'gray'}
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
        <ColumnContent>
          {showTimes?.map((showTime) => (
            <Button
              key={showTime.id}
              flexShrink={0}
              py={6}
              pl={12}
              justifyContent="start"
              onClick={() => setSelectedShowTime(showTime)}
              colorScheme={showTime === selectedShowTime ? 'teal' : 'gray'}
              disabled={selectedMovie == null}
            >
              <HStack>
                <Text>{showTime.startTime}</Text>
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
        <ColumnContent>
          {showTimes?.map((showTime) => (
            <Button
              key={showTime.id}
              flexShrink={0}
              py={6}
              pl={12}
              justifyContent="start"
              onClick={() => setSelectedShowTime(showTime)}
              colorScheme={showTime === selectedShowTime ? 'teal' : 'gray'}
              disabled={selectedMovie == null}
            >
              <Text>{showTime.date}</Text>
            </Button>
          ))}
        </ColumnContent>
      </Stack>
      <Divider orientation="vertical" />
      <Stack textAlign="center" w="120px">
        <Heading size="md">구매내역</Heading>
        {selectedMovie && (
          <Stack textAlign="center">
            <Image width={120} height={140} src={selectedMovie.imgUrl} alt="image-thumbnail" />
            <Heading as="h3" size="md">
              {selectedMovie.name}
            </Heading>
            <Divider />
            <HStack alignItems="center">
              <Heading size="sm" fontSize={12}>
                상영관:
              </Heading>
              <Text size="sm" fontSize={12}>
                1관
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Heading fontSize={12}>상영등급: </Heading>
              <Text fontSize={12}>{selectedMovie.rating}</Text>
            </HStack>
            <HStack alignItems="center">
              <Heading fontSize={12}>날짜: </Heading>
              <Text fontSize={12}>
                {new Date().getMonth()}월 {new Date().getDay()}일
              </Text>
            </HStack>
            <HStack alignItems="center">
              <Heading fontSize={12}>상영시간: </Heading>
              <Text fontSize={12}>17:10 ~ 19:53</Text>
            </HStack>
          </Stack>
        )}
      </Stack>
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
