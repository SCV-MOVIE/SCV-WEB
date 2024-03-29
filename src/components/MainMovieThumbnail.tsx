import Image from 'next/image';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { Movie } from '@/@types';
import { isEmptyValue } from './CheckTicket';

interface Props {
  movie: Movie;
}

function MainMovieThumbnail({ movie }: Props) {
  const theme = useTheme();

  return (
    <>
      <MovieDescription spacing={4} marginTop={240}>
        <Heading as="h1" size="2xl" color="white">
          {movie.name}
        </Heading>
        <Stack gap={2}>
          <Heading as="h3" size="lg" color={theme.colors.coreBlue}>
            Overview
          </Heading>
          <HStack gap={4}>
            <Text variant="lg" color="white">
              관람 등급:
            </Text>
            <Text variant="lg" color={theme.colors.offwhite}>
              {movie.rating}
            </Text>
          </HStack>
          <HStack gap={4} pb={10}>
            <Text variant="md" color="white">
              장르:
            </Text>
            <HStack>
              {movie.genreDTOList.map((genre) => (
                <Text variant="md" key={genre.name} color="white">
                  {genre.name}
                </Text>
              ))}
            </HStack>
          </HStack>
        </Stack>
      </MovieDescription>
      <MainThumbnail
        fill
        src={isEmptyValue(movie.imgUrl) ? '/mario.jpeg' : movie.imgUrl}
        alt="main-movie thumbnail"
      />
    </>
  );
}

const MainThumbnail = styled(Image)`
  zindex: 50;
  opacity: 0.5;
`;

const MovieDescription = styled(Stack)`
  position: relative;
  z-index: 100;
  padding-inline: 40px;
`;

export default MainMovieThumbnail;
