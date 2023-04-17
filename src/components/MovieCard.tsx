import Image from 'next/image';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

import { Movie } from '@/@types';
import { Calendar } from '@root/public/icons';
import { useRouter } from 'next/router';

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper>
      <Stack gap={12} bg={theme.colors.gray500}>
        <MovieImage priority width={360} height={360} src={movie.imgUrl} alt="movie-image" />
        <Stack paddingInline={16} boxSizing="border-box">
          <Heading color={theme.colors.gray100}>{movie.name}</Heading>
          <Text color={theme.colors.gray200}>감독: {movie.director}</Text>
          <Text color={theme.colors.gray200}>배급사: {movie.distributor}</Text>
        </Stack>
        <BookingButton
          leftIcon={<Calendar />}
          variant="outline"
          py={16}
          alignItems="center"
          cursor="pointer"
          onClick={() => router.push(`/book?id=${movie.id}`)}
        >
          <Heading as="h4" color={theme.colors.coreRed}>
            예매
          </Heading>
        </BookingButton>
      </Stack>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const MovieImage = styled(Image)`
  max-width: 100%;
`;

const BookingButton = styled(Button)`
  transition: all 0.2s ease-in;

  &,
  & > span svg path,
  & > h4 {
    transition: all 0.2s ease-in;
  }

  & > span svg path {
    stroke: ${({ theme }) => theme.colors.red500};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.red600};

    h4 {
      color: ${({ theme }) => theme.colors.gray100};
    }

    & > span svg path {
      stroke: ${({ theme }) => theme.colors.gray100};
    }
  }
`;

export default MovieCard;
