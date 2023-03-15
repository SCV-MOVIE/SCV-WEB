import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import { FlexDiv, FlexMotionDiv, Typography } from './common';
import { styled } from '@root/stitches.config';
import { Play, Star, HalfStar } from '@root/public/icons';

type FontLargeSize = {
  title: 'h1';
  description: 'body1';
};
type FontSmallSize = {
  title: 'h3';
  description: 'body3';
};
type FontSize = FontLargeSize | FontSmallSize;

interface Props {
  src: string;
  size?: 'small' | 'large';
  alt?: string;
  info: {
    title: string;
    date: string;
    genre: string[];
    star: number;
  };
}

function ThumbnailCard({ src, info, size = 'small', alt = 'movie-thumbnail' }: Props) {
  const fontSizes = React.useMemo<FontSize>(
    () =>
      size === 'small'
        ? {
            description: 'body3',
            title: 'h3',
          }
        : {
            description: 'body1',
            title: 'h1',
          },
    [size],
  );

  return (
    <Wrapper size={size} justify="center">
      <ThumbnailImage fill alt={alt} src={src} />
      <AnimatePresence>
        <OverlayLayout
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
          justify="end"
          direction="column"
          gap={4}
        >
          <PlayIcon size={size} />
          <FlexDiv align="end">
            {[...Array(Math.floor(info.star))].map((_, idx) => (
              <Star key={idx} />
            ))}
            {Math.round(info.star % 1) && <HalfStar />}{' '}
          </FlexDiv>
          <motion.div>
            <Typography type={fontSizes.title} color="white">
              {info.title}
            </Typography>
            <Typography type={fontSizes.description} color="white">
              {info.date}
            </Typography>
            <Typography type={fontSizes.description} color="white">
              {info.genre.map((genre) => genre).join(', ')}
            </Typography>
          </motion.div>
        </OverlayLayout>
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled(FlexMotionDiv, {
  position: 'relative',
  borderRadius: '$large',
  overflow: 'hidden',
  cursor: 'pointer',

  variants: {
    size: {
      small: {
        minWidth: 240,
        height: 320,
      },
      large: {
        width: 380,
        height: 512,
      },
    },
  },

  '&:hover': {
    img: {
      scale: 1.1,
      opacity: 0.5,
    },
  },
});

const ThumbnailImage = styled(Image, {
  borderRadius: '$large',
  transition: 'all 0.2s ease',
  zIndex: 95,
  backfaceVisibility: 'hidden',
});

const OverlayLayout = styled(FlexMotionDiv, {
  width: '100%',
  height: '100%',
  paddingLeft: 24,
  paddingBottom: 16,
  zIndex: 99,
});

const PlayIcon = styled(Play, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  variants: {
    size: {
      small: {
        width: 64,
        height: 64,
      },
      large: {
        width: 120,
        height: 120,
      },
    },
  },
});

export default ThumbnailCard;
