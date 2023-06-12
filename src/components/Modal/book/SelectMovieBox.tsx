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
import { initialSelectedMovieValue, useBookContext } from './BookContext';
import { ShowTime } from '@root/src/@types/theater';
import MovieRating from '@root/src/components/MovieRating';
import SelectedTicketInformation from './SelectedTicketInformation';
import { DUMMY_SHOWTIMES } from '@root/src/constants/dummy';
import {
  korDay,
  colorDay,
  dateFormatter,
  endTimeFor,
  moviesFromShowTimes,
  formattedShowTimes,
} from '@root/src/utils';

const currentDate = dateFormatter.format(new Date()).split(', ');
const formattedDate = currentDate[0].split('/');

interface Props {
  showTimes: ShowTime[];
}

function SelectMovieBox({ showTimes }: Props) {
  console.log(showTimes);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [showTimesByDay, setShowTimeByDay] = React.useState<Record<string, ShowTime[]>>({});
  const [selectedDay, setSelectedDay] = React.useState<keyof (typeof showTimesByDay)[string]>(
    '' as keyof (typeof showTimesByDay)[string],
  );
  const { value, setValue } = useBookContext();

  React.useEffect(() => {
    const nextMovies = moviesFromShowTimes(showTimes);
    setMovies(nextMovies);
    const nextShowTimes = formattedShowTimes(showTimes);
    setShowTimeByDay(nextShowTimes);

    if (value.showTime.id !== -1) {
      setSelectedDay(
        value.showTime.startDate.slice(8, 10) as keyof (typeof showTimesByDay)[string],
      );
    }
  }, [setValue, showTimes, value.showTime.id, value.showTime.startDate]);

  return (
    <HStack width="100%" alignItems="start">
      <Stack w="240px">
        <Center>
          <Heading size="md">영화</Heading>
        </Center>
        <ColumnContent>
          {movies?.map((movie, idx) => (
            <Button
              key={idx}
              flexShrink={0}
              py={6}
              pl={12}
              justifyContent="start"
              onClick={() =>
                setValue((prev) => ({
                  ...prev,
                  movie,
                  showTime: initialSelectedMovieValue.showTime,
                }))
              }
              colorScheme={movie.id === value.movie.id ? 'teal' : 'gray'}
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
          {formattedDate[0] ?? '06'}
        </Heading>
        <Heading fontSize={14} textAlign="center">
          {formattedDate[2] ?? '2023'}
        </Heading>
        {value.movie.name && (
          <ColumnContent>
            {Object.keys(showTimesByDay[value.movie.name] ?? []).map((day) => (
              <Button
                key={day}
                flexShrink={0}
                py={6}
                justifyContent="center"
                disabled={!value?.showTime}
                onClick={() => setSelectedDay(day as keyof (typeof showTimesByDay)[string])}
                colorScheme={selectedDay === day ? 'teal' : 'gray'}
              >
                <HStack spacing={0} gap={'6px'}>
                  <Text
                    fontSize={14}
                    color={
                      selectedDay === day
                        ? 'white'
                        : colorDay(new Date(2023, 5, Number(day)).getDay()).kor
                    }
                  >
                    {korDay(new Date(2023, 5, Number(day)).getDay())}
                  </Text>
                  <Text
                    fontSize={18}
                    color={
                      selectedDay === day
                        ? 'white'
                        : colorDay(new Date(2023, 5, Number(day)).getDay()).day
                    }
                  >
                    {day}
                  </Text>
                </HStack>
              </Button>
            ))}
          </ColumnContent>
        )}
      </Stack>
      <Divider orientation="vertical" />
      <Stack w="320px">
        <Center>
          <Heading size="md">상영시간</Heading>
        </Center>
        {Object.entries(selectedDay && showTimesByDay[value.movie.name][selectedDay]).map(
          ([theaterName, showTimes]) => (
            <Stack key={theaterName}>
              <Text>{theaterName}</Text>
              <Grid templateColumns={`repeat(3, 1fr)`} columnGap={2} rowGap={2}>
                {showTimes.map((showTime: ShowTime) => {
                  const startTime = showTime.startDate.split(' ')[1];
                  return (
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
                        <Text>{startTime}</Text>
                        <Text
                          fontSize={12}
                          color={showTime === value?.showTime ? 'white' : 'gray.600'}
                        >
                          {endTimeFor(showTime.startDate, value.movie.length).split(' ')[1]}
                        </Text>
                        <Divider />
                        <Text
                          fontSize={10}
                          color={showTime === value?.showTime ? 'white' : 'gray.400'}
                        >
                          {`${showTime.remainSeatNm}/${showTime.theaterSize}`}
                        </Text>
                      </Stack>
                    </Button>
                  );
                })}
              </Grid>
            </Stack>
          ),
        )}
      </Stack>
      <Divider orientation="vertical" />
      <SelectedTicketInformation selectedMovie={value} theaterType={value.showTime.theaterType} />
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
