import { Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { Movie } from '../@types';
import MovieRating from './MovieRating';

interface Props {
  movie: Movie;
}

function MainMovieThumbnail({ movie }: Props) {
  const theme = useTheme();

  return (
    <>
      <MovieDescription spacing={8} marginTop={196}>
        <Heading as="h1" size="md" color="white">
          {movie.title}
        </Heading>
        <MovieRating rating={movie.rating} />
        <Heading as="h3" size="3xl" color={theme.colors.coreBlue}>
          Overview
        </Heading>
        <HStack gap={4}>
          <Text fontSize="md" color="white">
            Genres:
          </Text>
          <HStack>
            {movie.genres.map((genre) => (
              <Text fontSize="md" key={genre} color="white">
                {genre}
              </Text>
            ))}
          </HStack>
        </HStack>
        <Text fontSize="md" style={{ whiteSpace: 'pre-line' }} color="white">
          {movie.description}
        </Text>
      </MovieDescription>
      <MainThumbnail fill src="/movie.jpeg" alt="main-movie thumbnail" />
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
