import React from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { HStack, Stack, Text, Heading } from '@chakra-ui/react';

import { Movie } from '../@types';
import MovieRating from './MovieRating';
import { Play } from '@root/public/icons';

interface Props {
  src: string;
  size?: 'small' | 'large';
  alt?: string;
  movie: Movie;
}

function ThumbnailCard({ src, movie, size = 'small', alt = 'movie-thumbnail' }: Props) {
  return (
    <Wrapper justify="center">
      <ThumbnailImage fill alt={alt} src={src} />
      <AnimatePresence>
        <OverlayLayout
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
        >
          <Stack justify="end" spacing={4} height="95%" paddingLeft={4}>
            <PlayIcon size={size} />
            <Text variant="lg" color="white">
              {movie.rating}
            </Text>
            <Heading as="h1" size="2xl" color="white">
              {movie.name}
            </Heading>
            <Text variant="lg" color="white">
              {movie.genreDTOList.map((genre) => genre.name).join(', ')}
            </Text>
          </Stack>
        </OverlayLayout>
      </AnimatePresence>
    </Wrapper>
  );
}

type StyleProps = Pick<Props, 'size'>;
const Wrapper = styled(HStack)<StyleProps>`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  min-width: ${({ size }) => (size === 'small' ? '240px' : '380px')};
  height: ${({ size }) => (size === 'small' ? '320px' : '512px')};

  &:hover {
    img {
      scale: 1.1;
      opacity: 0.5;
    }
  }
`;

const ThumbnailImage = styled(Image)`
  border-radius: 10px;
  transition: all 0.2s ease;
  zindex: 95;
  backface-visibility: hidden;
`;

const OverlayLayout = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding-left: 24;
  padding-bottom: 16;
  z-index: 99;
`;

const PlayIcon = styled(Play)<StyleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ size }) => (size === 'small' ? '64px' : '64px')};
  height: ${({ size }) => (size === 'small' ? '120px' : '120px')};
`;

export default ThumbnailCard;
