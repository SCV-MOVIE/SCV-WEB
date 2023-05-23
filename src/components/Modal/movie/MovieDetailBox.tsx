import React from 'react';
import Image from 'next/image';
import { Movie } from '@root/src/@types';
import { Heading, HStack, Text, Stack, Center } from '@chakra-ui/react';

interface Props {
  movie: Movie;
}

function MovieDetailBox({ movie }: Props) {
  return (
    <Stack>
      <HStack>
        <Image width={240} height={240} src={movie.imgUrl} alt="image-thumbnail" />
        <Stack>
          <Heading as="h3" size="md">
            {movie.name}
          </Heading>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              소개:{' '}
            </Heading>
            <Text fontSize={12}>{movie.introduction}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              장르:{' '}
            </Heading>
            <HStack>
              {movie.genres.map((genre) => (
                <Text fontSize={12} key={genre.value}>
                  {genre.value}
                </Text>
              ))}
            </HStack>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              길이:{' '}
            </Heading>
            <Text fontSize={12}>{movie.length}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              상영등급:{' '}
            </Heading>
            <Text fontSize={12}>{movie.rating}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              감독:{' '}
            </Heading>
            <Text fontSize={12}>{movie.director}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              배급사:{' '}
            </Heading>
            <Text fontSize={12}>{movie.distributor}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              배우:{' '}
            </Heading>
            <Text fontSize={12}>{movie.actors}</Text>
          </HStack>
          <HStack alignItems="center">
            <Heading minW={'48px'} fontSize={12}>
              제작진:{' '}
            </Heading>
            <Text fontSize={12}>{movie.staff}</Text>
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
}

export default MovieDetailBox;
