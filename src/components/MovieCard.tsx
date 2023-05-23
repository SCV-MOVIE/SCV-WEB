import Image from 'next/image';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Button, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';

import { Movie } from '@/@types';
import { Calendar } from '@root/public/icons';
import { useRouter } from 'next/router';
import { MovieModal } from './Modal';

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper>
      <Stack
        spacing={8}
        onClick={onOpen}
        cursor="pointer"
        backgroundColor="black"
        transition={'all 0.1s ease-in'}
        _hover={{ bgColor: 'blackAlpha.300' }}
      >
        <MovieImage priority width={360} height={320} src={movie.imgUrl} alt="movie-image" />
        <Stack paddingInline={4} boxSizing="border-box">
          <Heading color={theme.colors.gray100}>{movie.name}</Heading>
          <Text color={theme.colors.gray200}>감독: {movie.director}</Text>
          <Text color={theme.colors.gray200}>배급사: {movie.distributor}</Text>
        </Stack>
        <BookingButton
          leftIcon={<Calendar />}
          variant="outline"
          py={8}
          alignItems="center"
          cursor="pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/book?id=${movie.id}`);
          }}
          borderRadius={0}
        >
          <Heading size="md" as="h4" color={theme.colors.coreRed}>
            예매
          </Heading>
        </BookingButton>
      </Stack>
      <MovieModal movie={movie} isOpen={isOpen} onClose={onClose} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const MovieImage = styled(Image)`
  max-width: 100%;
  max-height: 320px;
`;

const BookingButton = styled(Button)`
  transition: all 0.2s ease-in;
  background-color: ${({ theme }) => theme.colors.offwhite};

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
